import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function compareSitemap() {
  // Read Duda sitemap URLs
  const sitemapPath = path.join(__dirname, '..', 'duda-sitemap-urls.txt');
  const dudaUrls = fs.readFileSync(sitemapPath, 'utf-8')
    .split('\n')
    .filter(u => u.trim())
    .map(u => u.replace('https://www.dumpsterchamps.com/', '').replace(/\/$/, ''));

  console.log(`Duda sitemap: ${dudaUrls.length} URLs\n`);

  // Get all slugs from Next.js database
  const cities = await prisma.city.findMany({ select: { slug: true } });
  const states = await prisma.state.findMany({ select: { slug: true } });
  const sizes = await prisma.dumpsterSize.findMany({ select: { slug: true } });
  const services = await prisma.service.findMany({ select: { slug: true } });
  const blogs = await prisma.blogPost.findMany({ select: { slug: true } });
  const neighborhoods = await prisma.neighborhood.findMany({ select: { slug: true, city: { select: { slug: true } } } });

  // Build set of Next.js URLs
  const nextjsUrls = new Set<string>();

  // Homepage
  nextjsUrls.add('');

  // Cities
  cities.forEach(c => nextjsUrls.add(`dumpster-rental-${c.slug}`));

  // States
  states.forEach(s => nextjsUrls.add(`dumpster-rental-${s.slug}`));

  // Sizes
  sizes.forEach(s => nextjsUrls.add(s.slug));

  // Services
  services.forEach(s => nextjsUrls.add(s.slug));

  // Static pages
  ['about', 'contact', 'tos', 'services', 'locations', 'dumpster-sizes'].forEach(p => nextjsUrls.add(p));

  // Blogs
  blogs.forEach(b => nextjsUrls.add(`blog/${b.slug}`));

  // Neighborhoods (if using hub/spoke pattern)
  neighborhoods.forEach(n => nextjsUrls.add(`dumpster-rental-${n.city.slug}/${n.slug}`));

  console.log(`Next.js database: ${nextjsUrls.size} URLs\n`);

  // Find missing URLs
  const missing: string[] = [];
  const matched: string[] = [];

  // Categorize missing URLs
  const missingByType: Record<string, string[]> = {
    cities: [],
    states: [],
    neighborhoods: [],
    blogs: [],
    sizes: [],
    services: [],
    other: [],
  };

  for (const url of dudaUrls) {
    // Check exact match
    if (nextjsUrls.has(url)) {
      matched.push(url);
      continue;
    }

    // Check if city without state suffix exists
    const cityMatch = url.match(/^dumpster-rental-([a-z-]+)$/);
    if (cityMatch) {
      const citySlug = cityMatch[1];
      // Try with common state suffixes
      const states = ['ca', 'tx', 'fl', 'ny', 'il', 'oh', 'az', 'ga', 'nc', 'nj', 'pa', 'wa', 'ma', 'wi', 'tn', 'co', 'al', 'ky', 'or', 'ok', 'ia', 'ks', 'ct', 'id', 'in', 'md', 'nv', 'ne', 'mn', 'mo', 'sc', 'nm', 'me', 'nh', 'vt', 'ri', 'de', 'hi', 'mt', 'wy', 'nd', 'sd', 'wv', 'ar', 'la', 'ms', 'mi'];
      let found = false;
      for (const st of states) {
        if (nextjsUrls.has(`dumpster-rental-${citySlug}-${st}`)) {
          matched.push(url);
          found = true;
          break;
        }
      }
      if (!found) {
        missing.push(url);
        missingByType.cities.push(url);
      }
      continue;
    }

    missing.push(url);

    // Categorize
    if (url.includes('neighborhood') || url.includes('downtown-') || url.match(/-milwaukee$|-jacksonville$/)) {
      missingByType.neighborhoods.push(url);
    } else if (url.includes('yard-dumpster') || url === 'dumpster-sizes') {
      missingByType.sizes.push(url);
    } else if (url.includes('dumpster-rental-') && !url.includes('-')) {
      // State pages like dumpster-rental-california
      missingByType.states.push(url);
    } else if (url.includes('blog/') || url.match(/^[a-z-]+-guide$/) || url.match(/^how-to-/) || url.match(/^best-/)) {
      missingByType.blogs.push(url);
    } else if (url.includes('dumpsters') || url.includes('services') || url === 'roll-off-dumpster-rental') {
      missingByType.services.push(url);
    } else {
      missingByType.other.push(url);
    }
  }

  console.log('=== SUMMARY ===');
  console.log(`Matched: ${matched.length}`);
  console.log(`Missing: ${missing.length}\n`);

  console.log('=== MISSING BY CATEGORY ===');
  console.log(`Cities: ${missingByType.cities.length}`);
  console.log(`States: ${missingByType.states.length}`);
  console.log(`Neighborhoods: ${missingByType.neighborhoods.length}`);
  console.log(`Blogs/Content: ${missingByType.blogs.length}`);
  console.log(`Size Pages: ${missingByType.sizes.length}`);
  console.log(`Services: ${missingByType.services.length}`);
  console.log(`Other: ${missingByType.other.length}\n`);

  // Show details
  if (missingByType.cities.length > 0) {
    console.log('=== MISSING CITIES (sample) ===');
    missingByType.cities.slice(0, 20).forEach(u => console.log(`  ${u}`));
    if (missingByType.cities.length > 20) console.log(`  ... and ${missingByType.cities.length - 20} more`);
    console.log('');
  }

  if (missingByType.neighborhoods.length > 0) {
    console.log('=== MISSING NEIGHBORHOODS ===');
    missingByType.neighborhoods.forEach(u => console.log(`  ${u}`));
    console.log('');
  }

  if (missingByType.sizes.length > 0) {
    console.log('=== MISSING SIZE PAGES ===');
    missingByType.sizes.forEach(u => console.log(`  ${u}`));
    console.log('');
  }

  if (missingByType.services.length > 0) {
    console.log('=== MISSING SERVICE PAGES ===');
    missingByType.services.forEach(u => console.log(`  ${u}`));
    console.log('');
  }

  if (missingByType.other.length > 0) {
    console.log('=== OTHER MISSING PAGES ===');
    missingByType.other.forEach(u => console.log(`  ${u}`));
    console.log('');
  }

  // Save full missing list
  const outputPath = path.join(__dirname, '..', 'missing-urls.txt');
  fs.writeFileSync(outputPath, missing.join('\n'));
  console.log(`Full missing URL list saved to ${outputPath}`);
}

compareSitemap()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
