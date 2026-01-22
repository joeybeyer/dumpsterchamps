import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateStateMetaTags() {
  console.log('Fetching all states...\n');

  const states = await prisma.state.findMany({
    include: {
      _count: { select: { cities: true } }
    }
  });

  console.log(`Found ${states.length} states to update\n`);

  let updated = 0;

  for (const state of states) {
    const cityCount = state._count.cities;

    // Optimized title with price and CTA
    const newTitle = `${state.name} Dumpster Rental | $495+ | ${cityCount}+ Cities Served`;

    // Optimized description
    const newDesc = `Rent a dumpster anywhere in ${state.name} starting at $495. Same-day delivery available in ${cityCount}+ cities. 10-40 yard roll-offs with no hidden fees. Call (888) 860-0710.`;

    // Truncate if needed
    const finalTitle = newTitle.length > 60 ? newTitle.substring(0, 57) + '...' : newTitle;
    const finalDesc = newDesc.length > 160 ? newDesc.substring(0, 157) + '...' : newDesc;

    await prisma.state.update({
      where: { id: state.id },
      data: {
        metaTitle: finalTitle,
        metaDesc: finalDesc,
      }
    });
    updated++;
  }

  console.log(`Updated ${updated} states\n`);

  // Show samples
  console.log('=== SAMPLE UPDATES ===\n');

  const samples = await prisma.state.findMany({
    where: {
      slug: { in: ['california', 'texas', 'florida', 'new-york', 'ohio'] }
    },
    select: {
      name: true,
      metaTitle: true,
      metaDesc: true,
    }
  });

  for (const sample of samples) {
    console.log(`--- ${sample.name} ---`);
    console.log(`Title (${sample.metaTitle?.length || 0} chars): ${sample.metaTitle}`);
    console.log(`Desc (${sample.metaDesc?.length || 0} chars): ${sample.metaDesc}`);
    console.log('');
  }
}

updateStateMetaTags()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
