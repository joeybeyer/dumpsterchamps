/**
 * Neighborhood Page (Spoke Page)
 * Part of Hub & Spoke silo architecture for S2 cell targeting
 *
 * Route: /dumpster-rental-{city-slug}/{neighborhood-slug}/
 * Example: /dumpster-rental-los-angeles-ca/hollywood/
 *
 * FALLBACK SUPPORT: If no NeighborhoodPage exists, renders from Neighborhood table data
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { setRequestLocale } from "next-intl/server";

// Force dynamic rendering to prevent DB access at build time
export const dynamic = "force-dynamic";
import { QuoteForm } from '@/components/forms/QuoteForm';
import { LocalBusinessSchema } from '@/components/seo/SchemaMarkup';
import { Phone, MapPin, ArrowLeft, ChevronRight, Truck, Shield, Clock } from 'lucide-react';

// pSEO: Size slugs (must match sitemap.ts)
const SIZE_SLUGS = [
  '10-yard-dumpster',
  '15-yard-dumpster',
  '20-yard-dumpster',
  '30-yard-dumpster',
  '40-yard-dumpster',
];

// pSEO: Use case slugs (must match sitemap.ts)
const USE_CASE_SLUGS = [
  'roofing-dumpster',
  'construction-dumpster',
  'renovation-dumpster',
  'cleanout-dumpster',
  'estate-cleanout-dumpster',
  'yard-waste-dumpster',
];

interface PageProps {
  params: Promise<{
    slug: string;
    neighborhoodSlug: string;
    locale: string;
  }>;
}

// Types for our data
interface NeighborhoodData {
  name: string;
  slug: string;
  content: string;
  zipCodes: string | null;
  metaTitle: string | null;
  metaDesc: string | null;
  isFallback: boolean;
}

/**
 * Generate fallback content for neighborhoods without NeighborhoodPage records
 */
function generateFallbackContent(
  neighborhood: { name: string; slug: string; description: string | null; zipCodes: string | null },
  city: { name: string; slug: string; phone: string | null; state: { abbr: string; name: string } }
): string {
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';
  const zipDisplay = neighborhood.zipCodes || 'surrounding areas';

  return `## Dumpster Rental in ${neighborhood.name}, ${city.name}

Looking for reliable [dumpster rental in ${city.name}](/dumpster-rental-${city.slug})? We deliver roll-off containers directly to ${neighborhood.name} and surrounding areas. Whether you're tackling a home renovation, construction project, or major cleanout, our team provides fast, affordable service with transparent pricing.

## ${neighborhood.name} Service Area

We serve ${neighborhood.name} and nearby neighborhoods throughout ${city.name}, ${city.state.abbr}. Our service area includes ZIP codes ${zipDisplay}. Same-day delivery is available for most locations when you call before noon.

${neighborhood.description ? `${neighborhood.description}\n\n` : ''}Our local drivers know ${neighborhood.name} well, ensuring efficient delivery and pickup for your project. We navigate residential streets, commercial areas, and construction sites throughout the neighborhood.

## Common Projects in ${neighborhood.name}

Our [roll-off dumpster rental](/roll-off-dumpster-rental) service handles a variety of projects in ${neighborhood.name}:

- **Home Renovations**: Kitchen remodels, bathroom updates, flooring replacement
- **Construction Projects**: New builds, additions, demolition debris
- **Cleanouts**: Estate cleanouts, garage cleaning, basement decluttering
- **Yard Work**: Landscaping debris, tree trimming, seasonal cleanup
- **Roofing**: Shingle removal and replacement projects

Whether you need a small [10-yard dumpster](/10-yard-dumpster) for a garage cleanout or a large [40-yard container](/40-yard-dumpster) for a major construction project, we have the right size for your ${neighborhood.name} project.

## Dumpster Sizes & Pricing for ${neighborhood.name}

| Size | Price | Weight Included | Best For |
|------|-------|-----------------|----------|
| 10 Yard | $495 | 2 tons | Small cleanouts, single room remodels |
| 15 Yard | $550 | 2.5 tons | Garage cleanouts, small renovations |
| 20 Yard | $595 | 3 tons | Kitchen/bath remodels, roofing (Most Popular) |
| 30 Yard | $695 | 4 tons | Large renovations, construction |
| 40 Yard | $795 | 5 tons | Major construction, commercial projects |

All prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees.

## Why Choose Us for ${neighborhood.name} Dumpster Rental

- **Same-Day Delivery**: Call before noon for same-day service in ${neighborhood.name}
- **Flat-Rate Pricing**: The price we quote is the price you pay
- **Driveway Protection**: We place boards under the container to protect your property
- **Flexible Rentals**: Standard 7-day rentals with easy extensions available
- **Local Service**: Our drivers know ${neighborhood.name} and ${city.name}

## Frequently Asked Questions

**How much does a dumpster rental cost in ${neighborhood.name}?**
Dumpster rental in ${neighborhood.name} starts at $495 for a 10-yard container. Our most popular 20-yard dumpster is $595, which works well for most home renovation projects.

**Do I need a permit for a dumpster in ${neighborhood.name}?**
If the dumpster is placed on your private property (driveway or yard), you typically don't need a permit. Street placement may require a permit from ${city.name}. We can help guide you through local requirements.

**How fast can you deliver a dumpster to ${neighborhood.name}?**
We offer same-day delivery to ${neighborhood.name} when you call before noon. Next-day delivery is available for afternoon orders.

**What can I put in a dumpster?**
Most household and construction debris is accepted, including furniture, appliances (without refrigerants), drywall, lumber, roofing shingles, and general junk. We cannot accept hazardous materials, paint, batteries, or tires.

## Ready to Rent a Dumpster in ${neighborhood.name}?

Call us at [PHONE] for immediate service or fill out the quote form above. We're ready to help with your ${neighborhood.name} project today.`;
}

