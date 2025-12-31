import { Metadata } from "next";
import Link from "next/link";
import { Phone, Check, Truck, Clock, Shield, Ruler, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Small Dumpster Rental | 10 & 15 Yard Containers",
  description: "Small dumpster rental from $495. 10 and 15 yard dumpsters perfect for garage cleanouts, bathroom remodels & small projects. Fits in any driveway. Same-day delivery.",
  keywords: "small dumpster rental, 10 yard dumpster, 15 yard dumpster, mini dumpster rental, small roll off dumpster",
};

const SMALL_SIZES = [
  {
    size: 10,
    price: "$495",
    weightLimit: "2 tons (4,000 lbs)",
    dimensions: "12' L x 8' W x 3.5' H",
    capacity: "3-4 pickup truck loads",
    projects: [
      "Garage cleanout",
      "Small bathroom remodel",
      "Deck removal (small)",
      "Single room cleanout",
      "Yard debris cleanup",
    ],
    good: true,
  },
  {
    size: 15,
    price: "$550",
    weightLimit: "3 tons (6,000 lbs)",
    dimensions: "16' L x 7.5' W x 4' H",
    capacity: "5-6 pickup truck loads",
    projects: [
      "Kitchen remodel",
      "Flooring replacement",
      "Attic cleanout",
      "Medium renovation",
      "Multiple room cleanout",
    ],
    popular: true,
  },
];

const COMPARISON = [
  { feature: "Fits in driveway", small: true, large: true },
  { feature: "Easy to load (low sides)", small: true, large: false },
  { feature: "Garage cleanout", small: true, large: false },
  { feature: "Major renovation", small: false, large: true },
  { feature: "Whole house cleanout", small: false, large: true },
  { feature: "Lower cost", small: true, large: false },
];

const WHEN_SMALL = [
  {
    project: "Garage Cleanout",
    description: "Clearing out years of accumulated stuff from a 2-car garage typically fills a 10-yard dumpster perfectly.",
  },
  {
    project: "Bathroom Remodel",
    description: "A single bathroom generates a toilet, vanity, tile, and drywall. 10-yard handles it with room to spare.",
  },
  {
    project: "Deck Removal",
    description: "A small deck (up to 200 sq ft) fits in a 10-yard. Larger decks may need a 15 or 20-yard.",
  },
  {
    project: "Flooring Project",
    description: "Carpet, padding, and old flooring from 1-3 rooms fits comfortably in a 10-15 yard dumpster.",
  },
  {
    project: "Yard Cleanup",
    description: "Branches, brush, and yard waste are bulky but light. A 10-yard holds a lot of green waste.",
  },
  {
    project: "Estate/Moving Cleanout",
    description: "Clearing furniture and junk from a few rooms. Start with 15-yard; upgrade if needed.",
  },
];

