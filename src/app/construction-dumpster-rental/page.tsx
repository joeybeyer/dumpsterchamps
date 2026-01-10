import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Check, Truck, HardHat, Clock, Shield, Recycle, AlertTriangle } from "lucide-react";
import { LastUpdated } from "@/components/seo/LastUpdated";

export const metadata: Metadata = {
  title: "Construction Dumpster Rental | Contractor Waste Solutions",
  description: "Construction dumpster rental for contractors & job sites. 20-40 yard roll offs for debris, lumber, drywall & roofing. Same-day delivery. Volume discounts available.",
  keywords: "construction dumpster rental, contractor dumpster, job site dumpster, construction debris removal, construction waste container",
};

const CONSTRUCTION_SIZES = [
  {
    size: 20,
    price: "$595",
    weightLimit: "4 tons",
    dimensions: "22' x 7.5' x 4.5'",
    bestFor: "Small additions, single-room remodels, roof repairs",
  },
  {
    size: 30,
    price: "$695",
    weightLimit: "5 tons",
    dimensions: "22' x 7.5' x 6'",
    bestFor: "Major renovations, multi-room remodels, new construction",
    popular: true,
  },
  {
    size: 40,
    price: "$795",
    weightLimit: "6 tons",
    dimensions: "22' x 7.5' x 8'",
    bestFor: "Large commercial projects, whole house builds, demolition",
  },
];

const ACCEPTED_MATERIALS = [
  "Lumber & wood scraps",
  "Drywall & sheetrock",
  "Roofing shingles",
  "Concrete & masonry (limited)",
  "Metal & siding",
  "Flooring materials",
  "Insulation",
  "Tile & fixtures",
  "Windows & doors",
  "Cardboard & packaging",
];

const NOT_ACCEPTED = [
  "Hazardous materials",
  "Paint & solvents",
  "Asbestos-containing materials",
  "Chemicals & oils",
  "Batteries",
  "Appliances with freon",
];

const CONTRACTOR_BENEFITS = [
  {
    title: "Same-Day Delivery",
    description: "Get a dumpster on site the same day you call. Don't let waste slow down your project.",
    icon: Truck,
  },
  {
    title: "Flexible Scheduling",
    description: "Swap outs, extensions, and pickups scheduled around your timeline — not ours.",
    icon: Clock,
  },
  {
    title: "Volume Discounts",
    description: "Regular contractors save with volume pricing. The more you rent, the more you save.",
    icon: Shield,
  },
  {
    title: "Clean Load Pricing",
    description: "Separating materials? Ask about discounted rates for clean concrete, metal, or wood loads.",
    icon: Recycle,
  },
];

export default function ConstructionDumpsterPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary-100 border-b border-secondary-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-secondary-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>›</span>
            <Link href="/services" className="hover:text-primary-600">Services</Link>
            <span>›</span>
            <span className="text-secondary-900">Construction Dumpsters</span>
          </nav>
          <LastUpdated date="2025-12-28" className="mt-1" />
        </div>
      </div>

      {/* Hero Section with Image */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Construction Dumpsters
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
                Construction Dumpster Rental
              </h1>
              <p className="text-xl text-secondary-600 mb-6">
                Keep your job site clean and productive with reliable waste removal. Our construction dumpsters
                handle lumber, drywall, roofing, and all types of construction debris. Volume discounts available
                for contractors.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Get Contractor Pricing: {phone}
                </a>
                <Link
                  href="/dumpster-rental-prices"
                  className="border-2 border-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
                >
                  View All Prices
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/services/construction-dumpsters.jpg"
                alt="Construction dumpster rental at job site with construction debris"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Why Contractors Choose Us
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            We understand construction timelines are tight. Our service is built for contractors who need
            reliable waste removal without the hassle.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {CONTRACTOR_BENEFITS.map((item) => (
              <div key={item.title} className="bg-secondary-50 rounded-xl p-6 text-center">
                <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-secondary-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Sizes */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Construction Dumpster Sizes
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            For construction projects, we recommend 20-yard or larger containers. These sizes handle the
            volume of debris typical on job sites.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CONSTRUCTION_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-6 shadow-sm ${
                  item.popular ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular for Construction
                  </span>
                )}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-5xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-secondary-600 text-lg">Yard</span>
                </div>
                <div className="text-3xl font-bold text-secondary-900 mt-2">{item.price}</div>
                <div className="text-sm text-secondary-500 mb-4">All-inclusive pricing</div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-secondary-700">Weight included: {item.weightLimit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-secondary-700">7-day rental period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-secondary-700">Delivery & pickup included</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-secondary-500">Dimensions: {item.dimensions}</p>
                  <p className="text-sm text-secondary-700 mt-2"><strong>Best for:</strong> {item.bestFor}</p>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-6 block text-center bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Order {item.size} Yard
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Goes In */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Construction Debris We Accept
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Check className="h-6 w-6 text-green-600" />
                <h3 className="font-bold text-secondary-900 text-lg">Accepted Materials</h3>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {ACCEPTED_MATERIALS.map((material) => (
                  <li key={material} className="text-secondary-700 text-sm flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="font-bold text-secondary-900 text-lg">Not Accepted</h3>
              </div>
              <ul className="space-y-2">
                {NOT_ACCEPTED.map((material) => (
                  <li key={material} className="text-secondary-700 text-sm flex items-center gap-2">
                    <span className="text-red-500">✕</span>
                    {material}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-red-700 mt-4">
                Hazardous materials require specialized disposal. Contact us for guidance on proper disposal options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heavy Materials Note */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex gap-4">
            <HardHat className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-secondary-900 mb-2">Note on Heavy Materials</h3>
              <p className="text-secondary-700">
                Concrete, brick, dirt, and roofing shingles are heavy. A small pile can quickly reach weight limits.
                For heavy material projects, we recommend:
              </p>
              <ul className="mt-3 space-y-1 text-secondary-600">
                <li>• <strong>Clean concrete loads:</strong> Ask about discounted disposal rates</li>
                <li>• <strong>Mixed heavy debris:</strong> Consider a smaller dumpster to stay under weight limits</li>
                <li>• <strong>Full roof tear-offs:</strong> 30-yard containers handle most residential roofs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contractor Tips */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Tips for Managing Construction Waste
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">1. Order the Right Size</h3>
              <p className="text-secondary-600">
                Running out of space mid-project means paying for a swap. It&apos;s usually more cost-effective
                to order one size larger than you think you need. Call us to discuss your project — we&apos;ll
                help you pick the right size.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">2. Position for Efficiency</h3>
              <p className="text-secondary-600">
                Place the dumpster close to where debris is generated. For multi-story work, position it
                under windows for easy disposal. Leave room for the delivery truck to maneuver on swap days.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">3. Separate Materials When Possible</h3>
              <p className="text-secondary-600">
                Clean loads of concrete, metal, or wood may qualify for discounted disposal rates. If you
                have a large amount of one material, ask about our clean load pricing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">4. Schedule Swaps in Advance</h3>
              <p className="text-secondary-600">
                Know when your dumpster will be full? Schedule the swap-out ahead of time to avoid downtime.
                We offer same-day swaps when possible, but advance notice guarantees availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Construction Dumpster?</h2>
          <p className="text-xl text-secondary-300 mb-8">
            Same-day delivery available. Volume discounts for repeat contractors. All-inclusive pricing.
          </p>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
          >
            <Phone className="h-6 w-6" />
            Call {phone}
          </a>
          <p className="text-secondary-400 mt-4">
            Serving contractors and job sites nationwide
          </p>
        </div>
      </section>
    </>
  );
}
