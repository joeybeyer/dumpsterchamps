import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, DollarSign, X, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2025-12-31");

export const metadata: Metadata = {
  title: "Cheapest Way to Rent a Dumpster: 9 Money-Saving Tips [2026]",
  description:
    "Save $50-200 on dumpster rental with these proven tips. Learn how to get the best price, avoid hidden fees, and choose the right size without overpaying.",
  openGraph: {
    title: "Cheapest Way to Rent a Dumpster | Dumpster Champs",
    description: "9 proven money-saving tips to get the best dumpster rental price.",
    type: "article",
  },
};

const savingTips = [
  {
    number: 1,
    title: "Right-Size Your Dumpster",
    savings: "Save $100-500",
    description: "The biggest mistake? Renting too small and needing a second dumpster. A 20-yard at $595 is way cheaper than two 10-yards at $990.",
    action: "Use our free calculator to determine exactly what size you need",
    icon: "📏",
  },
  {
    number: 2,
    title: "Choose Flat-Rate Pricing",
    savings: "Save $50-200",
    description: "Flat-rate pricing includes everything: delivery, pickup, rental period, weight, disposal. No surprise fees = predictable cost.",
    action: "Ask: 'Is this price all-inclusive? What could add to my bill?'",
    icon: "💰",
  },
  {
    number: 3,
    title: "Book Midweek Delivery",
    savings: "Save $25-75",
    description: "Weekends are peak demand. Tuesday-Thursday typically has better availability and sometimes lower prices.",
    action: "Request midweek delivery when booking",
    icon: "📅",
  },
  {
    number: 4,
    title: "Avoid Weight Overages",
    savings: "Save $75-300",
    description: "Overage fees of $50-100/ton add up fast. Know your weight limit and estimate your debris weight before loading.",
    action: "Use our weight calculator, especially for heavy materials",
    icon: "⚖️",
  },
  {
    number: 5,
    title: "Skip the Street Permit",
    savings: "Save $10-100",
    description: "Street placement requires permits in most cities. Driveway placement usually doesn't. Keep it on your property if possible.",
    action: "Clear driveway space before delivery",
    icon: "🅿️",
  },
  {
    number: 6,
    title: "Finish Within the Rental Period",
    savings: "Save $15-75",
    description: "Extension fees of $10-25/day add up. Plan your project to finish within the included 7-day rental.",
    action: "Start loading day 1, not day 6",
    icon: "⏰",
  },
  {
    number: 7,
    title: "Keep Prohibited Items Out",
    savings: "Save $75-250",
    description: "Contamination fees for tires, batteries, hazardous waste, and electronics can be steep. Know what can't go in.",
    action: "Review prohibited list before loading; dispose of special items separately",
    icon: "🚫",
  },
  {
    number: 8,
    title: "Get Multiple Quotes",
    savings: "Save $50-150",
    description: "Prices vary significantly between companies. Always compare at least 3 quotes—but compare apples to apples (all-inclusive).",
    action: "Ask each company for their all-inclusive, final price",
    icon: "📋",
  },
  {
    number: 9,
    title: "Ask About Discounts",
    savings: "Save $25-100",
    description: "Many companies offer discounts for contractors, repeat customers, military, seniors, or off-peak seasons.",
    action: "Simply ask: 'Do you have any discounts available?'",
    icon: "🎫",
  },
];

const pricingComparison = [
  { size: "10 Yard", ourPrice: "$495", typical: "$350-550", includes: "2 tons, 7 days" },
  { size: "15 Yard", ourPrice: "$550", typical: "$400-600", includes: "2.5 tons, 7 days" },
  { size: "20 Yard", ourPrice: "$595", typical: "$450-700", includes: "3 tons, 7 days" },
  { size: "30 Yard", ourPrice: "$695", typical: "$550-800", includes: "4 tons, 7 days" },
  { size: "40 Yard", ourPrice: "$795", typical: "$650-950", includes: "5 tons, 7 days" },
];

const redFlags = [
  "Prices that seem way below market average (they'll make it up in fees)",
  "Vague quotes that don't specify what's included",
  "No clear weight limit mentioned",
  "Very short rental periods (3-5 days at 'low' prices)",
  "Separate line items for fuel, environmental, or administrative fees",
  "'Plus disposal' or 'disposal not included'",
];

