/**
 * Update phone numbers for GBP cities
 * Run with: npx tsx prisma/update-gbp-phone.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GBP cities with their phone numbers
const GBP_PHONES: Record<string, string> = {
  'long-beach-ca': '(562) 312-2260',
  // Add more GBP cities here as provided
};

async function main() {
  console.log('\n📞 Updating GBP Phone Numbers\n');

  for (const [slug, phone] of Object.entries(GBP_PHONES)) {
    try {
      const result = await prisma.city.update({
        where: { slug },
        data: { phone },
      });
      console.log(`✅ ${result.name}: ${phone}`);
    } catch (error) {
      console.error(`❌ Failed to update ${slug}:`, error);
    }
  }

  await prisma.$disconnect();
  console.log('\n✅ Done!');
}

main().catch(console.error);
