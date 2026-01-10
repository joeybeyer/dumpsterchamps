import { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { Phone, Calculator, Home, Hammer, Wrench, Package, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "What Size Dumpster Do I Need? [2026] Size Guide + Calculator",
  description: "Most homeowners need a 15-20 yard dumpster. Find the right size for your project with our free calculator. 10-yard for small cleanouts, 30-40 yard for major renovations.",
  keywords: "what size dumpster do i need, dumpster size guide, dumpster size calculator, 10 yard dumpster, 20 yard dumpster, 30 yard dumpster",
  openGraph: {
    title: "What Size Dumpster Do I Need? [2026] Size Guide + Calculator",
    description: "Most homeowners need a 15-20 yard dumpster. Find the right size for your project.",
    url: "https://www.dumpsterchamps.com/what-size-dumpster-do-i-need",
    type: "article",
  },
};

const faqs = [
  {
    question: "What size dumpster do I need?",
    answer: "Most homeowners need a 15-20 yard dumpster. A 10-yard dumpster handles small cleanouts (2-3 pickup loads), while a 20-yard is ideal for kitchen or bathroom remodels (6 pickup loads). For large renovations or estate cleanouts, choose a 30-40 yard dumpster.",
  },
  {
    question: "What size dumpster for a bathroom remodel?",
    answer: "A 10-yard dumpster is sufficient for most bathroom remodels, holding approximately 2-3 pickup truck loads of debris including old fixtures, tile, drywall, and flooring.",
  },
  {
    question: "What size dumpster for a kitchen remodel?",
    answer: "A 15-20 yard dumpster handles most kitchen renovations including cabinets, countertops, flooring, and appliances. Choose 20 yards if removing an island or doing a complete gut renovation.",
  },
  {
    question: "What size dumpster for roofing?",
    answer: "Roofing jobs typically require a 20-yard dumpster. One roofing square (100 sq ft) of shingles weighs approximately 250 lbs. A typical 2,000 sq ft roof generates 4,000-5,000 lbs of debris.",
  },
  {
    question: "What size dumpster for a house cleanout?",
    answer: "Whole house cleanouts typically need a 30-yard dumpster. Estate cleanouts average 20-30 cubic yards of material including furniture, appliances, clothing, and household items.",
  },
];

const sizeData = [
  {
    size: "10 Yard",
    dimensions: '12\' L x 8\' W x 3.5\' H',
    capacity: "2-3 pickup truck loads",
    weight: "2-3 tons",
    icon: Package,
    color: "bg-blue-100 text-blue-700",
    projects: ["Small bathroom remodel", "Single room cleanout", "Garage cleanout", "Deck removal (up to 250 sq ft)"],
  },
  {
    size: "15 Yard",
    dimensions: '14\' L x 8\' W x 4\' H',
    capacity: "4-5 pickup truck loads",
    weight: "3-4 tons",
    icon: Home,
    color: "bg-green-100 text-green-700",
    projects: ["Medium bathroom remodel", "Small kitchen remodel", "Basement cleanout", "Small roofing job"],
  },
  {
    size: "20 Yard",
    dimensions: '22\' L x 8\' W x 4\' H',
    capacity: "6 pickup truck loads",
    weight: "4 tons",
    icon: Hammer,
    color: "bg-yellow-100 text-yellow-700",
    popular: true,
    projects: ["Kitchen remodel", "Full bathroom gut", "Roofing (up to 3,000 sq ft)", "Multiple room renovation"],
  },
  {
    size: "30 Yard",
    dimensions: '22\' L x 8\' W x 6\' H',
    capacity: "9 pickup truck loads",
    weight: "5 tons",
    icon: Wrench,
    color: "bg-orange-100 text-orange-700",
    projects: ["Whole house cleanout", "Estate cleanout", "Large renovation", "New construction debris"],
  },
  {
    size: "40 Yard",
    dimensions: '22\' L x 8\' W x 8\' H',
    capacity: "12 pickup truck loads",
    weight: "6 tons",
    icon: Trash2,
    color: "bg-red-100 text-red-700",
    projects: ["Commercial projects", "Major demolition", "New home construction", "Large commercial cleanout"],
  },
];

const projectGuide = [
  { project: "Bathroom remodel", recommended: "10 Yard", notes: "15 yard if full gut with tile" },
  { project: "Kitchen remodel", recommended: "15-20 Yard", notes: "20 yard for island removal" },
  { project: "Single room cleanout", recommended: "10 Yard", notes: "Perfect for bedroom or office" },
  { project: "Garage cleanout", recommended: "10-15 Yard", notes: "15 yard if heavily packed" },
  { project: "Basement cleanout", recommended: "15-20 Yard", notes: "Depends on accumulation" },
  { project: "Roofing (1,500 sq ft)", recommended: "15 Yard", notes: "Shingles are heavy!" },
  { project: "Roofing (3,000 sq ft)", recommended: "20 Yard", notes: "May need 30 for 2 layers" },
  { project: "Deck removal", recommended: "15-20 Yard", notes: "Depends on deck size" },
  { project: "Whole house cleanout", recommended: "30 Yard", notes: "40 yard for large homes" },
  { project: "Estate cleanout", recommended: "30 Yard", notes: "May need multiple hauls" },
  { project: "New construction", recommended: "30-40 Yard", notes: "Depends on project scope" },
];

export default function WhatSizeDumpsterDoINeedPage() {
  return (
    <>
      {/* Schema Markup */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "What Size Dumpster Do I Need", url: "https://www.dumpsterchamps.com/what-size-dumpster-do-i-need" },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-secondary-600">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-secondary-900">What Size Dumpster Do I Need</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Quick Answer Box - Critical for PAA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Quick Answer</h2>
            <p className="text-blue-800 mb-2">
              <strong>What size dumpster do I need?</strong>
            </p>
            <p className="text-blue-700">
              Most homeowners need a <strong>15-20 yard dumpster</strong>. A 10-yard handles single room cleanouts,
              while 30-40 yard is for major renovations or estate cleanouts. Not sure?{" "}
              <Link href="/calculator" className="text-blue-600 font-semibold hover:underline">
                Use our free calculator
              </Link>{" "}
              for a personalized recommendation.
            </p>
          </div>

          {/* H1 with year for freshness */}
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            What Size Dumpster Do I Need? [2026] Complete Size Guide
          </h1>

          <p className="text-lg text-secondary-700 mb-8">
            Choosing the right dumpster size saves you money. Too small and you'll need a second haul.
            Too big and you're paying for space you don't need. Use this guide to find the perfect size
            for your project.
          </p>

          {/* Calculator CTA */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center gap-4">
            <Calculator className="w-12 h-12 text-primary-600 flex-shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-secondary-900 mb-1">Not Sure? Use Our Free Calculator</h2>
              <p className="text-secondary-600">Answer a few questions and get a personalized size recommendation in 30 seconds.</p>
            </div>
            <Link
              href="/calculator"
              className="bg-primary-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
            >
              Open Calculator
            </Link>
          </div>

          {/* Size Cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Dumpster Sizes Explained
            </h2>

            <div className="space-y-6">
              {sizeData.map((size) => (
                <div
                  key={size.size}
                  className={`border rounded-xl p-6 ${size.popular ? 'border-primary-500 ring-2 ring-primary-100' : 'border-secondary-200'}`}
                >
                  {size.popular && (
                    <div className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${size.color}`}>
                      <size.icon className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">{size.size} Dumpster</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-secondary-600 mb-4">
                        <div><strong>Dimensions:</strong> {size.dimensions}</div>
                        <div><strong>Capacity:</strong> {size.capacity}</div>
                        <div><strong>Weight Limit:</strong> {size.weight}</div>
                      </div>

                      <div>
                        <p className="font-semibold text-secondary-700 mb-2">Best For:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {size.projects.map((project, idx) => (
                            <li key={idx} className="text-secondary-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Project Guide Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Dumpster Size by Project Type
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Project</th>
                    <th className="px-4 py-3 text-left font-semibold">Recommended Size</th>
                    <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {projectGuide.map((item, index) => (
                    <tr key={item.project} className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-3 font-medium text-secondary-900">{item.project}</td>
                      <td className="px-4 py-3 text-primary-600 font-semibold">{item.recommended}</td>
                      <td className="px-4 py-3 text-secondary-600 hidden sm:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Weight Warning */}
          <section className="mb-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">
                ⚠️ Weight Matters More Than Size for Heavy Materials
              </h2>
              <p className="text-yellow-700 mb-4">
                Heavy materials like concrete, brick, dirt, and roofing shingles can hit weight limits
                before filling the dumpster. Here's how much common materials weigh:
              </p>
              <ul className="space-y-2 text-yellow-700">
                <li><strong>Concrete/Asphalt:</strong> 4,000 lbs per cubic yard</li>
                <li><strong>Brick/Block:</strong> 3,000 lbs per cubic yard</li>
                <li><strong>Dirt/Sand:</strong> 2,200 lbs per cubic yard</li>
                <li><strong>Roofing Shingles:</strong> 250 lbs per roofing square (100 sq ft)</li>
              </ul>
              <p className="text-yellow-700 mt-4">
                <Link href="/calculator" className="font-semibold underline">Our calculator</Link>{" "}
                accounts for weight to recommend the right size.
              </p>
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
                  <Link href="/how-much-does-dumpster-rental-cost" className="hover:text-primary-600">
                    How much does it cost to rent a dumpster?
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  Dumpster rental costs $300-$500 for a 7-day rental of a 15-20 yard container.
                  View our{" "}
                  <Link href="/dumpster-rental-prices" className="text-primary-600 hover:underline">complete pricing guide</Link>.
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
                <h3 className="font-semibold text-secondary-900 mb-2">Can I put anything in a dumpster?</h3>
                <p className="text-secondary-600">
                  Most household waste is allowed, but hazardous materials, tires, batteries, and appliances
                  with refrigerants are prohibited. See our{" "}
                  <Link href="/blog/what-can-go-in-dumpster" className="text-primary-600 hover:underline">complete disposal guide</Link>.
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
              Still Not Sure? We'll Help You Choose
            </h2>
            <p className="text-primary-100 mb-6">
              Call us and describe your project. We'll recommend the perfect size—no upselling, guaranteed.
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
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors border border-primary-500"
              >
                <Calculator className="w-5 h-5" />
                Use Free Calculator
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
