import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Search for buffalo and new york
  const cities = await prisma.city.findMany({
    where: {
      OR: [
        { name: { contains: 'Buffalo' } },
        { name: { contains: 'New York' } },
        { slug: { contains: 'buffalo' } },
        { slug: { contains: 'new-york' } }
      ]
    },
    select: { name: true, slug: true, metaTitle: true, state: { select: { abbr: true } } }
  });
  console.log('Found cities:');
  cities.forEach(c => console.log(`${c.slug} - ${c.name}, ${c.state.abbr} | Title: ${c.metaTitle || '[NOT SET]'}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
