import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface CityContent {
  slug: string;
  aiDescription: string;
  faqs?: Array<{ question: string; answer: string; category: string }>;
}

async function importBatch(batchFile: string) {
  const filePath = path.join(__dirname, batchFile);
  const contents: CityContent[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  console.log(`Importing ${contents.length} cities from ${batchFile}...\n`);

  let imported = 0;
  let errors: string[] = [];

  for (const content of contents) {
    const city = await prisma.city.findUnique({
      where: { slug: content.slug },
    });

    if (!city) {
      errors.push(`City not found: ${content.slug}`);
      continue;
    }

    try {
      // Update city with AI content
      await prisma.city.update({
        where: { id: city.id },
        data: {
          aiDescription: content.aiDescription,
          aiGeneratedAt: new Date(),
        },
      });

      // Add FAQs if provided
      if (content.faqs && content.faqs.length > 0) {
        // Delete existing FAQs first
        await prisma.cityFAQ.deleteMany({
          where: { cityId: city.id },
        });

        // Insert new FAQs
        await prisma.cityFAQ.createMany({
          data: content.faqs.map((faq, index) => ({
            cityId: city.id,
            question: faq.question,
            answer: faq.answer,
            sortOrder: index,
          })),
        });
      }

      imported++;
      console.log(`✓ ${content.slug} (${content.faqs?.length || 0} FAQs)`);
    } catch (err) {
      errors.push(`Error importing ${content.slug}: ${err}`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Imported: ${imported} cities`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`  ${e}`));
  }
}

// Get batch file from command line
const batchFile = process.argv[2] || 'batch-content-1.json';
importBatch(batchFile)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
