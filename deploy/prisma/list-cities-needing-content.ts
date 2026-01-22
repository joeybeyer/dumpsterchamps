import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cities = await prisma.city.findMany({
    where: { aiGeneratedAt: null },
    include: { state: true },
    orderBy: { name: 'asc' }
  });

  console.log(`Cities needing AI content (${cities.length}):\n`);
  cities.forEach((c, i) => {
    console.log(`${i+1}. ${c.name}, ${c.state.abbr} (${c.slug})`);
  });
}

main().finally(() => prisma.$disconnect());
