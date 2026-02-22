import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const ids = [
  'cmjqcxrc00042cfpgdl3dtl6t',
  'cmjqcxrda004kcfpg8h7u3tlo',
  'cmjqcxrkf0070cfpgq24lozpw',
  'cmjqfdxwh000dcf5oqlx3arbn',
  'cmjqfdxww000lcf5og0kj6r1x',
  'cmjqfdxvs0003cf5olduwaj4s',
];
async function main() {
  const cities = await prisma.city.findMany({ where: { id: { in: ids } }, include: { state: true } });
  for (const c of cities) {
    console.log('---ID:', c.id);
    console.log('NAME:', c.name, c.state?.name);
    console.log('SLUG:', c.slug);
    console.log('AI_START');
    console.log(c.aiDescription);
    console.log('AI_END');
    console.log('');
  }
  await prisma.$disconnect();
}
main();
