import { Metadata } from "next";
import Link from "next/link";
import { Phone, Check, AlertTriangle, Calculator, TrendingDown, Shield, Clock, Truck, ShoppingCart } from "lucide-react";
import { FAQSchema } from "@/components/seo/SchemaMarkup";
import { TrustBadgesInline, DeliveryCounter } from "@/components/ui/TrustBadges";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Dumpster Rental Prices 2026 | How Much Does a Dumpster Cost?",
  description: "Dumpster rental prices from $495-$795. See 2026 pricing for 10, 15, 20, 30 & 40 yard dumpsters. Flat-rate pricing includes weight, delivery & pickup. No hidden fees.",
  keywords: "dumpster rental prices, dumpster rental cost, how much is a dumpster rental, cheap dumpster rental, dumpster rental prices near me",
};

const PRICING_DATA = [
  {
    size: 10,
    price: "$495",
    weightLimit: "1 ton",
    rentalPeriod: "7 days",
    bestFor: "Small cleanouts, bathroom remodels, garage cleanouts",
    dimensions: "12' x 8' x 3.5'",
    truckLoads: 4,
  },
  {
    size: 15,
    price: "$550",
    weightLimit: "1 ton",
    rentalPeriod: "7 days",
    bestFor: "Medium renovations, deck removal, flooring projects",
    dimensions: "16' x 7.5' x 4'",
    truckLoads: 6,
  },
  {
    size: 20,
    price: "$595",
    weightLimit: "2 tons",
    rentalPeriod: "7 days",
    bestFor: "Kitchen remodels, roof tear-offs, large cleanouts",
    dimensions: "22' x 7.5' x 4.5'",
    truckLoads: 8,
    popular: true,
  },
  {
    size: 30,
    price: "$695",
    weightLimit: "3 tons",
    rentalPeriod: "7 days",
    bestFor: "Major renovations, new construction, estate cleanouts",
    dimensions: "22' x 7.5' x 6'",
    truckLoads: 12,
  },
  {
    size: 40,
    price: "$795",
    weightLimit: "4 tons",
    rentalPeriod: "7 days",
    bestFor: "Commercial projects, whole house demos, large construction",
    dimensions: "22' x 7.5' x 8'",
    truckLoads: 16,
    note: "Where available",
  },
];

const HIDDEN_FEES = [
  { fee: "Delivery Fee", typical: "$50-$100", ours: "Included" },
  { fee: "Pickup Fee", typical: "$50-$100", ours: "Included" },
  { fee: "Weight Allowance", typical: "Extra $50-$150", ours: "Included" },
  { fee: "Fuel Surcharge", typical: "$25-$75", ours: "Included" },
  { fee: "Environmental Fee", typical: "$25-$50", ours: "Included" },
  { fee: "Administrative Fee", typical: "$15-$30", ours: "Included" },
];