/**
 * Generate content for SIZE pages (e.g., 10-yard-dumpster, 20-yard-dumpster)
 */
function generateSizePageContent(
  sizeSlug: string,
  city: { name: string; slug: string; phone: string | null; state: { abbr: string; name: string } }
): string {
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';
  const sizeMap: Record<string, { size: string; price: string; capacity: string; bestFor: string }> = {
    '10-yard-dumpster': { size: '10 Yard', price: '$495', capacity: '4 pickup loads', bestFor: 'Small cleanouts, single room remodels' },
    '15-yard-dumpster': { size: '15 Yard', price: '$550', capacity: '6 pickup loads', bestFor: 'Garage cleanouts, small renovations' },
    '20-yard-dumpster': { size: '20 Yard', price: '$595', capacity: '8 pickup loads', bestFor: 'Kitchen/bath remodels, roofing' },
    '30-yard-dumpster': { size: '30 Yard', price: '$695', capacity: '12 pickup loads', bestFor: 'Large renovations, construction' },
    '40-yard-dumpster': { size: '40 Yard', price: '$795', capacity: '16 pickup loads', bestFor: 'Major construction, commercial projects' },
  };

  const sizeData = sizeMap[sizeSlug] || sizeMap['20-yard-dumpster'];

  return `## ${sizeData.size} Dumpster Rental in ${city.name}, ${city.state.abbr}

Looking for a [${sizeData.size.toLowerCase()} dumpster rental in ${city.name}](/dumpster-rental-${city.slug})? We deliver ${sizeData.size.toLowerCase()} roll-off containers throughout ${city.name} and surrounding areas. Perfect for ${sizeData.bestFor.toLowerCase()}, our ${sizeData.size.toLowerCase()} dumpster provides reliable waste disposal with flat-rate pricing starting at ${sizeData.price}.

## ${sizeData.size} Dumpster Specifications

Our ${sizeData.size.toLowerCase()} dumpster holds approximately ${sizeData.capacity} of waste, making it ideal for ${sizeData.bestFor.toLowerCase()}. The container dimensions provide ample space while fitting in most driveways and construction sites.

**Key Features:**
- **Capacity**: ${sizeData.capacity}
- **Pricing**: ${sizeData.price} all-inclusive
- **Rental Period**: 7 days (extensions available)
- **Weight Allowance**: Included in price
- **Delivery**: Same-day available in ${city.name}

## What Can You Put in a ${sizeData.size} Dumpster?

Our ${sizeData.size.toLowerCase()} dumpsters accept most common waste materials:

- **Construction Debris**: Lumber, drywall, flooring, tiles
- **Household Items**: Furniture, appliances, carpeting
- **Yard Waste**: Branches, leaves, landscaping debris
- **Renovation Waste**: Cabinets, fixtures, siding

We cannot accept hazardous materials, paint, chemicals, batteries, or tires.

## ${sizeData.size} Dumpster Rental Pricing in ${city.name}

| Size | Price | Capacity | Rental Period | Best For |
|------|-------|----------|---------------|----------|
| 10 Yard | $495 | 4 pickup loads | 7 days | Small cleanouts, single room remodels |
| 15 Yard | $550 | 6 pickup loads | 7 days | Garage cleanouts, small renovations |
| 20 Yard | $595 | 8 pickup loads | 7 days | Kitchen/bath remodels, roofing (Most Popular) |
| 30 Yard | $695 | 12 pickup loads | 7 days | Large renovations, construction |
| 40 Yard | $795 | 16 pickup loads | 7 days | Major construction, commercial projects |

All prices include delivery, pickup, disposal, and weight allowance. No hidden fees.

## Why Choose Our ${sizeData.size} Dumpster Rental in ${city.name}

- **Same-Day Delivery**: Call before noon for same-day service in ${city.name}
- **Flat-Rate Pricing**: The price we quote is the price you pay
- **Driveway Protection**: We place boards under the container to protect your property
- **Flexible Rentals**: Standard 7-day rentals with easy extensions available
- **Local Service**: Our drivers know ${city.name} well

## Frequently Asked Questions

**How much does a ${sizeData.size.toLowerCase()} dumpster cost in ${city.name}?**
A ${sizeData.size.toLowerCase()} dumpster rental in ${city.name} costs ${sizeData.price}, which includes delivery, pickup, disposal, and a 7-day rental period. No hidden fees or surprise charges.

**How big is a ${sizeData.size.toLowerCase()} dumpster?**
A ${sizeData.size.toLowerCase()} dumpster holds approximately ${sizeData.capacity}, making it perfect for ${sizeData.bestFor.toLowerCase()}. It fits comfortably in most driveways.

**Do I need a permit for a ${sizeData.size.toLowerCase()} dumpster in ${city.name}?**
If the dumpster is placed on your private property (driveway or yard), you typically don't need a permit. Street placement may require a permit from ${city.name}. We can help guide you through local requirements.

**How fast can you deliver a ${sizeData.size.toLowerCase()} dumpster to ${city.name}?**
We offer same-day delivery to ${city.name} when you call before noon. Next-day delivery is available for afternoon orders.

## Ready to Rent a ${sizeData.size} Dumpster in ${city.name}?

Call us at [PHONE] for immediate service or fill out the quote form above. We're ready to help with your ${city.name} project today.`;
}