export default function SmallDumpsterPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary-400 font-semibold mb-2">Compact Containers</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Small Dumpster Rental
            </h1>
            <p className="text-xl text-secondary-200 mb-6">
              Don&apos;t pay for more than you need. Our 10 and 15-yard dumpsters are perfect for
              smaller projects — garage cleanouts, bathroom remodels, and yard cleanup.
              Starting at just <strong className="text-white">$495</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Order Now: {phone}
              </a>
              <Link
                href="/calculator"
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary-900 transition-colors"
              >
                Calculate Your Size
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Size Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Our Small Dumpster Options
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Both sizes fit in standard driveways and are easy to load thanks to their lower sides.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SMALL_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-8 shadow-lg border-2 ${
                  item.popular ? "border-primary-500" : "border-secondary-100"
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-sm px-4 py-1 rounded-full">
                    Most Popular Small Size
                  </span>
                )}
                {item.good && (
                  <span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full">
                    Best Value
                  </span>
                )}

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-6xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-2xl text-secondary-600">Yard</span>
                </div>
                <div className="text-4xl font-bold text-secondary-900 mt-3">{item.price}</div>
                <div className="text-secondary-500 mb-6">All-inclusive pricing</div>

                <div className="bg-secondary-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{item.dimensions}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{item.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">{item.weightLimit} included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary-600" />
                    <span className="text-secondary-700">7-day rental included</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-semibold text-secondary-900 mb-3">Perfect for:</p>
                  <ul className="space-y-2">
                    {item.projects.map((project) => (
                      <li key={project} className="flex items-center gap-2 text-secondary-600">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-8 block text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Order {item.size} Yard Dumpster
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Choose Small */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            When is a Small Dumpster the Right Choice?
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Small dumpsters work great for focused, single-room, or weekend projects.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHEN_SMALL.map((item) => (
              <div key={item.project} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-secondary-900 mb-2">{item.project}</h3>
                <p className="text-secondary-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Small vs Large Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Small vs. Large Dumpsters
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Not sure if small is right for you? Here&apos;s a quick comparison.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary-50 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-secondary-800 text-white p-4 font-semibold">
                <div>Feature</div>
                <div className="text-center">Small (10-15 yd)</div>
                <div className="text-center">Large (20-40 yd)</div>
              </div>
              {COMPARISON.map((item, idx) => (
                <div
                  key={item.feature}
                  className={`grid grid-cols-3 p-4 ${idx % 2 === 0 ? "bg-white" : "bg-secondary-50"}`}
                >
                  <div className="text-secondary-900">{item.feature}</div>
                  <div className="text-center">
                    {item.small ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-secondary-300">—</span>
                    )}
                  </div>
                  <div className="text-center">
                    {item.large ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-secondary-300">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-secondary-600 mb-4">Need something bigger?</p>
            <Link
              href="/dumpster-sizes"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              View All Dumpster Sizes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits of Small */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Benefits of Choosing a Smaller Dumpster
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary-600 mb-2">$100+</div>
              <p className="text-secondary-900 font-semibold mb-1">Save Money</p>
              <p className="text-secondary-600 text-sm">
                Pay only for the capacity you need. A 10-yard is $100 less than a 20-yard.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary-600 mb-2">3.5'</div>
              <p className="text-secondary-900 font-semibold mb-1">Lower Sides</p>
              <p className="text-secondary-600 text-sm">
                Easier to load heavy items. Less lifting means less strain.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-primary-600 mb-2">12'</div>
              <p className="text-secondary-900 font-semibold mb-1">Compact Footprint</p>
              <p className="text-secondary-600 text-sm">
                Fits in tight spaces. Still room for your car in the driveway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Small Dumpster FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                What&apos;s the smallest dumpster I can rent?
              </h3>
              <p className="text-secondary-600">
                Our 10-yard dumpster is our smallest size. It measures 12 feet long by 8 feet wide by 3.5 feet
                high — about the size of a small car. It holds 3-4 pickup truck loads of debris.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                How much does a small dumpster cost?
              </h3>
              <p className="text-secondary-600">
                Our 10-yard is $495 and our 15-yard is $550. Both prices include delivery, pickup, a 7-day
                rental period, weight allowance (2-3 tons), and disposal fees. No hidden charges.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                What if I fill it up and need more space?
              </h3>
              <p className="text-secondary-600">
                We can swap your full dumpster for an empty one. There&apos;s an additional haul fee for the swap.
                If you think you might need more space, it&apos;s often more economical to order the next size up
                from the start.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                Will a small dumpster fit in my driveway?
              </h3>
              <p className="text-secondary-600">
                Yes. Our 10-yard is just 12 feet long — about the length of a compact car. The 15-yard is
                16 feet long. Both fit comfortably in standard residential driveways with room to spare.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                How do I know if small is big enough?
              </h3>
              <p className="text-secondary-600">
                Use our{" "}
                <Link href="/calculator" className="text-primary-600 hover:underline">size calculator</Link>{" "}
                to get a recommendation based on your specific project. Or call us — we&apos;ve helped thousands
                of customers choose the right size and are happy to advise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order Your Small Dumpster?</h2>
          <p className="text-xl text-secondary-300 mb-8">
            Same-day delivery available. All-inclusive pricing starting at $495.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
            >
              <Phone className="h-6 w-6" />
              Call {phone}
            </a>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-secondary-900 transition-colors"
            >
              Not Sure? Use Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
