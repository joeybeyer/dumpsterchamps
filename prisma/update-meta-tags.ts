import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Title templates that rotate for variety (prevents duplicate title issues)
const TITLE_TEMPLATES = [
  (city: string, st: string) => `$495 Dumpster Rental in ${city}, ${st} | Same-Day Delivery`,
  (city: string, st: string) => `${city} Dumpster Rental - $495 & Up | Fast Delivery`,
  (city: string, st: string) => `Cheap Dumpster Rental ${city}, ${st} | 10-40 Yard From $495`,
  (city: string, st: string) => `Dumpster Rental ${city} | $495+ Same-Day Service`,
  (city: string, st: string) => `Rent a Dumpster in ${city}, ${st} | Starting at $495`,
];

// Description templates with variations
const DESC_TEMPLATES = [
  (city: string, st: string, neighborhoods: string[]) => {
    const areaText = neighborhoods.length > 0
      ? ` Serving ${neighborhoods.slice(0, 3).join(', ')} & more.`
      : '';
    return `Rent a 10-40 yard dumpster in ${city}, ${st} starting at $495. Same-day delivery, no hidden fees. Call (888) 860-0710 for instant pricing.${areaText}`;
  },
  (city: string, st: string, neighborhoods: string[]) => {
    const areaText = neighborhoods.length > 0
      ? ` Delivering to ${neighborhoods.slice(0, 2).join(', ')} & surrounding areas.`
      : '';
    return `Need a dumpster in ${city}? Get 10-40 yard roll-offs from $495 with same-day delivery. No hidden fees, driveway protection included.${areaText}`;
  },
  (city: string, st: string, neighborhoods: string[]) => {
    return `${city}, ${st} dumpster rental from $495. 10-40 yard containers with same-day delivery available. Call (888) 860-0710 - free quotes in minutes!`;
  },
];

async function updateMetaTags() {
  console.log('Fetching all cities...\n');

  const cities = await prisma.city.findMany({
    include: {
      state: true,
      neighborhoods: {
        take: 5,
        select: { name: true }
      }
    }
  });

  console.log(`Found ${cities.length} cities to update\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    // Rotate templates based on index for variety
    const titleTemplate = TITLE_TEMPLATES[i % TITLE_TEMPLATES.length];
    const descTemplate = DESC_TEMPLATES[i % DESC_TEMPLATES.length];

    const neighborhoodNames = city.neighborhoods.map(n => n.name);

    const newTitle = titleTemplate(city.name, city.state.abbr);
    const newDesc = descTemplate(city.name, city.state.abbr, neighborhoodNames);

    // Ensure title is under 60 chars and desc under 160 chars
    const finalTitle = newTitle.length > 60 ? newTitle.substring(0, 57) + '...' : newTitle;
    const finalDesc = newDesc.length > 160 ? newDesc.substring(0, 157) + '...' : newDesc;

    try {
      await prisma.city.update({
        where: { id: city.id },
        data: {
          metaTitle: finalTitle,
          metaDesc: finalDesc,
        }
      });
      updated++;

      if (updated % 50 === 0) {
        console.log(`Progress: ${updated}/${cities.length} cities updated`);
      }
    } catch (err) {
      console.error(`Error updating ${city.name}: ${err}`);
      errors++;
    }
  }

  console.log(`\n=== COMPLETE ===`);
  console.log(`Updated: ${updated} cities`);
  console.log(`Errors: ${errors}`);

  // Show some examples
  console.log('\n=== SAMPLE UPDATES ===\n');

  const samples = await prisma.city.findMany({
    where: {
      slug: {
        in: ['los-angeles-ca', 'new-york', 'phoenix-az', 'houston-tx', 'milwaukee-wi']
      }
    },
    select: {
      name: true,
      metaTitle: true,
      metaDesc: true,
      state: { select: { abbr: true } }
    }
  });

  for (const sample of samples) {
    console.log(`--- ${sample.name}, ${sample.state.abbr} ---`);
    console.log(`Title (${sample.metaTitle?.length || 0} chars): ${sample.metaTitle}`);
    console.log(`Desc (${sample.metaDesc?.length || 0} chars): ${sample.metaDesc}`);
    console.log('');
  }
}

updateMetaTags()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
