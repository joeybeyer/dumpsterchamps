import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Check, Phone, Calendar, Truck, Package, FileText, AlertTriangle, ArrowRight } from "lucide-react";
import { FAQSchema, BreadcrumbSchema, HowToSchema } from "@/components/seo/SchemaMarkup";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LastUpdated, ArticleSchema } from "@/components/seo/LastUpdated";

// Content freshness date - update this when content is refreshed
const LAST_UPDATED = new Date("2025-12-31");

export const metadata: Metadata = {
  title: "How to Rent a Dumpster: First-Timer's Complete Guide [2026]",
  description:
    "First time renting a dumpster? This 2026 step-by-step guide covers everything: choosing the right size, booking, delivery prep, loading tips, and pickup scheduling.",
  openGraph: {
    title: "How to Rent a Dumpster: Complete Guide | Dumpster Champs",
    description: "Step-by-step guide for first-time dumpster renters. Everything you need to know from booking to pickup.",
    type: "article",
  },
};

const steps = [
  {
    number: 1,
    title: "Assess Your Project",
    icon: FileText,
    description: "Before you call, understand what you're dealing with.",
    details: [
      "What type of debris? (household junk, construction, yard waste)",
      "Estimate the volume (pickup truck loads is a good measure)",
      "Note any heavy materials (concrete, brick, roofing)",
      "How long will your project take?",
      "Where will the dumpster go?",
    ],
    tip: "Take photos of your debris piles. This helps us recommend the right size.",
  },
  {
    number: 2,
    title: "Choose the Right Size",
    icon: Package,
    description: "The most important decision—get this right to avoid extra costs.",
    details: [
      "10 Yard ($495): 2-3 pickup loads—bathroom remodels, small cleanouts",
      "15 Yard ($550): 4-5 pickup loads—garage cleanouts, medium projects",
      "20 Yard ($595): 6-7 pickup loads—kitchen remodels, roofing (MOST POPULAR)",
      "30 Yard ($695): 9-10 pickup loads—major renovations, construction",
      "40 Yard ($795): 12+ pickup loads—commercial, large demolition",
    ],
    tip: "When in doubt, size up. The $50-100 difference is cheaper than a second rental ($495+).",
  },
  {
    number: 3,
    title: "Book Your Rental",
    icon: Phone,
    description: "Simple booking process—online or by phone.",
    details: [
      "Call (888) 860-0710 or use our online form",
      "Provide: delivery address, project type, desired size",
      "Choose your delivery date",
      "Get your all-inclusive price confirmed",
      "Receive booking confirmation",
    ],
    tip: "Book 1-2 days ahead for guaranteed availability. Same-day is often possible if you call by noon.",
  },
  {
    number: 4,
    title: "Check Permit Requirements",
    icon: FileText,
    description: "Most residential rentals don't need permits—but check first.",
    details: [
      "Private property (driveway): Usually NO permit needed",
      "Public street: Permit typically REQUIRED",
      "HOA communities: May need approval",
      "Contact your city/county for specific rules",
      "We can advise on your area's requirements",
    ],
    tip: "Permits usually cost $10-100 and take 1-5 days to process. Plan ahead if needed.",
  },
  {
    number: 5,
    title: "Prepare the Delivery Location",
    icon: Truck,
    description: "Set up for smooth delivery and protect your property.",
    details: [
      "Clear the placement area completely",
      "Move vehicles out of the driveway",
      "Mark your preferred spot (optional)",
      "Check for overhead obstructions (wires, branches)",
      "Ensure 60+ feet of clearance for truck",
      "We provide driveway protection boards",
    ],
    tip: "Flat, hard surfaces (concrete, asphalt) work best. Avoid soft ground that could sink.",
  },
  {
    number: 6,
    title: "Receive Your Dumpster",
    icon: Truck,
    description: "What to expect on delivery day.",
    details: [
      "Driver will call when 30 minutes away",
      "Delivery window is typically morning or afternoon",
      "You don't need to be home (but helpful if possible)",
      "Driver places dumpster in designated spot",
      "Protection boards placed under wheels",
      "Quick walkthrough of do's and don'ts",
    ],
    tip: "Leave a note with placement instructions if you won't be home.",
  },
  {
    number: 7,
    title: "Load Your Dumpster",
    icon: Package,
    description: "Smart loading saves space and avoids fees.",
    details: [
      "Heavy items go on the bottom",
      "Break down large items (furniture, boxes)",
      "Distribute weight evenly",
      "Fill gaps with smaller debris",
      "Don't exceed the fill line",
      "Keep prohibited items out (see our guide)",
    ],
    tip: "Use the rear door for walking in heavy items. Close it before loading over the sides.",
  },
  {
    number: 8,
    title: "Schedule Pickup",
    icon: Calendar,
    description: "When you're done, we haul it away.",
    details: [
      "Call to schedule pickup when full (or at end of rental period)",
      "Ensure nothing sticks above the dumpster rim",
      "Clear access for the truck",
      "No need to be home for pickup",
      "We haul away and properly dispose of everything",
    ],
    tip: "Finished early? No problem—call for early pickup at no extra charge.",
  },
];

