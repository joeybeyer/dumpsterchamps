import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, X, AlertTriangle, Recycle, Info, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2026-01-11");

export const metadata: Metadata = {
  title: "What Goes in a Dumpster? Disposal Guide [2026]",
  description:
    "Complete 2026 guide to dumpster disposal rules. Learn exactly what items are accepted, prohibited, and how to avoid contamination fees. Includes disposal alternatives.",
  openGraph: {
    title: "What Goes in a Dumpster? Disposal Guide [2026]",
    description: "Complete guide to what you can and can't put in a dumpster, with disposal alternatives for prohibited items.",
    type: "article",
  },
};

const acceptedItems = {
  household: {
    title: "Household Items",
    icon: "🏠",
    items: [
      "Furniture (couches, chairs, tables, dressers)",
      "Mattresses and box springs*",
      "Clothing and textiles",
      "Books, magazines, paper products",
      "Toys and sporting equipment",
      "Pots, pans, kitchenware",
      "Rugs and carpeting",
      "Curtains and blinds",
      "Small decor items",
      "Non-electronic appliances (toasters, blenders)",
    ],
    note: "*May incur additional fee in some areas",
  },
  construction: {
    title: "Construction & Renovation Debris",
    icon: "🔨",
    items: [
      "Lumber and wood scraps",
      "Drywall and sheetrock",
      "Roofing shingles (asphalt)",
      "Siding materials (vinyl, wood)",
      "Flooring (carpet, tile, hardwood, laminate)",
      "Cabinets and countertops",
      "Doors (interior and exterior)",
      "Windows (glass removed recommended)",
      "Trim, molding, baseboards",
      "Insulation (non-asbestos)",
      "Plumbing fixtures (sinks, tubs)",
      "Light fixtures",
    ],
    note: "Heavy materials may affect weight limits",
  },
  yard: {
    title: "Yard Waste",
    icon: "🌿",
    items: [
      "Tree branches and limbs",
      "Shrubs and bushes",
      "Grass clippings",
      "Leaves and mulch",
      "Small stumps (check size limits)",
      "Dirt and soil (non-contaminated)*",
      "Sod and turf",
      "Fencing materials",
      "Deck wood",
      "Landscape timbers",
    ],
    note: "*Heavy—watch weight limits. Some areas restrict soil.",
  },
  heavy: {
    title: "Heavy Materials (Weight Limits Apply)",
    icon: "🧱",
    items: [
      "Concrete and cement",
      "Brick and block",
      "Asphalt pieces",
      "Stone and rock",
      "Ceramic tile",
      "Porcelain fixtures",
    ],
    note: "IMPORTANT: These fill weight limits fast. 1 cubic yard of concrete = ~4,000 lbs. Consider dedicated heavy debris load.",
  },
};

const prohibitedItems = {
  hazardous: {
    title: "Hazardous Materials",
    icon: "☠️",
    reason: "Environmental contamination, legal requirements",
    items: [
      { item: "Paints, stains, varnishes", disposal: "Local HHW collection events, paint recyclers" },
      { item: "Solvents and thinners", disposal: "Hazardous waste facility" },
      { item: "Motor oil, antifreeze, brake fluid", disposal: "Auto parts stores (free), service stations" },
      { item: "Pesticides and herbicides", disposal: "HHW collection events" },
      { item: "Cleaning chemicals", disposal: "HHW events, use up before disposal" },
      { item: "Pool chemicals", disposal: "HHW facility" },
      { item: "Propane tanks", disposal: "Propane dealers, scrap metal yards" },
      { item: "Asbestos materials", disposal: "Licensed asbestos contractor required" },
    ],
  },
  electronics: {
    title: "Electronics (E-Waste)",
    icon: "💻",
    reason: "Contains hazardous materials, recyclable components",
    items: [
      { item: "Computers and laptops", disposal: "E-waste recyclers, Best Buy, Staples" },
      { item: "TVs and monitors", disposal: "E-waste recyclers, retailer programs" },
      { item: "Printers and copiers", disposal: "Office supply stores, recyclers" },
      { item: "Cell phones and tablets", disposal: "Carrier stores, manufacturer programs" },
      { item: "Batteries (all types)", disposal: "Battery recyclers, hardware stores, Call2Recycle" },
    ],
  },
  appliances: {
    title: "Appliances with Refrigerants",
    icon: "❄️",
    reason: "Freon/refrigerants damage ozone layer, EPA regulated",
    items: [
      { item: "Refrigerators", disposal: "Appliance recyclers, utility rebate programs" },
      { item: "Freezers", disposal: "Appliance recyclers, junk removal" },
      { item: "Air conditioners", disposal: "HVAC companies, recyclers" },
      { item: "Dehumidifiers", disposal: "Appliance recyclers" },
      { item: "Water coolers (with refrigeration)", disposal: "Appliance recyclers" },
    ],
  },
  other: {
    title: "Other Prohibited Items",
    icon: "🚫",
    reason: "Safety, legal, or processing issues",
    items: [
      { item: "Tires", disposal: "Tire dealers, auto shops, municipal collection" },
      { item: "Medical waste/sharps", disposal: "Pharmacies, hospitals, mail-back programs" },
      { item: "Pharmaceuticals", disposal: "Drug take-back programs, pharmacies" },
      { item: "Ammunition/explosives", disposal: "Local police department" },
      { item: "Flammable liquids", disposal: "HHW facilities" },
      { item: "Large amounts of food waste", disposal: "Composting, municipal trash" },
      { item: "Contaminated soil", disposal: "Environmental remediation company" },
    ],
  },
};

