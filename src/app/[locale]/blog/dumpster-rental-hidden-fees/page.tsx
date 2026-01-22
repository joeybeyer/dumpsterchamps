import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, X, AlertTriangle, DollarSign, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2026-01-11");

export const metadata: Metadata = {
  title: "7 Hidden Dumpster Rental Fees to Watch For [2026 Guide]",
  description:
    "Avoid surprise charges! Learn about the 7 most common hidden dumpster rental fees and how to get transparent, all-inclusive pricing. Save $100-500 on your rental.",
  openGraph: {
    title: "Hidden Dumpster Rental Fees to Avoid | Dumpster Champs",
    description: "Complete guide to hidden fees in dumpster rental and how to avoid them.",
    type: "article",
  },
};

const hiddenFees = [
  {
    name: "Weight Overage Fees",
    typical: "$50-100 per ton over limit",
    description: "The #1 surprise fee. Most rentals include a weight limit (1-4 tons depending on size). Exceed it, and you pay per-ton overages.",
    howToAvoid: [
      "Ask about weight limits upfront and get them in writing",
      "Use our weight calculator to estimate your debris weight",
      "Size up if you have heavy materials (concrete, brick, roofing)",
      "Request a higher weight allowance if needed",
    ],
    redFlag: "Vague answers about weight limits or 'we'll weigh it after'",
  },
  {
    name: "Fuel Surcharges",
    typical: "5-15% of total rental cost",
    description: "An add-on fee to cover diesel costs. Some companies add this after quoting a base price.",
    howToAvoid: [
      "Ask explicitly: 'Is fuel included in the price?'",
      "Request all-inclusive pricing",
      "Get a written quote that says 'no additional fees'",
    ],
    redFlag: "Separate line items for 'fuel surcharge' or 'delivery fuel'",
  },
  {
    name: "Environmental/Disposal Fees",
    typical: "$25-75 per load",
    description: "Fees to cover landfill tipping costs or environmental compliance. Often buried in fine print.",
    howToAvoid: [
      "Ask: 'Does the price include disposal?'",
      "Look for companies that include landfill fees in flat rate",
      "Read the contract carefully before signing",
    ],
    redFlag: "Low advertised price with asterisks or 'plus disposal'",
  },
  {
    name: "Trip/Delivery Fees",
    typical: "$75-150 per trip",
    description: "Charged if the driver can't deliver (blocked access) or for moving the dumpster.",
    howToAvoid: [
      "Clear the placement area completely before delivery",
      "Move all vehicles out of the driveway",
      "Confirm overhead clearance (wires, branches)",
      "Provide accurate delivery instructions",
    ],
    redFlag: "Unclear policies about what happens if delivery fails",
  },
  {
    name: "Extended Rental Fees",
    typical: "$10-25 per day",
    description: "Daily charges if you keep the dumpster past the included rental period.",
    howToAvoid: [
      "Confirm the rental period upfront (7 days is standard)",
      "Plan your project timeline realistically",
      "Call ahead if you need an extension",
      "Schedule early pickup if you finish sooner",
    ],
    redFlag: "Very short rental periods (3-5 days) at 'low' prices",
  },
  {
    name: "Prohibited Item Fees",
    typical: "$75-250+ per item",
    description: "Charges for disposing of items that require special handling (mattresses, tires, electronics).",
    howToAvoid: [
      "Review the prohibited items list before loading",
      "Ask about items you're unsure about",
      "Remove prohibited items before pickup",
      "Dispose of hazardous materials separately",
    ],
    redFlag: "No clear list of prohibited items provided",
  },
  {
    name: "Administrative Fees",
    typical: "$15-50",
    description: "Processing, billing, or paperwork fees that add up across your rental.",
    howToAvoid: [
      "Ask for a single, all-inclusive price",
      "Request itemized quotes to spot hidden fees",
      "Choose companies with transparent flat-rate pricing",
    ],
    redFlag: "Multiple small line items on the invoice",
  },
];

const comparisonTable = [
  { fee: "Delivery", transparent: "Included", hidden: "Extra $75-150" },
  { fee: "Pickup", transparent: "Included", hidden: "Extra $75-150" },
  { fee: "7-Day Rental", transparent: "Included", hidden: "3 days, then $25/day" },
  { fee: "Weight (2 tons)", transparent: "Included", hidden: "1 ton, then $75/ton" },
  { fee: "Disposal", transparent: "Included", hidden: "Extra $25-75" },
  { fee: "Fuel", transparent: "Included", hidden: "Extra 8-15%" },
  { fee: "Typical Total (20-yard)", transparent: "$595", hidden: "$750-900" },
];

