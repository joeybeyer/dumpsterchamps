import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const problemCities = [
    'new-york-city-ny',
    'charlotte-nc',
    'milwaukee-wi',
    'columbus-oh',
    'los-angeles-ca',
    'phoenix-az',
    'dallas-tx',
    'houston-tx',
    'buffalo-ny',
    'bakersfield-ca',
    'hartford-ct',
  ];

  const cities = await prisma.city.findMany({
    where: { slug: { in: problemCities } },
    select: {
      name: true,
      slug: true,
      metaTitle: true,
      metaDesc: true,
      state: { select: { abbr: true, name: true } }
    }
  });

  console.log('=== CURRENT META TITLES/DESCRIPTIONS ===\n');

  for (const city of cities) {
    console.log(`--- ${city.name}, ${city.state.abbr} ---`);
    console.log(`Slug: ${city.slug}`);
    console.log(`Title: ${city.metaTitle || '[NOT SET - using default]'}`);
    console.log(`Desc: ${city.metaDesc ? city.metaDesc.substring(0, 120) + '...' : '[NOT SET - using default]'}`);
    console.log('');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