const checkFirst = [
  {
    item: "Mattresses",
    situation: "Accepted in most areas, but some charge $25-50 extra due to processing requirements",
  },
  {
    item: "Large stumps/root balls",
    situation: "May be accepted with size limits (typically under 4\" diameter)",
  },
  {
    item: "Hot tubs/spas",
    situation: "Often accepted if drained and cut up; may need prior approval",
  },
  {
    item: "Empty aerosol cans",
    situation: "Usually OK if completely empty; full cans are prohibited",
  },
  {
    item: "Treated lumber",
    situation: "Some areas restrict due to chemical treatment; check local rules",
  },
  {
    item: "Yard waste",
    situation: "Not accepted in all areas; some require separation",
  },
];

const weightChart = [
  { material: "Concrete/Brick", weight: "3,000-4,000 lbs", perCubicYard: true, warning: true },
  { material: "Soil/Dirt", weight: "2,000-2,500 lbs", perCubicYard: true, warning: true },
  { material: "Roofing Shingles", weight: "2,000-2,500 lbs", perCubicYard: true, warning: true },
  { material: "Drywall", weight: "500-800 lbs", perCubicYard: true, warning: false },
  { material: "Wood/Lumber", weight: "300-600 lbs", perCubicYard: true, warning: false },
  { material: "Household Junk", weight: "200-400 lbs", perCubicYard: true, warning: false },
  { material: "Cardboard/Paper", weight: "100-200 lbs", perCubicYard: true, warning: false },
];

const faqs = [
  {
    question: "What happens if I put prohibited items in the dumpster?",
    answer: "If prohibited items are found, you may face: 1) A contamination fee of $75-250+ depending on the item, 2) The driver refusing to pick up until items are removed, 3) A trip fee for the driver returning later, or 4) Additional disposal fees from the landfill. It's always cheaper to dispose of prohibited items properly from the start.",
  },
  {
    question: "Can I put a refrigerator in a dumpster?",
    answer: "No, refrigerators and other appliances with refrigerants (freezers, AC units, dehumidifiers) cannot go in dumpsters. The refrigerant must be professionally removed first due to EPA regulations. Contact an appliance recycler, your utility company's rebate program, or a junk removal service for proper disposal.",
  },
  {
    question: "Is it OK to put concrete in a dumpster?",
    answer: "Yes, concrete is generally accepted, BUT it's extremely heavy—about 4,000 lbs per cubic yard. A small amount of concrete can quickly exceed your weight allowance. For concrete-heavy projects, consider: 1) A dedicated heavy debris dumpster, 2) Separating concrete from other debris, or 3) Using a concrete recycler directly.",
  },
  {
    question: "Can I throw away a mattress in a dumpster?",
    answer: "In most areas, yes—but some locations charge an additional processing fee ($25-50) because mattresses require special handling at landfills. Check with your rental company before including mattresses. Alternatives include mattress recyclers, donation (if in good condition), or retailer take-back programs.",
  },
  {
    question: "What's the penalty for putting tires in a dumpster?",
    answer: "Tires are prohibited at most landfills because they trap gases and can damage landfill structure. The contamination fee is typically $10-25 per tire, plus a possible trip fee if the driver has to return. Instead, take tires to a tire dealer, auto shop, or municipal tire collection event—many accept them for free or a small fee.",
  },
];