const faqs = [
  {
    question: "What's the cheapest dumpster size to rent?",
    answer: "The 10-yard dumpster is typically the cheapest at $495 (or $300-450 elsewhere). However, 'cheapest' often means renting too small. If you need a second dumpster, you'll pay $990+ total. The smartest approach is sizing correctly the first time—a 15-yard at $550 is cheaper than two 10-yards at $990.",
  },
  {
    question: "Is it cheaper to rent a dumpster or haul debris yourself?",
    answer: "For most projects, a dumpster is cheaper and easier. Multiple trips to the dump cost $25-75 each in dump fees, plus your time and gas. A 10-yard dumpster holds 3+ pickup truck loads—three dump runs at $50 each already equals $150, plus hours of labor. A dumpster also means one-time loading (into the dumpster) vs. loading your truck multiple times.",
  },
  {
    question: "How can I avoid hidden fees when renting a dumpster?",
    answer: "Ask for 'all-inclusive' pricing that covers delivery, pickup, rental period, weight allowance, and disposal. Get it in writing. Specifically ask: 'What could add to my bill?' Reputable companies have transparent pricing with no surprises. Avoid quotes that seem too low—they often hide fees.",
  },
  {
    question: "When is the best time to rent a dumpster for the cheapest price?",
    answer: "Midweek (Tuesday-Thursday) and off-peak seasons (winter, early spring) typically have the best availability and sometimes lower prices. Avoid holiday weekends and the busy summer/fall renovation season if possible. Booking 3-5 days ahead rather than same-day can also help.",
  },
  {
    question: "Do dumpster rental prices include disposal fees?",
    answer: "With flat-rate pricing, yes—disposal is included. However, some companies quote low base prices and add disposal fees ($25-75+) separately. Always ask: 'Does this price include disposal and landfill fees?' to compare true costs.",
  },
];

export default function CheapestDumpsterRental() {
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
            <span className="text-white">Cheapest Way to Rent a Dumpster</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Money-Saving Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The Cheapest Way to Rent a Dumpster: 9 Insider Tips
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                Don&apos;t overpay for dumpster rental. These 9 tips can save you $50-500 on your next rental—without sacrificing service.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>7 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/cheapest-dumpster-rental.jpg"
                alt="Money saved on dumpster rental"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="py-8 bg-green-50 border-b border-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-900 mb-2">The #1 Money-Saving Secret</h2>
            <p className="text-green-800">
              <strong>Don&apos;t chase the lowest advertised price.</strong> A $299 quote with hidden fees often costs more than a $595 all-inclusive price. Focus on <em>total cost</em>, not base price.
            </p>
          </div>
        </div>
      </section>

      {/* Saving Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              9 Ways to Save on Dumpster Rental
            </h2>

            <div className="space-y-6">
              {savingTips.map((tip) => (
                <div key={tip.number} className="bg-secondary-50 rounded-xl overflow-hidden">
                  <div className="flex items-stretch">
                    <div className="bg-primary-600 text-white p-4 flex items-center justify-center min-w-[80px]">
                      <span className="text-3xl">{tip.icon}</span>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-secondary-900">
                          {tip.number}. {tip.title}
                        </h3>
                        <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                          {tip.savings}
                        </span>
                      </div>
                      <p className="text-secondary-600 mb-3">{tip.description}</p>
                      <div className="flex items-center gap-2 text-primary-700 text-sm">
                        <Lightbulb className="h-4 w-4" />
                        <span className="font-medium">{tip.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Reference */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              What Should a Dumpster Really Cost?
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              Here&apos;s what to expect for all-inclusive, flat-rate pricing in 2026:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Size</th>
                    <th className="px-6 py-4 text-center font-semibold">Our Price</th>
                    <th className="px-6 py-4 text-center font-semibold">Market Range</th>
                    <th className="px-6 py-4 text-left font-semibold">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingComparison.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-6 py-4 font-medium text-secondary-900">{row.size}</td>
                      <td className="px-6 py-4 text-center text-primary-600 font-bold">{row.ourPrice}</td>
                      <td className="px-6 py-4 text-center text-secondary-600">{row.typical}</td>
                      <td className="px-6 py-4 text-secondary-600">{row.includes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-secondary-500 mt-4">
              *All prices include delivery, pickup, 7-day rental, weight allowance, and disposal
            </p>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center flex items-center justify-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              Red Flags: Quotes That Cost More
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              Watch out for these warning signs that a &quot;cheap&quot; quote will end up expensive:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {redFlags.map((flag, i) => (
                <div key={i} className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-800">{flag}</span>
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
              Get Transparent Pricing Near You
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              No hidden fees. No surprise charges. Just honest, all-inclusive dumpster rental:
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
          <h2 className="text-3xl font-bold mb-4">Ready for Transparent, Affordable Pricing?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Our flat-rate pricing means you know exactly what you&apos;ll pay—no hidden fees, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dumpster-rental-prices"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              View All Pricing
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
          { name: "Cheapest Way to Rent a Dumpster", url: "https://www.dumpsterchamps.com/blog/cheapest-way-to-rent-dumpster" },
        ]}
      />
      <ArticleSchema
        title="Cheapest Way to Rent a Dumpster: 9 Money-Saving Tips"
        description="Save $50-200 on dumpster rental with these proven tips. Learn how to get the best price, avoid hidden fees, and choose the right size without overpaying."
        url="https://www.dumpsterchamps.com/blog/cheapest-way-to-rent-dumpster"
        dateModified={LAST_UPDATED}
      />
    </>
  );
}
