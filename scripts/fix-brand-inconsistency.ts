// Fix "Dumpster Daddy" → "Dumpster Champs" across all city content
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixBrandInconsistency() {
  console.log('Searching for "Dumpster Daddy" references...');
  
  // Find all cities with Dumpster Daddy in content
  const cities = await prisma.city.findMany({
    where: {
      OR: [
        { content: { contains: 'Dumpster Daddy' } },
        { description: { contains: 'Dumpster Daddy' } },
        { whyChooseUs: { contains: 'Dumpster Daddy' } },
        { aiDescription: { contains: 'Dumpster Daddy' } },
      ]
    }
  });

  console.log(`Found ${cities.length} cities with brand inconsistency`);

  for (const city of cities) {
    console.log(`Fixing: ${city.name} (${city.slug})`);
    
    const updates: any = {};
    
    if (city.content?.includes('Dumpster Daddy')) {
      updates.content = city.content.replace(/Dumpster Daddy/g, 'Dumpster Champs');
    }
    if (city.description?.includes('Dumpster Daddy')) {
      updates.description = city.description.replace(/Dumpster Daddy/g, 'Dumpster Champs');
    }
    if (city.whyChooseUs?.includes('Dumpster Daddy')) {
      updates.whyChooseUs = city.whyChooseUs.replace(/Dumpster Daddy/g, 'Dumpster Champs');
    }
    if (city.aiDescription?.includes('Dumpster Daddy')) {
      updates.aiDescription = city.aiDescription.replace(/Dumpster Daddy/g, 'Dumpster Champs');
    }

    if (Object.keys(updates).length > 0) {
      await prisma.city.update({
        where: { id: city.id },
        data: updates
      });
      console.log(`  Updated: ${Object.keys(updates).join(', ')}`);
    }
  }

  console.log('Done! Brand inconsistency fixed.');
}

fixBrandInconsistency()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
