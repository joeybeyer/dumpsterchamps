import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CityContent {
  slug: string;
  aiDescription: string;
  faqs?: Array<{ question: string; answer: string; category: string }>;
}

async function saveCityContent(content: CityContent) {
  const city = await prisma.city.findUnique({
    where: { slug: content.slug },
  });

  if (!city) {
    console.log(`City not found: ${content.slug}`);
    return;
  }

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

  console.log(`Saved content for ${content.slug}`);
}

async function saveBatchContent(contents: CityContent[]) {
  for (const content of contents) {
    await saveCityContent(content);
  }
  console.log(`\nSaved ${contents.length} cities`);
}

// Export for use
export { saveCityContent, saveBatchContent };
export type { CityContent };

// If run directly with JSON arg
const args = process.argv.slice(2);
if (args[0] === '--json') {
  const jsonPath = args[1];
  if (jsonPath) {
    import('fs').then(fs => {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      saveBatchContent(data)
        .then(() => console.log('Done'))
        .finally(() => prisma.$disconnect());
    });
  }
}
