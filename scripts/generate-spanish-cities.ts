/**
 * Generates Spanish content for all cities missing aiDescriptionEs
 * Uses OpenRouter (Claude) to translate English aiDescription → Spanish
 * Processes cities in small batches with rate limiting
 *
 * Usage: npx tsx --env-file=.env scripts/generate-spanish-cities.ts
 * Optional: BATCH_SIZE=5 DELAY_MS=2000 npx tsx --env-file=.env scripts/generate-spanish-cities.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const MODEL = 'anthropic/claude-haiku-4-5'; // Fast + cheap for translation
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '5', 10);
const DELAY_MS = parseInt(process.env.DELAY_MS || '1500', 10);

interface SpanishCityContent {
  aiDescriptionEs: string;
  metaTitleEs: string;
  metaDescEs: string;
}

async function translateCityContent(
  cityName: string,
  stateName: string,
  stateAbbr: string,
  aiDescription: string,
  metaTitle: string | null,
  metaDesc: string | null
): Promise<SpanishCityContent> {
  const prompt = `You are a professional Spanish translator specializing in local business SEO content for Hispanic/Latino audiences in the United States.

Translate and adapt the following English content for a dumpster rental company serving ${cityName}, ${stateName} (${stateAbbr}).

ENGLISH CONTENT TO TRANSLATE:
---
${aiDescription}
---

ENGLISH META TITLE: ${metaTitle || `Dumpster Rental ${cityName}, ${stateAbbr} | Dumpster Champs`}
ENGLISH META DESC: ${metaDesc || `Affordable dumpster rental in ${cityName}, ${stateAbbr}. Same-day delivery available.`}

Return ONLY valid JSON with these exact keys:
{
  "aiDescriptionEs": "Full Spanish translation of the main content (keep markdown formatting, headings, tables)",
  "metaTitleEs": "Spanish meta title (50-60 chars max)",
  "metaDescEs": "Spanish meta description (150-160 chars max)"
}

Rules:
- Translate naturally for US Spanish speakers (Latin American Spanish preferred)
- Keep all markdown formatting (##, **, tables, etc.)
- Keep brand name "Dumpster Champs" as-is
- Keep dollar amounts and measurements as-is
- Keep city name in English (${cityName})
- SEO meta content should be compelling and include relevant Spanish keywords`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://dumpsterchamps.com',
      'X-Title': 'Dumpster Champs Spanish Generator',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${err}`);
  }

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content || '';

  // Strip markdown code fences if present
  content = content.trim();
  if (content.startsWith('```json')) content = content.slice(7);
  else if (content.startsWith('```')) content = content.slice(3);
  if (content.endsWith('```')) content = content.slice(0, -3);
  content = content.trim();

  const parsed = JSON.parse(content) as SpanishCityContent;

  if (!parsed.aiDescriptionEs || !parsed.metaTitleEs || !parsed.metaDescEs) {
    throw new Error('Incomplete JSON response from API');
  }

  // Log token usage
  if (data.usage) {
    console.log(
      `    [tokens: ${data.usage.total_tokens} in/out: ${data.usage.prompt_tokens}/${data.usage.completion_tokens}]`
    );
  }

  return parsed;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('🇪🇸 Spanish City Content Generator');
  console.log(`Model: ${MODEL}`);
  console.log(`Batch size: ${BATCH_SIZE}, Delay: ${DELAY_MS}ms\n`);

  // Fetch all cities that have English aiDescription but no Spanish yet
  const cities = await prisma.city.findMany({
    where: {
      aiDescription: { not: null },
      aiDescriptionEs: null,
    },
    include: { state: { select: { name: true, abbr: true } } },
    orderBy: { name: 'asc' },
  });

  console.log(`Found ${cities.length} cities needing Spanish content.\n`);

  if (cities.length === 0) {
    console.log('✅ All cities already have Spanish content!');
    await prisma.$disconnect();
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const num = `[${i + 1}/${cities.length}]`;

    console.log(`${num} Translating: ${city.name}, ${city.state.abbr}...`);

    try {
      const spanish = await translateCityContent(
        city.name,
        city.state.name,
        city.state.abbr,
        city.aiDescription!,
        city.metaTitle,
        city.metaDesc
      );

      await prisma.city.update({
        where: { id: city.id },
        data: {
          aiDescriptionEs: spanish.aiDescriptionEs,
          metaTitleEs: spanish.metaTitleEs,
          metaDescEs: spanish.metaDescEs,
        },
      });

      console.log(`    ✅ Done`);
      successCount++;
    } catch (err) {
      console.error(`    ❌ Error: ${err instanceof Error ? err.message : err}`);
      errorCount++;
    }

    // Rate limit delay between every request
    if (i < cities.length - 1) {
      await sleep(DELAY_MS);
    }

    // Extra pause every BATCH_SIZE cities
    if ((i + 1) % BATCH_SIZE === 0 && i < cities.length - 1) {
      console.log(`\n⏸  Batch complete. Pausing 5s...\n`);
      await sleep(5000);
    }
  }

  console.log(`\n=============================`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors:  ${errorCount}`);
  console.log(`=============================`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  prisma.$disconnect();
  process.exit(1);
});