/**
 * Generate content for USE CASE pages (e.g., construction-dumpster, roofing-dumpster)
 */
function generateUseCasePageContent(
  useCaseSlug: string,
  city: { name: string; slug: string; phone: string | null; state: { abbr: string; name: string } }
): string {
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';
  const useCaseMap: Record<string, { name: string; description: string; materials: string[]; recommendedSizes: string }> = {
    'construction-dumpster': {
      name: 'Construction',
      description: 'construction projects, new builds, demolition, and site cleanup',
      materials: ['Lumber and wood', 'Drywall and sheetrock', 'Metal scraps', 'Concrete and brick', 'Roofing shingles', 'Siding and trim'],
      recommendedSizes: '20-yard or 30-yard dumpsters'
    },
    'roofing-dumpster': {
      name: 'Roofing',
      description: 'roof replacement, shingle removal, and roofing debris',
      materials: ['Asphalt shingles', 'Wood shakes', 'Underlayment', 'Flashing and gutters', 'Roofing nails', 'Old roof decking'],
      recommendedSizes: '20-yard dumpster'
    },
    'renovation-dumpster': {
      name: 'Renovation',
      description: 'home renovations, remodels, and improvement projects',
      materials: ['Old cabinets and countertops', 'Flooring materials', 'Drywall and plaster', 'Fixtures and appliances', 'Doors and windows', 'Carpeting and padding'],
      recommendedSizes: '15-yard or 20-yard dumpsters'
    },
    'cleanout-dumpster': {
      name: 'Cleanout',
      description: 'estate cleanouts, garage cleaning, basement decluttering, and hoarding cleanup',
      materials: ['Furniture and mattresses', 'Appliances', 'Boxes and household items', 'Clothing and textiles', 'Books and papers', 'General household junk'],
      recommendedSizes: '10-yard or 15-yard dumpsters'
    },
    'estate-cleanout-dumpster': {
      name: 'Estate Cleanout',
      description: 'estate cleanouts, property cleanouts, and downsizing',
      materials: ['Furniture and antiques', 'Household items', 'Appliances', 'Personal belongings', 'Outdoor equipment', 'General estate items'],
      recommendedSizes: '15-yard or 20-yard dumpsters'
    },
    'yard-waste-dumpster': {
      name: 'Yard Waste',
      description: 'landscaping projects, tree removal, and yard cleanup',
      materials: ['Tree branches and limbs', 'Leaves and grass clippings', 'Brush and shrubs', 'Soil and sod', 'Garden waste', 'Landscaping debris'],
      recommendedSizes: '10-yard or 20-yard dumpsters'
    },
  };

  const useCaseData = useCaseMap[useCaseSlug] || useCaseMap['construction-dumpster'];

  return `## ${useCaseData.name} Dumpster Rental in ${city.name}, ${city.state.abbr}

Looking for [${useCaseData.name.toLowerCase()} dumpster rental in ${city.name}](/dumpster-rental-${city.slug})? We deliver roll-off containers specifically designed for ${useCaseData.description}. Our team provides fast, affordable service throughout ${city.name} and surrounding areas with transparent flat-rate pricing.

## ${useCaseData.name} Projects We Handle in ${city.name}

Our [roll-off dumpster rental](/roll-off-dumpster-rental) service is perfect for ${useCaseData.description}. We understand the unique waste disposal needs of ${useCaseData.name.toLowerCase()} projects and provide the right container size for efficient debris removal.

**What You Can Dispose Of:**
${useCaseData.materials.map(m => `- ${m}`).join('\n')}

We cannot accept hazardous materials, paint, chemicals, batteries, or tires.

## Recommended Dumpster Sizes for ${useCaseData.name} Projects

For most ${useCaseData.name.toLowerCase()} projects in ${city.name}, we recommend our ${useCaseData.recommendedSizes}. These sizes provide optimal capacity while fitting in standard driveways and work sites.

| Size | Price | Capacity | Best For |
|------|-------|----------|----------|
| 10 Yard | $495 | 4 pickup loads | Small ${useCaseData.name.toLowerCase()} projects |
| 15 Yard | $550 | 6 pickup loads | Medium ${useCaseData.name.toLowerCase()} projects |
| 20 Yard | $595 | 8 pickup loads | Most ${useCaseData.name.toLowerCase()} projects (Most Popular) |
| 30 Yard | $695 | 12 pickup loads | Large ${useCaseData.name.toLowerCase()} projects |
| 40 Yard | $795 | 16 pickup loads | Commercial ${useCaseData.name.toLowerCase()} projects |

All prices include delivery, pickup, disposal, and a 7-day rental period. No hidden fees.

## Why Choose Us for ${useCaseData.name} Dumpster Rental in ${city.name}

- **Same-Day Delivery**: Call before noon for same-day service in ${city.name}
- **Flat-Rate Pricing**: The price we quote is the price you pay
- **Driveway Protection**: We place boards under the container to protect your property
- **Flexible Rentals**: Standard 7-day rentals with easy extensions available
- **Local Expertise**: Our drivers know ${city.name} and handle ${useCaseData.name.toLowerCase()} debris daily

## Frequently Asked Questions

**How much does a ${useCaseData.name.toLowerCase()} dumpster cost in ${city.name}?**
${useCaseData.name} dumpster rental in ${city.name} starts at $495 for a 10-yard container. Our most popular 20-yard dumpster is $595, which works well for most ${useCaseData.name.toLowerCase()} projects.

**What size dumpster do I need for my ${useCaseData.name.toLowerCase()} project?**
For most ${useCaseData.name.toLowerCase()} projects in ${city.name}, we recommend ${useCaseData.recommendedSizes}. Call us and we'll help you determine the right size based on your project scope.

**Do I need a permit for a dumpster in ${city.name}?**
If the dumpster is placed on your private property (driveway or yard), you typically don't need a permit. Street placement may require a permit from ${city.name}. We can help guide you through local requirements.

**How fast can you deliver a dumpster to ${city.name}?**
We offer same-day delivery to ${city.name} when you call before noon. Next-day delivery is available for afternoon orders.

## Ready to Rent a ${useCaseData.name} Dumpster in ${city.name}?

Call us at [PHONE] for immediate service or fill out the quote form above. We're ready to help with your ${city.name} ${useCaseData.name.toLowerCase()} project today.`;
}

