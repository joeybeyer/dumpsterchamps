/**
 * Neighborhood Content Generator
 * Generates AI-powered spoke pages for Hub & Spoke silo architecture
 */

import { PrismaClient } from '@prisma/client';
import { generateContent } from '../openrouter';
import {
  NEIGHBORHOOD_SYSTEM_PROMPT,
  getNeighborhoodPrompt,
} from '../prompts/neighborhood';

const prisma = new PrismaClient();

interface NeighborhoodData {
  name: string;
  cityName: string;
  citySlug: string;
  state: string;
  stateAbbr: string;
  zipCodes?: string;
  description?: string;
  typicalProjects?: string;
  neighborSlugs?: string[];
}

/**
 * Generate content for a neighborhood page (spoke page)
 */
export async function generateNeighborhoodContent(
  cityId: string,
  neighborhood: {
    name: string;
    slug: string;
    zipCodes?: string;
    description?: string;
  },
  neighborSlugs?: string[]
): Promise<string> {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: { state: true },
  });

  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  const neighborhoodData: NeighborhoodData = {
    name: neighborhood.name,
    cityName: city.name,
    citySlug: city.slug,
    state: city.state.name,
    stateAbbr: city.state.abbr,
    zipCodes: neighborhood.zipCodes,
    description: neighborhood.description,
    neighborSlugs: neighborSlugs,
  };

  const prompt = getNeighborhoodPrompt(neighborhoodData);

  const content = await generateContent(prompt, {
    systemPrompt: NEIGHBORHOOD_SYSTEM_PROMPT,
    maxTokens: 4000,
    temperature: 0.7,
  });

  return content;
}

/**
 * Generate all neighborhood pages for a city
 */
export async function generateNeighborhoodPagesForCity(cityId: string): Promise<void> {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: {
      state: true,
      neighborhoods: true,
    },
  });

  if (!city) {
    throw new Error(`City not found: ${cityId}`);
  }

  console.log(`\n📍 Generating neighborhood pages for ${city.name}, ${city.state.abbr}...`);

  if (city.neighborhoods.length === 0) {
    console.log('  ⚠️ No neighborhoods found for this city. Generate city content first.');
    return;
  }

  // Get all neighborhood slugs for ACROSS linking
  const allSlugs = city.neighborhoods.map(n => n.slug);

  for (let i = 0; i < city.neighborhoods.length; i++) {
    const neighborhood = city.neighborhoods[i];

    // Get neighboring slugs (2-3 nearest neighbors for circular linking)
    const neighborSlugs = getNeighborSlugs(allSlugs, i, 3);

    console.log(`  → Generating ${neighborhood.name}...`);

    try {
      const content = await generateNeighborhoodContent(
        cityId,
        {
          name: neighborhood.name,
          slug: neighborhood.slug,
          zipCodes: neighborhood.zipCodes || undefined,
          description: neighborhood.description || undefined,
        },
        neighborSlugs
      );

      // Create or update neighborhood page
      await prisma.neighborhoodPage.upsert({
        where: {
          cityId_slug: {
            cityId,
            slug: neighborhood.slug,
          },
        },
        update: {
          content,
          neighborSlugs: neighborSlugs.join(','),
          aiGeneratedAt: new Date(),
        },
        create: {
          cityId,
          name: neighborhood.name,
          slug: neighborhood.slug,
          content,
          zipCodes: neighborhood.zipCodes,
          neighborSlugs: neighborSlugs.join(','),
          aiGeneratedAt: new Date(),
        },
      });

      console.log(`  ✓ ${neighborhood.name}`);

      // Small delay between neighborhoods
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(`  ❌ Error generating ${neighborhood.name}:`, error);
    }
  }

  console.log(`✅ Generated ${city.neighborhoods.length} neighborhood pages for ${city.name}`);
}

/**
 * Get neighboring slugs for ACROSS linking
 * Returns 2-3 neighboring slugs in a circular pattern
 */
function getNeighborSlugs(allSlugs: string[], currentIndex: number, count: number): string[] {
  const neighbors: string[] = [];
  const total = allSlugs.length;

  if (total <= 1) return [];

  // Get next neighbors in circular pattern
  for (let i = 1; i <= count && i < total; i++) {
    const nextIndex = (currentIndex + i) % total;
    neighbors.push(allSlugs[nextIndex]);
  }

  return neighbors;
}

/**
 * Generate neighborhood pages for all priority cities
 */
export async function generateNeighborhoodPagesForPriorityCities(): Promise<void> {
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
    'north-hollywood-ca',
  ];

  const cities = await prisma.city.findMany({
    where: {
      slug: { in: priorityCitySlugs },
      neighborhoods: { some: {} }, // Only cities with neighborhoods
    },
    select: { id: true, name: true },
  });

  console.log(`\n🚀 Generating neighborhood pages for ${cities.length} cities...\n`);

  for (const city of cities) {
    try {
      await generateNeighborhoodPagesForCity(city.id);
    } catch (error) {
      console.error(`Error generating neighborhoods for ${city.name}:`, error);
    }
  }

  console.log(`\n✅ Neighborhood page generation complete!`);
}

/**
 * Get cities that need neighborhood page generation
 */
export async function getCitiesNeedingNeighborhoodPages(): Promise<{ id: string; name: string; neighborhoodCount: number }[]> {
  const cities = await prisma.city.findMany({
    where: {
      neighborhoods: { some: {} },
      neighborhoodPages: { none: {} },
    },
    select: {
      id: true,
      name: true,
      _count: { select: { neighborhoods: true } },
    },
  });

  return cities.map(c => ({
    id: c.id,
    name: c.name,
    neighborhoodCount: c._count.neighborhoods,
  }));
}
