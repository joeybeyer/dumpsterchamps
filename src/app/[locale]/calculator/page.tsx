import { Metadata } from "next";
import { DumpsterCalculator } from "@/components/tools/DumpsterCalculator";
import { FAQSchema } from "@/components/seo/SchemaMarkup";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Dumpster Size Calculator - What Size Dumpster Do I Need?",
  description:
    "Free dumpster size and weight calculator. Find the right dumpster size for your project and avoid hidden weight overage fees. Takes 30 seconds.",
  keywords: [
    "dumpster size calculator",
    "what size dumpster do I need",
    "dumpster weight calculator",
    "dumpster rental calculator",
    "roll off dumpster sizes",
  ],
};

export default async function CalculatorPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            What Size Dumpster Do I Need?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Use our free calculator to find the right dumpster size and avoid 
            costly weight overage fees. Takes just 30 seconds.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <DumpsterCalculator />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Understanding Dumpster Sizes: A Complete Guide
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How Our Calculator Works</h3>
            <p>
              Our dumpster size calculator considers three key factors that most 
              people overlook: project type, square footage, and debris weight. 
              This is important because <strong>the #1 hidden fee in dumpster rental 
              is weight overages</strong> — and most calculators only consider volume.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Dumpster Size Comparison Chart</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Dimensions</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Weight Limit</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">10 Yard</td>
                    <td className="border border-gray-300 px-4 py-2">12&apos; x 8&apos; x 3.5&apos;</td>
                    <td className="border border-gray-300 px-4 py-2">2,000 - 4,000 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">Small cleanouts, bathroom remodels</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">15 Yard</td>
                    <td className="border border-gray-300 px-4 py-2">16&apos; x 7.5&apos; x 4&apos;</td>
                    <td className="border border-gray-300 px-4 py-2">3,000 - 5,000 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">Medium projects, single room demos</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">20 Yard</td>
                    <td className="border border-gray-300 px-4 py-2">22&apos; x 7.5&apos; x 4.5&apos;</td>
                    <td className="border border-gray-300 px-4 py-2">4,000 - 6,000 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">Kitchen remodels, roof tear-offs</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">30 Yard</td>
                    <td className="border border-gray-300 px-4 py-2">22&apos; x 7.5&apos; x 6&apos;</td>
                    <td className="border border-gray-300 px-4 py-2">5,000 - 8,000 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">Major renovations, construction</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">40 Yard</td>
                    <td className="border border-gray-300 px-4 py-2">22&apos; x 7.5&apos; x 8&apos;</td>
                    <td className="border border-gray-300 px-4 py-2">6,000 - 10,000 lbs</td>
                    <td className="border border-gray-300 px-4 py-2">Commercial, whole house demos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Weight Matters More Than Size</h3>
            <p>
              Here&apos;s what most dumpster rental companies won&apos;t tell you: even if your 
              debris fits in the dumpster, you can still get hit with <strong>overage 
              fees of $50-100 per ton</strong> if you exceed the weight limit.
            </p>
            <p>
              This is especially common with heavy materials like:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Concrete and brick:</strong> ~2,000 lbs per cubic yard</li>
              <li><strong>Dirt and soil:</strong> ~2,200 lbs per cubic yard</li>
              <li><strong>Roofing shingles:</strong> ~750 lbs per cubic yard</li>
              <li><strong>Drywall:</strong> ~500 lbs per cubic yard</li>
            </ul>
            <p>
              That&apos;s why our calculator factors in both volume AND weight — so you 
              don&apos;t get surprised with a $200+ overage fee.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Questions to Ask Before Renting</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>What&apos;s the weight limit?</strong> Get the exact number in writing.</li>
              <li><strong>What are the overage fees?</strong> Usually $50-100 per ton over the limit.</li>
              <li><strong>Are there any other fees?</strong> Ask about delivery, pickup, fuel, and environmental fees.</li>
              <li><strong>How long is the rental period?</strong> Most include 7-14 days.</li>
              <li><strong>What can&apos;t go in the dumpster?</strong> Hazardous materials, batteries, tires, appliances with freon.</li>
            </ol>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
              <p className="font-semibold text-orange-800 mb-2">Ready to rent?</p>
              <p className="text-orange-700">
                Call us at <a href="tel:8888600710" className="font-bold underline">(888) 860-0710</a> for 
                a free quote with transparent pricing — no hidden fees, guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                What size dumpster do I need for a kitchen remodel?
              </h3>
              <p className="text-gray-600">
                Most kitchen remodels require a 20-yard dumpster, which can hold 
                cabinets, countertops, flooring, drywall, and appliances. For smaller 
                kitchens or partial remodels, a 15-yard may suffice. Use our calculator 
                above for a personalized recommendation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                How much does a dumpster rental cost?
              </h3>
              <p className="text-gray-600">
                Dumpster rental prices typically range from $300-$750 depending on 
                size and location. A 10-yard costs $300-450, while a 40-yard runs 
                $500-750. Always ask about weight limits and overage fees, which 
                can add $100-300 to your final bill if exceeded.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                What happens if I exceed the weight limit?
              </h3>
              <p className="text-gray-600">
                Most companies charge $50-100 per ton over the weight limit. This is 
                the most common hidden fee in dumpster rental. To avoid this, use our 
                calculator to estimate your debris weight, and ask for a realistic 
                weight allowance when booking.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Can I put concrete in a dumpster?
              </h3>
              <p className="text-gray-600">
                Yes, but be careful — concrete weighs about 2,000 lbs per cubic yard. 
                A 10-yard dumpster filled with concrete would weigh 20,000 lbs, far 
                exceeding the typical 2,000-4,000 lb weight limit. For concrete, ask 
                about &quot;clean load&quot; pricing or rent a smaller dumpster specifically for 
                heavy materials.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Do I need a permit for a dumpster?
              </h3>
              <p className="text-gray-600">
                It depends on placement. If the dumpster goes in your driveway (private 
                property), usually no permit is needed. If it goes on the street or 
                public right-of-way, most cities require a permit ($20-100). Check with 
                your local municipality or ask your dumpster provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <FAQSchema
        faqs={[
          { question: "What size dumpster do I need for a kitchen remodel?", answer: "Most kitchen remodels require a 20-yard dumpster, which can hold cabinets, countertops, flooring, drywall, and appliances. For smaller kitchens or partial remodels, a 15-yard may suffice." },
          { question: "How much does a dumpster rental cost?", answer: "Dumpster rental prices range from $495-$795 with all-inclusive pricing. A 10-yard costs $495, 15-yard is $550, 20-yard is $595, 30-yard is $695, and 40-yard is $795. This includes delivery, pickup, 7-day rental, and weight allowance." },
          { question: "What happens if I exceed the weight limit?", answer: "Most companies charge $50-100 per ton over the weight limit. Use our calculator to estimate your debris weight and choose a dumpster with adequate capacity to avoid overage fees." },
          { question: "Can I put concrete in a dumpster?", answer: "Yes, but concrete weighs about 2,000 lbs per cubic yard. For heavy materials like concrete, ask about clean load pricing or rent a smaller dumpster specifically for heavy materials to avoid exceeding weight limits." },
          { question: "Do I need a permit for a dumpster?", answer: "It depends on placement. Dumpsters on your driveway (private property) usually don't need a permit. Street placement typically requires a city permit ($20-100). Check with your local municipality." },
        ]}
      />
    </div>
  );
}
