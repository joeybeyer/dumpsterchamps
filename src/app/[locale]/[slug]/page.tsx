import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Phone, Check, Truck, Clock, Shield, Ruler, Package, Wrench, MapPin, HardHat, Home, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { setRequestLocale } from "next-intl/server";

// Force dynamic rendering to prevent DB access at build time
export const dynamic = "force-dynamic";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { LocalBusinessSchema, BreadcrumbSchema, ServiceSchema, ProductSchema, FAQSchema, DumpsterProductSchema, HowToSchema } from "@/components/seo/SchemaMarkup";
import { LastUpdated, WebPageSchema } from "@/components/seo/LastUpdated";
import {
  SizeCard,
  LocalFAQAccordion,
  DEFAULT_CITY_FAQS,
  NeighborhoodGrid,
  ClimateSection,
  PermitsSection,
  WhyChooseUs,
  ReviewsSection,
} from "@/components/city";
import { DUMPSTER_PRICING, DUMPSTER_SIZES } from "@/data/pricing";
import { DeliveryCounter } from "@/components/ui/TrustBadges";

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
  params: Promise<{ slug: string; locale: string }>;
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
  const { slug, locale } = await params;
  const pageType = await getPageType(slug);

  if (!pageType) {
    return { title: "Page Not Found" };
  }

  switch (pageType) {
    case "state": {
      const stateSlug = slug.replace("dumpster-rental-", "");
      const state = await prisma.state.findUnique({ where: { slug: stateSlug } });
      return {
        title: state?.metaTitle || `${state?.name} Dumpster Rental | Same-Day from $495 | No Hidden Fees`,
        description: state?.metaDesc || `Affordable dumpster rental in ${state?.name}. 10-40 yard roll-off containers from $495. Same-day delivery, flat-rate pricing, no hidden fees.`,
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

      const isEs = locale === 'es';
      const metaTitle = isEs
        ? (city?.metaTitleEs ?? city?.metaTitle)
        : city?.metaTitle;
      const metaDesc = isEs
        ? (city?.metaDescEs ?? city?.metaDesc)
        : city?.metaDesc;

      const fallbackTitle = `${city?.name}, ${city?.state.abbr} Dumpster Rental | Same-Day from $495 | No Hidden Fees`;

      return {
        title: metaTitle || fallbackTitle,
        description: metaDesc || `Affordable dumpster rental in ${city?.name}, ${city?.state.abbr}. 10-40 yard containers starting at $495. Same-day delivery, flat-rate pricing, no hidden fees. Call (888) 860-0710.`,
        alternates: {
          canonical: `https://www.dumpsterchamps.com/${isEs ? 'es/' : ''}dumpster-rental-${city?.slug}`,
          languages: {
            'en': `https://www.dumpsterchamps.com/dumpster-rental-${city?.slug}`,
            'es': `https://www.dumpsterchamps.com/es/dumpster-rental-${city?.slug}`,
          },
        },
        openGraph: {
          title: metaTitle || fallbackTitle,
          description: metaDesc || `Fast, affordable dumpster rentals in ${city?.name}. 10-40 yard roll-off containers with same-day delivery. Flat-rate pricing from $495.`,
          url: `https://www.dumpsterchamps.com/${isEs ? 'es/' : ''}dumpster-rental-${city?.slug}`,
          type: "website",
          locale: isEs ? "es_ES" : "en_US",
        },
        other: geoMetaTags,
      };
    }
    case "size": {
      const size = await prisma.dumpsterSize.findUnique({ where: { slug } });
      // Enhanced metadata with prices for SEO
      const sizeNum = parseInt(slug.split("-")[0]);
      const pricing = DUMPSTER_PRICING[sizeNum as keyof typeof DUMPSTER_PRICING];
      const price = pricing?.price || 495;

      // Unique titles per size page - conversion focused, unique differentiators, safe claims
      const sizeTitles: Record<string, string> = {
        "10-yard-dumpster": "10 Yard Dumpster Rental $350 | Small Projects & Cleanouts",
        "15-yard-dumpster": "15 Yard Dumpster Rental $425 | Roofing & Garage Cleanouts",
        "20-yard-dumpster": "20 Yard Dumpster Rental $495 | Renovations & Remodels",
        "30-yard-dumpster": "30 Yard Dumpster Rental $595 | Construction & Large Projects",
        "40-yard-dumpster": "40 Yard Dumpster Rental $695 | Commercial & Demolition",
      };

      return {
        title: { absolute: sizeTitles[slug] || `${sizeNum} Yard Dumpster Rental $${price} | Same-Day Delivery, No Hidden Fees` },
        description: `Rent a ${sizeNum} yard dumpster for $${price}. Holds ${pricing?.capacity || "multiple pickup loads"}. Perfect for ${pricing?.idealFor?.[0]?.toLowerCase() || "home projects"}. Same-day delivery, 7-day rental included. No hidden fees.`,
        keywords: `${sizeNum} yard dumpster rental, ${sizeNum} yard dumpster near me, ${sizeNum} yard roll off, ${sizeNum} yard container rental`,
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

// generateStaticParams removed - using force-dynamic instead

// ============ STATE PAGE COMPONENT ============
async function StatePage({ stateSlug, locale = 'en' }: { stateSlug: string; locale?: string }) {
  const state = await prisma.state.findUnique({
    where: { slug: stateSlug },
    include: { cities: { orderBy: { name: "asc" } } },
  });

  if (!state) return notFound();

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  // State-specific FAQs
  const stateFaqs = [
    {
      question: `How much does a dumpster rental cost in ${state.name}?`,
      answer: `Dumpster rental prices in ${state.name} range from $495 to $795 depending on size. This includes delivery, pickup, a 7-day rental period, and disposal. We offer 10, 15, 20, 30, and 40 yard dumpsters to fit any project.`,
    },
    {
      question: `Do I need a permit for a dumpster in ${state.name}?`,
      answer: `Permit requirements vary by city in ${state.name}. If you place the dumpster on your private property (like a driveway), you typically don't need a permit. For street placement, most cities require a right-of-way permit. Check with your local city for specific requirements.`,
    },
    {
      question: `How long can I keep a dumpster in ${state.name}?`,
      answer: `Our standard rental period is 7 days, which is included in the flat-rate price. Need it longer? No problem — we offer flexible extensions for an additional daily fee. Just let us know when you book or call us to extend.`,
    },
    {
      question: `What can I put in a dumpster in ${state.name}?`,
      answer: `Most household and construction debris is accepted, including furniture, appliances, drywall, wood, roofing materials, and yard waste. Prohibited items include hazardous materials, batteries, tires, paint, and chemicals. Contact us if you're unsure about a specific item.`,
    },
    {
      question: `Do you offer same-day dumpster delivery in ${state.name}?`,
      answer: `Yes! We offer same-day and next-day delivery in most ${state.name} cities when you order before noon. Delivery is available Monday through Saturday. Call us at ${phone} for the fastest service.`,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{state.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              {/* Last Updated - Visible timestamp for AI citation boost */}
              <LastUpdated date={state.updatedAt} className="text-secondary-300 mb-3" />

              {/* Kicker */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-primary-400 font-medium text-sm">
                  Serving {state.cities.length}+ Cities Across {state.name}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Dumpster Rental in {state.name}
              </h1>

              <p className="text-lg text-secondary-200 mb-6 leading-relaxed">
                {state.description || `Fast, affordable roll-off dumpster rentals throughout ${state.name}. 10-40 yard containers starting at $495 with same-day delivery, flat-rate pricing, and no hidden fees.`}
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
                  <MapPin className="h-4 w-4 text-primary-400" />
                  <span>{state.cities.length}+ Cities</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 w-fit"
              >
                <Phone className="h-5 w-5" />
                Call Now: {phone}
              </a>
            </div>

            {/* Quote Form */}
            <div id="quote-form" className="bg-white rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">
                Get Your Free Quote in 60 Seconds
              </h2>
              <QuoteForm stateName={state.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Dumpster Sizes & Pricing Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Dumpster Sizes & Pricing in {state.name}
          </h2>
          <p className="text-secondary-600 text-center mb-4 max-w-2xl mx-auto">
            Flat-rate pricing includes delivery, pickup, 7-day rental, and weight allowance. No hidden fees or surprise charges.
          </p>
          {/* Delivery Counter */}
          <div className="text-center mb-8">
            <DeliveryCounter locale={locale} />
          </div>
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
                locale={locale}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/dumpster-rental-prices"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              View Detailed Pricing Guide
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Dumpster Rental Services in {state.name}
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            We offer specialized dumpster rental solutions for every type of project across {state.name}.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link
              href="/roll-off-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Truck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Roll-Off Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Open-top containers for construction, renovations & large cleanouts
              </p>
            </Link>
            <Link
              href="/construction-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <HardHat className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Construction Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Job site waste solutions for contractors & builders
              </p>
            </Link>
            <Link
              href="/residential-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Home className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Residential Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Perfect for home cleanouts, renovations & yard waste
              </p>
            </Link>
            <Link
              href="/small-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Package className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Small Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Compact 10-15 yard options for smaller projects
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Cities We Serve in {state.name}
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            Click on any city below to see local dumpster rental options, pricing, and availability.
          </p>
          {state.cities.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {state.cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/dumpster-rental-${city.slug}`}
                  className="flex items-center gap-2 p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary-600 flex-shrink-0" />
                  <span className="text-secondary-800 font-medium hover:text-primary-600">{city.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-secondary-600 text-center">Contact us for dumpster rental services in {state.name}.</p>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Why Choose Dumpster Champs in {state.name}?
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            We&apos;re committed to providing the best dumpster rental experience across {state.name}.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">Same-Day Delivery</h3>
              <p className="text-secondary-600 text-sm">Order before noon for same-day delivery in most {state.name} cities.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">No Hidden Fees</h3>
              <p className="text-secondary-600 text-sm">Flat-rate pricing includes delivery, pickup, and disposal. No surprises.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">All Sizes Available</h3>
              <p className="text-secondary-600 text-sm">From 10-yard to 40-yard dumpsters for any project size.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2">5-Star Service</h3>
              <p className="text-secondary-600 text-sm">Friendly, professional service with excellent reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Frequently Asked Questions About Dumpster Rental in {state.name}
            </h2>
            <p className="text-secondary-600 text-center mb-8">
              Got questions? We&apos;ve got answers. Here are the most common questions about renting a dumpster in {state.name}.
            </p>
            <LocalFAQAccordion
              faqs={stateFaqs}
              cityName={state.name}
              stateName={state.name}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Rent a Dumpster in {state.name}?
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
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Locations", url: "https://www.dumpsterchamps.com/locations" },
          { name: state.name, url: `https://www.dumpsterchamps.com/dumpster-rental-${state.slug}` },
        ]}
      />
      <FAQSchema faqs={stateFaqs} />
      <WebPageSchema
        title={`Dumpster Rental ${state.name}`}
        description={state.description || `Affordable dumpster rental services in ${state.name}.`}
        url={`https://www.dumpsterchamps.com/dumpster-rental-${state.slug}`}
        dateModified={state.updatedAt}
      />
    </>
  );
}

// ============ CITY PAGE COMPONENT ============
async function CityPage({ citySlug, locale = 'en' }: { citySlug: string; locale?: string }) {
  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
    include: {
      state: true,
      neighborhoods: { orderBy: { name: "asc" } },
      faqs: { orderBy: { sortOrder: "asc" } },
      reviews: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!city) return notFound();

  // Get nearby cities sorted by geographic distance (if coordinates available)
  const allStateCities = await prisma.city.findMany({
    where: { stateId: city.stateId, id: { not: city.id } },
    select: { id: true, name: true, slug: true, latitude: true, longitude: true },
  });

  // Calculate distance and sort by proximity
  const nearbyCities = city.latitude && city.longitude
    ? allStateCities
        .map((nc) => ({
          ...nc,
          distance: nc.latitude && nc.longitude
            ? Math.sqrt(
                Math.pow((nc.latitude - city.latitude!) * 69, 2) +
                Math.pow((nc.longitude - city.longitude!) * 54.6, 2)
              )
            : Infinity,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6)
    : allStateCities.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 6);

  // Use city-specific phone (GBP) or default
  const phone = city.phone || process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  // Locale-aware field selection (Spanish with English fallback)
  const isEs = locale === 'es';
  const description = isEs ? (city.descriptionEs ?? city.description) : city.description;
  const aiDescription = isEs ? (city.aiDescriptionEs ?? city.aiDescription) : city.aiDescription;
  const whyChooseUs = isEs ? (city.whyChooseUsEs ?? city.whyChooseUs) : city.whyChooseUs;
  const climate = isEs ? (city.climateEs ?? city.climate) : city.climate;
  const permits = isEs ? (city.permitsEs ?? city.permits) : city.permits;

  // Use FAQs from database if available, otherwise use defaults
  const cityFaqs = city.faqs || [];
  const faqs: Array<{ id?: string; question: string; answer: string }> = cityFaqs.length > 0
    ? cityFaqs.map((f) => ({
        id: f.id,
        question: isEs ? (f.questionEs ?? f.question) : f.question,
        answer: isEs ? (f.answerEs ?? f.answer) : f.answer,
      }))
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
              {/* Last Updated - Visible timestamp for AI citation boost */}
              <LastUpdated date={city.updatedAt} className="text-secondary-300 mb-3" />

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
                  {isEs ? `#1 en Alquiler de Contenedores en ${city.name}` : `#1 Rated Dumpster Rental in ${city.name}`}
                </span>
              </div>

              {/* Headline - Problem-focused with BERT optimization */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {isEs
                  ? `Residentes de ${city.name}: Reciba un Contenedor Mañana`
                  : `${city.name} Homeowners: Get a Dumpster Delivered Tomorrow`}
              </h1>

              {/* Description - Addresses pain points */}
              <p className="text-lg text-secondary-200 mb-6 leading-relaxed">
                {description || (isEs
                  ? `Deje de perder tiempo con empresas poco confiables. Entregamos contenedores roll-off en ${city.name} rápido — precios fijos desde $495, sin tarifas ocultas, sin complicaciones.`
                  : `Stop wasting time with unreliable companies. We deliver roll-off dumpsters to ${city.name} driveways fast — flat-rate pricing from $495, no hidden fees, no hassles.`)}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Clock className="h-4 w-4 text-primary-400" />
                  <span>{isEs ? 'Entrega el Mismo Día' : 'Same-Day Delivery'}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Shield className="h-4 w-4 text-primary-400" />
                  <span>{isEs ? 'Sin Cargos Ocultos' : 'No Hidden Fees'}</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-800/60 px-3 py-2 rounded-lg text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{isEs ? '4.9 en Google' : '4.9 Google Rating'}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 w-fit"
              >
                <Phone className="h-5 w-5" />
                {isEs ? `Llame Ahora: ${phone}` : `Call Now: ${phone}`}
              </a>
            </div>

            {/* Quote Form */}
            <div id="quote-form" className="bg-white rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">
                {isEs ? 'Obtenga Su Cotización Gratis en 60 Segundos' : 'Get Your Free Quote in 60 Seconds'}
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
            {isEs ? `Tamaños y Precios de Contenedores en ${city.name}` : `Dumpster Sizes & Pricing in ${city.name}`}
          </h2>
          <p className="text-secondary-600 text-center mb-4 max-w-2xl mx-auto">
            {isEs
              ? 'El precio fijo incluye entrega, recogida, alquiler de 7 días y tolerancia de peso. Sin cargos ocultos ni sorpresas.'
              : 'Flat-rate pricing includes delivery, pickup, 7-day rental, and weight allowance. No hidden fees or surprise charges.'}
          </p>
          {/* Delivery Counter */}
          <div className="text-center mb-8">
            <DeliveryCounter locale={locale} />
          </div>
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
                locale={locale}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/dumpster-rental-prices"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              View Detailed Pricing Guide
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Types Section - Links to non-geo service pages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Dumpster Rental Services in {city.name}
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            We offer specialized dumpster rental solutions for every type of project in {city.name}.
            Choose the service that fits your needs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link
              href="/roll-off-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Truck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Roll-Off Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Open-top containers for construction, renovations & large cleanouts
              </p>
            </Link>
            <Link
              href="/construction-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Truck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Construction Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Job site waste solutions for contractors & builders
              </p>
            </Link>
            <Link
              href="/residential-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Truck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Residential Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Perfect for home cleanouts, renovations & yard waste
              </p>
            </Link>
            <Link
              href="/small-dumpster-rental"
              className="bg-secondary-50 rounded-xl p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Truck className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Small Dumpsters
              </h3>
              <p className="text-sm text-secondary-600">
                Compact 10-15 yard options for smaller projects
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* AI-Generated City Content Section */}
      {aiDescription && (
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className="ai-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdownContent(aiDescription!),
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <ReviewsSection
        cityName={city.name}
        stateAbbr={city.state.abbr}
        googleReviewUrl={city.googleReviewUrl || undefined}
        reviews={city.reviews && city.reviews.length > 0 ? city.reviews.map(r => ({
          name: r.author,
          location: city.name,
          rating: r.rating,
          text: r.text,
          date: r.date || undefined
        })) : undefined}
        locale={locale}
      />

      {/* Neighborhoods Section */}
      <NeighborhoodGrid
        neighborhoods={city.neighborhoods}
        cityName={city.name}
        citySlug={city.slug}
        stateName={city.state.name}
        coordinates={coordinates}
        gbpEmbed={city.gbpEmbed}
        locale={locale}
      />

      {/* Why Choose Us Section */}
      <WhyChooseUs
        cityName={city.name}
        stateName={city.state.name}
        whyChooseUs={whyChooseUs}
        locale={locale}
      />

      {/* Climate Section */}
      <ClimateSection
        climate={climate}
        cityName={city.name}
        stateName={city.state.name}
        locale={locale}
      />

      {/* Permits Section */}
      <PermitsSection
        permits={permits}
        cityName={city.name}
        stateName={city.state.name}
        county={city.county}
        locale={locale}
      />

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              {isEs
                ? `Preguntas Frecuentes sobre Alquiler de Contenedores en ${city.name}`
                : `Frequently Asked Questions About Dumpster Rental in ${city.name}`}
            </h2>
            <p className="text-secondary-600 text-center mb-8">
              {isEs
                ? `¿Tiene preguntas? Las respondemos. Aquí están las preguntas más comunes sobre alquiler de contenedores en ${city.name}.`
                : `Got questions? We've got answers. Here are the most common questions about renting a dumpster in ${city.name}.`}
            </p>
            <LocalFAQAccordion
              faqs={faqs}
              cityName={city.name}
              stateName={city.state.name}
            />
          </div>
        </div>
      </section>

      {/* Related Resources Section - Internal Linking for SEO */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-secondary-900 mb-6 text-center">
            {isEs ? 'Recursos Útiles' : 'Helpful Resources'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/dumpster-rental-prices"
              className="p-4 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <p className="font-semibold text-secondary-900 group-hover:text-primary-600">{isEs ? 'Guía de Precios' : 'Pricing Guide'}</p>
              <p className="text-sm text-secondary-500">{isEs ? 'Ver todos los tamaños y precios' : 'See all sizes & prices'}</p>
            </Link>
            <Link
              href="/calculator"
              className="p-4 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <p className="font-semibold text-secondary-900 group-hover:text-primary-600">{isEs ? 'Calculadora de Tamaño' : 'Size Calculator'}</p>
              <p className="text-sm text-secondary-500">{isEs ? 'Encuentre su tamaño perfecto' : 'Find your perfect size'}</p>
            </Link>
            <Link
              href="/what-size-dumpster-do-i-need"
              className="p-4 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <p className="font-semibold text-secondary-900 group-hover:text-primary-600">{isEs ? 'Guía de Tamaños' : 'Size Guide'}</p>
              <p className="text-sm text-secondary-500">{isEs ? '¿Cuál tamaño es el correcto?' : 'Which size is right?'}</p>
            </Link>
            <Link
              href="/do-i-need-permit-for-dumpster"
              className="p-4 bg-secondary-50 rounded-lg hover:bg-primary-50 transition-colors group"
            >
              <p className="font-semibold text-secondary-900 group-hover:text-primary-600">{isEs ? 'Info sobre Permisos' : 'Permit Info'}</p>
              <p className="text-sm text-secondary-500">{isEs ? '¿Necesita uno?' : 'Do you need one?'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Cities Section - Internal Linking for SEO */}
      {nearbyCities.length > 0 && (
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2 text-center">
              {isEs ? `Alquiler de Contenedores en Ciudades Cercanas de ${city.state.name}` : `Dumpster Rental in Nearby ${city.state.name} Cities`}
            </h2>
            <p className="text-secondary-600 text-center mb-6">
              {isEs ? `También servimos estas ciudades cerca de ${city.name}:` : `We also serve these cities near ${city.name}:`}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {nearbyCities.map((nc) => (
                <Link
                  key={nc.id}
                  href={`/dumpster-rental-${nc.slug}`}
                  className="p-4 bg-white rounded-lg text-center text-secondary-800 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
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
            {isEs ? `¿Listo para Alquilar un Contenedor en ${city.name}?` : `Ready to Rent a Dumpster in ${city.name}?`}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {isEs
              ? '¡Obtenga su cotización gratis hoy! Entrega el mismo día disponible. Precios fijos sin cargos ocultos.'
              : 'Get your free quote today! Same-day delivery available. Flat-rate pricing with no hidden fees.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {isEs ? `Llamar ${phone}` : `Call ${phone}`}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              {isEs ? 'Solicitar Cotización en Línea' : 'Request Online Quote'}
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema
        name={`Dumpster Champs - ${city.name}`}
        description={`Affordable dumpster rental services in ${city.name}, ${city.state.abbr}. Same-day delivery available.`}
        phone={phone}
        url={`https://www.dumpsterchamps.com/dumpster-rental-${city.slug}`}
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
        faqs={Array.isArray(faqs) ? faqs
          .filter((f) => f.question && f.answer)
          .map((f) => ({
            question: f.question.replace(/\[CITY\]/g, city.name).replace(/\[STATE\]/g, city.state.name),
            answer: f.answer.replace(/\[CITY\]/g, city.name).replace(/\[STATE\]/g, city.state.name),
          })) : []}
      />
      <WebPageSchema
        title={`Dumpster Rental ${city.name}, ${city.state.abbr}`}
        description={description || `Affordable dumpster rental in ${city.name}, ${city.state.abbr}.`}
        url={`https://www.dumpsterchamps.com/dumpster-rental-${city.slug}`}
        dateModified={city.updatedAt}
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

          {/* Last Updated - Visible timestamp for AI citation boost */}
          <LastUpdated date={size.updatedAt} className="text-secondary-300 mb-4" />

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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{size.name} Rental from {size.priceRange?.split("-")[0] || "$495"}</h1>
              <p className="text-xl text-secondary-200 mb-6">
                Looking for a {size.size} yard dumpster rental near you? {size.description} Same-day delivery available in most areas.
              </p>

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

          {/* Cross-linking for SEO - "Need a different size?" */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {size.size > 10 && (
              <Link
                href={`/${size.size === 15 ? 10 : size.size === 20 ? 15 : size.size === 30 ? 20 : 30}-yard-dumpster`}
                className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Need smaller? Try {size.size === 15 ? 10 : size.size === 20 ? 15 : size.size === 30 ? 20 : 30} Yard
              </Link>
            )}
            {size.size < 40 && (
              <Link
                href={`/${size.size === 10 ? 15 : size.size === 15 ? 20 : size.size === 20 ? 30 : 40}-yard-dumpster`}
                className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                Need bigger? Try {size.size === 10 ? 15 : size.size === 15 ? 20 : size.size === 20 ? 30 : 40} Yard
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Calculator CTA Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Not Sure If a {size.size} Yard Is Right for You?
            </h2>
            <p className="text-lg text-primary-100 mb-6 max-w-2xl mx-auto">
              Use our free dumpster size calculator to get a personalized recommendation based on your specific project.
              Avoid paying for space you don&apos;t need — or running out of room mid-project.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              Try the Size Calculator →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Rent a {size.name} Near You?</h2>
          <p className="text-xl text-primary-100 mb-8">Get your free quote today! Same-day delivery in most areas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">Get a Free Quote</Link>
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              <Phone className="h-5 w-5" />{phone}
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      {(() => {
        const sizeNum = size.size;
        const pricingData = DUMPSTER_PRICING[sizeNum as keyof typeof DUMPSTER_PRICING];
        return pricingData ? (
          <DumpsterProductSchema
            size={sizeNum}
            price={pricingData.price}
            dimensions={pricingData.dimensions}
            capacity={pricingData.capacity}
            weightLimit={pricingData.weight}
          />
        ) : (
          <ProductSchema
            name={size.name}
            description={size.description || `${size.name} rental for residential and commercial projects.`}
            url={`https://www.dumpsterchamps.com/${size.slug}`}
            priceRange={size.priceRange || "$350-$850"}
          />
        );
      })()}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Dumpster Sizes", url: "https://www.dumpsterchamps.com/dumpster-sizes" },
          { name: size.name, url: `https://www.dumpsterchamps.com/${size.slug}` },
        ]}
      />
      <HowToSchema
        name={`How to Rent a ${size.size} Yard Dumpster`}
        description={`Step-by-step guide to renting a ${size.size} yard dumpster for your project. Takes just 5 minutes to order.`}
        steps={[
          {
            name: "Choose Your Dumpster Size",
            text: `Select a ${size.size} yard dumpster based on your project needs. This size holds ${DUMPSTER_PRICING[size.size as keyof typeof DUMPSTER_PRICING]?.capacity || "several pickup truck loads"} and is ideal for ${DUMPSTER_PRICING[size.size as keyof typeof DUMPSTER_PRICING]?.idealFor?.[0] || "various projects"}.`,
          },
          {
            name: "Get a Free Quote",
            text: "Call (888) 860-0710 or fill out our online form for instant pricing. Our all-inclusive rate covers delivery, pickup, and a 7-day rental period.",
          },
          {
            name: "Schedule Delivery",
            text: "Choose your delivery date. Same-day and next-day delivery available in most areas. We'll confirm placement location and any access requirements.",
          },
          {
            name: "Fill Your Dumpster",
            text: "Load your debris into the dumpster. Keep materials level with the top edge - no overflow allowed. Avoid prohibited items like batteries, tires, and hazardous materials.",
          },
          {
            name: "Schedule Pickup",
            text: "When you're done or at the end of your rental period, call us to schedule pickup. We'll haul away your debris and dispose of it responsibly.",
          },
        ]}
        totalTime="PT5M"
      />
      <WebPageSchema
        title={size.name}
        description={size.description || `${size.name} rental for residential and commercial projects.`}
        url={`https://www.dumpsterchamps.com/${size.slug}`}
        dateModified={size.updatedAt}
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

          {/* Last Updated - Visible timestamp for AI citation boost */}
          <LastUpdated date={service.updatedAt} className="text-secondary-300 mb-4" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content (natural reading flow) */}
            <div>
              <span className="inline-block bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {service.name}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl text-secondary-200 mb-6">
                {service.description} Prices start at <strong className="text-white">$495</strong> with everything included.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                  <Phone className="h-5 w-5" />Order Now: {phone}
                </a>
                <Link href="#prices" className="inline-flex items-center justify-center gap-2 border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary-900 transition-colors">
                  View All Prices
                </Link>
              </div>

              {/* Mobile Hero Image - shown below CTAs on small screens */}
              {content?.image && (
                <div className="lg:hidden relative mt-8">
                  <div className="relative aspect-[4/3] max-w-sm mx-auto rounded-xl overflow-hidden">
                    <Image
                      src={content.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Hero Image (Desktop only) */}
            <div className="hidden lg:block relative">
              {content?.image && (
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                  <Image
                    src={content.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary-50 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2 text-center">Get Your Free Quote</h2>
              <p className="text-secondary-600 mb-6 text-center">No hidden fees. Instant pricing.</p>
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

      <section id="prices" className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2 text-center">Roll Off Dumpster Sizes & Prices</h2>
          <p className="text-secondary-600 mb-8 text-center">All prices include delivery, pickup, 7-day rental, weight allowance, and disposal.</p>
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
      <WebPageSchema
        title={service.name}
        description={service.description || `Professional ${service.name.toLowerCase()} services nationwide.`}
        url={`https://www.dumpsterchamps.com/${service.slug}`}
        dateModified={service.updatedAt}
      />
    </>
  );
}

// ============ MAIN PAGE COMPONENT ============
export default async function DynamicPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const pageType = await getPageType(slug);

  if (!pageType) {
    notFound();
  }

  switch (pageType) {
    case "state":
      return <StatePage stateSlug={slug.replace("dumpster-rental-", "")} locale={locale} />;
    case "city":
      return <CityPage citySlug={slug.replace("dumpster-rental-", "")} locale={locale} />;
    case "size":
      return <SizePage sizeSlug={slug} />;
    case "service":
      return <ServicePage serviceSlug={slug} />;
    default:
      notFound();
  }
}
