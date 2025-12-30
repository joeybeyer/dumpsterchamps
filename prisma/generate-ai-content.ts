/**
 * AI Content Generation Script
 * Generates BERT-optimized content for city pages, neighborhoods, and blogs
 *
 * Usage:
 *   npx tsx prisma/generate-ai-content.ts [command] [options]
 *
 * Commands:
 *   cities     - Generate city descriptions and FAQs
 *   neighborhoods - Generate neighborhood spoke pages
 *   blogs      - Generate blog posts with Ferris Wheel linking
 *   all        - Generate all content types
 *   status     - Show generation status
 *
 * Options:
 *   --city <slug>  - Generate for specific city only
 *   --limit <n>    - Limit number of cities to process
 *   --priority     - Only process priority cities
 */

import { PrismaClient } from '@prisma/client';
import {
  generateCityContent,
  generateContentForPriorityCities,
  getCitiesNeedingContent,
} from '../src/lib/ai/generators/city-content';
import {
  generateNeighborhoodPagesForCity,
  generateNeighborhoodPagesForPriorityCities,
} from '../src/lib/ai/generators/neighborhood-content';
import {
  generateBlogPostsForCity,
  generateBlogPostsForPriorityCities,
  getBlogStats,
} from '../src/lib/ai/generators/blog-content';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'status';

  // Parse options
  const citySlug = args.includes('--city') ? args[args.indexOf('--city') + 1] : null;
  const limit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) : undefined;
  const priorityOnly = args.includes('--priority');

  console.log('\n🤖 Dumpster Champs AI Content Generator\n');
  console.log('━'.repeat(50));

  switch (command) {
    case 'cities':
      await generateCities(citySlug, limit, priorityOnly);
      break;

    case 'neighborhoods':
      await generateNeighborhoods(citySlug, priorityOnly);
      break;

    case 'blogs':
      await generateBlogs(citySlug, priorityOnly);
      break;

    case 'all':
      await generateAll(priorityOnly);
      break;

    case 'status':
      await showStatus();
      break;

    default:
      console.log('Unknown command. Available commands:');
      console.log('  cities        - Generate city content');
      console.log('  neighborhoods - Generate neighborhood pages');
      console.log('  blogs         - Generate blog posts');
      console.log('  all           - Generate all content');
      console.log('  status        - Show generation status');
      console.log('\nOptions:');
      console.log('  --city <slug> - Process specific city');
      console.log('  --limit <n>   - Limit cities to process');
      console.log('  --priority    - Only priority cities');
  }
}

async function generateCities(citySlug: string | null, limit?: number, priorityOnly?: boolean) {
  console.log('\n📍 Generating City Content\n');

  if (citySlug) {
    // Single city
    const city = await prisma.city.findUnique({
      where: { slug: citySlug },
    });

    if (!city) {
      console.log(`City not found: ${citySlug}`);
      return;
    }

    await generateCityContent(city.id);
  } else if (priorityOnly) {
    // Priority cities only
    await generateContentForPriorityCities();
  } else {
    // All cities needing content
    const cities = await getCitiesNeedingContent(limit);
    console.log(`Found ${cities.length} cities needing content generation.\n`);

    for (const city of cities) {
      try {
        await generateCityContent(city.id);
      } catch (error) {
        console.error(`Error with ${city.name}:`, error);
      }
    }
  }
}

async function generateNeighborhoods(citySlug: string | null, priorityOnly?: boolean) {
  console.log('\n🏘️ Generating Neighborhood Pages\n');

  if (citySlug) {
    const city = await prisma.city.findUnique({
      where: { slug: citySlug },
    });

    if (!city) {
      console.log(`City not found: ${citySlug}`);
      return;
    }

    await generateNeighborhoodPagesForCity(city.id);
  } else if (priorityOnly) {
    await generateNeighborhoodPagesForPriorityCities();
  } else {
    console.log('Use --priority or --city <slug> to specify which neighborhoods to generate.');
  }
}

async function generateBlogs(citySlug: string | null, priorityOnly?: boolean) {
  console.log('\n📝 Generating Blog Posts\n');

  if (citySlug) {
    const city = await prisma.city.findUnique({
      where: { slug: citySlug },
    });

    if (!city) {
      console.log(`City not found: ${citySlug}`);
      return;
    }

    await generateBlogPostsForCity(city.id);
  } else if (priorityOnly) {
    await generateBlogPostsForPriorityCities();
  } else {
    console.log('Use --priority or --city <slug> to specify which blogs to generate.');
  }
}

async function generateAll(priorityOnly?: boolean) {
  console.log('\n🚀 Generating ALL Content\n');

  if (!priorityOnly) {
    console.log('⚠️ Running without --priority will process ALL cities.');
    console.log('This may take a long time and cost significant API credits.');
    console.log('Add --priority to process only priority cities.\n');
    return;
  }

  console.log('Step 1/3: City Descriptions & FAQs');
  console.log('━'.repeat(40));
  await generateContentForPriorityCities();

  console.log('\nStep 2/3: Neighborhood Pages');
  console.log('━'.repeat(40));
  await generateNeighborhoodPagesForPriorityCities();

  console.log('\nStep 3/3: Blog Posts');
  console.log('━'.repeat(40));
  await generateBlogPostsForPriorityCities();

  console.log('\n✅ All content generation complete!');
}

async function showStatus() {
  console.log('\n📊 Content Generation Status\n');

  // City stats
  const totalCities = await prisma.city.count();
  const citiesWithAI = await prisma.city.count({
    where: { aiGeneratedAt: { not: null } },
  });
  const citiesWithNeighborhoods = await prisma.city.count({
    where: { neighborhoods: { some: {} } },
  });

  // Neighborhood page stats
  const totalNeighborhoodPages = await prisma.neighborhoodPage.count();

  // Blog stats
  const blogStats = await getBlogStats();

  console.log('Cities:');
  console.log(`  Total: ${totalCities}`);
  console.log(`  With AI content: ${citiesWithAI} (${Math.round(citiesWithAI / totalCities * 100)}%)`);
  console.log(`  With neighborhoods: ${citiesWithNeighborhoods}`);

  console.log('\nNeighborhood Pages:');
  console.log(`  Total: ${totalNeighborhoodPages}`);

  console.log('\nBlog Posts:');
  console.log(`  Total: ${blogStats.totalBlogs}`);
  console.log(`  AI Generated: ${blogStats.aiGeneratedBlogs}`);
  console.log(`  Cities with blogs: ${blogStats.citiesWithBlogs}`);

  // Priority cities status
  console.log('\nPriority Cities Status:');
  const prioritySlugs = [
    'los-angeles-ca',
    'houston-tx',
    'phoenix-az',
    'dallas-tx',
    'las-vegas-nv',
    'san-diego-ca',
    'san-antonio-tx',
    'austin-tx',
    'jacksonville-fl',
    'north-hollywood-ca',
  ];

  const priorityCities = await prisma.city.findMany({
    where: { slug: { in: prioritySlugs } },
    include: {
      _count: {
        select: {
          neighborhoods: true,
          neighborhoodPages: true,
          blogs: true,
        },
      },
    },
  });

  for (const city of priorityCities) {
    const hasAI = city.aiGeneratedAt ? '✅' : '❌';
    console.log(`  ${hasAI} ${city.name}: ${city._count.neighborhoods} neighborhoods, ${city._count.neighborhoodPages} pages, ${city._count.blogs} blogs`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
