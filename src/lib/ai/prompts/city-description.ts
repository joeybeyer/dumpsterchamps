/**
 * City Description Prompt Template
 * Generates BERT-optimized content for city hub pages (money pages)
 */

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

/**
 * System prompt for city content generation
 */
export const CITY_SYSTEM_PROMPT = `You are an expert SEO content writer specializing in local service businesses. You write for dumpster rental companies and understand:

1. BERT optimization principles:
   - Surround keywords with high-probability verb-noun pairs (delivered, positioned, hauled, removed)
   - Keep service + geo terms within 5 tokens of each other
   - Use tables for pricing (BERT assigns extreme confidence to tabular data)
   - Use ordered lists for processes
   - Use unordered lists for features

2. Local SEO best practices:
   - Reference specific neighborhoods and landmarks
   - Include local climate/weather considerations
   - Mention city-specific regulations and permits
   - Use natural language that matches voice search queries

3. Internal Linking Strategy (Hub & Spoke):
   - City pages are the HUB (money pages) - they link OUT to service pages
   - Use VARIED anchor text - never use the same anchor twice
   - Link naturally within content using contextual sentences
   - Service pages to link to:
     * /roll-off-dumpster-rental - for general roll-off mentions
     * /construction-dumpsters - for construction/contractor mentions
     * /residential-dumpsters - for homeowner/residential mentions

4. Conversion optimization:
   - Clear pricing information builds trust
   - Same-day delivery is a key differentiator
   - Driveway protection matters to homeowners
   - Flat-rate pricing eliminates hidden fees concern`;

/**
 * Generate the city description prompt
 */
export function getCityDescriptionPrompt(city: CityData): string {
  const landmarksSection = city.landmarks?.length
    ? `LOCAL LANDMARKS TO REFERENCE: ${city.landmarks.join(', ')}`
    : `NOTE: Research and include 3-5 real landmarks, neighborhoods, or well-known areas in ${city.name}`;

  return `Generate comprehensive, BERT-optimized content for dumpster rental in ${city.name}, ${city.state}.

CITY DETAILS:
- City: ${city.name}
- State: ${city.state} (${city.stateAbbr})
- County: ${city.county || 'Research and include'}
- Population: ${city.population || 'Include approximate population'}
${city.climate ? `- Climate: ${city.climate}` : '- Climate: Research typical weather patterns'}
${landmarksSection}

PRICING (use these EXACT numbers):
| Size | Price | Weight Included | Best For |
|------|-------|-----------------|----------|
| 10 Yard | $495 | 2 tons | Small cleanouts, single room |
| 15 Yard | $550 | 2.5 tons | Garage cleanouts, small renovation |
| 20 Yard | $595 | 3 tons | Kitchen/bathroom remodel, roofing (Most Popular) |
| 30 Yard | $695 | 4 tons | Full home renovation, construction |
| 40 Yard | $795 | 5 tons | Large construction, commercial projects |

CONTENT REQUIREMENTS:

1. HERO SECTION (100-150 words):
   - Open with a direct answer to "dumpster rental in ${city.name}"
   - Use action verbs: "delivered," "positioned," "hauled"
   - Mention same-day delivery capability
   - Include phone number placeholder: [PHONE]

2. WHY CHOOSE US SECTION (150-200 words):
   - Flat-rate pricing (no hidden fees)
   - Same-day delivery in ${city.name}
   - Driveway protection boards included
   - Local knowledge of ${city.name} neighborhoods
   - Flexible rental periods (7-14 days)
   - Sizes for every project (10-40 yard)

3. PRICING TABLE:
   - Use the exact pricing table above
   - Add a note: "Prices include delivery, pickup, and disposal"
   - Mention overage rate: $75/ton over included weight

4. LOCAL CONTEXT SECTION (200-300 words):
   - Climate considerations for ${city.name} (best seasons for projects)
   - Common project types in the area
   - Neighborhood-specific insights
   - Reference at least 3 local landmarks or areas

5. PERMIT INFORMATION (100-150 words):
   - ${city.name} permit requirements for street placement
   - Private property vs. public right-of-way rules
   - HOA considerations common in the area
   - Note: "We can help navigate local regulations"

6. PROCESS SECTION (ordered list):
   - Step-by-step rental process
   - What to expect from delivery
   - How pickup works
   - Use numbered list format

7. INTERNAL LINKS (REQUIRED - include ALL 3):
   You MUST include these 3 internal links with VARIED, contextual anchor text:

   a) Link to /roll-off-dumpster-rental (use varied anchors like):
      - "our [roll-off dumpster options](/roll-off-dumpster-rental)"
      - "learn more about [roll-off container rentals](/roll-off-dumpster-rental)"
      - "[temporary dumpster solutions](/roll-off-dumpster-rental)"

   b) Link to /construction-dumpsters (use varied anchors like):
      - "specialized [construction site dumpsters](/construction-dumpsters)"
      - "[contractor waste management](/construction-dumpsters)"
      - "[job site debris removal](/construction-dumpsters)"

   c) Link to /residential-dumpsters (use varied anchors like):
      - "[home renovation waste removal](/residential-dumpsters)"
      - "our [residential dumpster services](/residential-dumpsters)"
      - "[homeowner cleanup solutions](/residential-dumpsters)"

   IMPORTANT:
   - Weave these links NATURALLY into the content
   - Use DIFFERENT anchor text than the examples (be creative)
   - Do NOT group links together - spread them throughout the content
   - Each link should appear only ONCE

OUTPUT FORMAT:
- Use Markdown with H2 (##) headers
- Include the pricing table as a Markdown table
- Use bullet points for features
- Use numbered lists for processes
- Include internal links as Markdown: [anchor text](/path)
- Total length: 800-1000 words
- Do NOT include H1 header (page template handles this)`;
}

