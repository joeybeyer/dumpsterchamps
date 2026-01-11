import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, Ruler, Package, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2026-01-11");

export const metadata: Metadata = {
  title: "Dumpster Sizes: 10-40 Yard Complete Guide [2026]",
  description:
    "The ultimate 2026 guide to dumpster sizes. Learn which size (10, 15, 20, 30, or 40 yard) is right for your project. Dimensions, capacity & pricing explained.",
  openGraph: {
    title: "Dumpster Sizes: 10-40 Yard Complete Guide [2026]",
    description: "The ultimate guide to choosing the right dumpster size for your project.",
    type: "article",
  },
};

const sizes = [
  {
    size: 10,
    name: "10 Yard Dumpster",
    dimensions: '12\' L x 8\' W x 3.5\' H',
    capacity: "2-3 pickup truck loads",
    weight: "2 tons",
    price: "$495",
    bestFor: [
      "Small bathroom remodels",
      "Single room cleanouts",
      "Small garage cleanouts",
      "Minor landscaping projects",
      "Deck removal (small)",
    ],
    notIdeal: [
      "Whole house cleanouts",
      "Major renovations",
      "Heavy debris (concrete)",
    ],
  },
  {
    size: 15,
    name: "15 Yard Dumpster",
    dimensions: '14\' L x 8\' W x 4\' H',
    capacity: "4-5 pickup truck loads",
    weight: "2.5 tons",
    price: "$550",
    bestFor: [
      "Medium renovations",
      "Full garage cleanouts",
      "Basement cleanouts",
      "Small roofing jobs",
      "Flooring removal",
    ],
    notIdeal: [
      "Large construction projects",
      "Commercial jobs",
      "Heavy demolition",
    ],
  },
  {
    size: 20,
    name: "20 Yard Dumpster",
    dimensions: '22\' L x 8\' W x 4.5\' H',
    capacity: "6-7 pickup truck loads",
    weight: "3 tons",
    price: "$595",
    bestFor: [
      "Kitchen remodels",
      "Medium roofing projects",
      "Multiple room cleanouts",
      "Deck/patio removal",
      "Estate cleanouts",
    ],
    notIdeal: [
      "Small single-room projects",
      "Very heavy materials only",
    ],
    popular: true,
  },
  {
    size: 30,
    name: "30 Yard Dumpster",
    dimensions: '22\' L x 8\' W x 6\' H',
    capacity: "9-10 pickup truck loads",
    weight: "4 tons",
    price: "$695",
    bestFor: [
      "Major home renovations",
      "Large roofing projects",
      "New construction cleanup",
      "Commercial cleanouts",
      "Whole house cleanouts",
    ],
    notIdeal: [
      "Small residential projects",
      "Limited driveway space",
    ],
  },
  {
    size: 40,
    name: "40 Yard Dumpster",
    dimensions: '22\' L x 8\' W x 8\' H',
    capacity: "12+ pickup truck loads",
    weight: "5 tons",
    price: "$795",
    bestFor: [
      "Large commercial projects",
      "Major demolition",
      "New construction",
      "Industrial cleanouts",
      "Large-scale renovations",
    ],
    notIdeal: [
      "Residential driveways (height)",
      "Small projects",
    ],
  },
];

const projectGuide = [
  { project: "Bathroom Remodel", size: "10 Yard", reason: "Limited debris from fixtures, tile, vanity" },
  { project: "Kitchen Remodel", size: "20 Yard", reason: "Cabinets, countertops, appliances, flooring" },
  { project: "Garage Cleanout", size: "10-15 Yard", reason: "Depends on accumulation level" },
  { project: "Basement Cleanout", size: "15-20 Yard", reason: "Often more than expected" },
  { project: "Whole House Cleanout", size: "30 Yard", reason: "Furniture, belongings from every room" },
  { project: "Roofing (up to 20 squares)", size: "20 Yard", reason: "Shingles are heavy, watch weight" },
  { project: "Roofing (20+ squares)", size: "30 Yard", reason: "More volume and weight capacity" },
  { project: "Deck Removal", size: "15-20 Yard", reason: "Wood is bulky but lighter" },
  { project: "New Construction", size: "30-40 Yard", reason: "Ongoing debris throughout project" },
  { project: "Landscaping Project", size: "10-15 Yard", reason: "Branches, soil, old plants" },
];

const faqs = [
  {
    question: "What is the most popular dumpster size?",
    answer: "The 20-yard dumpster is our most popular size. It offers the best balance of capacity and price for most home renovation projects, fitting 6-7 pickup truck loads while still fitting in a standard driveway.",
  },
  {
    question: "How do I know if a dumpster will fit in my driveway?",
    answer: "A 10-20 yard dumpster needs about 10 feet of width and 60+ feet of length for delivery truck access. 30-40 yard dumpsters need 12+ feet of width. Height clearance should be 14-22 feet depending on size. Most residential driveways accommodate up to 30-yard dumpsters.",
  },
  {
    question: "What happens if I choose a size too small?",
    answer: "If your dumpster fills up before your project is complete, you'll need to schedule an additional rental, which costs more than sizing up initially. We recommend erring on the larger side—the price difference between sizes is only $50-100, much less than a second rental.",
  },
  {
    question: "Can I mix different types of debris in one dumpster?",
    answer: "Yes, you can mix most household and construction debris in a single dumpster. However, some heavy materials like concrete should be kept separate if possible, as they can quickly exceed weight limits. Hazardous materials are never allowed.",
  },
  {
    question: "How much weight can each dumpster size hold?",
    answer: "Weight allowances are: 10-yard (2 tons), 15-yard (2.5 tons), 20-yard (3 tons), 30-yard (4 tons), and 40-yard (5 tons). Exceeding your weight allowance incurs overage fees of $75 per ton. Heavy materials like concrete, brick, and roofing shingles can hit weight limits before filling the volume.",
  },
];

