import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Cities: check which fields are populated
  const cities = await prisma.city.findMany({
    include: { state: true, faqs: true },
    orderBy: { name: 'asc' },
  });

  const citiesWithAi = cities.filter((c) => c.aiDescriptionEs);
  const citiesWithoutAi = cities.filter((c) => !c.aiDescriptionEs);
  const citiesWithDesc = cities.filter((c) => c.descriptionEs);
  const citiesWithMeta = cities.filter((c) => c.metaTitleEs);

  console.log(`\n=== CITIES ===`);
  console.log(`Total cities: ${cities.length}`);
  console.log(`With aiDescriptionEs: ${citiesWithAi.length}`);
  console.log(`Without aiDescriptionEs: ${citiesWithoutAi.length}`);
  console.log(`With descriptionEs: ${citiesWithDesc.length}`);
  console.log(`With metaTitleEs: ${citiesWithMeta.length}`);

  console.log(`\nCities WITHOUT aiDescriptionEs:`);
  for (const c of citiesWithoutAi) {
    console.log(`  - ${c.name}, ${c.state?.abbreviation} (${c.slug}) | hasAiEn: ${!!c.aiDescription}`);
  }

  // FAQs
  const faqs = await prisma.cityFAQ.findMany();
  const faqsWithEs = faqs.filter((f) => f.questionEs);
  console.log(`\n=== CITY FAQs ===`);
  console.log(`Total FAQs: ${faqs.length}`);
  console.log(`With Spanish: ${faqsWithEs.length}`);
  console.log(`Without Spanish: ${faqs.length - faqsWithEs.length}`);

  // Neighborhood pages
  const neighborhoods = await prisma.neighborhoodPage.findMany({
    include: { city: { include: { state: true } } },
    orderBy: { name: 'asc' },
  });
  const nbWithEs = neighborhoods.filter((n) => n.contentEs);
  const nbWithMeta = neighborhoods.filter((n) => n.metaTitleEs);

  console.log(`\n=== NEIGHBORHOOD PAGES ===`);
  console.log(`Total: ${neighborhoods.length}`);
  console.log(`With contentEs: ${nbWithEs.length}`);
  console.log(`With metaTitleEs: ${nbWithMeta.length}`);
  console.log(`\nFirst 20 without contentEs:`);
  const nbWithoutEs = neighborhoods.filter((n) => !n.contentEs).slice(0, 20);
  for (const n of nbWithoutEs) {
    console.log(`  - ${n.name} (${n.city?.name}, ${n.city?.state?.abbreviation}) slug: ${n.slug}`);
  }

  await prisma.$disconnect();
}

main();