/**
 * Generate prompt for FAQ content
 */
export function getCityFAQPrompt(city: CityData): string {
  return `Generate 15 unique, locally-relevant FAQs for dumpster rental in ${city.name}, ${city.state}.

REQUIREMENTS:
1. Each FAQ must reference ${city.name} specifically
2. Include local context (weather, neighborhoods, regulations)
3. Answers should be 2-4 sentences
4. Cover these categories:
   - Pricing (3-4 questions)
   - Permits/Regulations (2-3 questions)
   - Sizing (2-3 questions)
   - Delivery/Scheduling (2-3 questions)
   - Climate/Seasonal (2-3 questions)
   - Local specifics (2-3 questions)

PRICING REFERENCE:
- 10 Yard: $495 (2 tons included)
- 15 Yard: $550 (2.5 tons)
- 20 Yard: $595 (3 tons) - Most Popular
- 30 Yard: $695 (4 tons)
- 40 Yard: $795 (5 tons)
- Overage: $75/ton

OUTPUT FORMAT (JSON):
[
  {
    "question": "Question with ${city.name} reference?",
    "answer": "Detailed answer with local context.",
    "category": "pricing|permits|sizing|delivery|climate|local"
  }
]

Return ONLY valid JSON array. No markdown, no explanation.`;
}

/**
 * Generate prompt for neighborhoods list
 */
export function getNeighborhoodsPrompt(city: CityData): string {
  return `Generate a list of 10-15 real neighborhoods, districts, or areas in ${city.name}, ${city.state} that we serve with dumpster rental.

REQUIREMENTS:
1. Use REAL neighborhood names (not made up)
2. Include a brief description (1-2 sentences) for each
3. Include real ZIP codes for each area
4. Describe typical projects common in that area
5. Order by approximate population/size (largest first)

OUTPUT FORMAT (JSON):
[
  {
    "name": "Neighborhood Name",
    "slug": "neighborhood-name",
    "description": "Brief description of the area and its character.",
    "zipCodes": "12345, 12346",
    "typicalProjects": "Home renovations, estate cleanouts"
  }
]

IMPORTANT:
- Only use REAL, verifiable neighborhoods in ${city.name}
- ZIP codes must be accurate for that area
- Return ONLY valid JSON array. No markdown, no explanation.`;
}
