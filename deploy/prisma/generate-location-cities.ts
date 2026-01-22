/**
 * Generate AI content for business location cities
 */

import { PrismaClient } from '@prisma/client';
import { generateCityContent } from '../src/lib/ai/generators/city-content';

const prisma = new PrismaClient();

// Helper to create a city slug from location data
function createCitySlug(city: string, stateAbbr: string): string {
  return `${city.toLowerCase().replace(/\s+/g, '-')}-${stateAbbr.toLowerCase()}`;
}

async function main() {
  console.log('\n🤖 Generating AI Content for Business Location Cities\n');
  console.log('━'.repeat(50));

  // Get all business locations
  const locations = await prisma.businessLocation.findMany();

  const citiesToGenerate: { id: string; name: string; slug: string }[] = [];

  for (const loc of locations) {
    const citySlug = createCitySlug(loc.city, loc.stateAbbr);

    const city = await prisma.city.findUnique({
      where: { slug: citySlug },
      select: {
        id: true,
        name: true,
        slug: true,
        aiGeneratedAt: true,
      },
    });

    if (city && !city.aiGeneratedAt) {
      citiesToGenerate.push({ id: city.id, name: city.name, slug: city.slug });
    }
  }

  console.log(`\nFound ${citiesToGenerate.length} cities needing content generation.\n`);

  if (citiesToGenerate.length === 0) {
    console.log('All business location cities already have content!');
    await prisma.$disconnect();
    return;
  }

  console.log('🚀 Starting content generation...\n');

  let completed = 0;
  for (const city of citiesToGenerate) {
    try {
      await generateCityContent(city.id);
      completed++;
      console.log(`\nProgress: ${completed}/${citiesToGenerate.length} - Just completed: ${city.name}\n`);
    } catch (error) {
      console.error(`\n❌ Error generating content for ${city.name}:`, error);
    }
  }

  console.log('\n✅ Content generation complete!');
  console.log(`   Generated: ${completed}/${citiesToGenerate.length} cities`);

  await prisma.$disconnect();
}

main().catch(console.error);