const FACTORS_AFFECTING_PRICE = [
  {
    factor: "Dumpster Size",
    impact: "Biggest factor - larger dumpsters cost more",
    tip: "Use our calculator to avoid renting too big or too small",
  },
  {
    factor: "Rental Duration",
    impact: "$10-$20 per extra day beyond 7 days",
    tip: "Standard 7-day rentals are most cost-effective",
  },
  {
    factor: "Debris Type",
    impact: "Heavy materials (concrete, dirt) may cost more",
    tip: "Separate heavy materials - ask about clean load discounts",
  },
  {
    factor: "Location",
    impact: "Prices vary by city based on local disposal costs",
    tip: "Call for exact pricing in your area",
  },
  {
    factor: "Demand/Season",
    impact: "Spring and summer can have longer wait times",
    tip: "Book early during peak seasons",
  },
];

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary-400 font-semibold mb-2">2026 Pricing Guide</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              How Much Does a Dumpster Rental Cost?
            </h1>
            <p className="text-xl text-secondary-200 mb-6">
              Dumpster rental prices range from <strong className="text-white">$495 to $795</strong> for 
              all-inclusive flat-rate pricing. Our price includes delivery, pickup, 7-day rental, AND weight allowance — no surprises.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Get Instant Quote: {phone}
              </a>
              <Link
                href="/calculator"
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary-900 transition-colors flex items-center gap-2"
              >
                <Calculator className="h-5 w-5" />
                Size & Price Calculator
              </Link>
            </div>

            {/* Trust signals */}
            <TrustBadgesInline variant="dark" />
          </div>
        </div>
      </section>

      {/* Quick Price Summary */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4">
          {/* Delivery Counter */}
          <div className="text-center mb-6">
            <DeliveryCounter />
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {PRICING_DATA.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-4 text-center shadow-sm ${
                  item.popular ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="text-3xl font-bold text-primary-600 mt-2">{item.size}</div>
                <div className="text-secondary-600 text-sm">Yard Dumpster</div>
                <div className="text-2xl font-bold text-secondary-900 mt-2">
                  {item.price}
                </div>
                {/* Visual truck capacity */}
                <div className="flex items-center justify-center gap-1 text-secondary-500 text-xs mt-1">
                  <Truck className="h-3 w-3" />
                  <span>x {item.truckLoads} loads</span>
                </div>
                {item.note && (
                  <div className="text-xs text-secondary-400 mt-1">{item.note}</div>
                )}
                {/* Book This Size button */}
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="mt-3 block bg-primary-600 text-white text-sm py-2 px-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Book {item.size} Yard
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Pricing Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            2026 Dumpster Rental Price Comparison
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            All prices include delivery, pickup, 7-day rental, weight allowance, and disposal. 
            The price we quote is the price you pay.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg mobile-card-table">
              <thead>
                <tr className="bg-secondary-100">
                  <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Size</th>
                  <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Capacity</th>
                  <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Best For</th>
                  <th className="px-6 py-4 text-left text-secondary-900 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {PRICING_DATA.map((item, idx) => (
                  <tr
                    key={item.size}
                    className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-secondary-50"} ${
                      item.popular ? "bg-primary-50 md:bg-primary-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4" data-label="Size">
                      <div>
                        <span className="font-bold text-lg">{item.size} Yard</span>
                        {item.popular && <span className="ml-2 text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">Popular</span>}
                        <br />
                        <span className="text-sm text-secondary-500">{item.dimensions}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" data-label="Price">
                      <div>
                        <span className="font-bold text-xl text-primary-600">{item.price}</span>
                        <br />
                        <span className="text-xs text-secondary-500">{item.weightLimit} included</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" data-label="Capacity">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-secondary-400" />
                        <span className="font-medium">x {item.truckLoads} loads</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-600" data-label="Best For">{item.bestFor}</td>
                    <td className="px-6 py-4" data-label="">
                      <div className="flex flex-col gap-2 w-full">
                        <a
                          href={`tel:${phone.replace(/\D/g, "")}`}
                          className="bg-primary-600 text-white text-center text-sm py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap min-h-[44px] flex items-center justify-center"
                        >
                          Book {item.size} Yard
                        </a>
                        <Link
                          href={`/${item.size}-yard-dumpster`}
                          className="text-primary-600 hover:text-primary-700 text-center text-sm"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            What&apos;s Included in Our Price?
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            Unlike other companies that advertise low prices then add fees, our flat-rate pricing includes everything.
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Truck className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">Delivery & Pickup</h3>
              <p className="text-sm text-secondary-600">Delivered and removed at no extra cost</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Clock className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">7-Day Rental</h3>
              <p className="text-sm text-secondary-600">Full week to complete your project</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <TrendingDown className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">Weight Allowance</h3>
              <p className="text-sm text-secondary-600">1-4 tons included based on size</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Shield className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">Disposal Fees</h3>
              <p className="text-sm text-secondary-600">We handle the landfill costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Fees Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Beware of Hidden Dumpster Rental Fees
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            Some companies advertise &quot;$299 dumpsters&quot; then add $200+ in fees. Here&apos;s what to watch for:
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="bg-secondary-50 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary-800 text-white p-4 font-semibold">
                <div>Fee Type</div>
                <div>Industry Typical</div>
                <div>Dumpster Champs</div>
              </div>
              {HIDDEN_FEES.map((item, idx) => (
                <div
                  key={item.fee}
                  className={`grid grid-cols-3 p-4 ${idx % 2 === 0 ? "bg-white" : "bg-secondary-50"}`}
                >
                  <div className="font-medium text-secondary-900">{item.fee}</div>
                  <div className="text-red-600">{item.typical}</div>
                  <div className="text-green-600 font-semibold flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    {item.ours}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800">Why &quot;$299 Dumpsters&quot; Cost $500+</p>
                <p className="text-sm text-amber-700">
                  Companies advertising ultra-low prices often exclude weight allowance, delivery, fuel surcharges, 
                  and environmental fees. Always ask: &quot;What&apos;s my total out-the-door price with weight included?&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factors Affecting Price */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            What Affects Dumpster Rental Prices?
          </h2>
          <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
            Understanding these factors helps you get the best value.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FACTORS_AFFECTING_PRICE.map((item) => (
              <div key={item.factor} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">{item.factor}</h3>
                <p className="text-secondary-600 text-sm mb-3">{item.impact}</p>
                <p className="text-primary-600 text-sm font-medium">💡 {item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure What Size You Need?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Use our free calculator to get a personalized size recommendation and avoid paying for space you don&apos;t need.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
          >
            <Calculator className="h-6 w-6" />
            Try the Dumpster Size Calculator
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Dumpster Rental Pricing FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                How much does it cost to rent a dumpster?
              </h3>
              <p className="text-secondary-600">
                Our all-inclusive dumpster rental prices range from $495 for a 10-yard to $795 for a 40-yard. 
                This includes delivery, pickup, 7-day rental, weight allowance, and disposal — no hidden fees. 
                Beware of companies advertising $299 dumpsters that add $200+ in fees for weight, delivery, and fuel.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                What is the cheapest dumpster to rent?
              </h3>
              <p className="text-secondary-600">
                Our 10-yard dumpster at $495 is the most affordable option with everything included. 
                It&apos;s perfect for small cleanouts, bathroom remodels, and single-room projects. 
                While you may see lower advertised prices elsewhere, those typically don&apos;t include 
                weight allowance or delivery — making them more expensive in the end.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                Why are your prices higher than some competitors?
              </h3>
              <p className="text-secondary-600">
                Our prices include everything upfront. Many competitors advertise &quot;from $299&quot; but charge 
                extra for weight ($50-$150), delivery ($50-$100), fuel ($25-$75), and other fees. 
                When you add it up, our all-inclusive pricing is often the same or less — with no surprises 
                when the bill comes.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                What happens if I go over the weight limit?
              </h3>
              <p className="text-secondary-600">
                Exceeding the weight limit results in overage fees of $50-$100 per additional ton. 
                Our calculator helps you choose the right size to avoid this. If you have heavy materials 
                like concrete, dirt, or roofing shingles, we recommend sizing up or asking about our 
                heavy debris options.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                How can I get the best value on a dumpster rental?
              </h3>
              <p className="text-secondary-600">
                To get the best value: 1) Use our calculator to choose the right size — too small means 
                a second rental, too big means wasted money, 2) Ask for all-inclusive pricing that includes 
                weight, 3) Avoid heavy materials when possible, 4) Book during slower months (fall/winter), 
                and 5) Return on time to avoid extension fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Price?</h2>
          <p className="text-xl text-secondary-300 mb-8">
            Call now for an instant quote. No obligation, no pressure, no hidden fees.
          </p>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
          >
            <Phone className="h-6 w-6" />
            Call {phone}
          </a>
          <p className="text-secondary-400 mt-4">
            Same-day delivery available • All-inclusive pricing • No hidden fees
          </p>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <FAQSchema
        faqs={[
          { question: "How much does it cost to rent a dumpster?", answer: "Dumpster rental prices range from $495 for a 10-yard container to $795 for a 40-yard container. Our all-inclusive pricing covers delivery, pickup, 7-day rental, weight allowance, and disposal fees. No hidden charges." },
          { question: "What is the cheapest dumpster to rent?", answer: "Our 10-yard dumpster at $495 is the most affordable option. It holds 3-4 pickup truck loads and is perfect for small cleanouts, bathroom remodels, and garage cleanups. Price includes everything — no hidden fees." },
          { question: "Why are your prices higher than some competitors?", answer: "Our prices include everything upfront. Many competitors advertise low prices but charge extra for weight ($50-$150), delivery ($50-$100), fuel surcharges ($25-$75), and other fees. Our all-inclusive pricing is often the same or less when you add up the total." },
          { question: "What happens if I go over the weight limit?", answer: "Exceeding the weight limit results in overage fees of $50-$100 per additional ton. We recommend using our size calculator to choose the right dumpster. For heavy materials like concrete or roofing, consider sizing up." },
          { question: "How can I get the best value on a dumpster rental?", answer: "To get the best value: 1) Use our calculator to choose the right size, 2) Get all-inclusive pricing that includes weight, 3) Separate heavy materials when possible, 4) Book during off-peak months, and 5) Return on time to avoid extension fees." },
        ]}
      />
    </>
  );
}
