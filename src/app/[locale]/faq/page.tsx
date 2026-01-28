import { Metadata } from "next";
import { LocalFAQAccordion, DEFAULT_CITY_FAQS } from "@/components/city/LocalFAQAccordion";
import { FAQSchema } from "@/components/seo/SchemaMarkup";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Dumpster Rental FAQ - Pricing, Sizes & Delivery | Dumpster Champs",
    description: "Get answers to frequently asked questions about dumpster rental costs, sizing, delivery, permits, and restrictions. Transparent pricing from $495.",
    openGraph: {
      title: "Dumpster Rental FAQ - Pricing, Sizes & Delivery",
      description: "Complete guide to dumpster rental FAQs including costs, sizing, delivery times, and what you can dispose of.",
    },
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const comprehensiveFAQs = [
    {
      question: "How much does it cost to rent a dumpster?",
      answer: "Dumpster rental costs range from $495 for a 10-yard container to $795 for a 40-yard container. Our all-inclusive pricing covers delivery, pickup, 7-day rental period, and weight allowance. No hidden fees or surprise charges. Pricing includes: delivery to your location, 7-day rental period, pickup and disposal, and generous weight allowances."
    },
    {
      question: "What size dumpster do I need for my project?",
      answer: "Choose your dumpster size based on your project: 10-yard (12×8×3.5 feet) for small bathroom remodels and cleanouts, 15-yard (16×8×4.5 feet) for medium renovations, 20-yard (22×8×4.5 feet) for kitchen remodels and roofing projects, 30-yard (22×8×6 feet) for large home cleanouts, and 40-yard (22×8×8 feet) for major construction or whole-house cleanouts."
    },
    {
      question: "How fast can I get a dumpster delivered?",
      answer: "We offer same-day or next-day delivery in most service areas. Call before noon for best same-day availability. Our average response time is 12 minutes, and we deliver over 500 dumpsters weekly across our service areas."
    },
    {
      question: "How long can I keep the dumpster?",
      answer: "Standard rental period is 7 days included in your price. Need more time? Extensions are available for just $15 per day. Simply call us before your rental period ends to arrange an extension."
    },
    {
      question: "What can I put in a dumpster rental?",
      answer: "Accepted items include household furniture, appliances (without refrigerants), construction debris, roofing materials, yard waste, renovation debris, and general household items. Prohibited items include hazardous waste, paint, chemicals, tires, batteries, propane tanks, and electronics in most areas."
    },
    {
      question: "Do I need a permit for a dumpster rental?",
      answer: "If you place the dumpster on your private property (driveway, yard), no permit is typically required. If you need to place it on a public street or right-of-way, you may need a permit from your local municipality. We can help guide you through the permit process if needed."
    },
    {
      question: "Will a dumpster damage my driveway?",
      answer: "We place protective wooden boards under the dumpster wheels to prevent damage to your driveway surface. Most standard driveways can handle dumpster weight without issues. If you have concerns about your specific surface, let us know during booking."
    },
    {
      question: "What happens if I go over the weight limit?",
      answer: "If your dumpster exceeds the included weight allowance, there's an overage fee of $75 per additional ton. We weigh containers at the disposal facility and only charge for actual overages. To avoid this, choose a larger size for heavy materials like concrete or roofing."
    },
    {
      question: "Do you offer same-day dumpster delivery?",
      answer: "Yes! Same-day delivery is available in most areas when you call before noon. We prioritize urgent needs and emergency cleanups. Our average response time is 12 minutes, and we'll work to accommodate your timeline."
    },
    {
      question: "How do I schedule dumpster pickup?",
      answer: "Simply call us when you're finished filling the dumpster. We'll schedule pickup within 24-48 hours. No need to be present during pickup - just ensure the dumpster is accessible and not overfilled."
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Dumpster Rental FAQ
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                Everything you need to know about dumpster rental costs, sizing, delivery, and restrictions. 
                Get transparent answers with no hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <LocalFAQAccordion 
                faqs={comprehensiveFAQs}
                cityName="your area"
                stateName="your state"
              />
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
                Our team is standing by to help you choose the right dumpster for your project and answer any questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Get Free Quote
                </Link>
                <a
                  href="tel:+18885551234"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Schema Markup for FAQ */}
      <FAQSchema faqs={comprehensiveFAQs} />
    </>
  );
}