const commonMistakes = [
  {
    mistake: "Renting too small",
    consequence: "Need a second rental ($495+)",
    prevention: "Size up when in doubt—$50-100 vs. $495+",
  },
  {
    mistake: "Ignoring weight limits",
    consequence: "Overage fees at $75/ton",
    prevention: "Know your allowance; separate heavy materials",
  },
  {
    mistake: "Prohibited items in dumpster",
    consequence: "Contamination fees $75-250+",
    prevention: "Review prohibited list before loading",
  },
  {
    mistake: "Blocking delivery access",
    consequence: "Trip fee $75+, rescheduling delays",
    prevention: "Clear driveway, move vehicles, check overhead",
  },
  {
    mistake: "Overfilling past the line",
    consequence: "Can't haul, must remove excess",
    prevention: "Keep all debris below rim level",
  },
  {
    mistake: "Waiting until day 7 to load",
    consequence: "Rushed work, potential extension fees",
    prevention: "Load progressively throughout project",
  },
];

const timeline = [
  { phase: "Before Booking", tasks: ["Assess project", "Estimate debris volume", "Choose dumpster size"] },
  { phase: "Booking (Day -1 to -2)", tasks: ["Call or book online", "Confirm price and dates", "Check permit needs"] },
  { phase: "Delivery Day", tasks: ["Clear placement area", "Move vehicles", "Receive dumpster"] },
  { phase: "Rental Period (7 Days)", tasks: ["Load debris progressively", "Keep prohibited items out", "Don't overfill"] },
  { phase: "Pickup Day", tasks: ["Final loading", "Clear access path", "Call to schedule pickup"] },
];

const faqs = [
  {
    question: "How far in advance should I book a dumpster?",
    answer: "We recommend booking 1-2 days in advance for guaranteed availability. During busy seasons (spring cleaning, summer renovations), booking a week ahead is wise. Same-day delivery is often possible if you call by noon, but availability isn't guaranteed.",
  },
  {
    question: "Do I need to be home for delivery and pickup?",
    answer: "No, you don't need to be home for either delivery or pickup. For delivery, leave clear access and placement instructions (a note on the door or in your booking works well). For pickup, just ensure the dumpster is accessible and not overfilled. The driver will call if there are any issues.",
  },
  {
    question: "What if I need the dumpster longer than 7 days?",
    answer: "Extensions are available at $15 per day. Just call before your rental period ends to extend. If you know upfront that you'll need more time, let us know when booking so we can plan accordingly. There's no penalty for early pickup if you finish sooner than expected.",
  },
  {
    question: "Can I move the dumpster after it's delivered?",
    answer: "No, roll-off dumpsters are extremely heavy and cannot be moved without a truck. Choose your placement location carefully before delivery. If you absolutely need it repositioned, you'll need to schedule a relocation (additional fees apply).",
  },
  {
    question: "What happens if my dumpster gets too full?",
    answer: "Debris must not exceed the fill line (top of the container walls). If overfilled, the driver cannot legally or safely transport it. You'll need to remove excess debris before pickup. This is why we recommend sizing up if you're unsure—it's cheaper than dealing with overflow.",
  },
  {
    question: "How do I know what size dumpster I need?",
    answer: "Think in pickup truck loads: 10-yard = 2-3 loads, 15-yard = 4-5 loads, 20-yard = 6-7 loads, 30-yard = 9-10 loads, 40-yard = 12+ loads. For most home projects (bathroom/kitchen remodels, garage cleanouts), a 15-20 yard dumpster is sufficient. When in doubt, size up—the price difference is minimal compared to needing a second dumpster.",
  },
];

