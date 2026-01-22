import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, AlertTriangle, DollarSign, Shield, X, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2026-01-11");

export const metadata: Metadata = {
  title: "Dumpster Rental Cost: Pricing Guide [2026]",
  description:
    "2026 dumpster rental pricing guide. Average costs by size ($495-$795), what's included, hidden fees to avoid, and how to get the best value. Flat-rate pricing explained.",
  openGraph: {
    title: "Dumpster Rental Cost: Pricing Guide [2026]",
    description: "Complete breakdown of dumpster rental costs, what's included, and how to avoid hidden fees.",
    type: "article",
  },
};

const pricingTable = [
  { size: "10 Yard", price: "$495", weight: "1 ton", rental: "7 days", bestFor: "Small cleanouts, bathroom remodels" },
  { size: "15 Yard", price: "$550", weight: "1 ton", rental: "7 days", bestFor: "Medium projects, garage cleanouts" },
  { size: "20 Yard", price: "$595", weight: "2 tons", rental: "7 days", bestFor: "Kitchen remodels, roofing (Most Popular)" },
  { size: "30 Yard", price: "$695", weight: "3 tons", rental: "7 days", bestFor: "Major renovations, construction" },
  { size: "40 Yard", price: "$795", weight: "4 tons", rental: "7 days", bestFor: "Commercial, large demolition" },
];

const includedItems = [
  { item: "Delivery", description: "Dumpster delivered to your location" },
  { item: "Pickup", description: "Removal when you're finished" },
  { item: "7-Day Rental", description: "Standard rental period included" },
  { item: "Weight Allowance", description: "1-4 tons depending on size" },
  { item: "Disposal Fees", description: "Landfill/processing costs covered" },
  { item: "Driveway Protection", description: "Boards to prevent driveway damage" },
];

const hiddenFees = [
  {
    fee: "Fuel Surcharge",
    typical: "5-8% of total",
    avoid: "Ask if fuel is included in the flat rate",
    weCharge: false,
  },
  {
    fee: "Environmental Fee",
    typical: "$15-50",
    avoid: "Request all-inclusive pricing",
    weCharge: false,
  },
  {
    fee: "Administrative Fee",
    typical: "$10-25",
    avoid: "Ask for itemized quote",
    weCharge: false,
  },
  {
    fee: "Weight Overage",
    typical: "$40-100/ton",
    avoid: "Know your weight limit, estimate materials",
    weCharge: true,
    ourRate: "$75/ton over allowance",
  },
  {
    fee: "Extension Fee",
    typical: "$15-50/day",
    avoid: "Plan your timeline, ask about rates upfront",
    weCharge: true,
    ourRate: "$15/day",
  },
  {
    fee: "Dry Run/Trip Fee",
    typical: "$75-150",
    avoid: "Ensure clear access before delivery",
    weCharge: true,
    ourRate: "$75 if delivery blocked",
  },
  {
    fee: "Overfill Fee",
    typical: "$50-200",
    avoid: "Keep debris below fill line",
    weCharge: true,
    ourRate: "Must remove excess before pickup",
  },
  {
    fee: "Prohibited Item Fee",
    typical: "$75-250+",
    avoid: "Know what's not allowed before loading",
    weCharge: true,
    ourRate: "$75-250 depending on item",
  },
];

const costFactors = [
  {
    factor: "Location",
    impact: "±20%",
    explanation: "Urban areas typically cost more due to higher disposal fees and operating costs.",
  },
  {
    factor: "Dumpster Size",
    impact: "$495-$795",
    explanation: "Larger dumpsters cost more but offer better value per cubic yard.",
  },
  {
    factor: "Debris Type",
    impact: "±15%",
    explanation: "Heavy materials (concrete, roofing) may require larger sizes or incur weight overages.",
  },
  {
    factor: "Rental Duration",
    impact: "+$15/day",
    explanation: "Standard 7-day rental; extensions available if needed.",
  },
  {
    factor: "Delivery Distance",
    impact: "Usually included",
    explanation: "Most companies include delivery within their service area.",
  },
];

