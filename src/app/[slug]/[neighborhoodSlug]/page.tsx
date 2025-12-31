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
import { QuoteForm } from '@/components/forms/QuoteForm';
import { LocalBusinessSchema } from '@/components/seo/SchemaMarkup';
import { Phone, MapPin, ArrowLeft, ChevronRight, Truck, Shield, Clock } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
    neighborhoodSlug: string;
  }>;
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

  const city = await prisma.city.findUnique({
    where: { slug: slug.replace('dumpster-rental-', '') },
    include: {
      state: true,
      neighborhoodPages: {
        where: { slug: neighborhoodSlug },
      },
    },
  });

  if (!city || city.neighborhoodPages.length === 0) {
    return {};
  }

  const neighborhood = city.neighborhoodPages[0];

  return {
    title: neighborhood.metaTitle || `Dumpster Rental in ${neighborhood.name}, ${city.name} | Dumpster Champs`,
    description: neighborhood.metaDesc || `Fast, affordable dumpster rental in ${neighborhood.name}, ${city.name}, ${city.state.abbr}. Same-day delivery available. 10-40 yard roll-off dumpsters. Call now!`,
    alternates: {
      canonical: `https://www.dumpsterchamps.com/${slug}/${neighborhoodSlug}`,
    },
  };
}

export async function generateStaticParams() {
  // Get all neighborhood pages with their city slugs
  const neighborhoodPages = await prisma.neighborhoodPage.findMany({
    select: {
      slug: true,
      city: {
        select: { slug: true },
      },
    },
    take: 500, // Limit for build performance
  });

  return neighborhoodPages.map((page) => ({
    slug: `dumpster-rental-${page.city.slug}`,
    neighborhoodSlug: page.slug,
  }));
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug, neighborhoodSlug } = await params;

  // Validate city slug format
  if (!isValidCitySlug(slug)) {
    notFound();
  }

  const actualCitySlug = slug.replace('dumpster-rental-', '');

  // Get city and neighborhood data
  const city = await prisma.city.findUnique({
    where: { slug: actualCitySlug },
    include: {
      state: true,
      neighborhoodPages: {
        where: { slug: neighborhoodSlug },
      },
    },
  });

  if (!city || city.neighborhoodPages.length === 0) {
    notFound();
  }

  const neighborhood = city.neighborhoodPages[0];

  // Get neighboring neighborhoods for ACROSS linking
  const neighborSlugs = neighborhood.neighborSlugs?.split(',').filter(Boolean) || [];
  const neighboringAreas = await prisma.neighborhoodPage.findMany({
    where: {
      cityId: city.id,
      slug: { in: neighborSlugs },
    },
    select: {
      name: true,
      slug: true,
    },
  });

  // Get all neighborhoods for this city (for sidebar)
  const allNeighborhoods = await prisma.neighborhoodPage.findMany({
    where: { cityId: city.id },
    select: {
      name: true,
      slug: true,
    },
    orderBy: { name: 'asc' },
  });

  // Use city-specific phone (GBP) or default
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || '(888) 860-0710';

  return (
    <>
      <LocalBusinessSchema
        name={`Dumpster Rental Champs - ${neighborhood.name}`}
        description={`Dumpster rental services in ${neighborhood.name}, ${city.name}, ${city.state.abbr}`}
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
              {neighborhood.name}
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
                Dumpster Rental in {neighborhood.name}, {city.name}
              </h1>

              <p className="text-xl text-secondary-200 mb-8">
                Looking for <Link href={`/${slug}`} className="text-primary-300 hover:text-primary-200 underline">dumpster rental in {city.name}</Link>?
                We offer fast, reliable <Link href="/roll-off-dumpster-rental" className="text-primary-300 hover:text-primary-200 underline">roll-off dumpster</Link> delivery
                to {neighborhood.name} and surrounding areas. Same-day service available with flat-rate pricing starting at $495.
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
              {/* AI-Generated Content */}
              <article className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(neighborhood.content),
                  }}
                />
              </article>

              {/* Service Type Links - ACROSS linking to non-geo service pages */}
              <div className="mt-12 p-6 bg-primary-50 rounded-xl">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  Dumpster Types Available in {neighborhood.name}
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
              {/* Pricing Card */}
              <div className="bg-primary-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  {neighborhood.name} Pricing
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary-200">
                      <th className="text-left py-2">Size</th>
                      <th className="text-right py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-primary-100">
                      <td className="py-2">10 Yard</td>
                      <td className="text-right font-semibold">$495</td>
                    </tr>
                    <tr className="border-b border-primary-100">
                      <td className="py-2">15 Yard</td>
                      <td className="text-right font-semibold">$550</td>
                    </tr>
                    <tr className="border-b border-primary-100 bg-primary-100">
                      <td className="py-2 font-medium">20 Yard ⭐</td>
                      <td className="text-right font-bold text-primary-700">$595</td>
                    </tr>
                    <tr className="border-b border-primary-100">
                      <td className="py-2">30 Yard</td>
                      <td className="text-right font-semibold">$695</td>
                    </tr>
                    <tr>
                      <td className="py-2">40 Yard</td>
                      <td className="text-right font-semibold">$795</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-secondary-600 mt-3">
                  Includes delivery, pickup, and disposal. 7-day rental included.
                </p>
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
            Ready to Rent a Dumpster in {neighborhood.name}?
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

/**
 * Basic markdown to HTML conversion
 */
function formatMarkdown(content: string): string {
  if (!content) return '';

  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline">$1</a>')
    // Unordered lists
    .replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/gim, '<ul>$1</ul>')
    // Ordered lists
    .replace(/^\s*\d+\.\s+(.*)$/gim, '<li>$1</li>')
    // Tables (basic support)
    .replace(/\|(.+)\|/gim, (match) => {
      const cells = match.split('|').filter(Boolean);
      const row = cells.map(cell => `<td class="border px-3 py-2">${cell.trim()}</td>`).join('');
      return `<tr>${row}</tr>`;
    })
    // Paragraphs (wrap remaining text)
    .replace(/^(?!<[hulo]|<t)(.+)$/gim, '<p>$1</p>')
    // Clean up
    .replace(/<ul><ul>/g, '<ul>')
    .replace(/<\/ul><\/ul>/g, '</ul>')
    .replace(/<p><\/p>/g, '')
    .replace(/\n\n+/g, '\n');
}
