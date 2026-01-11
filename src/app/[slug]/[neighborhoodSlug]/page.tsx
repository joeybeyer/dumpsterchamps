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
import { readFileSync } from 'fs';
import { join } from 'path';

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
      neighborhoods: {
        where: { slug: neighborhoodSlug },
      },
    },
  });

  if (!city || city.neighborhoods.length === 0) {
    return {};
  }

  const neighborhood = city.neighborhoods[0];

  return {
    title: `Dumpster Rental in ${neighborhood.name}, ${city.name} | Dumpster Champs`,
    description: `Fast, affordable dumpster rental in ${neighborhood.name}, ${city.name}, ${city.state.abbr}. Same-day delivery available. 10-40 yard roll-off dumpsters. Call now!`,
    alternates: {
      canonical: `https://www.dumpsterchamps.com/${slug}/${neighborhoodSlug}`,
    },
  };
}

export async function generateStaticParams() {
  // Use static JSON file instead of Prisma query at build time
  const filePath = join(process.cwd(), "src/lib/neighborhood-routes.json");
  const fileContent = readFileSync(filePath, "utf8");
  const routes = JSON.parse(fileContent);
  return routes;
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
      neighborhoods: {
        where: { slug: neighborhoodSlug },
      },
    },
  });

  if (!city || city.neighborhoods.length === 0) {
    notFound();
  }

  const neighborhood = city.neighborhoods[0];

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
    .filter(n => n.slug !== neighborhoodSlug)
    .slice(0, 6);

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
              {/* Main Content */}
              <article className="prose prose-lg max-w-none">
                <h2>Reliable Dumpster Rental Services in {neighborhood.name}</h2>
                <p>
                  {neighborhood.description || `Looking for dumpster rental in ${neighborhood.name}, ${city.name}? Dumpster Champs provides fast, affordable roll-off dumpster delivery to ${neighborhood.name} and surrounding neighborhoods. Whether you're tackling a home renovation, construction project, or major cleanout, we have the right size dumpster for your needs.`}
                </p>

                <h3>Why Choose Dumpster Champs in {neighborhood.name}?</h3>
                <ul>
                  <li><strong>Same-Day Delivery:</strong> Need a dumpster fast? We offer same-day delivery to {neighborhood.name} when you call before noon.</li>
                  <li><strong>Flat-Rate Pricing:</strong> No hidden fees. Our prices include delivery, pickup, disposal, and a 7-day rental period.</li>
                  <li><strong>Multiple Sizes:</strong> From 10-yard dumpsters for small cleanouts to 40-yard containers for major construction projects.</li>
                  <li><strong>Driveway Protection:</strong> We use boards under our dumpsters to protect your driveway from damage.</li>
                  <li><strong>Local Service:</strong> We know {city.name} and can help you navigate any permit requirements for {neighborhood.name}.</li>
                </ul>

                <h3>Dumpster Sizes Available in {neighborhood.name}</h3>
                <p>
                  We offer a full range of roll-off dumpster sizes to handle any project in {neighborhood.name}:
                </p>
                <ul>
                  <li><strong>10 Yard Dumpster ($495):</strong> Perfect for small cleanouts, single-room renovations, or yard debris.</li>
                  <li><strong>15 Yard Dumpster ($550):</strong> Great for medium-sized projects like garage cleanouts or small remodels.</li>
                  <li><strong>20 Yard Dumpster ($595):</strong> Our most popular size! Ideal for whole-house cleanouts and medium construction projects.</li>
                  <li><strong>30 Yard Dumpster ($695):</strong> Best for large renovation projects or commercial cleanouts.</li>
                  <li><strong>40 Yard Dumpster ($795):</strong> Maximum capacity for major construction or demolition projects.</li>
                </ul>

                <h3>What Can You Put in a Dumpster?</h3>
                <p>Our dumpsters accept most common waste materials including:</p>
                <ul>
                  <li>Household junk and furniture</li>
                  <li>Construction debris (drywall, lumber, flooring)</li>
                  <li>Yard waste and landscaping debris</li>
                  <li>Roofing materials (shingles, underlayment)</li>
                  <li>Appliances (without refrigerants)</li>
                </ul>
                <p><strong>Not accepted:</strong> Hazardous materials, paint, chemicals, tires, batteries, and refrigerants.</p>
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
              {/* Pricing Card - Enhanced for scannability */}
              <div className="bg-white rounded-xl shadow-lg border border-secondary-200 overflow-hidden mb-8">
                <div className="bg-secondary-900 text-white px-6 py-4">
                  <h3 className="text-xl font-bold">
                    {neighborhood.name} Pricing
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
// Force rebuild Sat Jan 10 19:01:57 UTC 2026
