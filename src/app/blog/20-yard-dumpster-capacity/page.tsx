import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, Ruler, Package, Scale, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2026-01-11");

export const metadata: Metadata = {
  title: "20 Yard Dumpster Capacity Guide [2026]",
  description:
    "Discover exactly what fits in a 20 yard dumpster: 6-8 pickup truck loads, 3 tons of debris. See real examples for renovations, roofing, cleanouts & more.",
  openGraph: {
    title: "20 Yard Dumpster Capacity Guide [2026]",
    description: "Complete guide to what fits in a 20 yard dumpster with real-world examples.",
    type: "article",
  },
};

const quickFacts = [
  { label: "Dimensions", value: "22' L x 7.5' W x 4.5' H", icon: Ruler },
  { label: "Volume", value: "20 cubic yards", icon: Package },
  { label: "Equivalent", value: "6-8 pickup truck loads", icon: Package },
  { label: "Weight Limit", value: "3 tons (6,000 lbs)", icon: Scale },
];

const projectExamples = [
  {
    project: "Kitchen Remodel",
    fits: true,
    description: "Cabinets, countertops, flooring, drywall, old appliances from an average kitchen",
    squareFootage: "150-300 sq ft kitchen",
    notes: "Perfect size—most kitchen remodels fill 70-90% of a 20-yard",
  },
  {
    project: "Full Bathroom Remodel",
    fits: true,
    description: "Tub, toilet, vanity, tile, drywall, flooring for 2-3 bathrooms",
    squareFootage: "Multiple bathrooms or 1 + other debris",
    notes: "Single bathroom typically needs only 10-15 yards",
  },
  {
    project: "Roofing (up to 25 squares)",
    fits: true,
    description: "Asphalt shingles, underlayment, flashing, nails from a medium roof",
    squareFootage: "1,500-2,500 sq ft roof",
    notes: "Watch weight—shingles are heavy at 250 lbs/square",
  },
  {
    project: "Single Room Addition Demo",
    fits: true,
    description: "Walls, flooring, ceiling, fixtures from a 12x15 room",
    squareFootage: "150-200 sq ft",
    notes: "Leaves room for associated renovation debris",
  },
  {
    project: "Deck Removal",
    fits: true,
    description: "Wooden deck boards, framing, railings, stairs",
    squareFootage: "Up to 400 sq ft deck",
    notes: "Wood is bulky but light—plenty of capacity",
  },
  {
    project: "2-3 Room Cleanout",
    fits: true,
    description: "Furniture, belongings, junk from multiple rooms",
    squareFootage: "Garage + basement + attic",
    notes: "Our most popular size for estate cleanouts",
  },
  {
    project: "Whole House Cleanout",
    fits: false,
    description: "Full contents of a 3+ bedroom home",
    squareFootage: "2,000+ sq ft home",
    notes: "May need 30-yard or multiple loads for full home",
  },
  {
    project: "Large Concrete Project",
    fits: false,
    description: "Driveway, patio, or foundation concrete",
    squareFootage: "Heavy materials",
    notes: "Concrete weighs 4,000 lbs/yd³—weight limit exceeded quickly",
  },
];

const materialCapacity = [
  { material: "Household Junk", capacity: "2,500 lbs fills it", weight: "Light (200-400 lbs/yd³)", volumeFirst: true },
  { material: "Wood/Lumber", capacity: "Full dumpster", weight: "Light-Medium (300-500 lbs/yd³)", volumeFirst: true },
  { material: "Drywall", capacity: "Full dumpster", weight: "Medium (500-600 lbs/yd³)", volumeFirst: true },
  { material: "Roofing Shingles", capacity: "12-15 cubic yards", weight: "Heavy (750 lbs/yd³)", volumeFirst: false },
  { material: "Tile/Ceramic", capacity: "8-10 cubic yards", weight: "Heavy (1,000 lbs/yd³)", volumeFirst: false },
  { material: "Concrete/Brick", capacity: "3 cubic yards MAX", weight: "Very Heavy (4,000 lbs/yd³)", volumeFirst: false },
];

const faqs = [
  {
    question: "How many pickup truck loads fit in a 20 yard dumpster?",
    answer: "A 20 yard dumpster holds approximately 6-8 standard pickup truck loads (based on a full-size truck bed that holds about 2.5-3 cubic yards). This varies slightly based on how efficiently you load the dumpster and truck.",
  },
  {
    question: "What are the dimensions of a 20 yard dumpster?",
    answer: "A standard 20 yard dumpster measures approximately 22 feet long x 7.5 feet wide x 4.5 feet high. The walls are about waist-to-chest height on most adults, making it easy to load debris over the sides or through the rear walk-in door.",
  },
  {
    question: "How much weight can a 20 yard dumpster hold?",
    answer: "Most 20 yard dumpsters include a 3-ton (6,000 lb) weight allowance. You can exceed this, but expect overage fees of $50-100 per ton. For heavy materials like concrete or roofing, the weight limit is more restrictive than the volume.",
  },
  {
    question: "Is a 20 yard dumpster big enough for a kitchen remodel?",
    answer: "Yes, a 20 yard dumpster is ideal for kitchen remodels. It comfortably holds cabinets, countertops, flooring, drywall, and old appliances from an average kitchen. Most kitchen remodels fill 70-90% of a 20-yard dumpster.",
  },
  {
    question: "What's the difference between 20 yard and 30 yard dumpsters?",
    answer: "A 30 yard dumpster holds 50% more volume (30 vs 20 cubic yards) and typically includes 1 more ton of weight allowance (4 tons vs 3 tons). The footprint is similar (same length and width), but the 30-yard is about 1.5 feet taller. The price difference is usually $100 ($595 vs $695).",
  },
];

