/**
 * Check which cities have Google Business Profile (GBP) listings
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Get all cities from database
  const cities = await prisma.city.findMany({
    select: {
      slug: true,
      name: true,
      state: { select: { abbr: true } },
      aiDescription: true,
      aiGeneratedAt: true,
    },
    orderBy: { name: 'asc' },
  });

  console.log('\n=== All Cities in Database ===\n');
  console.log(`Total cities: ${cities.length}\n`);

  // Check which have AI content
  const withContent = cities.filter(c => c.aiDescription);
  const withoutContent = cities.filter(c => !c.aiDescription);

  console.log(`Cities WITH AI content: ${withContent.length}`);
  withContent.forEach(c => {
    const hasLinks = c.aiDescription?.includes('](/');
    console.log(`  ✓ ${c.name}, ${c.state.abbr} (${c.slug}) ${hasLinks ? '🔗 has links' : '❌ no links'}`);
  });

  console.log(`\nCities WITHOUT AI content: ${withoutContent.length}`);
  withoutContent.forEach(c => {
    console.log(`  ✗ ${c.name}, ${c.state.abbr} (${c.slug})`);
  });

  // Output slugs for regeneration script
  console.log('\n=== Slugs for Regeneration ===\n');
  const slugs = cities.map(c => `'${c.slug}'`).join(',\n  ');
  console.log(`[\n  ${slugs}\n]`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
