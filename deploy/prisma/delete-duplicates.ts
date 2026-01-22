/**
 * Delete duplicate city entries
 * Run with: npx tsx prisma/delete-duplicates.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Duplicate slugs to delete (keep the ones without -fl suffix)
const DUPLICATES_TO_DELETE = [
  'miami-fl',
  'jacksonville-fl',
  'orlando-fl',
];

async function main() {
  console.log('\n🗑️  Deleting Duplicate Cities\n');

  for (const slug of DUPLICATES_TO_DELETE) {
    try {
      // First delete any neighborhoods associated with this city
      const city = await prisma.city.findUnique({
        where: { slug },
        include: { neighborhoods: true }
      });

      if (city) {
        if (city.neighborhoods.length > 0) {
          await prisma.neighborhood.deleteMany({
            where: { cityId: city.id }
          });
          console.log(`  Deleted ${city.neighborhoods.length} neighborhoods for ${slug}`);
        }

        await prisma.city.delete({
          where: { slug }
        });
        console.log(`✅ Deleted: ${slug}`);
      } else {
        console.log(`⚠️  Not found: ${slug}`);
      }
    } catch (error) {
      console.error(`❌ Error deleting ${slug}:`, error);
    }
  }

  await prisma.$disconnect();
  console.log('\n✅ Done!');
}

main().catch(console.error);
