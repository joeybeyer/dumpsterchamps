/**
 * Check which business location cities need AI content generation
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to create a city slug from location data
function createCitySlug(city: string, stateAbbr: string): string {
  return `${city.toLowerCase().replace(/\s+/g, '-')}-${stateAbbr.toLowerCase()}`;
}

async function main() {
  // Get all business locations
  const locations = await prisma.businessLocation.findMany();

  console.log('\n📍 Business Location Cities Status\n');
  console.log('━'.repeat(70));

  const needsContent: { name: string; slug: string; id: string }[] = [];
  const hasContent: { name: string; slug: string }[] = [];
  const notFound: { name: string; slug: string }[] = [];

  for (const loc of locations) {
    const citySlug = createCitySlug(loc.city, loc.stateAbbr);

    // Find matching city
    const city = await prisma.city.findUnique({
      where: { slug: citySlug },
      select: {
        id: true,
        name: true,
        slug: true,
        aiGeneratedAt: true,
        _count: {
          select: {
            neighborhoods: true,
            neighborhoodPages: true,
          },
        },
      },
    });

    if (city) {
      const status = city.aiGeneratedAt ? '✅' : '❌';
      const neighborhoods = city._count.neighborhoods;
      const pages = city._count.neighborhoodPages;

      console.log(`${status} ${city.name} (${city.slug})`);
      console.log(`   Neighborhoods: ${neighborhoods}, Pages: ${pages}`);

      if (!city.aiGeneratedAt) {
        needsContent.push({ name: city.name, slug: city.slug, id: city.id });
      } else {
        hasContent.push({ name: city.name, slug: city.slug });
      }
    } else {
      console.log(`⚠️  ${loc.city}, ${loc.stateAbbr} - No matching city (tried: ${citySlug})`);
      notFound.push({ name: `${loc.city}, ${loc.stateAbbr}`, slug: citySlug });
    }
  }

  console.log('\n' + '━'.repeat(70));
  console.log(`\nSummary:`);
  console.log(`  With AI content: ${hasContent.length}`);
  console.log(`  Needs content: ${needsContent.length}`);
  console.log(`  Not found in DB: ${notFound.length}`);

  if (needsContent.length > 0) {
    console.log(`\nCities needing content:`);
    needsContent.forEach(c => console.log(`  - ${c.name} (${c.slug})`));
  }

  if (notFound.length > 0) {
    console.log(`\nLocations without matching city:`);
    notFound.forEach(c => console.log(`  - ${c.name} (tried: ${c.slug})`));
  }

  await prisma.$disconnect();
}

main().catch(console.error);
