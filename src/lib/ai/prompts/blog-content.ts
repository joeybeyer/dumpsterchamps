/**
 * Blog Content Prompt Templates
 * Generates unique, BERT-optimized blog posts for content clusters
 * Implements Ferris Wheel linking model
 */

interface BlogTopicData {
  id: number;
  topic: string;
  category: string;
  keywords: string[];
}

interface CityBlogData {
  cityName: string;
  citySlug: string;
  state: string;
  stateAbbr: string;
  topic: BlogTopicData;
  nextBlogSlug: string; // For Ferris Wheel AROUND linking
}

/**
 * 19 Blog Topics - These define WHAT to write about
 * AI generates unique CONTENT for each city
 */
export const BLOG_TOPICS: BlogTopicData[] = [
  {
    id: 1,
    topic: 'How to Choose the Right Dumpster Size',
    category: 'sizing',
    keywords: ['dumpster size guide', 'what size dumpster', 'dumpster dimensions'],
  },
  {
    id: 2,
    topic: 'Dumpster Rental Costs and Pricing Guide',
    category: 'pricing',
    keywords: ['dumpster rental cost', 'how much dumpster', 'dumpster pricing'],
  },
  {
    id: 3,
    topic: 'Dumpster Rental Permits and Regulations',
    category: 'permits',
    keywords: ['dumpster permit', 'dumpster regulations', 'street placement'],
  },
  {
    id: 4,
    topic: 'Best Time of Year for Home Projects',
    category: 'seasonal',
    keywords: ['best time dumpster', 'seasonal projects', 'weather considerations'],
  },
  {
    id: 5,
    topic: 'Home Renovation Waste Management',
    category: 'renovation',
    keywords: ['renovation dumpster', 'remodel waste', 'demolition debris'],
  },
  {
    id: 6,
    topic: 'Roofing Project Dumpster Guide',
    category: 'roofing',
    keywords: ['roofing dumpster', 'shingle disposal', 'roof replacement'],
  },
  {
    id: 7,
    topic: 'Estate Cleanout Services',
    category: 'cleanout',
    keywords: ['estate cleanout', 'house cleanout', 'property clearing'],
  },
  {
    id: 8,
    topic: 'Construction Site Waste Management',
    category: 'construction',
    keywords: ['construction dumpster', 'jobsite waste', 'contractor rental'],
  },
  {
    id: 9,
    topic: 'Eco-Friendly Disposal Options',
    category: 'environmental',
    keywords: ['recycling dumpster', 'eco-friendly disposal', 'green waste'],
  },
  {
    id: 10,
    topic: 'Garage and Basement Cleanout Tips',
    category: 'cleanout',
    keywords: ['garage cleanout', 'basement cleanout', 'junk removal'],
  },
  {
    id: 11,
    topic: 'Dumpster vs Junk Removal Services',
    category: 'comparison',
    keywords: ['dumpster vs junk removal', 'which is better', 'cost comparison'],
  },
  {
    id: 12,
    topic: 'What Can and Cannot Go in a Dumpster',
    category: 'disposal',
    keywords: ['dumpster restrictions', 'prohibited items', 'what goes in dumpster'],
  },
  {
    id: 13,
    topic: 'Scheduling Dumpster Delivery and Pickup',
    category: 'logistics',
    keywords: ['dumpster delivery', 'schedule pickup', 'rental duration'],
  },
  {
    id: 14,
    topic: 'Preparing Your Property for Dumpster Placement',
    category: 'preparation',
    keywords: ['dumpster placement', 'driveway protection', 'where to put dumpster'],
  },
  {
    id: 15,
    topic: 'Money-Saving Tips for Dumpster Rental',
    category: 'tips',
    keywords: ['save money dumpster', 'cheap dumpster rental', 'budget tips'],
  },
  {
    id: 16,
    topic: 'Neighborhood Dumpster Rental Guide',
    category: 'local',
    keywords: ['neighborhood dumpster', 'local rental', 'area guide'],
  },
  {
    id: 17,
    topic: 'Commercial Dumpster Rental for Businesses',
    category: 'commercial',
    keywords: ['commercial dumpster', 'business waste', 'office cleanout'],
  },
  {
    id: 18,
    topic: 'Moving and Relocation Waste Tips',
    category: 'moving',
    keywords: ['moving dumpster', 'relocation waste', 'declutter move'],
  },
  {
    id: 19,
    topic: 'Avoiding Dumpster Rental Scams',
    category: 'consumer',
    keywords: ['dumpster scams', 'avoid hidden fees', 'choosing company'],
  },
];

