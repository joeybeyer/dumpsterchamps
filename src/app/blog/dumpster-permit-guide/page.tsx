import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, X, AlertTriangle, FileText, MapPin, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2026-01-11");

export const metadata: Metadata = {
  title: "Dumpster Permit Guide: City-by-City [2026]",
  description:
    "Find out if you need a dumpster permit in your city. Complete guide covering permit requirements, costs ($0-150), how to apply, and tips to avoid fines.",
  openGraph: {
    title: "Dumpster Permit Guide: City-by-City [2026]",
    description: "Complete guide to dumpster permit requirements by city and placement location.",
    type: "article",
  },
};

const permitRules = [
  {
    placement: "Private Driveway",
    permit: "Usually NOT required",
    reason: "Your property, your rules (with HOA exceptions)",
    icon: "🏠",
  },
  {
    placement: "Public Street",
    permit: "Almost ALWAYS required",
    reason: "City regulates right-of-way usage",
    icon: "🛣️",
  },
  {
    placement: "Sidewalk/Curb",
    permit: "ALWAYS required",
    reason: "Public pedestrian access must be maintained",
    icon: "🚶",
  },
  {
    placement: "Alley",
    permit: "Usually required",
    reason: "Alleys are typically city-owned",
    icon: "🏘️",
  },
  {
    placement: "Commercial Lot",
    permit: "Varies by city",
    reason: "Depends on zoning and lot ownership",
    icon: "🏢",
  },
];

const majorCityPermits = [
  { city: "New York City", state: "NY", cost: "$45-75", time: "3-5 days", notes: "Required for all street placement", slug: "new-york-city-ny" },
  { city: "Los Angeles", state: "CA", cost: "$60-100", time: "2-3 days", notes: "Street use permit from LADBS", slug: "los-angeles-ca" },
  { city: "Chicago", state: "IL", cost: "$50", time: "1-2 days", notes: "CDOT permit for public way", slug: "chicago-il" },
  { city: "Houston", state: "TX", cost: "$0-50", time: "1-2 days", notes: "Often not required in residential", slug: "houston-tx" },
  { city: "Phoenix", state: "AZ", cost: "$25-50", time: "1-2 days", notes: "Encroachment permit if on street", slug: "phoenix-az" },
  { city: "Philadelphia", state: "PA", cost: "$75-150", time: "3-5 days", notes: "Streets Dept permit required", slug: "philadelphia-pa" },
  { city: "Dallas", state: "TX", cost: "$25-50", time: "1-2 days", notes: "Right-of-way permit if on street", slug: "dallas-tx" },
  { city: "Atlanta", state: "GA", cost: "$50-100", time: "2-3 days", notes: "Permit for public right-of-way", slug: "atlanta-ga" },
  { city: "Miami", state: "FL", cost: "$50-75", time: "2-3 days", notes: "Building & Zoning permit", slug: "miami-fl" },
  { city: "Denver", state: "CO", cost: "$25-50", time: "1-2 days", notes: "Obstruction permit for street", slug: "denver-co" },
  { city: "Seattle", state: "WA", cost: "$75-125", time: "3-5 days", notes: "SDOT street use permit", slug: "seattle-wa" },
  { city: "Boston", state: "MA", cost: "$50-100", time: "2-4 days", notes: "PWD permit for street placement", slug: "boston-ma" },
];

const howToGetPermit = [
  {
    step: 1,
    title: "Determine If You Need One",
    description: "If dumpster goes on your driveway, you likely don't need a permit. On the street? You probably do.",
  },
  {
    step: 2,
    title: "Contact Your City",
    description: "Call your city's Public Works, Streets Department, or Building & Permits office. Ask specifically about roll-off dumpster placement.",
  },
  {
    step: 3,
    title: "Gather Required Info",
    description: "Typical requirements: delivery/pickup dates, exact location, dumpster size, your contact info, and sometimes proof of liability insurance.",
  },
  {
    step: 4,
    title: "Submit Application",
    description: "Many cities now offer online permit applications. Others require in-person visits. Fees range from $10-150.",
  },
  {
    step: 5,
    title: "Wait for Approval",
    description: "Processing time varies from same-day to 1-2 weeks. Plan ahead, especially in busy cities.",
  },
  {
    step: 6,
    title: "Display the Permit",
    description: "Once approved, post the permit visibly on or near the dumpster. Keep a copy for your records.",
  },
];

const fines = [
  { offense: "No permit (first offense)", fine: "$50-250", notes: "Most cities issue warning first" },
  { offense: "No permit (repeat)", fine: "$250-500", notes: "Increases with each violation" },
  { offense: "Blocking traffic/sidewalk", fine: "$100-500", notes: "Safety hazard violations" },
  { offense: "Overstaying permit", fine: "$25-100/day", notes: "Daily fines add up quickly" },
  { offense: "No reflectors/markings", fine: "$50-200", notes: "Required for street placement" },
];

