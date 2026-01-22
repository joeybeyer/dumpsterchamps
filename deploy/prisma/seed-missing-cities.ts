/**
 * Add missing cities from business locations to the database
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Cities that have business locations but are not in the City database
const MISSING_CITIES = [
  {
    name: 'North Hollywood',
    slug: 'north-hollywood-ca',
    stateAbbr: 'CA',
    stateName: 'California',
    latitude: 34.1942088,
    longitude: -118.4110618,
    population: '100000',
    county: 'Los Angeles County',
  },
  {
    name: 'West Sacramento',
    slug: 'west-sacramento-ca',
    stateAbbr: 'CA',
    stateName: 'California',
    latitude: 38.540222,
    longitude: -121.557627,
    population: '55000',
    county: 'Yolo County',
  },
  {
    name: 'Richmond',
    slug: 'richmond-ca',
    stateAbbr: 'CA',
    stateName: 'California',
    latitude: 37.9181489,
    longitude: -122.3572059,
    population: '116000',
    county: 'Contra Costa County',
  },
  {
    name: 'Fairfield',
    slug: 'fairfield-ct',
    stateAbbr: 'CT',
    stateName: 'Connecticut',
    latitude: 41.184755,
    longitude: -73.198970,
    population: '62000',
    county: 'Fairfield County',
  },
  {
    name: 'Fontana',
    slug: 'fontana-ca',
    stateAbbr: 'CA',
    stateName: 'California',
    latitude: 34.0799946,
    longitude: -117.4550195,
    population: '220000',
    county: 'San Bernardino County',
  },
  {
    name: 'Charlotte',
    slug: 'charlotte-nc',
    stateAbbr: 'NC',
    stateName: 'North Carolina',
    latitude: 35.2271,
    longitude: -80.8431,
    population: '900000',
    county: 'Mecklenburg County',
  },
  {
    name: 'Tampa',
    slug: 'tampa-fl',
    stateAbbr: 'FL',
    stateName: 'Florida',
    latitude: 27.9506,
    longitude: -82.4572,
    population: '400000',
    county: 'Hillsborough County',
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville-fl',
    stateAbbr: 'FL',
    stateName: 'Florida',
    latitude: 30.3322,
    longitude: -81.6557,
    population: '950000',
    county: 'Duval County',
  },
  {
    name: 'Orlando',
    slug: 'orlando-fl',
    stateAbbr: 'FL',
    stateName: 'Florida',
    latitude: 28.5383,
    longitude: -81.3792,
    population: '310000',
    county: 'Orange County',
  },
  {
    name: 'Louisville',
    slug: 'louisville-ky',
    stateAbbr: 'KY',
    stateName: 'Kentucky',
    latitude: 38.2527,
    longitude: -85.7585,
    population: '630000',
    county: 'Jefferson County',
  },
  {
    name: 'Tulsa',
    slug: 'tulsa-ok',
    stateAbbr: 'OK',
    stateName: 'Oklahoma',
    latitude: 36.1539,
    longitude: -95.9928,
    population: '410000',
    county: 'Tulsa County',
  },
];

async function main() {
  console.log('\n🏙️ Adding Missing Cities to Database\n');
  console.log('━'.repeat(50));

  for (const cityData of MISSING_CITIES) {
    // Find or create the state by slug
    const stateSlug = cityData.stateName.toLowerCase().replace(/\s+/g, '-');
    let state = await prisma.state.findUnique({
      where: { slug: stateSlug },
    });

    if (!state) {
      console.log(`  Creating state: ${cityData.stateName} (${cityData.stateAbbr})`);
      state = await prisma.state.create({
        data: {
          name: cityData.stateName,
          slug: stateSlug,
          abbr: cityData.stateAbbr,
        },
      });
    }

    // Check if city already exists
    const existing = await prisma.city.findUnique({
      where: { slug: cityData.slug },
    });

    if (existing) {
      console.log(`⏭️  ${cityData.name}, ${cityData.stateAbbr} - Already exists`);
      continue;
    }

    // Create the city
    await prisma.city.create({
      data: {
        name: cityData.name,
        slug: cityData.slug,
        stateId: state.id,
        latitude: cityData.latitude,
        longitude: cityData.longitude,
        population: cityData.population,
        county: cityData.county,
      },
    });

    console.log(`✅ Created: ${cityData.name}, ${cityData.stateAbbr}`);
  }

  console.log('\n✅ All missing cities have been added!');

  await prisma.$disconnect();
}

main().catch(console.error);