/**
 * Convert markdown content to HTML with proper formatting
 */
function formatNeighborhoodContent(content: string): string {
  if (!content) return '';

  const phone = process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';

  // Split content into lines for processing
  const lines = content.split('\n');
  const result: string[] = [];
  let inList = false;
  let inTable = false;
  let tableRows: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Replace phone placeholder
    line = line.replace(/\[PHONE\]/g, phone);

    // Process markdown links FIRST (before other processing)
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline font-medium">$1</a>');

    // Process bold and italic
    line = line.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    line = line.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    // Check for headers
    if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      if (inTable) { finishTable(); }
      result.push(`<h3 class="text-xl font-bold text-secondary-900 mt-8 mb-4">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      if (inTable) { finishTable(); }
      result.push(`<h2 class="text-2xl font-bold text-secondary-900 mt-10 mb-4">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      if (inTable) { finishTable(); }
      result.push(`<h1 class="text-3xl font-bold text-secondary-900 mt-10 mb-4">${line.slice(2)}</h1>`);
      continue;
    }

    // Check for table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (inList) { result.push('</ul>'); inList = false; }

      // Check if it's a separator row (|---|---|)
      const cells = line.split('|').filter(c => c.trim());
      const isSeparator = cells.every(cell => /^[-:]+$/.test(cell.trim()));

      if (isSeparator) {
        // Mark previous row as header
        if (tableRows.length > 0) {
          tableRows[tableRows.length - 1] = tableRows[tableRows.length - 1].replace(/<td/g, '<th').replace(/<\/td>/g, '</th>');
        }
        inTable = true;
        continue;
      }

      // Regular table row
      const cellHtml = cells.map(cell => `<td class="border border-secondary-200 px-4 py-3">${cell.trim()}</td>`).join('');
      tableRows.push(`<tr>${cellHtml}</tr>`);
      inTable = true;
      continue;
    } else if (inTable) {
      finishTable();
    }

    // Check for unordered list items
    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        result.push('<ul class="list-disc list-inside space-y-2 my-4 text-secondary-700">');
        inList = true;
      }
      result.push(`<li>${listMatch[1]}</li>`);
      continue;
    }

    // Check for ordered list items
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      if (!inList) {
        result.push('<ol class="list-decimal list-inside space-y-2 my-4 text-secondary-700">');
        inList = true;
      }
      result.push(`<li>${orderedMatch[1]}</li>`);
      continue;
    }

    // Close list if we're no longer in one
    if (inList && line.trim() !== '') {
      result.push('</ul>');
      inList = false;
    }

    // Empty lines
    if (line.trim() === '') {
      continue;
    }

    // Italic text that starts with *
    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      result.push(`<p class="text-secondary-600 italic my-4">${line.slice(1, -1)}</p>`);
      continue;
    }

    // Regular paragraphs
    result.push(`<p class="text-secondary-700 leading-relaxed my-4">${line}</p>`);
  }

  // Close any open tags
  if (inList) result.push('</ul>');
  if (inTable) finishTable();

  function finishTable() {
    if (tableRows.length > 0) {
      result.push('<div class="overflow-x-auto my-8">');
      result.push('<table class="w-full border-collapse bg-white rounded-lg shadow-sm">');
      result.push('<tbody>');
      tableRows.forEach((row, idx) => {
        if (row.includes('<th')) {
          result.push(row.replace('<tr>', '<tr class="bg-secondary-100">').replace(/<th/g, '<th class="border border-secondary-200 px-4 py-3 text-left font-semibold text-secondary-900"'));
        } else {
          result.push(row.replace('<tr>', `<tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-secondary-50'}">`));
        }
      });
      result.push('</tbody>');
      result.push('</table>');
      result.push('</div>');
      tableRows = [];
      inTable = false;
    }
  }

  return result.join('\n');
}

