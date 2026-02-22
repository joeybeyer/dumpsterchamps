/**
 * Spanish Content Generator
 * Translates/generates Spanish versions of city, FAQ, and neighborhood page content.
 *
 * Usage (run from project root):
 *   npx tsx --env-file=.env scripts/generate-spanish-content.ts
 *   npx tsx --env-file=.env scripts/generate-spanish-content.ts --city aurora-il
 *   npx tsx --env-file=.env scripts/generate-spanish-content.ts --limit 5
 *   npx tsx --env-file=.env scripts/generate-spanish-content.ts --neighborhoods
 *   npx tsx --env-file=.env scripts/generate-spanish-content.ts --force
 *
 * Requires: OPENROUTER_API_KEY set in .env (or exported in shell)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── OpenRouter helpers (inline to avoid adapter issues in script context) ───

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4-5-20251001';
const MIN_DELAY_MS = 1500;

let lastRequestTime = 0;

async function rateLimitDelay(): Promise<void> {
  const elapsed = Date.now() - lastRequestTime;
  if (elapsed < MIN_DELAY_MS) {
    await new Promise((r) => setTimeout(r, MIN_DELAY_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

async function callOpenRouter(prompt: string, systemPrompt: string, maxTokens = 4000): Promise<string> {
  if (!OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is not set');

  await rateLimitDelay();

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://dumpsterchamps.com',
      'X-Title': 'Dumpster Champs Spanish Generator',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: maxTokens,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from OpenRouter');

  if (data.usage) {
    console.log(`    [tokens] in:${data.usage.prompt_tokens} out:${data.usage.completion_tokens}`);
  }

  return content.trim();
}

async function callOpenRouterJSON<T>(prompt: string, systemPrompt: string): Promise<T> {
  const fullPrompt = `${prompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown code blocks, no explanation.`;
  const raw = await callOpenRouter(fullPrompt, systemPrompt, 3000);

  let jsonStr = raw.trim();
  if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7);
  else if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3);
  if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3);

  return JSON.parse(jsonStr.trim()) as T;
}

// ─── System prompts ──────────────────────────────────────────────────────────

const TRANSLATION_SYSTEM_PROMPT = `You are an expert Spanish translator specializing in local service business content for US-based Hispanic audiences. You translate English dumpster rental content to natural, professional Mexican-American Spanish.

Rules:
- Translate to natural, conversational Spanish used in the US Hispanic community
- Keep ALL prices exactly as-is (e.g., $495, $895)
- Keep ALL markdown formatting (##, **, -, |) exactly as-is
- Keep ALL HTML tags exactly as-is
- Keep ALL URLs and slugs exactly as-is (e.g., /dumpster-rental-aurora-il)
- Keep phone numbers exactly as-is
- Keep proper nouns (city names, brand names) as-is
- Do NOT add extra explanation or notes — return only the translated content`;

const META_SYSTEM_PROMPT = `You are an expert Spanish SEO writer for local service businesses. You write concise, conversion-optimized Spanish meta titles and descriptions for dumpster rental companies targeting US Hispanic markets.`;

// ─── City Spanish content generation ────────────────────────────────────────

interface CitySpanishFields {
  descriptionEs: string | null;
  aiDescriptionEs: string | null;
  whyChooseUsEs: string | null;
  climateEs: string | null;
  permitsEs: string | null;
  metaTitleEs: string | null;
  metaDescEs: string | null;
}

async function generateCitySpanish(city: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  aiDescription: string | null;
  whyChooseUs: string | null;
  climate: string | null;
  permits: string | null;
  metaTitle: string | null;
  metaDesc: string | null;
  state: { name: string; abbr: string };
}): Promise<CitySpanishFields> {
  const result: CitySpanishFields = {
    descriptionEs: null,
    aiDescriptionEs: null,
    whyChooseUsEs: null,
    climateEs: null,
    permitsEs: null,
    metaTitleEs: null,
    metaDescEs: null,
  };

  // Translate description
  if (city.description) {
    console.log('    → Translating description...');
    result.descriptionEs = await callOpenRouter(
      `Translate the following dumpster rental service description to Spanish:\n\n${city.description}`,
      TRANSLATION_SYSTEM_PROMPT
    );
  }

  // Translate aiDescription (main long-form content)
  if (city.aiDescription) {
    console.log('    → Translating AI description (main content)...');
    result.aiDescriptionEs = await callOpenRouter(
      `Translate the following dumpster rental page content to Spanish. Preserve all markdown formatting exactly:\n\n${city.aiDescription}`,
      TRANSLATION_SYSTEM_PROMPT,
      6000
    );
  }

  // Translate whyChooseUs
  if (city.whyChooseUs) {
    console.log('    → Translating whyChooseUs...');
    result.whyChooseUsEs = await callOpenRouter(
      `Translate the following "Why Choose Us" section to Spanish:\n\n${city.whyChooseUs}`,
      TRANSLATION_SYSTEM_PROMPT
    );
  }

  // Translate climate
  if (city.climate) {
    console.log('    → Translating climate info...');
    result.climateEs = await callOpenRouter(
      `Translate the following climate/weather information to Spanish:\n\n${city.climate}`,
      TRANSLATION_SYSTEM_PROMPT
    );
  }

  // Translate permits
  if (city.permits) {
    console.log('    → Translating permits info...');
    result.permitsEs = await callOpenRouter(
      `Translate the following permit requirements information to Spanish:\n\n${city.permits}`,
      TRANSLATION_SYSTEM_PROMPT
    );
  }

  // Generate Spanish meta title and description
  console.log('    → Generating Spanish meta tags...');
  const metaResult = await callOpenRouterJSON<{ metaTitle: string; metaDesc: string }>(
    `Generate a Spanish SEO meta title and meta description for a dumpster rental service page for ${city.name}, ${city.state.abbr}.

The English meta title is: ${city.metaTitle || `Dumpster Rental in ${city.name}, ${city.state.abbr} | From $495`}
The English meta description is: ${city.metaDesc || `Fast, affordable dumpster rental in ${city.name}, ${city.state.abbr}. Same-day delivery. Prices from $495.`}

Requirements:
- metaTitle: max 60 characters, include city name and price ($495), in Spanish
- metaDesc: max 155 characters, compelling Spanish description with call to action
- Return JSON: { "metaTitle": "...", "metaDesc": "..." }`,
    META_SYSTEM_PROMPT
  );

  result.metaTitleEs = metaResult.metaTitle || null;
  result.metaDescEs = metaResult.metaDesc || null;

  return result;
}

// ─── FAQ Spanish translation ──────────────────────────────────────────────────

async function translateFAQs(
  faqs: { id: string; question: string; answer: string }[]
): Promise<{ id: string; questionEs: string; answerEs: string }[]> {
  if (faqs.length === 0) return [];

  console.log(`    → Translating ${faqs.length} FAQs...`);

  const faqList = faqs
    .map((f, i) => `${i + 1}. Q: ${f.question}\n   A: ${f.answer}`)
    .join('\n\n');

  const translated = await callOpenRouterJSON<{ question: string; answer: string }[]>(
    `Translate the following dumpster rental FAQs to Spanish. Return a JSON array with ${faqs.length} objects, each with "question" and "answer" fields, in the same order:

${faqList}`,
    TRANSLATION_SYSTEM_PROMPT
  );

  return faqs.map((faq, i) => ({
    id: faq.id,
    questionEs: translated[i]?.question || faq.question,
    answerEs: translated[i]?.answer || faq.answer,
  }));
}

// ─── NeighborhoodPage Spanish translation ─────────────────────────────────────

async function translateNeighborhoodPage(page: {
  id: string;
  name: string;
  content: string;
  metaTitle: string | null;
  metaDesc: string | null;
  city: { name: string; state: { abbr: string } };
}): Promise<{ contentEs: string; metaTitleEs: string | null; metaDescEs: string | null }> {
  console.log(`      → Translating neighborhood page: ${page.name}...`);

  const contentEs = await callOpenRouter(
    `Translate the following neighborhood dumpster rental page content to Spanish. Preserve all markdown formatting exactly:\n\n${page.content}`,
    TRANSLATION_SYSTEM_PROMPT,
    6000
  );

  const metaResult = await callOpenRouterJSON<{ metaTitle: string; metaDesc: string }>(
    `Generate a Spanish SEO meta title and meta description for a dumpster rental page for the ${page.name} neighborhood in ${page.city.name}, ${page.city.state.abbr}.

English meta title: ${page.metaTitle || `Dumpster Rental in ${page.name}, ${page.city.name} | From $495`}
English meta desc: ${page.metaDesc || `Fast, affordable dumpster rental in ${page.name}, ${page.city.name}. Same-day delivery from $495.`}

Return JSON: { "metaTitle": "...", "metaDesc": "..." }
- metaTitle: max 60 chars, Spanish
- metaDesc: max 155 chars, Spanish`,
    META_SYSTEM_PROMPT
  );

  return {
    contentEs,
    metaTitleEs: metaResult.metaTitle || null,
    metaDescEs: metaResult.metaDesc || null,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const cityArgIdx = args.indexOf('--city');
  const citySlugArg = cityArgIdx !== -1 ? args[cityArgIdx + 1] : undefined;
  const limitArgIdx = args.indexOf('--limit');
  const limitStr = limitArgIdx !== -1 ? args[limitArgIdx + 1] : undefined;
  const includeNeighborhoods = args.includes('--neighborhoods');
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;

  console.log('\n🇪🇸 Spanish Content Generator');
  console.log(`   Model: ${OPENROUTER_MODEL}`);
  if (citySlugArg) console.log(`   City filter: ${citySlugArg}`);
  if (limit) console.log(`   Limit: ${limit}`);
  if (includeNeighborhoods) console.log(`   Including neighborhood pages`);
  console.log('');

  // Fetch cities
  const baseQuery = {
    where: citySlugArg ? { slug: citySlugArg } : undefined,
    include: {
      state: true,
      faqs: {
        select: { id: true, question: true, answer: true, questionEs: true },
        orderBy: { sortOrder: 'asc' as const },
      },
    },
    take: limit,
    orderBy: { name: 'asc' as const },
  };

  const cities = includeNeighborhoods
    ? await prisma.city.findMany({
        ...baseQuery,
        include: {
          ...baseQuery.include,
          neighborhoodPages: {
            select: { id: true, name: true, slug: true, content: true, metaTitle: true, metaDesc: true, contentEs: true },
          },
        },
      })
    : await prisma.city.findMany(baseQuery);

  if (cities.length === 0) {
    console.log('No cities found. Check your --city argument or database.');
    return;
  }

  console.log(`Processing ${cities.length} cities...\n`);

  let citiesProcessed = 0;
  let citiesSkipped = 0;
  let errors = 0;

  for (const city of cities) {
    console.log(`📍 [${citiesProcessed + citiesSkipped + 1}/${cities.length}] ${city.name}, ${city.state.abbr}`);

    // Skip if already translated (unless re-running to refresh)
    if (city.aiDescriptionEs && !args.includes('--force')) {
      console.log('   ⏭  Already has Spanish content, skipping (use --force to regenerate)\n');
      citiesSkipped++;
      continue;
    }

    try {
      // Generate Spanish city fields
      const spanishFields = await generateCitySpanish(city);

      // Save city Spanish fields
      await prisma.city.update({
        where: { id: city.id },
        data: spanishFields,
      });

      // Translate FAQs (only ones that don't have Spanish yet, unless --force)
      const faqsToTranslate = args.includes('--force')
        ? city.faqs
        : city.faqs.filter((f) => !f.questionEs);

      if (faqsToTranslate.length > 0) {
        const translatedFAQs = await translateFAQs(faqsToTranslate);
        for (const faq of translatedFAQs) {
          await prisma.cityFAQ.update({
            where: { id: faq.id },
            data: { questionEs: faq.questionEs, answerEs: faq.answerEs },
          });
        }
        console.log(`    ✓ Saved ${translatedFAQs.length} translated FAQs`);
      }

      // Translate neighborhood pages
      const neighborhoodPages = 'neighborhoodPages' in city ? city.neighborhoodPages : [];
      if (includeNeighborhoods && neighborhoodPages && neighborhoodPages.length > 0) {
        const pagesToTranslate = args.includes('--force')
          ? neighborhoodPages
          : neighborhoodPages.filter((p) => !p.contentEs);

        console.log(`    → Processing ${pagesToTranslate.length} neighborhood pages...`);
        for (const page of pagesToTranslate) {
          try {
            const translated = await translateNeighborhoodPage({
              ...page,
              city: { name: city.name, state: { abbr: city.state.abbr } },
            });
            await prisma.neighborhoodPage.update({
              where: { id: page.id },
              data: translated,
            });
          } catch (err) {
            console.error(`      ❌ Error on neighborhood page ${page.slug}:`, err);
          }
        }
      }

      console.log(`   ✅ Done\n`);
      citiesProcessed++;
    } catch (err) {
      console.error(`   ❌ Error:`, err);
      errors++;
    }

    // Brief pause between cities
    if (cities.indexOf(city) < cities.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log('\n── Summary ──────────────────────────────────────');
  console.log(`  Processed : ${citiesProcessed}`);
  console.log(`  Skipped   : ${citiesSkipped}`);
  console.log(`  Errors    : ${errors}`);
  console.log('─────────────────────────────────────────────────\n');

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
