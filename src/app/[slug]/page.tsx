import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Phone, Check, Truck, Clock, Shield, Ruler, Package, Wrench, MapPin, HardHat, Home, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { LocalBusinessSchema, BreadcrumbSchema, ServiceSchema, ProductSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import {
  SizeCard,
  LocalFAQAccordion,
  DEFAULT_CITY_FAQS,
  NeighborhoodGrid,
  ClimateSection,
  PermitsSection,
  WhyChooseUs,
} from "@/components/city";
import { DUMPSTER_PRICING, DUMPSTER_SIZES } from "@/data/pricing";

/**
 * Convert markdown content to HTML with proper formatting
 */
function formatMarkdownContent(content: string): string {
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Define valid slugs
const validSizeSlugs = [
  "10-yard-dumpster",
  "15-yard-dumpster",
  "20-yard-dumpster",
  "30-yard-dumpster",
  "40-yard-dumpster",
];

const validServiceSlugs = [
  "roll-off-dumpster-rental",
  "construction-dumpsters",
  "residential-dumpsters",
];

type PageType = "state" | "city" | "size" | "service" | null;

async function getPageType(slug: string): Promise<PageType> {
  // Check if it's a state page (dumpster-rental-{state})
  if (slug.startsWith("dumpster-rental-")) {
    const stateOrCitySlug = slug.replace("dumpster-rental-", "");

    // First check if it's a state
    const state = await prisma.state.findUnique({
      where: { slug: stateOrCitySlug },
    });
    if (state) return "state";

    // Then check if it's a city
    const city = await prisma.city.findUnique({
      where: { slug: stateOrCitySlug },
    });
    if (city) return "city";
  }

  // Check if it's a size page
  if (validSizeSlugs.includes(slug)) return "size";

  // Check if it's a service page
  if (validServiceSlugs.includes(slug)) return "service";

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageType = await getPageType(slug);

  if (!pageType) {
    return { title: "Page Not Found" };
  }

  switch (pageType) {
    case "state": {
      const stateSlug = slug.replace("dumpster-rental-", "");
      const state = await prisma.state.findUnique({ where: { slug: stateSlug } });
      return {
        title: state?.metaTitle || `Dumpster Rental ${state?.name}`,
        description: state?.metaDesc || state?.description,
      };
    }
    case "city": {
      const citySlug = slug.replace("dumpster-rental-", "");
      const city = await prisma.city.findUnique({
        where: { slug: citySlug },
        include: { state: true },
      });

      // Build geo meta tags for city pages
      const geoMetaTags: Record<string, string> = {};
      if (city?.latitude && city?.longitude) {
        geoMetaTags["geo.position"] = `${city.latitude};${city.longitude}`;
        geoMetaTags["ICBM"] = `${city.latitude}, ${city.longitude}`;
      }
      if (city?.name && city?.state?.abbr) {
        geoMetaTags["geo.placename"] = `${city.name}, ${city.state.abbr}`;
        geoMetaTags["geo.region"] = `US-${city.state.abbr}`;
      }

      return {
        title: city?.metaTitle || `Dumpster Rental ${city?.name}, ${city?.state.abbr} | Same-Day Delivery`,
        description: city?.metaDesc || `Affordable dumpster rental in ${city?.name}, ${city?.state.abbr}. 10-40 yard containers starting at $495. Same-day delivery, flat-rate pricing, no hidden fees. Call (888) 860-0710.`,
        openGraph: {
          title: `Dumpster Rental ${city?.name}, ${city?.state.abbr} | Dumpster Champs`,
          description: `Fast, affordable dumpster rentals in ${city?.name}. 10-40 yard roll-off containers with same-day delivery. Flat-rate pricing from $495.`,
          url: `https://www.dumpsterchamps.com/dumpster-rental-${city?.slug}`,
          type: "website",
          locale: "en_US",
        },
        other: geoMetaTags,
      };
    }
    case "size": {
      const size = await prisma.dumpsterSize.findUnique({ where: { slug } });
      return {
        title: size?.metaTitle || size?.name,
        description: size?.metaDesc || size?.description,
      };
    }
    case "service": {
      const service = await prisma.service.findUnique({ where: { slug } });
      return {
        title: service?.metaTitle || service?.name,
        description: service?.metaDesc || service?.description,
      };
    }
  }
}

export async function generateStaticParams() {
  // Generate all state pages
  const states = await prisma.state.findMany({ select: { slug: true } });
  const stateParams = states.map((s) => ({ slug: `dumpster-rental-${s.slug}` }));

  // Generate all city pages
  const cities = await prisma.city.findMany({ select: { slug: true } });
  const cityParams = cities.map((c) => ({ slug: `dumpster-rental-${c.slug}` }));

  // Generate size pages
  const sizeParams = validSizeSlugs.map((slug) => ({ slug }));

  // Generate service pages
  const serviceParams = validServiceSlugs.map((slug) => ({ slug }));

  return [...stateParams, ...cityParams, ...sizeParams, ...serviceParams];
}

// ============ STATE PAGE COMPONENT ============
async function StatePage({ stateSlug }: { stateSlug: string }) {
  const state = await prisma.state.findUnique({
    where: { slug: stateSlug },
    include: { cities: { orderBy: { name: "asc" } } },
  });

  if (!state) return notFound();

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{state.name}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Dumpster Rental in {state.name}</h1>
          <p className="text-xl text-secondary-200 max-w-3xl">{state.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Cities We Serve in {state.name}</h2>
              {state.cities.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {state.cities.map((city) => (
                    <Link
                      key={city.id}
                      href={`/dumpster-rental-${city.slug}`}
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all"
                    >
                      <MapPin className="h-4 w-4 text-primary-600 flex-shrink-0" />
                      <span className="text-secondary-800 hover:text-primary-600">{city.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-secondary-600">Contact us for dumpster rental services in {state.name}.</p>
              )}

              <div className="mt-12 prose prose-secondary max-w-none">
                <h2>Dumpster Rental Services in {state.name}</h2>
                <p>Dumpster Champs provides reliable and affordable roll-off dumpster rentals throughout {state.name}.</p>
                <h3>Available Dumpster Sizes</h3>
                <ul>
                  <li><strong>10 Yard Dumpster</strong> - Perfect for small cleanouts</li>
                  <li><strong>15 Yard Dumpster</strong> - Ideal for medium-sized projects</li>
                  <li><strong>20 Yard Dumpster</strong> - Our most popular size</li>
                  <li><strong>30 Yard Dumpster</strong> - Great for large renovations</li>
                  <li><strong>40 Yard Dumpster</strong> - Best for major commercial projects</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">Get a Free Quote</h3>
                  <QuoteForm stateName={state.name} />
                </div>
                <div className="bg-primary-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-primary-100 mb-4">Call us for immediate assistance.</p>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-xl font-bold hover:text-primary-100">
                    <Phone className="h-5 w-5" />{phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============ CITY PAGE COMPONENT ============
async function CityPage({ citySlug }: { citySlug: string }) {
  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
    include: {
      state: true,
      neighborhoods: { orderBy: { name: "asc" } },
      faqs: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!city) return notFound();

  const nearbyCities = await prisma.city.findMany({
    where: { stateId: city.stateId, id: { not: city.id } },
    take: 6,
    orderBy: { name: "asc" },
  });

  // Use city-specific phone (GBP) or default
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  // Use FAQs from database if available, otherwise use defaults
  const cityFaqs = city.faqs || [];
  const faqs: Array<{ id?: string; question: string; answer: string }> = cityFaqs.length > 0
    ? cityFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))
    : (DEFAULT_CITY_FAQS || []);

  // Coordinates for map
  const coordinates = city.latitude && city.longitude
    ? { lat: city.latitude, lng: city.longitude }
    : null;

  return (
    <>
      {/* Hero Section - Optimized for Conversion */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/dumpster-rental-${city.state.slug}`} className="hover:text-white">{city.state.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{city.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              {/* Kicker - Social Proof */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-primary-400 font-medium text-sm">
                  #1 Rated Dumpster Rental in {city.name}
                </span>
              </div>

              {/* Headline - Problem-focused with BERT optimization */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {city.name} Homeowners: Get a Dumpster Delivered Tomorrow
              </h1>

              {/* Description - Addresses pain points */}
              <p className="text-lg text-secondary-200 mb-6 leading-relaxed">
                {city.description || `Stop wasting time with unreliable companies. We deliver roll-off dumpsters to ${city.name} driveways fast — flat-rate pricing from $495, no hidden fees, no hassles.`}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Clock className="h-4 w-4 text-primary-400" />
                  <span>Same-Day Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Shield className="h-4 w-4 text-primary-400" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>4.9 Google Rating</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Call Now: {phone}
                </a>
                <Link
                  href="#quote-form"
                  className="border-2 border-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-white hover:text-secondary-900 transition-colors"
                >
                  Get Online Quote
                </Link>
              </div>
            </div>

            {/* Quote Form */}
            <div id="quote-form" className="bg-white rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">
                Get Your Free Quote in 60 Seconds
              </h2>
              <QuoteForm cityName={city.name} stateName={city.state.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Dumpster Sizes Section - Updated Pricing */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Dumpster Sizes & Pricing in {city.name}
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            Flat-rate pricing includes delivery, pickup, 7-day rental, and weight allowance.
            No hidden fees or surprise charges.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {DUMPSTER_SIZES.map((d) => (
              <SizeCard
                key={d.size}
                size={d.size}
                price={d.price}
                weight={d.weight}
                dimensions={d.dimensions}
                capacity={d.capacity}
                idealFor={d.idealFor}
                isPopular={"popular" in d && d.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI-Generated City Content Section */}
      {city.aiDescription && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="ai-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdownContent(city.aiDescription),
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods Section */}
      <NeighborhoodGrid
        neighborhoods={city.neighborhoods}
        cityName={city.name}
        stateName={city.state.name}
        coordinates={coordinates}
        gbpEmbed={city.gbpEmbed}
      />

      {/* Why Choose Us Section */}
      <WhyChooseUs
        cityName={city.name}
        stateName={city.state.name}
        whyChooseUs={city.whyChooseUs}
      />

      {/* Climate Section */}
      <ClimateSection
        climate={city.climate}
        cityName={city.name}
        stateName={city.state.name}
      />

      {/* Permits Section */}
      <PermitsSection
        permits={city.permits}
        cityName={city.name}
        stateName={city.state.name}
        county={city.county}
      />

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Frequently Asked Questions About Dumpster Rental in {city.name}
            </h2>
            <p className="text-secondary-600 text-center mb-8">
              Got questions? We&apos;ve got answers. Here are the most common questions about renting a dumpster in {city.name}.
            </p>
            <LocalFAQAccordion
              faqs={faqs}
              cityName={city.name}
              stateName={city.state.name}
            />
          </div>
        </div>
      </section>

      {/* Nearby Cities Section */}
      {nearbyCities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Also Serving Nearby Cities in {city.state.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nc) => (
                <Link
                  key={nc.id}
                  href={`/dumpster-rental-${nc.slug}`}
                  className="p-4 bg-secondary-50 rounded-lg text-center text-secondary-800 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                >
                  {nc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Rent a Dumpster in {city.name}?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get your free quote today! Same-day delivery available. Flat-rate pricing with no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call {phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Request Online Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema
        city={city.name}
        state={city.state.name}
        latitude={city.latitude}
        longitude={city.longitude}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Locations", url: "https://www.dumpsterchamps.com/locations" },
          { name: city.state.name, url: `https://www.dumpsterchamps.com/dumpster-rental-${city.state.slug}` },
          { name: city.name, url: `https://www.dumpsterchamps.com/dumpster-rental-${city.slug}` },
        ]}
      />
      <FAQSchema
        faqs={Array.isArray(faqs) ? faqs.map((f) => ({
          question: f.question.replace(/\[CITY\]/g, city.name).replace(/\[STATE\]/g, city.state.name),
          answer: f.answer.replace(/\[CITY\]/g, city.name).replace(/\[STATE\]/g, city.state.name),
        })) : []}
      />
    </>
  );
}

// ============ SIZE PAGE COMPONENT ============
async function SizePage({ sizeSlug }: { sizeSlug: string }) {
  const size = await prisma.dumpsterSize.findUnique({ where: { slug: sizeSlug } });
  if (!size) return notFound();

  const allSizes = await prisma.dumpsterSize.findMany({ orderBy: { size: "asc" } });
  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";
  const idealForList = size.idealFor?.split(", ") || [];

  // Map size to image
  const sizeImages: Record<number, string> = {
    10: "/images/dumpsters/10-yard.jpg",
    15: "/images/dumpsters/15-yard.jpg",
    20: "/images/dumpsters/20-yard.jpg",
    30: "/images/dumpsters/30-yard.jpg",
    40: "/images/dumpsters/40-yard.jpg",
  };

  return (
    <>
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/dumpster-sizes" className="hover:text-white">Dumpster Sizes</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{size.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Size Image */}
              {sizeImages[size.size] && (
                <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={sizeImages[size.size]}
                    alt={`${size.name} - ${size.dimensions}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{size.name}</h1>
              <p className="text-xl text-secondary-200 mb-6">{size.description}</p>

              {/* Price with transparency message */}
              <div className="bg-secondary-800/60 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-primary-400">{size.priceRange}</span>
                  <span className="text-secondary-300">Flat-rate pricing</span>
                </div>
                <p className="text-sm text-secondary-300">
                  <Shield className="h-4 w-4 inline mr-1 text-primary-400" />
                  Price includes delivery, pickup, 7-day rental, and weight allowance. No hidden fees.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Get a Quote for {size.name}</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <Ruler className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Dimensions</h3>
              <p className="text-2xl font-bold text-primary-600">{size.dimensions}</p>
            </div>
            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <Package className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Capacity</h3>
              <p className="text-secondary-700">{size.capacity}</p>
            </div>
            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <Wrench className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Best For</h3>
              <p className="text-secondary-700">{idealForList.slice(0, 2).join(", ")}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Ideal For:</h2>
              <div className="space-y-3">
                {idealForList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary-600 rounded-full p-1 mt-0.5"><Check className="h-4 w-4 text-white" /></div>
                    <span className="text-secondary-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">What&apos;s Included?</h2>
              <div className="space-y-4">
                {["Delivery to your location", "7-10 day rental period", "Pickup when you're done", "Disposal of accepted materials", "No hidden fees"].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-600 rounded-full p-1 mt-0.5"><Check className="h-4 w-4 text-white" /></div>
                    <span className="text-secondary-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">Compare All Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-4 text-left text-secondary-900">Size</th>
                  <th className="px-6 py-4 text-left text-secondary-900">Dimensions</th>
                  <th className="px-6 py-4 text-left text-secondary-900">Price</th>
                  <th className="px-6 py-4 text-left text-secondary-900"></th>
                </tr>
              </thead>
              <tbody>
                {allSizes.map((s) => (
                  <tr key={s.id} className={`border-b ${s.id === size.id ? "bg-primary-50" : ""}`}>
                    <td className="px-6 py-4 font-semibold">{s.size} Yard {s.id === size.id && <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-1 rounded">Current</span>}</td>
                    <td className="px-6 py-4 text-secondary-600">{s.dimensions}</td>
                    <td className="px-6 py-4 font-semibold text-primary-600">{s.priceRange}</td>
                    <td className="px-6 py-4">{s.id !== size.id && <Link href={`/${s.slug}`} className="text-primary-600 hover:underline">View</Link>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Rent a {size.name}?</h2>
          <p className="text-xl text-primary-100 mb-8">Get your free quote today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">Get a Free Quote</Link>
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              <Phone className="h-5 w-5" />{phone}
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <ProductSchema
        name={size.name}
        description={size.description || `${size.name} rental for residential and commercial projects.`}
        url={`https://www.dumpsterchamps.com/${size.slug}`}
        priceRange={size.priceRange || "$350-$850"}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Dumpster Sizes", url: "https://www.dumpsterchamps.com/dumpster-sizes" },
          { name: size.name, url: `https://www.dumpsterchamps.com/${size.slug}` },
        ]}
      />
    </>
  );
}

// ============ SERVICE PAGE COMPONENT ============
async function ServicePage({ serviceSlug }: { serviceSlug: string }) {
  const service = await prisma.service.findUnique({ where: { slug: serviceSlug } });
  if (!service) return notFound();

  const sizes = await prisma.dumpsterSize.findMany({ orderBy: { size: "asc" } });
  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  const serviceContent: Record<string, { icon: typeof Truck; image: string; benefits: string[]; useCases: string[] }> = {
    "roll-off-dumpster-rental": {
      icon: Truck,
      image: "/images/services/roll-off-dumpster-rental.jpg",
      benefits: ["Available in 10-40 yard sizes", "Easy-to-load rear swing door", "Perfect for any project", "Flexible rental periods", "Same-day delivery"],
      useCases: ["Home renovations", "Roofing projects", "Estate cleanouts", "Construction debris", "Yard waste disposal"],
    },
    "construction-dumpsters": {
      icon: HardHat,
      image: "/images/services/construction-dumpsters.jpg",
      benefits: ["Heavy-duty construction", "Handles concrete and debris", "Available in large sizes", "Long-term rental options", "Reliable pickup schedules"],
      useCases: ["New construction", "Demolition projects", "Commercial renovations", "Roofing tear-offs", "Large-scale cleanups"],
    },
    "residential-dumpsters": {
      icon: Home,
      image: "/images/services/residential-dumpsters.jpg",
      benefits: ["Compact sizes for driveways", "Perfect for weekend projects", "Affordable pricing", "Quick delivery", "Flexible rentals"],
      useCases: ["Garage cleanouts", "Kitchen remodels", "Landscaping projects", "Spring cleaning", "Moving preparation"],
    },
  };

  const content = serviceContent[serviceSlug];
  const Icon = content?.icon || Truck;

  return (
    <>
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{service.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Service Hero Image */}
              {content?.image && (
                <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={content.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl text-secondary-200 mb-6">{service.description}</p>
              <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 bg-white text-secondary-900 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                <Phone className="h-5 w-5" />Call {phone}
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Get a Free Quote</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {content && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Why Choose Our {service.name}?</h2>
                <div className="space-y-4">
                  {content.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-primary-600 rounded-full p-1 mt-0.5"><Check className="h-4 w-4 text-white" /></div>
                      <span className="text-secondary-700">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Common Use Cases</h2>
                <div className="space-y-4">
                  {content.useCases.map((u, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-green-600 rounded-full p-1 mt-0.5"><Check className="h-4 w-4 text-white" /></div>
                      <span className="text-secondary-700">{u}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">Available Dumpster Sizes</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sizes.map((s) => (
              <Link key={s.id} href={`/${s.slug}`} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-primary-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">{s.size}</div>
                <h3 className="font-semibold text-secondary-900 mb-1">{s.name}</h3>
                <p className="text-primary-600 font-semibold">{s.priceRange}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8">Get a free quote for our {service.name.toLowerCase()} service!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">Get a Free Quote</Link>
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              <Phone className="h-5 w-5" />{phone}
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <ServiceSchema
        name={service.name}
        description={service.description || `Professional ${service.name.toLowerCase()} services nationwide.`}
        url={`https://www.dumpsterchamps.com/${service.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Services", url: "https://www.dumpsterchamps.com/services" },
          { name: service.name, url: `https://www.dumpsterchamps.com/${service.slug}` },
        ]}
      />
    </>
  );
}

// ============ MAIN PAGE COMPONENT ============
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageType = await getPageType(slug);

  if (!pageType) {
    notFound();
  }

  switch (pageType) {
    case "state":
      return <StatePage stateSlug={slug.replace("dumpster-rental-", "")} />;
    case "city":
      return <CityPage citySlug={slug.replace("dumpster-rental-", "")} />;
    case "size":
      return <SizePage sizeSlug={slug} />;
    case "service":
      return <ServicePage serviceSlug={slug} />;
    default:
      notFound();
  }
}