export default function HowToRentDumpster() {
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
            <span className="text-white">How to Rent a Dumpster</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                First-Timer&apos;s Guide
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                How to Rent a Dumpster: The Complete Step-by-Step Guide [2026]
              </h1>
              <p className="text-xl text-secondary-200 mb-6">
                Never rented a dumpster before? No problem. This guide walks you through every step—from figuring out what size you need to scheduling pickup. By the end, you&apos;ll be a dumpster rental pro.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-300">
                <LastUpdated date={LAST_UPDATED} className="text-secondary-300" showIcon={false} prefix="" />
                <span>|</span>
                <span>8 min read</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/blog/how-to-rent-dumpster-hero.jpg"
                alt="Dumpster being delivered to a residential driveway with homeowner watching"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-8 bg-primary-50 border-b border-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-secondary-900 mb-4 text-center">The Process in 30 Seconds</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["Assess Project", "Choose Size", "Book", "Prep Site", "Get Delivery", "Load", "Call for Pickup"].map((step, i) => (
                <div key={i} className="flex items-center">
                  <span className="bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {i + 1}. {step}
                  </span>
                  {i < 6 && <ChevronRight className="h-4 w-4 text-primary-400 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
              Your Step-by-Step Rental Guide
            </h2>

            <div className="space-y-12">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {step.number < steps.length && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-secondary-200 -z-10" />
                  )}

                  <div className="flex gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="h-6 w-6 text-primary-600" />
                        <h3 className="text-2xl font-bold text-secondary-900">{step.title}</h3>
                      </div>
                      <p className="text-secondary-600 mb-4">{step.description}</p>

                      <ul className="space-y-2 mb-4">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-secondary-700">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-lg">
                        <p className="text-primary-800">
                          <strong>Pro Tip:</strong> {step.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Typical Rental Timeline
            </h2>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-300" />

              {timeline.map((phase, i) => (
                <div key={i} className={`relative flex items-center gap-4 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} pl-12 md:pl-0`}>
                    <div className="bg-white rounded-xl p-4 shadow-sm inline-block">
                      <h3 className="font-semibold text-primary-600 mb-2">{phase.phase}</h3>
                      <ul className={`text-sm text-secondary-600 space-y-1 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                        {phase.tasks.map((task, j) => (
                          <li key={j}>• {task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              <AlertTriangle className="inline h-8 w-8 text-yellow-600 mr-2" />
              Common First-Timer Mistakes
            </h2>
            <p className="text-center text-secondary-600 mb-8 max-w-2xl mx-auto">
              Learn from others&apos; errors so you don&apos;t repeat them.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="px-6 py-4 text-left font-semibold text-yellow-900">Mistake</th>
                    <th className="px-6 py-4 text-left font-semibold text-yellow-900">Consequence</th>
                    <th className="px-6 py-4 text-left font-semibold text-yellow-900">How to Avoid</th>
                  </tr>
                </thead>
                <tbody>
                  {commonMistakes.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-yellow-50/50"}>
                      <td className="px-6 py-4 font-medium text-secondary-900">{row.mistake}</td>
                      <td className="px-6 py-4 text-red-600">{row.consequence}</td>
                      <td className="px-6 py-4 text-green-700">{row.prevention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              First-Timer FAQs
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
          <h2 className="text-3xl font-bold mb-4">Ready for Your First Rental?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Now you know exactly how it works. Get your free quote and have a dumpster delivered as soon as tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:8888600710"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
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
          { name: "How to Rent a Dumpster", url: "https://www.dumpsterchamps.com/blog/how-to-rent-dumpster" },
        ]}
      />
      <HowToSchema
        name="How to Rent a Dumpster"
        description="Complete step-by-step guide to renting a roll-off dumpster for your home renovation, cleanout, or construction project."
        steps={[
          { name: "Assess Your Project", text: "Determine what type of debris you have, estimate the volume, note any heavy materials, and figure out where the dumpster will go." },
          { name: "Choose the Right Size", text: "Select from 10-yard ($495), 15-yard ($550), 20-yard ($595), 30-yard ($695), or 40-yard ($795) based on your project needs. When in doubt, size up." },
          { name: "Book Your Rental", text: "Call (888) 860-0710 or use the online form to provide your delivery address, project type, and desired delivery date." },
          { name: "Check Permit Requirements", text: "Dumpsters on private property usually don't need permits. Street placement typically requires a city permit ($10-100)." },
          { name: "Prepare the Delivery Location", text: "Clear the placement area, move vehicles, check for overhead obstructions, and ensure 60+ feet of clearance for the delivery truck." },
          { name: "Receive Your Dumpster", text: "The driver will call 30 minutes before arrival. You don't need to be home, but leave placement instructions if you won't be there." },
          { name: "Load Your Dumpster", text: "Put heavy items on bottom, break down large items, distribute weight evenly, and don't exceed the fill line." },
          { name: "Schedule Pickup", text: "Call when full or at the end of your rental period. Ensure nothing sticks above the rim and clear access for the truck." },
        ]}
        totalTime="PT8M"
      />
      <ArticleSchema
        title="How to Rent a Dumpster: First-Timer's Complete Guide"
        description="First time renting a dumpster? This step-by-step guide covers everything: choosing the right size, booking, delivery prep, loading tips, and pickup scheduling."
        url="https://www.dumpsterchamps.com/blog/how-to-rent-dumpster"
        dateModified={LAST_UPDATED}
        image="https://www.dumpsterchamps.com/images/blog/how-to-rent-dumpster-hero.jpg"
      />
    </>
  );
}
