/**
 * Neighborhood Page Prompt Template
 * Generates BERT-optimized content for spoke pages (S2 cell targeting)
 */

interface NeighborhoodData {
  name: string;
  cityName: string;
  citySlug: string;
  state: string;
  stateAbbr: string;
  zipCodes?: string;
  description?: string;
  typicalProjects?: string;
  neighborSlugs?: string[]; // Neighboring areas for ACROSS linking
}

/**
 * System prompt for neighborhood content generation
 */
export const NEIGHBORHOOD_SYSTEM_PROMPT = `You are an expert local SEO content writer. You write neighborhood-specific content for dumpster rental services.

KEY PRINCIPLES:
1. 80% of content must be UNIQUE to this neighborhood (not generic)
2. Reference the neighborhood name 10+ times throughout
3. Include microclimate factors (flooding, humidity, salt air, etc.)
4. Mention local streets, landmarks, and points of interest
5. Describe typical projects common in this specific area
6. Use the Hub & Spoke linking formula

BERT OPTIMIZATION:
- Surround keywords with action verbs: delivered, positioned, hauled, removed
- Keep "dumpster rental" within 5 tokens of neighborhood name
- Use tables for pricing comparisons
- Use ordered lists for processes
- Use unordered lists for features and benefits`;

/**
 * Generate the neighborhood page prompt
 */
export function getNeighborhoodPrompt(neighborhood: NeighborhoodData): string {
  const neighborLinks = neighborhood.neighborSlugs?.length
    ? neighborhood.neighborSlugs.map(slug =>
        `- /dumpster-rental-${neighborhood.citySlug}/${slug}/`
      ).join('\n')
    : 'Research and include 2-3 neighboring areas';

  return `Generate BERT-optimized, locally-unique content for dumpster rental in ${neighborhood.name}, ${neighborhood.cityName}, ${neighborhood.state}.

NEIGHBORHOOD DETAILS:
- Neighborhood: ${neighborhood.name}
- City: ${neighborhood.cityName}, ${neighborhood.stateAbbr}
- ZIP Codes: ${neighborhood.zipCodes || 'Research and include'}
${neighborhood.description ? `- Description: ${neighborhood.description}` : ''}
${neighborhood.typicalProjects ? `- Typical Projects: ${neighborhood.typicalProjects}` : ''}

LINKING REQUIREMENTS (Hub & Spoke - REQUIRED):

1. FIRST PARAGRAPH must link UP to city hub (ABOVE THE FOLD):
   - Link to: /dumpster-rental-${neighborhood.citySlug}/
   - Use varied anchor text like:
     * "[dumpster rental in ${neighborhood.cityName}](/dumpster-rental-${neighborhood.citySlug}/)"
     * "[${neighborhood.cityName} roll-off dumpster service](/dumpster-rental-${neighborhood.citySlug}/)"
     * "our [${neighborhood.cityName} dumpster rental team](/dumpster-rental-${neighborhood.citySlug}/)"

2. BODY must link ACROSS to 2-3 service pages (use VARIED anchors):
   a) /roll-off-dumpster-rental/ - use anchors like:
      * "[temporary roll-off containers](/roll-off-dumpster-rental)"
      * "[roll-off bin rental](/roll-off-dumpster-rental)"

   b) /construction-dumpsters/ - use anchors like:
      * "[construction debris containers](/construction-dumpsters)"
      * "[job site waste management](/construction-dumpsters)"

   c) /residential-dumpsters/ - use anchors like:
      * "[home project dumpsters](/residential-dumpsters)"
      * "[residential waste removal](/residential-dumpsters)"

3. BODY should link ACROSS to 2-3 neighboring areas (naturally):
${neighborLinks}

IMPORTANT LINKING RULES:
- NEVER use the same anchor text twice
- Spread links throughout content - don't cluster them
- Links should flow naturally in sentences
- Every link MUST have descriptive anchor text (not "click here")

PRICING REFERENCE:
| Size | Price | Weight | Ideal For |
|------|-------|--------|-----------|
| 10 Yard | $495 | 2 tons | Small cleanouts |
| 15 Yard | $550 | 2.5 tons | Garage cleanouts |
| 20 Yard | $595 | 3 tons | Remodels (Popular) |
| 30 Yard | $695 | 4 tons | Major renovation |
| 40 Yard | $795 | 5 tons | Construction |

CONTENT STRUCTURE:

## Introduction (100-150 words)
- Open by linking to city hub page (first sentence)
- Mention ${neighborhood.name} by name 2-3 times
- Reference local character/vibe of the area
- State availability of dumpster rental services

## ${neighborhood.name} Service Coverage (150-200 words)
- List ZIP codes served
- Name specific streets or landmarks
- Mention proximity to major roads/highways
- Reference neighboring areas (with links)

## Common Projects in ${neighborhood.name} (200-250 words)
- Home renovations typical in this area
- Estate cleanouts (if older neighborhood)
- New construction (if developing area)
- Roofing projects (mention climate factors)
- Link to relevant service pages

## Local Considerations (150-200 words)
- Microclimate factors (humidity, flooding, etc.)
- Neighborhood-specific regulations
- HOA rules common in the area
- Best times of year for projects

## Dumpster Sizes for ${neighborhood.name} Projects (include pricing table)
- Reference the pricing table
- Recommend sizes for common local projects

## Why ${neighborhood.name} Residents Choose Us (100-150 words)
- Local knowledge
- Fast delivery to ${neighborhood.name}
- Driveway protection
- Flat-rate pricing

OUTPUT FORMAT:
- Use Markdown with H2 (##) headers
- Include internal links as Markdown: [anchor text](url)
- Total length: 1000-1200 words
- Reference ${neighborhood.name} at least 10 times
- 80% of content must be unique to this neighborhood
- Do NOT include H1 header (page template handles this)`;
}

/**
 * Generate shorter neighborhood snippet for city hub page
 */
export function getNeighborhoodSnippetPrompt(neighborhood: NeighborhoodData): string {
  return `Write a 50-75 word snippet about dumpster rental services in ${neighborhood.name}, ${neighborhood.cityName}.

Requirements:
- Mention ${neighborhood.name} by name
- Reference one unique local feature (landmark, character, project type)
- Include a call-to-action
- Mention same-day delivery availability

Return ONLY the snippet text, no formatting or quotes.`;
}
