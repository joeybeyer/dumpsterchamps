/**
 * Setup phone numbers for all cities
 * - Default: (888) 860-0710 for cities without GBP listings
 * - GBP cities: Use their specific Google Business Profile phone number
 *
 * Run with: npx tsx prisma/setup-phone-numbers.ts
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Default phone number for cities without GBP
const DEFAULT_PHONE = '(888) 860-0710';

// Cities with Google Business Profile listings and their specific phone numbers
// Format: { citySlug: phoneNumber }
// TODO: Update this map when GBP listing data is provided
const GBP_CITIES: Record<string, string> = {
  // Example entries - replace with actual GBP data
  // 'los-angeles-ca': '(323) 555-1234',
  // 'houston-tx': '(713) 555-5678',
};

async function main() {
  console.log('\n📞 Setting Up Phone Numbers for All Cities\n');
  console.log('━'.repeat(50));

  // Get all cities
  const cities = await prisma.city.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      state: { select: { abbr: true } },
      phone: true,
    },
    orderBy: { name: 'asc' },
  });

  console.log(`\nTotal cities: ${cities.length}`);
  console.log(`GBP cities configured: ${Object.keys(GBP_CITIES).length}`);
  console.log(`Default phone: ${DEFAULT_PHONE}\n`);

  let updated = 0;
  let gbpCount = 0;
  let defaultCount = 0;

  for (const city of cities) {
    const isGBP = city.slug in GBP_CITIES;
    const phoneNumber = isGBP ? GBP_CITIES[city.slug] : DEFAULT_PHONE;

    // Only update if phone is different
    if (city.phone !== phoneNumber) {
      await prisma.city.update({
        where: { id: city.id },
        data: { phone: phoneNumber },
      });
      updated++;
      console.log(`✓ ${city.name}, ${city.state.abbr}: ${phoneNumber}${isGBP ? ' (GBP)' : ''}`);
    }

    if (isGBP) {
      gbpCount++;
    } else {
      defaultCount++;
    }
  }

  console.log('\n' + '━'.repeat(50));
  console.log(`\n✅ Phone number setup complete!`);
  console.log(`   Updated: ${updated} cities`);
  console.log(`   GBP listings: ${gbpCount}`);
  console.log(`   Default number: ${defaultCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
