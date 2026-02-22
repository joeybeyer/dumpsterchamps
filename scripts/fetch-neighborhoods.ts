import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const neighborhoods = await prisma.neighborhoodPage.findMany({
    include: { city: { include: { state: true } } },
    orderBy: { name: 'asc' },
  });

  for (const n of neighborhoods) {
    console.log(`---ID: ${n.id}`);
    console.log(`NAME: ${n.name}`);
    console.log(`CITY: ${n.city?.name}, ${n.city?.state?.name}`);
    console.log(`SLUG: ${n.slug}`);
    console.log(`META_TITLE: ${n.metaTitle}`);
    console.log(`META_DESC: ${n.metaDesc}`);
    console.log(`CONTENT_START`);
    console.log(n.content);
    console.log(`CONTENT_END`);
    console.log('');
  }

  await prisma.$disconnect();
}

main();