/**
 * System prompt for blog content generation
 */
export const BLOG_SYSTEM_PROMPT = `You are an expert SEO content writer specializing in local service businesses. You write engaging, informative blog posts for dumpster rental companies.

KEY PRINCIPLES:
1. Every blog post must be UNIQUE - not template-based
2. Reference the city name 10+ times throughout
3. Include local context (weather, neighborhoods, regulations)
4. Use BERT-optimized formatting (tables, lists, headers)
5. Follow Ferris Wheel linking model

BERT OPTIMIZATION:
- Use tables for comparisons and pricing
- Use ordered lists for step-by-step processes
- Use unordered lists for features and benefits
- Keep keywords close to geographic terms
- Use action verbs around service keywords

CONVERSION ELEMENTS:
- Include clear pricing information
- Mention same-day delivery capability
- Reference flat-rate pricing (no hidden fees)
- Include call-to-action with phone: (888) 860-0710`;

/**
 * Generate blog post prompt for a specific city and topic
 */
export function getBlogPostPrompt(data: CityBlogData): string {
  const { cityName, citySlug, state, stateAbbr, topic, nextBlogSlug } = data;

  return `Write a unique, BERT-optimized blog post about "${topic.topic}" specifically for ${cityName}, ${state}.

TOPIC DETAILS:
- Topic: ${topic.topic}
- Category: ${topic.category}
- Target Keywords: ${topic.keywords.join(', ')}
- City: ${cityName}, ${stateAbbr}

FERRIS WHEEL LINKING (REQUIRED):
1. Link UP to money page (first or second paragraph):
   - URL: /dumpster-rental-${citySlug}/
   - Anchor: Vary naturally (e.g., "${cityName} dumpster rental services", "roll-off dumpsters in ${cityName}")

2. Link AROUND to next blog (near the end):
   - URL: /blog/${citySlug}/${nextBlogSlug}/
   - Anchor: Natural transition to next topic

PRICING REFERENCE (include where relevant):
| Size | Price | Weight | Best For |
|------|-------|--------|----------|
| 10 Yard | $495 | 2 tons | Small cleanouts |
| 15 Yard | $550 | 2.5 tons | Garage cleanouts |
| 20 Yard | $595 | 3 tons | Remodels |
| 30 Yard | $695 | 4 tons | Major renovation |
| 40 Yard | $795 | 5 tons | Construction |

CONTENT REQUIREMENTS:
1. Word count: 1,200-1,500 words
2. Reference ${cityName} at least 10 times
3. Include local context (weather, neighborhoods, regulations)
4. Use H2 and H3 headers to structure content
5. Include at least one table (pricing, comparison, or data)
6. Include bullet and numbered lists
7. Include practical, actionable advice
8. End with clear call-to-action

OUTPUT FORMAT (JSON):
{
  "title": "SEO-optimized H1 title including ${cityName}",
  "slug": "${topic.category}-guide-${citySlug}",
  "metaTitle": "60 character max SEO title",
  "metaDesc": "155 character max meta description with ${cityName}",
  "excerpt": "2-3 sentence summary for listings",
  "content": "Full markdown content with proper headers and formatting"
}

Return ONLY valid JSON. No markdown code blocks, no explanation.`;
}

/**
 * Get the next blog topic ID in the Ferris Wheel sequence
 */
export function getNextTopicId(currentId: number): number {
  return currentId >= BLOG_TOPICS.length ? 1 : currentId + 1;
}

/**
 * Get all blog slugs for a city (for sitemap and linking)
 */
export function getBlogSlugsForCity(citySlug: string): string[] {
  return BLOG_TOPICS.map(topic => `${topic.category}-guide-${citySlug}`);
}

/**
 * Get topic by ID
 */
export function getTopicById(id: number): BlogTopicData | undefined {
  return BLOG_TOPICS.find(t => t.id === id);
}
