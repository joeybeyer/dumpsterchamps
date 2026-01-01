import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, X, Truck, Building2, Home, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2025-12-31");

export const metadata: Metadata = {
  title: "Roll-Off vs Front-Load Dumpster Guide [2026]",
  description:
    "Roll-off or front-load dumpster? Learn the key differences, ideal uses, and which type is right for your project. Complete 2026 comparison guide.",
  openGraph: {
    title: "Roll-Off vs Front-Load Dumpster Guide [2026]",
    description: "Complete guide to choosing between roll-off and front-load dumpsters for your project.",
    type: "article",
  },
};

const comparisonPoints = [
  {
    feature: "Best For",
    rollOff: "One-time projects (renovations, cleanouts, construction)",
    frontLoad: "Ongoing waste collection (businesses, apartments)",
    winner: "depends",
  },
  {
    feature: "Rental Type",
    rollOff: "Temporary rental (7-14 days typical)",
    frontLoad: "Long-term contract (monthly/yearly)",
    winner: "depends",
  },
  {
    feature: "Sizes Available",
    rollOff: "10, 15, 20, 30, 40 cubic yards",
    frontLoad: "2, 4, 6, 8 cubic yards",
    winner: "rollOff",
  },
  {
    feature: "Loading",
    rollOff: "Walk-in rear door, load from sides or back",
    frontLoad: "Lift lid and toss in from top",
    winner: "rollOff",
  },
  {
    feature: "Placement",
    rollOff: "Driveway, street, parking lot (flat surface)",
    frontLoad: "Permanent enclosure or designated spot",
    winner: "depends",
  },
  {
    feature: "Pickup Method",
    rollOff: "Hauled away when full or rental ends",
    frontLoad: "Emptied on schedule (weekly, bi-weekly)",
    winner: "depends",
  },
  {
    feature: "Ideal Materials",
    rollOff: "Construction debris, bulky items, large cleanouts",
    frontLoad: "Regular trash, cardboard, recyclables",
    winner: "depends",
  },
  {
    feature: "Pricing Model",
    rollOff: "Flat rate per rental (includes delivery, pickup)",
    frontLoad: "Monthly fee + per-pickup charges",
    winner: "depends",
  },
];

const rollOffPros = [
  "Perfect for one-time projects",
  "Walk-in door makes loading heavy items easy",
  "Large sizes available (up to 40 yards)",
  "Flat-rate pricing with no surprises",
  "Flexible rental periods",
  "Same-day delivery available",
];

const rollOffCons = [
  "Not suitable for ongoing waste needs",
  "Requires space for temporary placement",
  "May need permit for street placement",
];

const frontLoadPros = [
  "Ideal for consistent, ongoing waste",
  "Compact footprint for permanent placement",
  "Regular pickup schedule",
  "No need to schedule removal",
];

const frontLoadCons = [
  "Too small for large projects",
  "Top-loading difficult for heavy/bulky items",
  "Long-term contracts required",
  "Variable monthly costs",
];

const decisionGuide = [
  {
    scenario: "Home renovation or remodel",
    recommendation: "Roll-Off",
    reason: "Large capacity needed for construction debris, temporary rental period matches project timeline",
  },
  {
    scenario: "Estate or garage cleanout",
    recommendation: "Roll-Off",
    reason: "Walk-in door makes loading furniture easy, flexible sizing options",
  },
  {
    scenario: "Roofing project",
    recommendation: "Roll-Off",
    reason: "Handles heavy shingles, 20-30 yard sizes perfect for roofing debris",
  },
  {
    scenario: "Restaurant or business",
    recommendation: "Front-Load",
    reason: "Ongoing waste needs, regular pickup schedule, compact size fits enclosure",
  },
  {
    scenario: "Apartment complex",
    recommendation: "Front-Load",
    reason: "Continuous tenant waste, scheduled pickups, permanent placement",
  },
  {
    scenario: "Construction site",
    recommendation: "Roll-Off",
    reason: "Large capacity for ongoing debris, can be swapped when full",
  },
  {
    scenario: "Spring cleaning / decluttering",
    recommendation: "Roll-Off",
    reason: "One-time rental, easy loading, right-sized options available",
  },
  {
    scenario: "Retail store",
    recommendation: "Front-Load",
    reason: "Regular cardboard/packaging disposal, scheduled pickups",
  },
];