export default async function WhatCanGoInDumpster({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-secondary-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">What Can Go in a Dumpster</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Complete Disposal Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                What Can & Can&apos;t Go in a Dumpster? The Complete 2026 Guide
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                Know before you throw. Putting the wrong items in your dumpster can result in contamination fees of $75-250+. This guide covers everything you can dispose of, what&apos;s prohibited, and alternatives for items that can&apos;t go in the dumpster.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>10 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/what-can-go-in-dumpster-hero.jpg"
                alt="Dumpster being properly loaded with acceptable construction and renovation debris"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Rule */}
      <section className="py-8 bg-green-50 border-b border-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-green-900 mb-2">The General Rule</h2>
            <p className="text-lg text-green-800">
              If it&apos;s <strong>non-hazardous</strong> and you could throw it in your regular trash can (just in larger quantity), it can probably go in the dumpster. When in doubt, ask first!
            </p>
          </div>
        </div>
      </section>

      {/* Accepted Items */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                <Check className="inline h-8 w-8 text-green-600 mr-2" />
                What You CAN Put in a Dumpster
              </h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                These items are generally accepted in roll-off dumpsters. Always check for local variations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.values(acceptedItems).map((category, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.title}
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-secondary-700">
                        <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {category.note && (
                    <p className="text-sm text-secondary-600 bg-white p-3 rounded-lg">
                      <Info className="inline h-4 w-4 mr-1" />
                      {category.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weight Warning */}
      <section className="py-12 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-yellow-900 mb-2">Weight Matters: Heavy Materials Guide</h2>
                <p className="text-yellow-800">
                  Some accepted materials are very heavy and can exceed your weight allowance before filling the dumpster. Know these weights to avoid overage fees.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="px-6 py-4 text-left font-semibold text-yellow-900">Material</th>
                    <th className="px-6 py-4 text-left font-semibold text-yellow-900">Weight per Cubic Yard</th>
                    <th className="px-6 py-4 text-left font-semibold text-yellow-900">Watch Out?</th>
                  </tr>
                </thead>
                <tbody>
                  {weightChart.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
                      <td className="px-6 py-4 font-medium text-secondary-900">{row.material}</td>
                      <td className="px-6 py-4 text-secondary-700">{row.weight}</td>
                      <td className="px-6 py-4">
                        {row.warning ? (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                            <AlertTriangle className="h-4 w-4" /> Heavy!
                          </span>
                        ) : (
                          <span className="text-green-600">✓ Generally OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Prohibited Items */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                <X className="inline h-8 w-8 text-red-600 mr-2" />
                What You CAN&apos;T Put in a Dumpster
              </h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                These items are prohibited due to environmental, safety, or legal reasons. We&apos;ve included proper disposal alternatives for each.
              </p>
            </div>

            <div className="space-y-8">
              {Object.values(prohibitedItems).map((category, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.title}
                  </h3>
                  <p className="text-red-700 text-sm mb-4">
                    <strong>Why prohibited:</strong> {category.reason}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-red-100">
                          <th className="px-4 py-3 text-left font-semibold text-red-900">Item</th>
                          <th className="px-4 py-3 text-left font-semibold text-red-900">
                            <Recycle className="inline h-4 w-4 mr-1" />
                            Proper Disposal
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, j) => (
                          <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-red-50/50"}>
                            <td className="px-4 py-3 text-secondary-900">{item.item}</td>
                            <td className="px-4 py-3 text-secondary-600">{item.disposal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Check First */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              <Info className="inline h-8 w-8 text-blue-600 mr-2" />
              Items to Check First
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              These items may be accepted in some areas but not others. Always confirm before loading.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {checkFirst.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-blue-200">
                  <h3 className="font-semibold text-secondary-900 mb-2">{item.item}</h3>
                  <p className="text-sm text-secondary-600">{item.situation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-secondary-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{faq.question}</h3>
                  <p className="text-secondary-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find a Dumpster Near You */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Find a Dumpster Near You
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              We deliver dumpsters across the United States. Find pricing and availability in your city:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: "New York City", slug: "dumpster-rental-new-york-city-ny" },
                { name: "Los Angeles", slug: "dumpster-rental-los-angeles-ca" },
                { name: "Chicago", slug: "dumpster-rental-chicago-il" },
                { name: "Houston", slug: "dumpster-rental-houston-tx" },
                { name: "Phoenix", slug: "dumpster-rental-phoenix-az" },
                { name: "Philadelphia", slug: "dumpster-rental-philadelphia-pa" },
                { name: "Dallas", slug: "dumpster-rental-dallas-tx" },
                { name: "Atlanta", slug: "dumpster-rental-atlanta-ga" },
                { name: "Miami", slug: "dumpster-rental-miami-fl" },
                { name: "Denver", slug: "dumpster-rental-denver-co" },
                { name: "Seattle", slug: "dumpster-rental-seattle-wa" },
                { name: "Boston", slug: "dumpster-rental-boston-ma" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="bg-white hover:bg-primary-50 hover:text-primary-700 text-secondary-700 px-4 py-3 rounded-lg text-sm font-medium text-center transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/locations"
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
              >
                View all locations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Author Box - Reusable container per SOP */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AuthorBox locale={locale} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure About an Item?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            When in doubt, ask! Our team can tell you exactly what&apos;s accepted in your area and suggest alternatives for prohibited items.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Ask Us a Question
            </Link>
            <a
              href="tel:8888600710"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Call (888) 860-0710
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Blog", url: "https://www.dumpsterchamps.com/blog" },
          { name: "What Can Go in a Dumpster", url: "https://www.dumpsterchamps.com/blog/what-can-go-in-dumpster" },
        ]}
      />
      <ArticleSchema
        title="What Can & Can't Go in a Dumpster? Complete Disposal Guide"
        description="Complete guide to dumpster disposal rules. Learn exactly what items are accepted, prohibited, and how to avoid contamination fees."
        url="https://www.dumpsterchamps.com/blog/what-can-go-in-dumpster"
        dateModified={LAST_UPDATED}
        image="https://www.dumpsterchamps.com/images/blog/what-can-go-in-dumpster-hero.jpg"
      />
    </>
  );
}
