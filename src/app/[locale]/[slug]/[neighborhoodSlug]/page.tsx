/**
 * Neighborhood Page (Spoke Page)
 * Part of Hub & Spoke silo architecture for S2 cell targeting
 *
 * Route: /dumpster-rental-{city-slug}/{neighborhood-slug}/
 * Example: /dumpster-rental-los-angeles-ca/hollywood/
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

interface PageProps {
  params: Promise<{
    slug: string;
    neighborhoodSlug: string;
    locale: string;
  }>;
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

/**
 * Generate fallback content for neighborhoods without AI-generated content
 */
function generateFallbackContent(
  neighborhoodName: string,
  cityName: string,
  stateAbbr: string,
  description: string | null,
  zipCodes: string | null,
  citySlug: string
): string {
  const phone = process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';
  const zipList = zipCodes ? zipCodes.split(',').map(z => z.trim()).join(', ') : '';

  return `## Professional Dumpster Rental in ${neighborhoodName}

Dumpster Champs provides fast, reliable [dumpster rental in ${cityName}](/${citySlug}) with service to ${neighborhoodName} and surrounding areas. Whether you are tackling a home renovation, construction project, or major cleanout, we have the right size dumpster for your needs.

${description || `${neighborhoodName} is a vibrant community in ${cityName}, ${stateAbbr}. Our local team provides prompt delivery and pickup throughout the area.`}

## Dumpster Sizes Available

We offer a full range of [roll-off dumpster](/roll-off-dumpster-rental) sizes to match any project:

- **10 Yard Dumpster** - Perfect for small cleanouts and minor renovations
- **15 Yard Dumpster** - Great for medium-sized projects and garage cleanouts
- **20 Yard Dumpster** - Our most popular size for home renovations
- **30 Yard Dumpster** - Ideal for large construction projects
- **40 Yard Dumpster** - Maximum capacity for commercial jobs

## Why Choose Dumpster Champs in ${neighborhoodName}?

- **Same-Day Delivery** - Need a dumpster fast? We can often deliver the same day you call
- **Flat-Rate Pricing** - No hidden fees or surprise charges
- **Driveway Protection** - We use boards to protect your property
- **Flexible Rental Periods** - Standard 7-14 day rentals with extensions available
- **Local Service** - Our drivers know ${neighborhoodName} and ${cityName}

## Service Area Information

${zipList ? `We deliver to all addresses in ${neighborhoodName} including ZIP codes: ${zipList}.` : `We deliver throughout ${neighborhoodName} and the greater ${cityName} area.`}

## Ready to Get Started?

Call us today at [PHONE] for a free quote. Our team is ready to help you choose the right dumpster size and schedule delivery at your convenience.`;
}

// Only valid city slugs (starting with dumpster-rental-)
function isValidCitySlug(slug: string): boolean {
  return slug.startsWith('dumpster-rental-') && slug.length > 16;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, neighborhoodSlug } = await params;

  if (!isValidCitySlug(slug)) {
    return {};
  }

  const actualCitySlug = slug.replace('dumpster-rental-', '');

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

  // Try NeighborhoodPage first, fall back to Neighborhood
  const neighborhoodPage = city.neighborhoodPages[0];
  const neighborhood = city.neighborhoods[0];

  if (!neighborhoodPage && !neighborhood) {
    return {};
  }

  const name = neighborhoodPage?.name || neighborhood?.name || '';

  return {
    title: neighborhoodPage?.metaTitle || `Dumpster Rental in ${name}, ${city.name} | Dumpster Champs`,
    description: neighborhoodPage?.metaDesc || `Fast, affordable dumpster rental in ${name}, ${city.name}, ${city.state.abbr}. Same-day delivery available. 10-40 yard roll-off dumpsters. Call now!`,
    alternates: {
      canonical: `https://www.dumpsterchamps.com/${slug}/${neighborhoodSlug}`,
    },
  };
}

// generateStaticParams removed - using force-dynamic instead

export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug, neighborhoodSlug, locale } = await params;
  setRequestLocale(locale);

  // Validate city slug format
  if (!isValidCitySlug(slug)) {
    notFound();
  }

  const actualCitySlug = slug.replace('dumpster-rental-', '');

  // Get city and neighborhood page data (NeighborhoodPage has AI-generated content)
  // Also fetch from Neighborhood table as fallback
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

  // Check if we have either a NeighborhoodPage or a Neighborhood
  const neighborhoodPage = city?.neighborhoodPages[0];
  const neighborhoodBasic = city?.neighborhoods[0];

  if (!city || (!neighborhoodPage && !neighborhoodBasic)) {
    notFound();
  }

  // Use NeighborhoodPage if available, otherwise create a fallback object from Neighborhood
  const hasDetailedContent = !!neighborhoodPage;
  const neighborhoodData = neighborhoodPage || {
    name: neighborhoodBasic!.name,
    slug: neighborhoodBasic!.slug,
    content: generateFallbackContent(neighborhoodBasic!.name, city.name, city.state.abbr, neighborhoodBasic!.description, neighborhoodBasic!.zipCodes, slug),
    zipCodes: neighborhoodBasic!.zipCodes,
  };

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

  return (
    <>
      <LocalBusinessSchema
        name={`Dumpster Rental Champs - ${neighborhoodData.name}`}
        description={`Dumpster rental services in ${neighborhoodData.name}, ${city.name}, ${city.state.abbr}`}
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
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-secondary-400" />
            <li>
              <Link
                href={`/${slug}`}
                className="text-secondary-600 hover:text-primary-600"
              >
                {city.name} Dumpster Rental
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-secondary-400" />
            <li className="text-secondary-900 font-medium">
              {neighborhoodData.name}
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
                Dumpster Rental in {neighborhoodData.name}, {city.name}
              </h1>

              <p className="text-xl text-secondary-200 mb-8">
                Looking for <Link href={`/${slug}`} className="text-primary-300 hover:text-primary-200 underline">dumpster rental in {city.name}</Link>?
                We offer fast, reliable <Link href="/roll-off-dumpster-rental" className="text-primary-300 hover:text-primary-200 underline">roll-off dumpster</Link> delivery
                to {neighborhoodData.name} and surrounding areas. Same-day service available with flat-rate pricing starting at $495.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Truck className="h-5 w-5 text-primary-400" />
                  <span>Same-Day Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Shield className="h-5 w-5 text-primary-400" />
                  <span>Driveway Protection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Clock className="h-5 w-5 text-primary-400" />
                  <span>7-14 Day Rentals</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <Phone className="h-6 w-6" />
                Call {phone}
              </a>
            </div>

            {/* Quote Form */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Get a Free Quote
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
              {/* Main Content - Render AI-generated content with proper formatting */}
              <article
                className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-secondary-700 prose-li:text-secondary-700 prose-strong:text-secondary-900"
                dangerouslySetInnerHTML={{
                  __html: formatNeighborhoodContent(neighborhoodData.content)
                }}
              />

              {/* Service Type Links - ACROSS linking to non-geo service pages */}
              <div className="mt-12 p-6 bg-primary-50 rounded-xl">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Dumpster Types Available in {neighborhoodData.name}
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
                    {neighborhoodData.name} Pricing
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
            Ready to Rent a Dumpster in {neighborhoodData.name}?
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
// Force rebuild Sat Jan 10 19:01:57 UTC 2026