const faqs = [
  {
    question: "What's the main difference between roll-off and front-load dumpsters?",
    answer: "Roll-off dumpsters are large, temporary containers delivered to your site for projects like renovations and cleanouts. They're hauled away when full. Front-load dumpsters are smaller, permanent containers emptied on a regular schedule for ongoing business waste. Roll-offs are for one-time projects; front-loads are for continuous waste management.",
  },
  {
    question: "Which type is better for home renovations?",
    answer: "Roll-off dumpsters are far better for home renovations. They're larger (10-40 cubic yards vs 2-8 for front-load), have a walk-in rear door for loading heavy materials, and offer flexible rental periods that match your project timeline. Front-load dumpsters are too small for renovation debris.",
  },
  {
    question: "Can I use a front-load dumpster for a cleanout?",
    answer: "Technically yes, but it's not ideal. You'd need multiple pickups (at additional cost), and loading bulky items through the top lid is difficult. A roll-off dumpster is more cost-effective and practical for cleanouts—you get one price for the entire rental with easy walk-in loading.",
  },
  {
    question: "How do the costs compare?",
    answer: "Roll-off dumpsters have flat-rate pricing ($495-$795 for 7-day rentals including delivery, pickup, and disposal). Front-load dumpsters have monthly fees ($150-400+) plus per-pickup charges ($50-150+ each). For one-time projects, roll-offs are more economical. For ongoing business waste, front-loads may be more practical despite higher cumulative costs.",
  },
  {
    question: "Do I need a permit for either type?",
    answer: "Roll-off dumpsters placed on public streets typically require permits ($10-100). Those on private property (driveways) usually don't. Front-load dumpsters in permanent business locations generally don't need permits as they're part of normal operations, though your landlord or HOA may have requirements.",
  },
];

export default function RollOffVsFrontLoad() {
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
            <span className="text-white">Roll-Off vs Front-Load Dumpsters</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Comparison Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Roll-Off vs Front-Load Dumpsters: Which Do You Need?
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                Two very different dumpster types for very different needs. Here&apos;s how to choose the right one for your project or business.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>8 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/roll-off-vs-front-load.jpg"
                alt="Roll-off and front-load dumpsters side by side comparison"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-8 bg-primary-50 border-b border-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Quick Answer</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-primary-500">
                <Truck className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <h3 className="font-bold text-secondary-900">Choose Roll-Off</h3>
                <p className="text-sm text-secondary-600">For renovations, cleanouts, roofing, construction—any one-time project</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-secondary-300">
                <Building2 className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
                <h3 className="font-bold text-secondary-900">Choose Front-Load</h3>
                <p className="text-sm text-secondary-600">For ongoing business waste—restaurants, offices, apartments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-secondary-100">
                    <th className="px-6 py-4 text-left font-semibold text-secondary-900">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-primary-700 bg-primary-50">
                      <Truck className="h-5 w-5 mx-auto mb-1" />
                      Roll-Off
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-secondary-700">
                      <Building2 className="h-5 w-5 mx-auto mb-1" />
                      Front-Load
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-6 py-4 font-medium text-secondary-900">{point.feature}</td>
                      <td className="px-6 py-4 text-center text-secondary-700 bg-primary-50/30">{point.rollOff}</td>
                      <td className="px-6 py-4 text-center text-secondary-700">{point.frontLoad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Pros & Cons of Each Type
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Roll-Off */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary-600 text-white px-6 py-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Truck className="h-6 w-6" />
                    Roll-Off Dumpsters
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <Check className="h-5 w-5" /> Pros
                    </h4>
                    <ul className="space-y-2">
                      {rollOffPros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-secondary-700">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <X className="h-5 w-5" /> Cons
                    </h4>
                    <ul className="space-y-2">
                      {rollOffCons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-secondary-600">
                          <X className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Front-Load */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-secondary-600 text-white px-6 py-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Building2 className="h-6 w-6" />
                    Front-Load Dumpsters
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <Check className="h-5 w-5" /> Pros
                    </h4>
                    <ul className="space-y-2">
                      {frontLoadPros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-secondary-700">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <X className="h-5 w-5" /> Cons
                    </h4>
                    <ul className="space-y-2">
                      {frontLoadCons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-secondary-600">
                          <X className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Quick Decision Guide
            </h2>

            <div className="space-y-4">
              {decisionGuide.map((item, i) => (
                <div key={i} className="bg-secondary-50 rounded-lg p-4 flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.recommendation === "Roll-Off"
                      ? "bg-primary-100 text-primary-700"
                      : "bg-secondary-200 text-secondary-700"
                  }`}>
                    {item.recommendation}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-secondary-900">{item.scenario}</span>
                    <span className="text-secondary-500 mx-2">—</span>
                    <span className="text-secondary-600">{item.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{faq.question}</h3>
                  <p className="text-secondary-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find a Dumpster Near You */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Find a Roll-Off Dumpster Near You
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              We specialize in roll-off dumpster rentals for residential and commercial projects:
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
                  className="bg-secondary-50 hover:bg-primary-50 hover:text-primary-700 text-secondary-700 px-4 py-3 rounded-lg text-sm font-medium text-center transition-colors"
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

      {/* Author Box */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AuthorBox />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Roll-Off Dumpster for Your Project?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We offer 10-40 yard roll-off dumpsters with same-day delivery, flat-rate pricing, and no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/roll-off-dumpster-rental"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Learn About Roll-Off Dumpsters
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
          { name: "Roll-Off vs Front-Load Dumpsters", url: "https://www.dumpsterchamps.com/blog/roll-off-vs-front-load-dumpster" },
        ]}
      />
      <ArticleSchema
        title="Roll-Off vs Front-Load Dumpsters: Which Do You Need?"
        description="Roll-off or front-load dumpster? Learn the key differences, ideal uses, and which type is right for your project."
        url="https://www.dumpsterchamps.com/blog/roll-off-vs-front-load-dumpster"
        dateModified={LAST_UPDATED}
      />
    </>
  );
}
