/**
 * Generate AI content for the 11 newly added cities
 */

import { PrismaClient } from '@prisma/client';
import { generateCityContent } from '../src/lib/ai/generators/city-content';

const prisma = new PrismaClient();

// The 11 cities we just added to the database
const NEW_CITY_SLUGS = [
  'north-hollywood-ca',
  'west-sacramento-ca',
  'richmond-ca',
  'fairfield-ct',
  'fontana-ca',
  'charlotte-nc',
  'tampa-fl',
  'jacksonville-fl',
  'orlando-fl',
  'louisville-ky',
  'tulsa-ok',
];

async function main() {
  console.log('\n🤖 Generating AI Content for 11 Newly Added Cities\n');
  console.log('━'.repeat(50));

  const citiesToGenerate: { id: string; name: string; slug: string }[] = [];

  for (const slug of NEW_CITY_SLUGS) {
    const city = await prisma.city.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        aiGeneratedAt: true,
      },
    });

    if (city && !city.aiGeneratedAt) {
      citiesToGenerate.push({ id: city.id, name: city.name, slug: city.slug });
    } else if (city?.aiGeneratedAt) {
      console.log(`⏭️  ${city.name} - Already has content`);
    } else {
      console.log(`⚠️  ${slug} - Not found in database`);
    }
  }

  console.log(`\nFound ${citiesToGenerate.length} cities needing content generation.\n`);

  if (citiesToGenerate.length === 0) {
    console.log('All cities already have content!');
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
