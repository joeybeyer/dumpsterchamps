import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const states = await prisma.state.findMany({
    include: { _count: { select: { cities: true } } },
    orderBy: { name: 'asc' }
  });

  console.log('State City Counts:');
  states.forEach(s => {
    console.log(`${s.name}: ${s._count.cities} cities`);
  });

  const total = await prisma.city.count();
  const withContent = await prisma.city.count({ where: { aiDescription: { not: null } } });
  console.log(`\nTotal: ${total} cities, ${withContent} with AI content`);

  await prisma.$disconnect();
}

main();