const faqs = [
  {
    question: "What is the most common hidden fee in dumpster rental?",
    answer: "Weight overage fees are the most common surprise. Most dumpsters include 1-4 tons of weight. Exceed this and you'll pay $50-100 per ton over. Heavy materials like concrete, brick, and roofing shingles can easily push you over the limit even if the dumpster isn't full.",
  },
  {
    question: "How can I get a truly all-inclusive dumpster rental price?",
    answer: "Ask specifically: 'Does this price include delivery, pickup, a 7-day rental, [X] tons of weight, and disposal?' Get the answer in writing. Reputable companies offer flat-rate pricing that covers everything, with no surprise fees.",
  },
  {
    question: "Why are some dumpster rental prices so much lower than others?",
    answer: "Suspiciously low prices often exclude key items. A $299 quote might become $500+ after adding fuel, environmental fees, short rental periods with daily extensions, and lower weight allowances. Always compare final, all-inclusive prices, not just advertised rates.",
  },
  {
    question: "What happens if I put prohibited items in the dumpster?",
    answer: "You'll be charged a contamination or prohibited item fee, typically $75-250+ depending on the item. Common prohibited items include hazardous materials (paint, oil, chemicals), electronics, tires, batteries, and appliances with freon. Some areas also restrict mattresses.",
  },
  {
    question: "Can I negotiate dumpster rental prices?",
    answer: "Yes, especially for longer-term rentals or multiple dumpsters. Ask about discounts for contractors, repeat customers, or off-peak delivery times. However, be wary of companies that dramatically lower prices—they may make it up with hidden fees.",
  },
];

export default function HiddenFeesGuide() {
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
            <span className="text-white">Hidden Dumpster Rental Fees</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-yellow-500 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Money-Saving Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                7 Hidden Dumpster Rental Fees to Watch For [2026]
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                That $299 dumpster rental can quickly become $600+ with hidden fees. Learn exactly what to look for and how to get transparent, all-inclusive pricing.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>10 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/hidden-fees-hero.jpg"
                alt="Invoice with hidden fees highlighted"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <h2 className="text-xl font-bold text-yellow-900 mt-0 mb-2">The Hidden Fee Problem</h2>
              <p className="text-yellow-800 mb-0">
                A 2024 consumer survey found that <strong>67% of dumpster rental customers</strong> paid more than their quoted price. The average surprise cost? <strong>$127 in hidden fees</strong>. Don&apos;t be one of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Fees List */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              The 7 Hidden Fees You Need to Know
            </h2>

            <div className="space-y-8">
              {hiddenFees.map((fee, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-yellow-500 text-yellow-900 px-6 py-3 flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <span className="bg-yellow-900 text-yellow-500 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      {fee.name}
                    </h3>
                    <span className="font-semibold">{fee.typical}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-secondary-700 mb-4">{fee.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-2 flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-600" />
                          How to Avoid:
                        </h4>
                        <ul className="space-y-1 text-sm text-secondary-600">
                          {fee.howToAvoid.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-600">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          Red Flag:
                        </h4>
                        <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                          {fee.redFlag}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Transparent vs. Hidden Pricing: A Real Comparison
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              Same 20-yard dumpster, dramatically different final prices
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-secondary-100">
                    <th className="px-6 py-4 text-left font-semibold text-secondary-900">What&apos;s Included</th>
                    <th className="px-6 py-4 text-center font-semibold text-green-700 bg-green-50">
                      <div className="flex flex-col items-center">
                        <Check className="h-5 w-5 mb-1" />
                        Transparent Pricing
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-red-700 bg-red-50">
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="h-5 w-5 mb-1" />
                        Hidden Fee Pricing
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-6 py-4 font-medium text-secondary-900">{row.fee}</td>
                      <td className="px-6 py-4 text-center text-green-700 bg-green-50/50">{row.transparent}</td>
                      <td className="px-6 py-4 text-center text-red-700 bg-red-50/50">{row.hidden}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-secondary-600 mb-4">
                <strong>Bottom line:</strong> The &quot;cheaper&quot; quote often costs $155-305 more in the end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Questions to Ask */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              5 Questions to Ask Before Booking
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "What is the TOTAL price including delivery, pickup, and disposal?",
                "How many tons of weight are included? What's the overage fee?",
                "How many days are included in the rental period?",
                "Are there any fuel surcharges or environmental fees?",
                "What items are prohibited? What are the contamination fees?",
              ].map((question, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3">
                  <span className="bg-white text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-primary-50">{question}</p>
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
              Find Transparent Pricing Near You
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              Get all-inclusive, flat-rate dumpster rental with no hidden fees:
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
          <h2 className="text-3xl font-bold mb-4">Get Transparent, No-Surprise Pricing</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Our flat-rate pricing includes delivery, pickup, 7-day rental, weight allowance, and disposal. No hidden fees, ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dumpster-rental-prices"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              See Our Pricing
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
          { name: "Hidden Dumpster Rental Fees", url: "https://www.dumpsterchamps.com/blog/dumpster-rental-hidden-fees" },
        ]}
      />
      <ArticleSchema
        title="7 Hidden Dumpster Rental Fees to Watch For"
        description="Avoid surprise charges! Learn about the 7 most common hidden dumpster rental fees and how to get transparent, all-inclusive pricing."
        url="https://www.dumpsterchamps.com/blog/dumpster-rental-hidden-fees"
        dateModified={LAST_UPDATED}
      />
    </>
  );
}