export default function DumpsterSizesGuide() {
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
            <span className="text-white">Dumpster Sizes Guide</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Complete Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The Ultimate Guide to Dumpster Sizes: 10, 15, 20, 30 & 40 Yard Explained [2026]
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                Choosing the right dumpster size is crucial for your project&apos;s success. Too small means paying for a second rental. Too large means overpaying for space you don&apos;t need. This comprehensive guide helps you make the right choice.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>15 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/dumpster-sizes-guide-hero.jpg"
                alt="Different dumpster sizes comparison - 10, 20, and 40 yard roll-off dumpsters side by side"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-secondary-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {sizes.map((s) => (
              <a
                key={s.size}
                href={`#${s.size}-yard`}
                className="px-4 py-2 bg-white rounded-lg border border-secondary-200 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
              >
                {s.size} Yard
              </a>
            ))}
            <a
              href="#project-guide"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Project Guide
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Understanding Dumpster Sizes</h2>
            <p className="text-secondary-700 leading-relaxed mb-6">
              Dumpster sizes are measured in <strong>cubic yards</strong>, which indicates the volume of debris they can hold. A cubic yard is a 3-foot by 3-foot by 3-foot cube—about the size of a standard kitchen stove.
            </p>
            <p className="text-secondary-700 leading-relaxed mb-6">
              When choosing a size, consider both <strong>volume</strong> (how much space you need) and <strong>weight</strong> (how heavy your debris is). Heavy materials like concrete can fill weight limits before filling volume.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg my-8">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Pro Tip: When in Doubt, Size Up</h3>
              <p className="text-primary-800 mb-0">
                The price difference between dumpster sizes is typically only $50-100. A second rental if you underestimate costs $495+. It&apos;s almost always cheaper to size up than to order twice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Size Details */}
      {sizes.map((s, index) => (
        <section
          key={s.size}
          id={`${s.size}-yard`}
          className={index % 2 === 0 ? "py-16 bg-white" : "py-16 bg-secondary-50"}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary-600 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                      {s.size}
                    </div>
                    {s.popular && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-secondary-900 mb-4">{s.name}</h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-secondary-200">
                      <Ruler className="h-5 w-5 text-primary-600 mb-2" />
                      <div className="text-sm text-secondary-600">Dimensions</div>
                      <div className="font-semibold text-secondary-900">{s.dimensions}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-secondary-200">
                      <Package className="h-5 w-5 text-primary-600 mb-2" />
                      <div className="text-sm text-secondary-600">Capacity</div>
                      <div className="font-semibold text-secondary-900">{s.capacity}</div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-primary-600">{s.price}</span>
                    <span className="text-secondary-600">flat rate | {s.weight} included</span>
                  </div>

                  <Link
                    href={`/${s.size}-yard-dumpster`}
                    className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Get a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Best For:</h3>
                    <ul className="space-y-2">
                      {s.bestFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Not Ideal For:</h3>
                    <ul className="space-y-2">
                      {s.notIdeal.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-secondary-500">
                          <span className="text-secondary-400">×</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Project Size Guide */}
      <section id="project-guide" className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Quick Project Size Guide</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-secondary-100">
                    <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Project Type</th>
                    <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Recommended Size</th>
                    <th className="px-6 py-4 text-left text-secondary-900 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {projectGuide.map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-6 py-4 text-secondary-900 font-medium">{p.project}</td>
                      <td className="px-6 py-4 text-primary-600 font-semibold">{p.size}</td>
                      <td className="px-6 py-4 text-secondary-600">{p.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Weight Considerations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">Understanding Weight Limits</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important: Weight vs. Volume</h3>
              <p className="text-yellow-800">
                Heavy materials can hit your weight limit before filling the dumpster&apos;s volume. Always consider the TYPE of debris, not just the amount.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-secondary-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Light Materials (~300-600 lbs/yd³)</h3>
                <ul className="space-y-2 text-secondary-700">
                  <li>• Household items & furniture</li>
                  <li>• Cardboard & paper</li>
                  <li>• Light wood scraps</li>
                  <li>• Yard waste (branches, leaves)</li>
                </ul>
                <p className="mt-4 text-sm text-secondary-600">
                  These materials will fill volume before hitting weight limits.
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Heavy Materials (~2,000-4,000 lbs/yd³)</h3>
                <ul className="space-y-2 text-red-800">
                  <li>• Concrete & brick</li>
                  <li>• Roofing shingles</li>
                  <li>• Soil & dirt</li>
                  <li>• Stone & tile</li>
                </ul>
                <p className="mt-4 text-sm text-red-700">
                  These materials will hit weight limits before filling volume. Consider a larger size or separate haul.
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
          <h2 className="text-3xl font-bold mb-4">Still Not Sure Which Size You Need?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Our team can help you choose the perfect size based on your specific project. Get a free quote with personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get a Free Quote
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
          { name: "Dumpster Sizes Guide", url: "https://www.dumpsterchamps.com/blog/dumpster-sizes-guide" },
        ]}
      />
      <ArticleSchema
        title="Complete Dumpster Size Guide: 10, 15, 20, 30 & 40 Yard Explained"
        description="The ultimate guide to dumpster sizes. Learn which size (10, 15, 20, 30, or 40 yard) is right for your project. Dimensions, capacity, pricing & use cases explained."
        url="https://www.dumpsterchamps.com/blog/dumpster-sizes-guide"
        dateModified={LAST_UPDATED}
        image="https://www.dumpsterchamps.com/images/blog/dumpster-sizes-guide-hero.jpg"
      />
    </>
  );
}
