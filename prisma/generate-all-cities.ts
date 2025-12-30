/**
 * Generate AI content for ALL cities that don't have content yet
 * Run with: npx tsx prisma/generate-all-cities.ts
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { generateCityContent } from '../src/lib/ai/generators/city-content';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('\n🚀 Generating AI Content for All Remaining Cities\n');
  console.log('━'.repeat(60));

  // Get all cities without AI content
  const citiesNeedingContent = await prisma.city.findMany({
    where: {
      aiGeneratedAt: null,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      state: { select: { abbr: true } },
    },
    orderBy: [
      { population: 'desc' },
      { name: 'asc' },
    ],
  });

  console.log(`\nFound ${citiesNeedingContent.length} cities needing AI content.\n`);

  if (citiesNeedingContent.length === 0) {
    console.log('All cities already have AI content!');
    return;
  }

  let completed = 0;
  let failed = 0;
  const total = citiesNeedingContent.length;
  const startTime = Date.now();

  for (const city of citiesNeedingContent) {
    try {
      console.log(`\n[${completed + 1}/${total}] ${city.name}, ${city.state.abbr}...`);

      await generateCityContent(city.id);
      completed++;

      // Calculate ETA
      const elapsed = (Date.now() - startTime) / 1000;
      const avgTime = elapsed / completed;
      const remaining = total - completed;
      const etaMinutes = Math.round((remaining * avgTime) / 60);

      console.log(`✅ Progress: ${completed}/${total} | ETA: ~${etaMinutes} min`);

      // Small delay to avoid rate limiting
      if (completed < total) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    } catch (error) {
      failed++;
      console.error(`❌ Failed: ${city.name}, ${city.state.abbr}`, error);
      // Continue with next city
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log(`\n✅ Generation complete!`);
  console.log(`   Completed: ${completed}/${total}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total time: ${Math.round((Date.now() - startTime) / 1000 / 60)} minutes`);

  await prisma.$disconnect();
}

main().catch(console.error);