const faqs = [
  {
    question: "What is the average cost to rent a dumpster in 2026?",
    answer: "The average cost to rent a dumpster in 2026 ranges from $495 to $795 for a flat-rate rental. A 10-yard dumpster costs around $495, a 20-yard (most popular) costs $595, and a 40-yard costs $795. These prices typically include delivery, pickup, 7-day rental, weight allowance, and disposal fees.",
  },
  {
    question: "What should be included in a dumpster rental price?",
    answer: "A transparent dumpster rental price should include: delivery to your location, pickup when finished, rental period (typically 7 days), weight allowance (1-4 tons depending on size), disposal/landfill fees, and ideally driveway protection. Be wary of quotes that don't clearly state what's included.",
  },
  {
    question: "How can I avoid hidden fees when renting a dumpster?",
    answer: "To avoid hidden fees: 1) Get a written, itemized quote before booking, 2) Ask specifically about fuel surcharges, environmental fees, and administrative fees, 3) Know your weight allowance and overage rates, 4) Understand the rental period and extension fees, 5) Ask what items are prohibited and their associated fees.",
  },
  {
    question: "Is it cheaper to rent a dumpster or hire junk removal?",
    answer: "Dumpster rental is usually cheaper for larger projects (3+ pickup truck loads). Junk removal typically costs $150-800+ per load, while a dumpster holding 6-7 loads costs $595 flat. For small jobs (1-2 items), junk removal may be more economical.",
  },
  {
    question: "Why do dumpster prices vary so much between companies?",
    answer: "Prices vary due to: what's included (some quote low then add fees), weight allowances, rental periods, company overhead, and disposal costs in your area. Always compare total costs including all fees, not just base prices. A $300 quote with $200 in fees costs more than a $450 flat rate.",
  },
];

