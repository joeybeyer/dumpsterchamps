/**
 * Regenerate AI content with internal linking for specified cities
 * This will only regenerate the description (preserves FAQs/neighborhoods)
 */

import { PrismaClient } from '@prisma/client';
import { regenerateCityDescription } from '../src/lib/ai/generators/city-content';

const prisma = new PrismaClient();

// Cities to regenerate with internal linking
// These 26 cities have AI content but are missing internal links
const CITIES_TO_REGENERATE = [
  'bakersfield-ca',
  'charlotte-nc',
  'el-paso-tx',
  'fairfield-ct',
  'fontana-ca',
  'fort-worth-tx',
  'fresno-ca',
  'hartford-ct',
  'jacksonville-fl',
  'knoxville-tn',
  'long-beach-ca',
  'louisville-ky',
  'memphis-tn',
  'milwaukee-wi',
  'newark-nj',
  'north-hollywood-ca',
  'oakland-ca',
  'omaha-ne',
  'orlando-fl',
  'richmond-ca',
  'riverside-ca',
  'san-francisco-ca',
  'stockton-ca',
  'tampa-fl',
  'tulsa-ok',
  'west-sacramento-ca',
];

async function main() {
  console.log('\n🔄 Regenerating City Descriptions with Internal Links\n');
  console.log('━'.repeat(50));
  console.log('\nThis will add contextual anchor text linking to:');
  console.log('  - /roll-off-dumpster-rental');
  console.log('  - /construction-dumpsters');
  console.log('  - /residential-dumpsters\n');

  let completed = 0;
  const total = CITIES_TO_REGENERATE.length;

  for (const slug of CITIES_TO_REGENERATE) {
    const city = await prisma.city.findUnique({
      where: { slug },
      select: { id: true, name: true },
    });

    if (!city) {
      console.log(`⚠️  ${slug} - Not found in database`);
      continue;
    }

    try {
      await regenerateCityDescription(city.id);
      completed++;
      console.log(`Progress: ${completed}/${total}\n`);
    } catch (error) {
      console.error(`❌ Error with ${city.name}:`, error);
    }
  }

  console.log('\n' + '━'.repeat(50));
  console.log(`\n✅ Regeneration complete! Updated ${completed}/${total} cities`);
  await prisma.$disconnect();
}

main().catch(console.error);
