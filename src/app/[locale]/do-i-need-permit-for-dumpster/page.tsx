import { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { Phone, CheckCircle, AlertTriangle, FileText, MapPin, Building, Home } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Do I Need a Permit for a Dumpster? [2026] Complete Guide",
  description: "Most dumpster rentals don't need a permit if placed on your driveway. Street placement requires a permit in most cities. Learn the rules and costs. Call (888) 860-0710.",
  keywords: "dumpster permit, do i need permit for dumpster, dumpster rental permit, roll off dumpster permit, street permit dumpster",
  openGraph: {
    title: "Do I Need a Permit for a Dumpster? [2026] Complete Guide",
    description: "Most dumpster rentals don't need a permit if placed on your driveway. Street placement requires a permit.",
    url: "https://www.dumpsterchamps.com/do-i-need-permit-for-dumpster",
    type: "article",
  },
};

const faqs = [
  {
    question: "Do I need a permit for a dumpster?",
    answer: "You typically do NOT need a permit if the dumpster is placed on your private property (driveway, yard, or parking lot). You WILL need a permit if placing the dumpster on public property like a street, sidewalk, or alley. Most residential dumpster rentals are placed on driveways and require no permit.",
  },
  {
    question: "How much does a dumpster permit cost?",
    answer: "Dumpster permit costs range from $10-$150 depending on your city. Most cities charge $25-$75 for a 7-14 day street placement permit. Some cities like Los Angeles and New York charge higher fees. Rural areas often have lower fees or no permit requirement.",
  },
  {
    question: "How do I get a dumpster permit?",
    answer: "Contact your city's public works or permits department. Most cities allow online permit applications. You'll typically need your address, dumpster size, placement dates, and the rental company name. Processing takes 1-5 business days in most areas.",
  },
  {
    question: "What happens if I don't get a permit?",
    answer: "Placing a dumpster on public property without a permit can result in fines ranging from $50-$500, immediate removal of the dumpster, and potential liability if the dumpster causes traffic issues or accidents. It's always better to get the proper permit.",
  },
  {
    question: "Can my dumpster company get the permit for me?",
    answer: "Many dumpster rental companies, including Dumpster Champs, can help you understand permit requirements for your area. Some companies will obtain the permit on your behalf for an additional fee. We recommend asking about this service when you book.",
  },
];

const placementRules = [
  {
    icon: Home,
    title: "Private Property (No Permit)",
    description: "Driveways, yards, private parking lots",
    items: [
      "Your driveway or parking area",
      "Your yard (with ground protection)",
      "Private parking lots with owner permission",
      "Commercial properties you own/lease",
    ],
    color: "green",
  },
  {
    icon: Building,
    title: "Public Property (Permit Required)",
    description: "Streets, sidewalks, alleys, public lots",
    items: [
      "Public street in front of your home",
      "City sidewalks or curb areas",
      "Public alleys",
      "Municipal parking lots",
    ],
    color: "orange",
  },
];

const cityExamples = [
  { city: "Most Small/Medium Cities", cost: "$25-$50", timeframe: "1-3 days" },
  { city: "Chicago, IL", cost: "$50-$100", timeframe: "3-5 days" },
  { city: "Los Angeles, CA", cost: "$75-$150", timeframe: "5-7 days" },
  { city: "New York, NY", cost: "$100-$200", timeframe: "5-10 days" },
  { city: "Miami, FL", cost: "$50-$75", timeframe: "2-5 days" },
  { city: "Phoenix, AZ", cost: "$25-$50", timeframe: "1-3 days" },
];

const permitSteps = [
  {
    step: 1,
    title: "Determine if You Need One",
    description: "If placing on your driveway, you likely don't need a permit. Only street/public placement requires permits.",
  },
  {
    step: 2,
    title: "Contact Your City",
    description: "Call your city's public works or permits department, or check their website for online applications.",
  },
  {
    step: 3,
    title: "Gather Information",
    description: "You'll need: your address, dumpster size, placement dates, rental company name, and site plan/photo.",
  },
  {
    step: 4,
    title: "Submit Application",
    description: "Apply online or in person. Pay the permit fee. Most cities process within 1-5 business days.",
  },
  {
    step: 5,
    title: "Display Your Permit",
    description: "Once approved, keep your permit visible near the dumpster for inspector verification.",
  },
];

export default async function DoINeedPermitForDumpsterPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <>
      {/* Schema Markup */}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Dumpster Permit Guide", url: "https://www.dumpsterchamps.com/do-i-need-permit-for-dumpster" },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-secondary-600">
              <Link href="/" className="hover:text-primary-600">{isEs ? 'Inicio' : 'Home'}</Link>
              <span className="mx-2">/</span>
              <span className="text-secondary-900">{isEs ? 'Guía de Permisos de Contenedores' : 'Dumpster Permit Guide'}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Quick Answer Box - Critical for PAA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Quick Answer</h2>
            <p className="text-blue-800 mb-2">
              <strong>Do I need a permit for a dumpster?</strong>
            </p>
            <p className="text-blue-700">
              <strong>No permit needed</strong> if the dumpster is placed on your <strong>private property</strong> (driveway, yard, or parking lot).
              You <strong>will need a permit</strong> if placing on <strong>public property</strong> (street, sidewalk, or alley).
              Most residential dumpster rentals go on driveways—no permit required.
            </p>
          </div>

          {/* H1 with year for freshness */}
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            {isEs ? '¿Necesito un Permiso para un Contenedor? [2026] Guía Completa' : 'Do I Need a Permit for a Dumpster? [2026] Complete Guide'}
          </h1>

          <p className="text-lg text-secondary-700 mb-8">
            The good news: most residential dumpster rentals don't require any permits. If you're placing the dumpster on your
            own driveway or property, you're typically free to proceed. This guide covers everything you need to know about
            when permits are required, how to get one, and what it costs.
          </p>

          {/* Private vs Public Placement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              When Do You Need a Permit?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {placementRules.map((rule) => (
                <div
                  key={rule.title}
                  className={`border-2 rounded-xl p-6 ${
                    rule.color === "green"
                      ? "border-green-300 bg-green-50"
                      : "border-orange-300 bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <rule.icon
                      className={`w-8 h-8 ${
                        rule.color === "green" ? "text-green-600" : "text-orange-600"
                      }`}
                    />
                    <div>
                      <h3 className="font-bold text-secondary-900">{rule.title}</h3>
                      <p className="text-sm text-secondary-600">{rule.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {rule.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            rule.color === "green" ? "text-green-600" : "text-orange-600"
                          }`}
                        />
                        <span className="text-secondary-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Permit Costs by City */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Dumpster Permit Costs by City
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Location</th>
                    <th className="px-4 py-3 text-left font-semibold">Typical Cost</th>
                    <th className="px-4 py-3 text-left font-semibold">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  {cityExamples.map((item, index) => (
                    <tr key={item.city} className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                      <td className="px-4 py-4 font-semibold text-secondary-900">{item.city}</td>
                      <td className="px-4 py-4 text-primary-600 font-bold">{item.cost}</td>
                      <td className="px-4 py-4 text-secondary-600">{item.timeframe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-secondary-500 mt-4">
              * Permit costs vary by city and county. Contact your local permits office for exact pricing.
            </p>
          </section>

          {/* How to Get a Permit */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              How to Get a Dumpster Permit (5 Steps)
            </h2>

            <div className="space-y-4">
              {permitSteps.map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-secondary-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">{item.title}</h3>
                    <p className="text-secondary-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Warning Section */}
          <section className="mb-12">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">What Happens Without a Permit?</h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• <strong>Fines:</strong> $50-$500 depending on your city</li>
                    <li>• <strong>Forced removal:</strong> City may require immediate dumpster removal</li>
                    <li>• <strong>Liability:</strong> You could be liable for accidents or traffic issues</li>
                    <li>• <strong>Project delays:</strong> May have to reschedule your project</li>
                  </ul>
                  <p className="mt-4 text-red-700">
                    It's always better to spend $25-$75 on a permit than risk hundreds in fines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tip Section */}
          <section className="mb-12">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Pro Tip: Avoid Permits Entirely
              </h3>
              <p className="text-green-800 mb-4">
                The easiest way to avoid permit hassles is to place your dumpster on your driveway. Most driveways
                can accommodate a 15-20 yard dumpster, which handles the majority of home projects.
              </p>
              <p className="text-green-700">
                Not sure if a dumpster will fit? Use our{" "}
                <Link href="/calculator" className="text-primary-600 font-semibold hover:underline">
                  free size calculator
                </Link>{" "}
                or call us—we'll help you figure out the best placement.
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
                  Dumpster rental costs $300-$500 for a 7-day rental. Our flat-rate pricing starts at $495 with
                  delivery, pickup, and disposal included—no hidden fees.
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">
                  <Link href="/what-size-dumpster-do-i-need" className="hover:text-primary-600">
                    What size dumpster do I need?
                  </Link>
                </h3>
                <p className="text-secondary-600">
                  Most homeowners need a 15-20 yard dumpster. Use our{" "}
                  <Link href="/calculator" className="text-primary-600 hover:underline">free calculator</Link>{" "}
                  to get a personalized recommendation based on your project type.
                </p>
              </div>

              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 mb-2">How long can I keep a dumpster?</h3>
                <p className="text-secondary-600">
                  Standard rentals include 7 days. Need more time? Extensions are available for $10-20 per day
                  depending on your location.
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
              Need Help With Permit Requirements?
            </h2>
            <p className="text-primary-100 mb-6">
              Our team knows the permit requirements for every city we serve. Call us and we'll tell you
              exactly what you need—or help you find a driveway placement that avoids permits entirely.
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
