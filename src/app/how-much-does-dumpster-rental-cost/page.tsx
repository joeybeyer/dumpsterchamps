import { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { Phone, CheckCircle, DollarSign, Truck, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "How Much Does It Cost to Rent a Dumpster? [2026] Pricing Guide",
  description: "Dumpster rental costs $300-$500 for a 7-day rental of a 15-20 yard container. Get transparent pricing from Dumpster Champs with no hidden fees. Call (888) 860-0710.",
  keywords: "dumpster rental cost, how much does dumpster rental cost, dumpster prices, roll off dumpster pricing, dumpster rental rates",
  openGraph: {
    title: "How Much Does It Cost to Rent a Dumpster? [2026] Pricing Guide",
    description: "Dumpster rental costs $300-$500 for a 7-day rental. Transparent pricing with no hidden fees.",
    url: "https://www.dumpsterchamps.com/how-much-does-dumpster-rental-cost",
    type: "article",
  },
};

const faqs = [
  {
    question: "How much does it cost to rent a dumpster?",
    answer: "Dumpster rental costs $300-$500 for a 7-day rental of a 15-20 yard container in most US markets. Prices vary by location, size, and debris type. Dumpster Champs offers transparent flat-rate pricing starting at $495 with delivery, pickup, and disposal included.",
  },
  {
    question: "What is the cheapest dumpster to rent?",
    answer: "A 10-yard dumpster is the cheapest option, typically costing $250-$350 for a 7-day rental. This size is ideal for small cleanouts, single room remodels, or garage cleanouts with 2-3 pickup truck loads of debris.",
  },
  {
    question: "How much does a 20 yard dumpster cost?",
    answer: "A 20-yard dumpster costs $350-$450 for a 7-day rental. This is the most popular size for home renovation projects, kitchen and bathroom remodels, and roofing jobs. It holds approximately 6 pickup truck loads of debris.",
  },
  {
    question: "Are there hidden fees with dumpster rental?",
    answer: "Many dumpster companies charge hidden fees for fuel surcharges, environmental fees, and overweight charges. Dumpster Champs offers transparent pricing with delivery, pickup, 7-day rental, and disposal included. Overweight fees only apply if you exceed the weight limit.",
  },
  {
    question: "What factors affect dumpster rental prices?",
    answer: "Dumpster rental prices are affected by container size, rental duration, debris type (mixed waste vs. heavy materials), your location, and local disposal fees. Heavy materials like concrete cost more due to weight limits.",
  },
];

const pricingData = [
  { size: "10 Yard", price: "$495", dimensions: '12\' x 8\' x 3.5\'', capacity: "2-3 pickup loads", bestFor: "Small cleanouts, single room remodels" },
  { size: "15 Yard", price: "$550", dimensions: '14\' x 8\' x 4\'', capacity: "4-5 pickup loads", bestFor: "Medium projects, garage cleanouts" },
  { size: "20 Yard", price: "$595", dimensions: '22\' x 8\' x 4\'', capacity: "6 pickup loads", bestFor: "Kitchen/bath remodels, roofing" },
  { size: "30 Yard", price: "$695", dimensions: '22\' x 8\' x 6\'', capacity: "9 pickup loads", bestFor: "Large renovations, estate cleanouts" },
  { size: "40 Yard", price: "$795", dimensions: '22\' x 8\' x 8\'', capacity: "12 pickup loads", bestFor: "Commercial projects, new construction" },
];

const includedFeatures = [
  { icon: Truck, text: "Free delivery to your location" },
  { icon: Clock, text: "7-day rental period included" },
  { icon: Truck, text: "Free pickup when you're done" },
  { icon: DollarSign, text: "Disposal fees included (up to weight limit)" },
  { icon: Shield, text: "Driveway protection boards" },
  { icon: CheckCircle, text: "No hidden fuel surcharges" },
];

export default function HowMuchDoesDumpsterRentalCostPage() {
  return (
    <>
      {/* Schema Markup */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Dumpster Rental Cost", url: "https://www.dumpsterchamps.com/how-much-does-dumpster-rental-cost" },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-secondary-600">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-secondary-900">Dumpster Rental Cost</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Quick Answer Box - Critical for PAA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Quick Answer</h2>
            <p className="text-blue-800 mb-2">
              <strong>How much does it cost to rent a dumpster?</strong>
            </p>
            <p className="text-blue-700">
              Dumpster rental costs <strong>$300-$500</strong> for a 7-day rental of a 15-20 yard container.
              The average homeowner pays <strong>$375-$450</strong> for a standard residential dumpster.
              At Dumpster Champs, our flat-rate pricing starts at <strong>$495</strong> with no hidden fees.
            </p>
          </div>

          {/* H1 with year for freshness */}
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            How Much Does It Cost to Rent a Dumpster? [2026] Pricing Guide
          </h1>

          <p className="text-lg text-secondary-700 mb-8">
            Dumpster rental pricing depends on container size, rental duration, debris type, and your location.
            At Dumpster Champs, we offer straightforward flat-rate pricing with delivery, pickup, and disposal
            included—no surprise fees at the end.
          </p>

          {/* Pricing Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Dumpster Rental Cost by Size
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
                    <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Dimensions</th>
                    <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Capacity</th>
                    <th className="px-4 py-3 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((item, index) => (
                    <tr key={item.size} className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-4 font-semibold text-secondary-900">{item.size}</td>
                      <td className="px-4 py-4 text-primary-600 font-bold text-lg">{item.price}</td>
                      <td className="px-4 py-4 text-secondary-600 hidden md:table-cell">{item.dimensions}</td>
                      <td className="px-4 py-4 text-secondary-600 hidden sm:table-cell">{item.capacity}</td>
                      <td className="px-4 py-4 text-secondary-700">{item.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-secondary-500 mt-4">
              * Prices shown are flat-rate for 7-day rental including delivery, pickup, and disposal.
              Prices may vary by location.
            </p>
          </section>

          {/* What's Included */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              What's Included in the Price?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {includedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <feature.icon className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-secondary-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Factors Affecting Price */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              What Factors Affect Dumpster Rental Prices?
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">1. Container Size</h3>
                <p className="text-secondary-600">Larger dumpsters cost more. A 40-yard dumpster costs roughly 60% more than a 10-yard.</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">2. Rental Duration</h3>
                <p className="text-secondary-600">Standard rentals include 7 days. Extensions typically cost $10-20 per day.</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">3. Debris Type</h3>
                <p className="text-secondary-600">Heavy materials like concrete, brick, or dirt may incur additional fees due to weight limits.</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">4. Your Location</h3>
                <p className="text-secondary-600">Prices vary by region based on local disposal fees and market competition.</p>
              </div>

              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-secondary-900">5. Weight Overages</h3>
                <p className="text-secondary-600">Exceeding weight limits typically costs $50-100 per ton over the included allowance.</p>
              </div>
            </div>
          </section>

          {/* Related Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Related Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  <Link href="/what-size-dumpster-do-i-need" className="hover:text-primary-600">
                    What size dumpster do I need?
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  Most homeowners need a 15-20 yard dumpster. Use our{" "}
                  <Link href="/calculator" className="text-primary-600 hover:underline">free size calculator</Link>{" "}
                  to get a personalized recommendation based on your project.
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  <Link href="/do-i-need-permit-for-dumpster" className="hover:text-primary-600">
                    Do I need a permit for a dumpster?
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  Only if placing on public property (street or sidewalk). Driveway placement requires no permit in most cities.
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">How long can I keep a dumpster?</h3>
                <p className="text-secondary-600">
                  Standard rentals include 7 days. Need more time? Extensions are available for $10-20 per day depending on your location.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-secondary-200 rounded-lg p-4">
                  <h3 className="font-semibold text-secondary-900 mb-2">{faq.question}</h3>
                  <p className="text-secondary-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Get Your Dumpster Price in 60 Seconds
            </h2>
            <p className="text-primary-100 mb-6">
              Call now for instant pricing or get a free quote online. No hidden fees, no surprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18888600710"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (888) 860-0710
              </a>

              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors border border-primary-500"
              >
                Get Free Quote Online
              </Link>
            </div>
          </section>

          {/* Last Updated - Freshness signal for AI */}
          <p className="text-center text-sm text-secondary-400 mt-8">
            Last updated: January 2026
          </p>
        </div>
      </main>
    </>
  );
}