export default function DumpsterCostGuide() {
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
            <span className="text-white">Dumpster Rental Cost Guide</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                2026 Pricing Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                How Much Does Dumpster Rental Cost? Complete 2026 Guide
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                Understanding dumpster rental pricing doesn&apos;t have to be confusing. This guide breaks down exactly what you&apos;ll pay, what&apos;s included, and how to avoid surprise fees that can double your bill.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>12 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/dumpster-pricing-guide-hero.jpg"
                alt="Homeowner reviewing dumpster rental pricing and quotes"
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
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Quick Answer</h2>
            <p className="text-lg text-secondary-700">
              Dumpster rental costs <strong className="text-primary-600">$495 to $795</strong> for a flat-rate 7-day rental including delivery, pickup, and disposal. The most popular 20-yard dumpster costs approximately <strong className="text-primary-600">$595</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">2026 Dumpster Rental Prices by Size</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-secondary-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Weight Included</th>
                    <th className="px-6 py-4 text-left font-semibold">Rental Period</th>
                    <th className="px-6 py-4 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTable.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-secondary-50"} ${row.size === "20 Yard" ? "border-l-4 border-primary-600" : ""}`}>
                      <td className="px-6 py-4 font-semibold text-secondary-900">{row.size}</td>
                      <td className="px-6 py-4 text-primary-600 font-bold text-lg">{row.price}</td>
                      <td className="px-6 py-4 text-secondary-700">{row.weight}</td>
                      <td className="px-6 py-4 text-secondary-700">{row.rental}</td>
                      <td className="px-6 py-4 text-secondary-600 text-sm">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Our Transparent Pricing Promise</h3>
                  <p className="text-green-800">
                    Unlike competitors who quote low then add fees, our prices include <strong>everything</strong>: delivery, pickup, 7-day rental, weight allowance, disposal, AND driveway protection boards. The price you see is the price you pay (unless you exceed weight or time limits).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">What Should Be Included in Your Price</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedItems.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{item.item}</h3>
                      <p className="text-sm text-secondary-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Warning: Not All Quotes Include Everything</h3>
                  <p className="text-yellow-800">
                    Some companies advertise low &quot;starting&quot; prices that don&apos;t include disposal, have minimal weight allowances, or add fuel surcharges later. Always ask: &quot;Is this an all-inclusive flat rate?&quot; and &quot;What additional fees might apply?&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Fees Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">Common Hidden Fees & How to Avoid Them</h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              The biggest complaint in the dumpster rental industry is surprise fees. Here&apos;s every fee you might encounter and how to avoid them.
            </p>

            <div className="space-y-4">
              {hiddenFees.map((fee, i) => (
                <div key={i} className={`rounded-xl p-6 ${fee.weCharge ? "bg-secondary-50 border border-secondary-200" : "bg-red-50 border border-red-200"}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900">{fee.fee}</h3>
                        {!fee.weCharge && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                            We Don&apos;t Charge This
                          </span>
                        )}
                      </div>
                      <p className="text-secondary-600 text-sm">
                        <strong>Industry typical:</strong> {fee.typical}
                      </p>
                      <p className="text-secondary-600 text-sm">
                        <strong>How to avoid:</strong> {fee.avoid}
                      </p>
                      {fee.weCharge && fee.ourRate && (
                        <p className="text-primary-600 text-sm mt-1">
                          <strong>Our rate:</strong> {fee.ourRate}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {fee.weCharge ? (
                        <div className="text-center">
                          <DollarSign className="h-8 w-8 text-secondary-400 mx-auto" />
                          <span className="text-xs text-secondary-500">May Apply</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <X className="h-8 w-8 text-green-600 mx-auto" />
                          <span className="text-xs text-green-600">Never</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Factors */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">What Affects Dumpster Rental Prices?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {costFactors.map((factor, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900">{factor.factor}</h3>
                    <span className="bg-primary-100 text-primary-700 text-sm font-semibold px-3 py-1 rounded-full">
                      {factor.impact}
                    </span>
                  </div>
                  <p className="text-secondary-600">{factor.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Invoice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">Sample Invoice Breakdown</h2>

            <div className="bg-secondary-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-6 pb-4 border-b border-secondary-200">
                20-Yard Dumpster Rental - Kitchen Remodel
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary-700">Base Rental (20-yard)</span>
                  <span className="font-semibold">$595.00</span>
                </div>
                <div className="flex justify-between text-secondary-500 pl-4">
                  <span>├ Delivery</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-secondary-500 pl-4">
                  <span>├ Pickup</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-secondary-500 pl-4">
                  <span>├ 7-Day Rental</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-secondary-500 pl-4">
                  <span>├ 3 Tons Weight</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-secondary-500 pl-4">
                  <span>├ Disposal</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-secondary-500 pl-4">
                  <span>└ Driveway Protection</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="border-t border-secondary-300 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Due</span>
                  <span className="text-primary-600">$595.00</span>
                </div>
              </div>

              <div className="mt-6 bg-green-100 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Final weight:</strong> 2.5 tons (under 3-ton limit) — <strong>No overage charges</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Frequently Asked Questions About Dumpster Costs
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

      {/* Author Box - Reusable container per SOP */}
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
          <h2 className="text-3xl font-bold mb-4">Get Transparent, Flat-Rate Pricing</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            No hidden fees. No surprise charges. Just honest pricing that includes everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Your Free Quote
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
          { name: "Dumpster Rental Cost Guide", url: "https://www.dumpsterchamps.com/blog/dumpster-rental-cost-guide" },
        ]}
      />
      <ArticleSchema
        title="How Much Does Dumpster Rental Cost? Complete Pricing Guide"
        description="Complete dumpster rental pricing guide. Average costs by size ($495-$795), what's included, hidden fees to avoid, and how to get the best value."
        url="https://www.dumpsterchamps.com/blog/dumpster-rental-cost-guide"
        dateModified={LAST_UPDATED}
        image="https://www.dumpsterchamps.com/images/blog/dumpster-pricing-guide-hero.jpg"
      />
    </>
  );
}