const faqs = [
  {
    question: "Do I need a permit for a dumpster in my driveway?",
    answer: "In most cities, NO—dumpsters on private property (your driveway) don't require permits. However, check with your HOA if you have one, as they may have restrictions. Some cities with strict zoning (like parts of California) may require permits even on private property for extended rentals.",
  },
  {
    question: "How much does a dumpster permit cost?",
    answer: "Dumpster permit fees typically range from $10-150, with most cities charging $25-75. Major cities like NYC, Philadelphia, and Seattle tend to be on the higher end ($75-150), while smaller cities and suburbs are often $10-50 or free.",
  },
  {
    question: "How long does it take to get a dumpster permit?",
    answer: "Processing time varies: some cities offer same-day or next-day permits, while others take 3-7 business days. Large cities during busy seasons may take up to 2 weeks. Always apply at least 3-5 days before your planned delivery date.",
  },
  {
    question: "What happens if I don't get a permit and get caught?",
    answer: "Fines range from $50-500 depending on the city and whether it's a first offense. You may also be required to move the dumpster immediately, which can disrupt your project. Some cities tow unpermitted dumpsters at the owner's expense ($300-500+).",
  },
  {
    question: "Can my dumpster rental company get the permit for me?",
    answer: "Some dumpster companies handle permits as part of their service (often for an additional fee). Ask when booking. However, the permit is technically your responsibility as the property owner/renter, so confirm who's handling it.",
  },
  {
    question: "Do I need a permit for a dumpster at a construction site?",
    answer: "Construction sites typically need permits regardless of dumpster placement, as they're usually tied to your overall building permit. The dumpster may be covered under your construction permit, or you may need a separate encroachment permit. Check with your city's building department.",
  },
];

export default function DumpsterPermitGuide() {
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
            <span className="text-white">Dumpster Permit Guide</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                City-by-City Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Do I Need a Permit for a Dumpster? Complete 2026 Guide
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                The short answer: <strong>probably not if it&apos;s in your driveway, probably yes if it&apos;s on the street.</strong> Here&apos;s everything you need to know about dumpster permits in your city.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>10 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/dumpster-permit-guide.jpg"
                alt="Dumpster with permit displayed on residential street"
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-secondary-900 mb-4 text-center">Quick Answer</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-green-700">NO Permit Needed</h3>
                </div>
                <p className="text-sm text-secondary-600">Dumpster on your driveway or private property (in most cities)</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-red-700">Permit Required</h3>
                </div>
                <p className="text-sm text-secondary-600">Dumpster on public street, sidewalk, or right-of-way</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Permit Rules by Placement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Permit Requirements by Placement Location
            </h2>

            <div className="space-y-4">
              {permitRules.map((rule, i) => (
                <div key={i} className="flex items-center gap-4 bg-secondary-50 rounded-lg p-4">
                  <div className="text-3xl flex-shrink-0">{rule.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-secondary-900">{rule.placement}</h3>
                    <p className="text-sm text-secondary-600">{rule.reason}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    rule.permit.includes("NOT")
                      ? "bg-green-100 text-green-700"
                      : rule.permit.includes("ALWAYS")
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {rule.permit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major City Permits Table */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Permit Requirements by City
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              Street placement permit costs and processing times for major US cities
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-secondary-100">
                    <th className="px-4 py-3 text-left font-semibold text-secondary-900">City</th>
                    <th className="px-4 py-3 text-center font-semibold text-secondary-900">Permit Cost</th>
                    <th className="px-4 py-3 text-center font-semibold text-secondary-900">Processing</th>
                    <th className="px-4 py-3 text-left font-semibold text-secondary-900">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {majorCityPermits.map((city, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-3">
                        <Link
                          href={`/dumpster-rental-${city.slug}`}
                          className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          {city.city}, {city.state}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-secondary-900">{city.cost}</td>
                      <td className="px-4 py-3 text-center text-secondary-600">{city.time}</td>
                      <td className="px-4 py-3 text-sm text-secondary-600">{city.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-secondary-500 mt-4">
              *Permit costs and processing times are estimates and may vary. Always confirm with your local city office.
            </p>
          </div>
        </div>
      </section>

      {/* How to Get a Permit */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              How to Get a Dumpster Permit (6 Steps)
            </h2>

            <div className="space-y-6">
              {howToGetPermit.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900 mb-1">{step.title}</h3>
                    <p className="text-secondary-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fines */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center flex items-center justify-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              What Happens Without a Permit?
            </h2>
            <p className="text-center text-secondary-600 mb-8">
              Potential fines for unpermitted dumpster placement:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-red-100">
                    <th className="px-4 py-3 text-left font-semibold text-red-900">Violation</th>
                    <th className="px-4 py-3 text-center font-semibold text-red-900">Typical Fine</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-900">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {fines.map((fine, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-red-50/50"}>
                      <td className="px-4 py-3 font-medium text-secondary-900">{fine.offense}</td>
                      <td className="px-4 py-3 text-center font-bold text-red-600">{fine.fine}</td>
                      <td className="px-4 py-3 text-sm text-secondary-600">{fine.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Pro Tips to Avoid Permit Hassles
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Keep the dumpster on your driveway if possible—no permit needed in most cities",
                "Apply for permits at least 5 business days before delivery",
                "Take photos of the dumpster placement as proof of compliance",
                "Ask your dumpster company if they handle permits",
                "Check with your HOA before delivery—they may have separate rules",
                "If on the street, add reflectors/markers for safety (often required)",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-primary-50 rounded-lg p-4">
                  <Check className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-700">{tip}</span>
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
              Find Dumpster Rental in Your City
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              We can advise on local permit requirements when you book:
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
          <h2 className="text-3xl font-bold mb-4">Need Help With Permits?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We can advise on permit requirements in your area and help you plan for the smoothest rental experience.
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
          { name: "Dumpster Permit Guide", url: "https://www.dumpsterchamps.com/blog/dumpster-permit-guide" },
        ]}
      />
      <ArticleSchema
        title="Do I Need a Permit for a Dumpster? Complete City-by-City Guide"
        description="Find out if you need a dumpster permit in your city. Complete guide covering permit requirements, costs ($0-150), how to apply, and tips to avoid fines."
        url="https://www.dumpsterchamps.com/blog/dumpster-permit-guide"
        dateModified={LAST_UPDATED}
      />
    </>
  );
}