// Only valid city slugs (starting with dumpster-rental-)
function isValidCitySlug(slug: string): boolean {
  return slug.startsWith('dumpster-rental-') && slug.length > 16;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, neighborhoodSlug, locale } = await params;

  if (!isValidCitySlug(slug)) {
    return {};
  }

  const actualCitySlug = slug.replace('dumpster-rental-', '');

  // Get city data
  const city = await prisma.city.findUnique({
    where: { slug: actualCitySlug },
    include: {
      state: true,
      neighborhoodPages: {
        where: { slug: neighborhoodSlug },
      },
      neighborhoods: {
        where: { slug: neighborhoodSlug },
      },
    },
  });

  if (!city) {
    return {};
  }

  const canonicalUrl = `https://www.dumpsterchamps.com/${slug}/${neighborhoodSlug}`;

  // Check if this is a SIZE page
  if (SIZE_SLUGS.includes(neighborhoodSlug)) {
    const sizeMap: Record<string, string> = {
      '10-yard-dumpster': '10 Yard',
      '15-yard-dumpster': '15 Yard',
      '20-yard-dumpster': '20 Yard',
      '30-yard-dumpster': '30 Yard',
      '40-yard-dumpster': '40 Yard',
    };
    const sizeName = sizeMap[neighborhoodSlug] || '20 Yard';

    return {
      title: `${sizeName} Dumpster Rental in ${city.name}, ${city.state.abbr} | From $495`,
      description: `Rent a ${sizeName.toLowerCase()} dumpster in ${city.name}, ${city.state.abbr}. Same-day delivery available. Flat-rate pricing with no hidden fees. Call now for immediate service!`,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${sizeName} Dumpster Rental in ${city.name}, ${city.state.abbr} | Dumpster Champs`,
        description: `Rent a ${sizeName.toLowerCase()} dumpster in ${city.name}. Fast delivery, flat-rate pricing.`,
        url: canonicalUrl,
        siteName: 'Dumpster Champs',
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${sizeName} Dumpster Rental in ${city.name}, ${city.state.abbr}`,
        description: `Rent a ${sizeName.toLowerCase()} dumpster in ${city.name}. Same-day delivery available.`,
      },
    };
  }

  // Check if this is a USE CASE page
  if (USE_CASE_SLUGS.includes(neighborhoodSlug)) {
    const useCaseMap: Record<string, string> = {
      'construction-dumpster': 'Construction',
      'roofing-dumpster': 'Roofing',
      'renovation-dumpster': 'Renovation',
      'cleanout-dumpster': 'Cleanout',
      'estate-cleanout-dumpster': 'Estate Cleanout',
      'yard-waste-dumpster': 'Yard Waste',
    };
    const useCaseName = useCaseMap[neighborhoodSlug] || 'Construction';

    return {
      title: `${useCaseName} Dumpster Rental in ${city.name}, ${city.state.abbr} | From $495`,
      description: `${useCaseName} dumpster rental in ${city.name}, ${city.state.abbr}. Fast delivery for ${useCaseName.toLowerCase()} projects. Flat-rate pricing with no hidden fees. Call now!`,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${useCaseName} Dumpster Rental in ${city.name}, ${city.state.abbr} | Dumpster Champs`,
        description: `${useCaseName} dumpster rental in ${city.name}. Fast delivery, flat-rate pricing.`,
        url: canonicalUrl,
        siteName: 'Dumpster Champs',
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${useCaseName} Dumpster Rental in ${city.name}, ${city.state.abbr}`,
        description: `${useCaseName} dumpster rental in ${city.name}. Same-day delivery available.`,
      },
    };
  }

  // Check for NeighborhoodPage first, then fall back to Neighborhood
  const neighborhoodPage = city.neighborhoodPages[0];
  const neighborhood = city.neighborhoods[0];

  if (!neighborhoodPage && !neighborhood) {
    return {};
  }

  const isEs = locale === 'es';
  const name = neighborhoodPage?.name || neighborhood?.name || neighborhoodSlug;

  // Strip "| Dumpster Champs" from metaTitle if present (layout template adds it)
  const rawTitle = isEs
    ? (neighborhoodPage?.metaTitleEs ?? neighborhoodPage?.metaTitle)
    : neighborhoodPage?.metaTitle;
  let pageTitle = rawTitle || `Dumpster Rental in ${name}, ${city.name} | From $495`;
  pageTitle = pageTitle.replace(/\s*\|\s*Dumpster Champs\s*$/i, '');

  const rawDesc = isEs
    ? (neighborhoodPage?.metaDescEs ?? neighborhoodPage?.metaDesc)
    : neighborhoodPage?.metaDesc;
  const pageDescription = rawDesc || `Fast, affordable dumpster rental in ${name}, ${city.name}, ${city.state.abbr}. Same-day delivery available. 10-40 yard roll-off dumpsters starting at $495. Call now!`;

  const enUrl = `https://www.dumpsterchamps.com/${slug}/${neighborhoodSlug}`;
  const esUrl = `https://www.dumpsterchamps.com/es/${slug}/${neighborhoodSlug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: isEs ? esUrl : enUrl,
      languages: {
        'en': enUrl,
        'es': esUrl,
      },
    },
    openGraph: {
      title: `${pageTitle} | Dumpster Champs`,
      description: pageDescription,
      url: isEs ? esUrl : enUrl,
      siteName: 'Dumpster Champs',
      locale: isEs ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | Dumpster Champs`,
      description: pageDescription,
    },
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug, neighborhoodSlug, locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  // Validate city slug format
  if (!isValidCitySlug(slug)) {
    notFound();
  }

  const actualCitySlug = slug.replace('dumpster-rental-', '');

  // Get city with both NeighborhoodPage and Neighborhood data
  const city = await prisma.city.findUnique({
    where: { slug: actualCitySlug },
    include: {
      state: true,
      neighborhoodPages: {
        where: { slug: neighborhoodSlug },
      },
      neighborhoods: {
        where: { slug: neighborhoodSlug },
      },
    },
  });

  if (!city) {
    notFound();
  }

  // Build unified data object
  let pageData: NeighborhoodData;

  // Check if this is a SIZE page
  if (SIZE_SLUGS.includes(neighborhoodSlug)) {
    const sizeMap: Record<string, string> = {
      '10-yard-dumpster': '10 Yard Dumpster',
      '15-yard-dumpster': '15 Yard Dumpster',
      '20-yard-dumpster': '20 Yard Dumpster',
      '30-yard-dumpster': '30 Yard Dumpster',
      '40-yard-dumpster': '40 Yard Dumpster',
    };
    pageData = {
      name: sizeMap[neighborhoodSlug] || '20 Yard Dumpster',
      slug: neighborhoodSlug,
      content: generateSizePageContent(neighborhoodSlug, city),
      zipCodes: null,
      metaTitle: null,
      metaDesc: null,
      isFallback: true,
    };
  }
  // Check if this is a USE CASE page
  else if (USE_CASE_SLUGS.includes(neighborhoodSlug)) {
    const useCaseMap: Record<string, string> = {
      'construction-dumpster': 'Construction Dumpster',
      'roofing-dumpster': 'Roofing Dumpster',
      'renovation-dumpster': 'Renovation Dumpster',
      'cleanout-dumpster': 'Cleanout Dumpster',
      'estate-cleanout-dumpster': 'Estate Cleanout Dumpster',
      'yard-waste-dumpster': 'Yard Waste Dumpster',
    };
    pageData = {
      name: useCaseMap[neighborhoodSlug] || 'Construction Dumpster',
      slug: neighborhoodSlug,
      content: generateUseCasePageContent(neighborhoodSlug, city),
      zipCodes: null,
      metaTitle: null,
      metaDesc: null,
      isFallback: true,
    };
  }
  // Try NeighborhoodPage first (has AI-generated content)
  else {
    const neighborhoodPage = city.neighborhoodPages[0];
    // Fall back to basic Neighborhood record
    const neighborhood = city.neighborhoods[0];

    // Must have at least one
    if (!neighborhoodPage && !neighborhood) {
      notFound();
    }

    if (neighborhoodPage) {
      // Use rich NeighborhoodPage content (locale-aware)
      pageData = {
        name: neighborhoodPage.name,
        slug: neighborhoodPage.slug,
        content: isEs ? (neighborhoodPage.contentEs ?? neighborhoodPage.content) : neighborhoodPage.content,
        zipCodes: neighborhoodPage.zipCodes,
        metaTitle: isEs ? (neighborhoodPage.metaTitleEs ?? neighborhoodPage.metaTitle) : neighborhoodPage.metaTitle,
        metaDesc: isEs ? (neighborhoodPage.metaDescEs ?? neighborhoodPage.metaDesc) : neighborhoodPage.metaDesc,
        isFallback: false,
      };
    } else {
      // Generate fallback content from Neighborhood data
      pageData = {
        name: neighborhood!.name,
        slug: neighborhood!.slug,
        content: generateFallbackContent(neighborhood!, city),
        zipCodes: neighborhood!.zipCodes,
        metaTitle: null,
        metaDesc: null,
        isFallback: true,
      };
    }
  }

  // Get all neighborhoods for this city (for sidebar and nearby areas)
  const allNeighborhoods = await prisma.neighborhood.findMany({
    where: { cityId: city.id },
    select: {
      name: true,
      slug: true,
    },
    orderBy: { name: 'asc' },
  });

  // Get neighboring areas (first 6 that aren't this one)
  const neighboringAreas = allNeighborhoods
    .filter((n) => n.slug !== neighborhoodSlug)
    .slice(0, 6);

  // Use city-specific phone (GBP) or default
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';

  // Determine if this is a size/use case page or neighborhood page
  const isSizeOrUseCasePage = SIZE_SLUGS.includes(neighborhoodSlug) || USE_CASE_SLUGS.includes(neighborhoodSlug);

  // Generate appropriate H1 title (locale-aware)
  const h1Title = isSizeOrUseCasePage
    ? `${pageData.name} in ${city.name}, ${city.state.abbr}`
    : (isEs
        ? `Alquiler de Contenedores en ${pageData.name}, ${city.name}`
        : `Dumpster Rental in ${pageData.name}, ${city.name}`);

  // Generate appropriate subtitle (locale-aware)
  const subtitle = isSizeOrUseCasePage
    ? `Looking for ${pageData.name.toLowerCase()} in ${city.name}? We offer fast, reliable roll-off dumpster delivery throughout ${city.name} and surrounding areas. Same-day service available with flat-rate pricing starting at $495.`
    : (isEs
        ? `¿Busca alquiler de contenedores en ${city.name}? Ofrecemos entrega rápida y confiable de contenedores roll-off en ${pageData.name} y zonas cercanas. Servicio el mismo día con precios fijos desde $495.`
        : `Looking for dumpster rental in ${city.name}? We offer fast, reliable roll-off dumpster delivery to ${pageData.name} and surrounding areas. Same-day service available with flat-rate pricing starting at $495.`);

  return (
    <>
      <LocalBusinessSchema
        name={`Dumpster Rental Champs - ${pageData.name}`}
        description={`Dumpster rental services in ${pageData.name}, ${city.name}, ${city.state.abbr}`}
        phone={phone}
        city={city.name}
        state={city.state.abbr}
        latitude={city.latitude}
        longitude={city.longitude}
      />

      {/* Breadcrumb */}
      <nav className="bg-secondary-100 py-3">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-secondary-600 hover:text-primary-600">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-secondary-400" />
            <li>
              <Link
                href={`/${slug}`}
                className="text-secondary-600 hover:text-primary-600"
              >
                {isEs ? `Contenedores en ${city.name}` : `${city.name} Dumpster Rental`}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-secondary-400" />
            <li className="text-secondary-900 font-medium">
              {pageData.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href={`/${slug}`}
                className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {city.name} Dumpster Rental
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {h1Title}
              </h1>

              <p className="text-xl text-secondary-200 mb-8">
                {subtitle}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Truck className="h-5 w-5 text-primary-400" />
                  <span>{isEs ? 'Entrega el Mismo Día' : 'Same-Day Delivery'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Shield className="h-5 w-5 text-primary-400" />
                  <span>{isEs ? 'Protección de Entrada' : 'Driveway Protection'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Clock className="h-5 w-5 text-primary-400" />
                  <span>{isEs ? 'Alquiler de 7-14 Días' : '7-14 Day Rentals'}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <Phone className="h-6 w-6" />
                {isEs ? `Llamar ${phone}` : `Call ${phone}`}
              </a>
            </div>

            {/* Quote Form */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                {isEs ? 'Obtenga una Cotización Gratis' : 'Get a Free Quote'}
              </h2>
              <QuoteForm source={`/${slug}/${neighborhoodSlug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-2">
              {/* Main Content - Render content with proper formatting */}
              <article
                className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-secondary-700 prose-li:text-secondary-700 prose-strong:text-secondary-900"
                dangerouslySetInnerHTML={{
                  __html: formatNeighborhoodContent(pageData.content)
                }}
              />

              {/* Service Type Links - ACROSS linking to non-geo service pages */}
              <div className="mt-12 p-6 bg-primary-50 rounded-xl">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Dumpster Types Available in {pageData.name}
                </h3>
                <p className="text-secondary-600 mb-4">
                  We offer a variety of dumpster rental options to match your project needs:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    href="/roll-off-dumpster-rental"
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg text-secondary-700 hover:text-primary-600 hover:shadow-md transition-all"
                  >
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span>Roll-Off Dumpster Rental</span>
                  </Link>
                  <Link
                    href="/construction-dumpster-rental"
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg text-secondary-700 hover:text-primary-600 hover:shadow-md transition-all"
                  >
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span>Construction Dumpster Rental</span>
                  </Link>
                  <Link
                    href="/residential-dumpster-rental"
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg text-secondary-700 hover:text-primary-600 hover:shadow-md transition-all"
                  >
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span>Residential Dumpster Rental</span>
                  </Link>
                  <Link
                    href="/small-dumpster-rental"
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg text-secondary-700 hover:text-primary-600 hover:shadow-md transition-all"
                  >
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span>Small Dumpster Rental</span>
                  </Link>
                </div>
              </div>

              {/* Neighboring Areas */}
              {neighboringAreas.length > 0 && (
                <div className="mt-8 p-6 bg-secondary-50 rounded-xl">
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">
                    Nearby Areas We Serve
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {neighboringAreas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/${slug}/${area.slug}`}
                        className="px-4 py-2 bg-white rounded-lg text-secondary-700 hover:text-primary-600 hover:shadow-md transition-all"
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Pricing Card - Enhanced for scannability */}
              <div className="bg-white rounded-xl shadow-lg border border-secondary-200 overflow-hidden mb-8">
                <div className="bg-secondary-900 text-white px-6 py-4">
                  <h3 className="text-xl font-bold">
                    {pageData.name} Pricing
                  </h3>
                  <p className="text-secondary-300 text-sm">Flat-rate, all-inclusive</p>
                </div>

                <div className="divide-y divide-secondary-100">
                  {/* 10 Yard */}
                  <div className="px-6 py-4 hover:bg-secondary-50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-secondary-900">10 Yard</span>
                      <span className="text-xl font-bold text-primary-600">$495</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-500 text-sm mb-3">
                      <Truck className="h-4 w-4" />
                      <span>x 4 pickup loads</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                      className="block w-full text-center bg-secondary-100 text-secondary-700 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Book 10 Yard
                    </a>
                  </div>

                  {/* 15 Yard */}
                  <div className="px-6 py-4 hover:bg-secondary-50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-secondary-900">15 Yard</span>
                      <span className="text-xl font-bold text-primary-600">$550</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-500 text-sm mb-3">
                      <Truck className="h-4 w-4" />
                      <span>x 6 pickup loads</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                      className="block w-full text-center bg-secondary-100 text-secondary-700 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Book 15 Yard
                    </a>
                  </div>

                  {/* 20 Yard - Most Popular */}
                  <div className="px-6 py-4 bg-primary-50 border-l-4 border-primary-500">
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="font-bold text-secondary-900">20 Yard</span>
                        <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">Most Popular</span>
                      </div>
                      <span className="text-xl font-bold text-primary-600">$595</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-500 text-sm mb-3">
                      <Truck className="h-4 w-4" />
                      <span>x 8 pickup loads</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                      className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Book 20 Yard
                    </a>
                  </div>

                  {/* 30 Yard */}
                  <div className="px-6 py-4 hover:bg-secondary-50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-secondary-900">30 Yard</span>
                      <span className="text-xl font-bold text-primary-600">$695</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-500 text-sm mb-3">
                      <Truck className="h-4 w-4" />
                      <span>x 12 pickup loads</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                      className="block w-full text-center bg-secondary-100 text-secondary-700 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Book 30 Yard
                    </a>
                  </div>

                  {/* 40 Yard */}
                  <div className="px-6 py-4 hover:bg-secondary-50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-secondary-900">40 Yard</span>
                      <span className="text-xl font-bold text-primary-600">$795</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-500 text-sm mb-3">
                      <Truck className="h-4 w-4" />
                      <span>x 16 pickup loads</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                      className="block w-full text-center bg-secondary-100 text-secondary-700 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Book 40 Yard
                    </a>
                  </div>
                </div>

                <div className="px-6 py-3 bg-secondary-50 text-xs text-secondary-600">
                  Includes delivery, pickup, disposal & 7-day rental
                </div>
              </div>

              {/* All Neighborhoods */}
              <div className="bg-secondary-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">
                  All {city.name} Areas
                </h3>
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                  {allNeighborhoods.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/${slug}/${area.slug}`}
                        className={`block px-3 py-2 rounded-lg transition-colors ${
                          area.slug === neighborhoodSlug
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'hover:bg-secondary-100 text-secondary-700'
                        }`}
                      >
                        <MapPin className="inline h-4 w-4 mr-2" />
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Rent a Dumpster in {pageData.name}?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Same-day delivery available. Flat-rate pricing with no hidden fees.
            Call now or get a free quote online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {phone}
            </a>
            <Link
              href={`/${slug}`}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-700 transition-colors border-2 border-white/30"
            >
              View All {city.name} Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
