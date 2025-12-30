/**
 * City Content Generator
 * Generates AI-powered, BERT-optimized content for city hub pages
 */

import { PrismaClient } from '@prisma/client';
import { generateContent, generateJSON } from '../openrouter';
import {
  CITY_SYSTEM_PROMPT,
  getCityDescriptionPrompt,
  getCityFAQPrompt,
  getNeighborhoodsPrompt,
} from '../prompts/city-description';

const prisma = new PrismaClient();

interface CityData {
  name: string;
  state: string;
  stateAbbr: string;
  county?: string;
  population?: string;
  latitude?: number;
  longitude?: number;
  climate?: string;
  landmarks?: string[];
}

interface GeneratedFAQ {
  question: string;
  answer: string;
  category: string;
}

interface GeneratedNeighborhood {
  name: string;
  slug: string;
  description: string;
  zipCodes: string;
  typicalProjects: string;
}

/**
 * Generate AI content for a single city
 */
export async function generateCityContent(cityId: string): Promise<void> {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: { state: true },
  });

  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  console.log(`\n📍 Generating content for ${city.name}, ${city.state.abbr}...`);

  const cityData: CityData = {
    name: city.name,
    state: city.state.name,
    stateAbbr: city.state.abbr,
    county: city.county || undefined,
    population: city.population || undefined,
    latitude: city.latitude || undefined,
    longitude: city.longitude || undefined,
    climate: city.climate || undefined,
  };

  // Generate main description
  console.log('  → Generating description...');
  const descriptionPrompt = getCityDescriptionPrompt(cityData);
  const aiDescription = await generateContent(descriptionPrompt, {
    systemPrompt: CITY_SYSTEM_PROMPT,
    maxTokens: 3000,
    temperature: 0.7,
  });

  // Generate FAQs
  console.log('  → Generating FAQs...');
  const faqPrompt = getCityFAQPrompt(cityData);
  const faqs = await generateJSON<GeneratedFAQ[]>(faqPrompt, {
    systemPrompt: CITY_SYSTEM_PROMPT,
    maxTokens: 4000,
  });

  // Generate neighborhoods
  console.log('  → Generating neighborhoods...');
  const neighborhoodsPrompt = getNeighborhoodsPrompt(cityData);
  const neighborhoods = await generateJSON<GeneratedNeighborhood[]>(neighborhoodsPrompt, {
    systemPrompt: CITY_SYSTEM_PROMPT,
    maxTokens: 4000,
  });

  // Save to database
  console.log('  → Saving to database...');

  // Update city with AI description
  await prisma.city.update({
    where: { id: cityId },
    data: {
      aiDescription,
      aiGeneratedAt: new Date(),
    },
  });

  // Clear existing FAQs and neighborhoods for this city
  await prisma.cityFAQ.deleteMany({ where: { cityId } });
  await prisma.neighborhood.deleteMany({ where: { cityId } });

  // Insert new FAQs
  if (faqs && faqs.length > 0) {
    await prisma.cityFAQ.createMany({
      data: faqs.map((faq, index) => ({
        cityId,
        question: faq.question,
        answer: faq.answer,
        sortOrder: index,
      })),
    });
    console.log(`  ✓ Created ${faqs.length} FAQs`);
  }

  // Insert new neighborhoods
  if (neighborhoods && neighborhoods.length > 0) {
    await prisma.neighborhood.createMany({
      data: neighborhoods.map((n) => ({
        cityId,
        name: n.name,
        slug: n.slug,
        description: n.description,
        zipCodes: n.zipCodes,
      })),
    });
    console.log(`  ✓ Created ${neighborhoods.length} neighborhoods`);
  }

  console.log(`✅ Completed ${city.name}, ${city.state.abbr}`);
}

/**
 * Generate content for multiple cities
 */
export async function generateContentForCities(
  cityIds: string[],
  options: {
    onProgress?: (completed: number, total: number, cityName: string) => void;
    delayBetweenCities?: number;
  } = {}
): Promise<void> {
  const { onProgress, delayBetweenCities = 2000 } = options;

  console.log(`\n🚀 Starting content generation for ${cityIds.length} cities...\n`);

  for (let i = 0; i < cityIds.length; i++) {
    const cityId = cityIds[i];

    try {
      const city = await prisma.city.findUnique({
        where: { id: cityId },
        include: { state: true },
      });

      await generateCityContent(cityId);

      if (onProgress && city) {
        onProgress(i + 1, cityIds.length, `${city.name}, ${city.state.abbr}`);
      }

      // Delay between cities to respect rate limits
      if (i < cityIds.length - 1 && delayBetweenCities > 0) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenCities));
      }
    } catch (error) {
      console.error(`❌ Error generating content for city ${cityId}:`, error);
      // Continue with next city
    }
  }

  console.log(`\n✅ Content generation complete!`);
}

/**
 * Generate content for priority cities (top 10)
 */
export async function generateContentForPriorityCities(): Promise<void> {
  const priorityCitySlugs = [
    'los-angeles-ca',
    'houston-tx',
    'phoenix-az',
    'dallas-tx',
    'las-vegas-nv',
    'san-diego-ca',
    'san-antonio-tx',
    'austin-tx',
    'jacksonville-fl',
    'north-hollywood-ca', // Your primary location
  ];

  const cities = await prisma.city.findMany({
    where: {
      slug: { in: priorityCitySlugs },
    },
    select: { id: true, name: true },
  });

  if (cities.length === 0) {
    console.log('No priority cities found. Make sure the database is seeded.');
    return;
  }

  console.log(`Found ${cities.length} priority cities to generate content for.`);

  await generateContentForCities(
    cities.map(c => c.id),
    {
      onProgress: (completed, total, cityName) => {
        console.log(`\nProgress: ${completed}/${total} - Just completed: ${cityName}`);
      },
    }
  );
}

/**
 * Check which cities need content generation
 */
export async function getCitiesNeedingContent(limit?: number): Promise<{ id: string; name: string; state: { abbr: string } }[]> {
  return prisma.city.findMany({
    where: {
      aiGeneratedAt: null,
    },
    select: {
      id: true,
      name: true,
      state: { select: { abbr: true } },
    },
    take: limit,
    orderBy: {
      population: 'desc', // Prioritize larger cities
    },
  });
}

/**
 * Regenerate only the description for a city (preserves FAQs/neighborhoods)
 * Use this when updating prompts without regenerating everything
 */
export async function regenerateCityDescription(cityId: string): Promise<void> {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: { state: true },
  });

  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  console.log(`\n📍 Regenerating description for ${city.name}, ${city.state.abbr}...`);

  const cityData: CityData = {
    name: city.name,
    state: city.state.name,
    stateAbbr: city.state.abbr,
    county: city.county || undefined,
    population: city.population || undefined,
    latitude: city.latitude || undefined,
    longitude: city.longitude || undefined,
    climate: city.climate || undefined,
  };

  // Generate new description with updated prompts (including internal links)
  console.log('  → Generating description with internal links...');
  const descriptionPrompt = getCityDescriptionPrompt(cityData);
  const aiDescription = await generateContent(descriptionPrompt, {
    systemPrompt: CITY_SYSTEM_PROMPT,
    maxTokens: 3000,
    temperature: 0.7,
  });

  // Update city with new AI description
  await prisma.city.update({
    where: { id: cityId },
    data: {
      aiDescription,
      aiGeneratedAt: new Date(),
    },
  });

  console.log(`✅ Updated description for ${city.name}, ${city.state.abbr}`);
}
