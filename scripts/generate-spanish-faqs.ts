/**
 * Generates Spanish translations for all CityFAQ records missing questionEs/answerEs
 * Batches all FAQs for a city into a single API call (efficient)
 *
 * Usage: npx tsx --env-file=.env scripts/generate-spanish-faqs.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const MODEL = 'anthropic/claude-haiku-4-5';
const DELAY_MS = 1500;

interface FaqTranslation {
  id: string;
  questionEs: string;
  answerEs: string;
}

async function translateCityFaqs(
  cityName: string,
  stateAbbr: string,
  faqs: { id: string; question: string; answer: string }[]
): Promise<FaqTranslation[]> {
  const faqList = faqs
    .map((f, i) => `FAQ_${i + 1} (id: ${f.id}):\nQ: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  const prompt = `Translate these dumpster rental FAQs to Spanish for ${cityName}, ${stateAbbr}. Keep company name "Dumpster Champs" as-is. Keep dollar amounts, measurements as-is.

${faqList}

Return ONLY valid JSON array with exactly ${faqs.length} objects, one per FAQ:
[
  { "id": "FAQ_ID_HERE", "questionEs": "Spanish question", "answerEs": "Spanish answer" },
  ...
]
Use the exact id values provided in parentheses above.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://dumpsterchamps.com',
      'X-Title': 'Dumpster Champs FAQ Translator',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: Math.max(2000, faqs.length * 200),
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${err}`);
  }

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content || '';

  // Strip markdown fences
  content = content.trim();
  if (content.startsWith('```json')) content = content.slice(7);
  else if (content.startsWith('```')) content = content.slice(3);
  if (content.endsWith('```')) content = content.slice(0, -3);
  content = content.trim();

  const parsed = JSON.parse(content) as FaqTranslation[];

  if (!Array.isArray(parsed) || parsed.length !== faqs.length) {
    throw new Error(`Expected ${faqs.length} FAQ translations, got ${Array.isArray(parsed) ? parsed.length : 'non-array'}`);
  }

  if (data.usage) {
    console.log(`    [tokens: ${data.usage.total_tokens}]`);
  }

  return parsed;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('🇪🇸 Spanish FAQ Translator');
  console.log(`Model: ${MODEL}\n`);

  // Fetch all cities that have FAQs without Spanish translations
  const cities = await prisma.city.findMany({
    where: {
      faqs: {
        some: { questionEs: null },
      },
    },
    include: {
      state: { select: { abbr: true } },
      faqs: {
        where: { questionEs: null },
        select: { id: true, question: true, answer: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });

  const totalCities = cities.length;
  const totalFaqs = cities.reduce((sum, c) => sum + c.faqs.length, 0);
  console.log(`Found ${totalCities} cities with untranslated FAQs (${totalFaqs} total)\n`);

  if (totalCities === 0) {
    console.log('✅ All FAQs already have Spanish translations!');
    await prisma.$disconnect();
    return;
  }

  let successCities = 0;
  let errorCities = 0;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const num = `[${i + 1}/${totalCities}]`;
    console.log(`${num} ${city.name}, ${city.state.abbr} (${city.faqs.length} FAQs)...`);

    try {
      const translations = await translateCityFaqs(
        city.name,
        city.state.abbr,
        city.faqs
      );

      // Verify all IDs match before writing
      const translationMap = new Map(translations.map((t) => [t.id, t]));

      // Update each FAQ
      await Promise.all(
        city.faqs.map((faq) => {
          const t = translationMap.get(faq.id);
          if (!t) {
            console.warn(`    ⚠️ No translation for FAQ ${faq.id}`);
            return Promise.resolve();
          }
          return prisma.cityFAQ.update({
            where: { id: faq.id },
            data: { questionEs: t.questionEs, answerEs: t.answerEs },
          });
        })
      );

      console.log(`    ✅ Updated ${city.faqs.length} FAQs`);
      successCities++;
    } catch (err) {
      console.error(`    ❌ Error: ${err instanceof Error ? err.message : err}`);
      errorCities++;
    }

    if (i < cities.length - 1) {
      await sleep(DELAY_MS);
    }

    // Extra pause every 10 cities
    if ((i + 1) % 10 === 0 && i < cities.length - 1) {
      console.log(`\n⏸  Pausing 5s after ${i + 1} cities...\n`);
      await sleep(5000);
    }
  }

  console.log(`\n=============================`);
  console.log(`✅ Cities done: ${successCities}`);
  console.log(`❌ Errors:      ${errorCities}`);
  console.log(`=============================`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  prisma.$disconnect();
  process.exit(1);
});