export default function TwentyYardCapacity() {
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
            <span className="text-white">20 Yard Dumpster Capacity</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Most Popular Size
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                How Much Does a 20 Yard Dumpster Hold?
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                The 20 yard is our most popular size for good reason. Here&apos;s exactly what fits, real project examples, and how to know if it&apos;s right for you.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>6 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/20-yard-dumpster-capacity.jpg"
                alt="20 yard dumpster filled with renovation debris"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-8 bg-primary-50 border-b border-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickFacts.map((fact, i) => (
                <div key={i} className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <fact.icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="text-sm text-secondary-600">{fact.label}</div>
                  <div className="font-bold text-secondary-900">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Answer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              The Simple Answer
            </h2>
            <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-8 text-center">
              <p className="text-2xl text-secondary-800 mb-4">
                A 20 yard dumpster holds about <strong className="text-primary-700">6-8 pickup truck loads</strong> of debris
              </p>
              <p className="text-secondary-600">
                That&apos;s 20 cubic yards of space with a 3-ton (6,000 lb) weight limit. Perfect for medium-to-large home projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Examples */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Will Your Project Fit? Real Examples
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {projectExamples.map((example, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-5 ${
                    example.fits
                      ? "bg-white border-2 border-green-200"
                      : "bg-red-50 border-2 border-red-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-secondary-900">{example.project}</h3>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${
                      example.fits
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {example.fits ? "Fits" : "May Not Fit"}
                    </span>
                  </div>
                  <p className="text-secondary-600 text-sm mb-2">{example.description}</p>
                  <p className="text-secondary-500 text-xs mb-2">
                    <strong>Coverage:</strong> {example.squareFootage}
                  </p>
                  <p className={`text-sm ${example.fits ? "text-green-700" : "text-red-700"}`}>
                    {example.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Material Capacity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Capacity by Material Type
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              Weight matters as much as volume. Here&apos;s how different materials affect capacity:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-secondary-100">
                    <th className="px-6 py-4 text-left font-semibold text-secondary-900">Material</th>
                    <th className="px-6 py-4 text-left font-semibold text-secondary-900">How Much Fits</th>
                    <th className="px-6 py-4 text-left font-semibold text-secondary-900">Weight Class</th>
                    <th className="px-6 py-4 text-center font-semibold text-secondary-900">Limiting Factor</th>
                  </tr>
                </thead>
                <tbody>
                  {materialCapacity.map((mat, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-6 py-4 font-medium text-secondary-900">{mat.material}</td>
                      <td className="px-6 py-4 text-secondary-700">{mat.capacity}</td>
                      <td className="px-6 py-4 text-secondary-600">{mat.weight}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          mat.volumeFirst
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          {mat.volumeFirst ? "Volume" : "Weight"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-yellow-800">
                <strong>Important:</strong> Heavy materials like concrete and brick will hit the 3-ton weight limit long before filling the volume. For heavy debris, consider a larger dumpster for the extra weight allowance, not the extra space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison to Other Sizes */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              20 Yard vs. Other Sizes
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center border-2 border-secondary-200">
                <div className="text-3xl font-bold text-secondary-400 mb-2">15 Yard</div>
                <div className="text-secondary-600 mb-4">4-5 pickup loads</div>
                <div className="text-primary-600 font-semibold">$550</div>
                <p className="text-sm text-secondary-500 mt-2">Better for: Single room projects</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 text-center border-2 border-primary-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-2">20 Yard</div>
                <div className="text-secondary-700 mb-4">6-8 pickup loads</div>
                <div className="text-primary-600 font-semibold">$595</div>
                <p className="text-sm text-secondary-600 mt-2">Perfect for: Kitchen/bath remodels, roofing, cleanouts</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center border-2 border-secondary-200">
                <div className="text-3xl font-bold text-secondary-400 mb-2">30 Yard</div>
                <div className="text-secondary-600 mb-4">9-12 pickup loads</div>
                <div className="text-primary-600 font-semibold">$695</div>
                <p className="text-sm text-secondary-500 mt-2">Better for: Major renovations, construction</p>
              </div>
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
              Find a 20 Yard Dumpster Near You
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              Get a 20 yard dumpster delivered to your location with same-day availability:
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
          <h2 className="text-3xl font-bold mb-4">Ready to Rent a 20 Yard Dumpster?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            $595 flat rate includes delivery, pickup, 7-day rental, and 3 tons of weight. No hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/20-yard-dumpster"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              View 20 Yard Details
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
          { name: "20 Yard Dumpster Capacity", url: "https://www.dumpsterchamps.com/blog/20-yard-dumpster-capacity" },
        ]}
      />
      <ArticleSchema
        title="How Much Does a 20 Yard Dumpster Hold? Complete Capacity Guide"
        description="Discover exactly what fits in a 20 yard dumpster: 6-8 pickup truck loads, 3 tons of debris. See real examples for renovations, roofing, cleanouts & more."
        url="https://www.dumpsterchamps.com/blog/20-yard-dumpster-capacity"
        dateModified={LAST_UPDATED}
      />
    </>
  );
}
