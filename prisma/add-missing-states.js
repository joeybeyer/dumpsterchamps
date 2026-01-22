const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const missingStates = [
    { name: 'Alaska', slug: 'alaska', abbr: 'AK' },
    { name: 'Utah', slug: 'utah', abbr: 'UT' },
    { name: 'Vermont', slug: 'vermont', abbr: 'VT' },
    { name: 'West Virginia', slug: 'west-virginia', abbr: 'WV' },
    { name: 'Wyoming', slug: 'wyoming', abbr: 'WY' },
  ];

  for (const state of missingStates) {
    const created = await prisma.state.create({
      data: {
        name: state.name,
        slug: state.slug,
        abbr: state.abbr,
        metaTitle: `Dumpster Rental ${state.name} | Roll-Off Container Services`,
        metaDesc: `Find affordable dumpster rental services throughout ${state.name}. 10-40 yard roll-off containers for residential and commercial projects. Same-day delivery available.`,
      }
    });
    console.log('Created:', created.name);
  }

  console.log('\nAll 50 states now in database!');
  await prisma.$disconnect();
}

main();
