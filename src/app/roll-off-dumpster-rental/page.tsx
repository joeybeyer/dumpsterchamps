import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Check, Truck, Clock, Shield, ArrowRight, HardHat, Home, Building } from "lucide-react";
import { LastUpdated } from "@/components/seo/LastUpdated";

export const metadata: Metadata = {
  title: "Roll Off Dumpster Rental | Open-Top Container Delivery",
  description: "Roll off dumpster rental from $495. Open-top containers delivered to your driveway. 10-40 yard sizes for construction, renovations & cleanouts. Same-day delivery available.",
  keywords: "roll off dumpster rental, roll off container, roll off dumpster near me, open top dumpster, roll off rental",
};

const ROLL_OFF_SIZES = [
  {
    size: 10,
    price: "$495",
    dimensions: "12' x 8' x 3.5'",
    capacity: "3-4 pickup truck loads",
    bestFor: ["Small cleanouts", "Bathroom remodels", "Garage cleanups"],
  },
  {
    size: 15,
    price: "$550",
    dimensions: "16' x 7.5' x 4'",
    capacity: "5-6 pickup truck loads",
    bestFor: ["Medium renovations", "Deck removal", "Flooring projects"],
  },
  {
    size: 20,
    price: "$595",
    dimensions: "22' x 7.5' x 4.5'",
    capacity: "7-8 pickup truck loads",
    bestFor: ["Kitchen remodels", "Roof tear-offs", "Large cleanouts"],
    popular: true,
  },
  {
    size: 30,
    price: "$695",
    dimensions: "22' x 7.5' x 6'",
    capacity: "10-12 pickup truck loads",
    bestFor: ["Major renovations", "New construction", "Estate cleanouts"],
  },
  {
    size: 40,
    price: "$795",
    dimensions: "22' x 7.5' x 8'",
    capacity: "14-16 pickup truck loads",
    bestFor: ["Commercial projects", "Whole house demos", "Large construction"],
  },
];

const WHAT_IS_ROLL_OFF = [
  {
    title: "Open-Top Design",
    description: "Roll off dumpsters have an open top for easy loading from any angle. Toss debris over the sides or use the rear swing door for heavy items.",
    icon: Truck,
  },
  {
    title: "Wheels for Delivery",
    description: "Small wheels allow the container to 'roll off' the delivery truck directly onto your driveway or job site. No crane or special equipment needed.",
    icon: ArrowRight,
  },
  {
    title: "Temporary Rental",
    description: "Unlike permanent dumpsters at businesses, roll offs are delivered for your project and picked up when you're done. Standard rental is 7 days.",
    icon: Clock,
  },
];

const USE_CASES = [
  {
    title: "Home Renovations",
    description: "Kitchen remodels, bathroom updates, flooring replacement, and room additions generate debris that needs to go somewhere.",
    icon: Home,
    sizes: "15-30 yard",
  },
  {
    title: "Construction Sites",
    description: "New builds, additions, and major construction projects require large-capacity containers for lumber, drywall, and materials.",
    icon: HardHat,
    sizes: "30-40 yard",
  },
  {
    title: "Commercial Projects",
    description: "Office cleanouts, retail renovations, and commercial construction need reliable waste removal on a schedule.",
    icon: Building,
    sizes: "20-40 yard",
  },
  {
    title: "Estate Cleanouts",
    description: "Clearing out a home after a loved one passes or preparing a property for sale often requires multiple loads of debris removal.",
    icon: Home,
    sizes: "20-30 yard",
  },
];

export default function RollOffDumpsterPage() {
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
            <span className="text-secondary-900">Roll Off Dumpsters</span>
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
                Roll Off Container Rental
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
                Roll Off Dumpster Rental
              </h1>
              <p className="text-xl text-secondary-600 mb-6">
                Open-top containers delivered directly to your location. Our roll off dumpsters are perfect for
                construction debris, renovation waste, and large cleanout projects. Prices start at <strong className="text-primary-600">$495</strong> with
                everything included.
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
                  href="/dumpster-rental-prices"
                  className="border-2 border-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
                >
                  View All Prices
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/services/roll-off-dumpster-rental.jpg"
                alt="Roll off dumpster being delivered to residential driveway"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is a Roll Off */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            What is a Roll Off Dumpster?
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-3xl mx-auto">
            A roll off dumpster is a large, rectangular, open-top waste container that gets delivered on a
            special truck. The container &quot;rolls off&quot; the back of the truck onto your property — hence the name.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {WHAT_IS_ROLL_OFF.map((item) => (
              <div key={item.title} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-secondary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Options */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Roll Off Dumpster Sizes & Prices
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            All prices include delivery, pickup, 7-day rental, weight allowance, and disposal.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ROLL_OFF_SIZES.map((item) => (
              <div
                key={item.size}
                className={`bg-white rounded-xl p-6 shadow-sm ${
                  item.popular ? "ring-2 ring-primary-500" : ""
                }`}
              >
                {item.popular && (
                  <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-4xl font-bold text-primary-600">{item.size}</span>
                  <span className="text-secondary-600">Yard</span>
                </div>
                <div className="text-2xl font-bold text-secondary-900 mt-2">{item.price}</div>
                <div className="text-sm text-secondary-500 mb-4">All-inclusive</div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">Dimensions:</span>
                    <span className="text-secondary-900">{item.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">Capacity:</span>
                    <span className="text-secondary-900">{item.capacity}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-secondary-700 mb-2">Best for:</p>
                  <ul className="space-y-1">
                    {item.bestFor.map((use) => (
                      <li key={use} className="text-sm text-secondary-600 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${item.size}-yard-dumpster`}
                  className="mt-6 block text-center bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Common Uses for Roll Off Dumpsters
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Roll off containers handle a wide variety of projects. Here are the most common uses:
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {USE_CASES.map((item) => (
              <div key={item.title} className="bg-secondary-50 rounded-xl p-6 flex gap-4">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">{item.title}</h3>
                  <p className="text-secondary-600 text-sm mb-2">{item.description}</p>
                  <p className="text-primary-600 text-sm font-medium">Recommended: {item.sizes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            What&apos;s Included with Every Roll Off Rental
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Truck className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">Free Delivery</h3>
              <p className="text-sm text-secondary-600">Delivered to your driveway or job site</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Clock className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">7-Day Rental</h3>
              <p className="text-sm text-secondary-600">Full week included in the price</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Shield className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">Weight Included</h3>
              <p className="text-sm text-secondary-600">2-6 tons based on dumpster size</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <Truck className="h-10 w-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-secondary-900 mb-2">Free Pickup</h3>
              <p className="text-sm text-secondary-600">We haul it away when you&apos;re done</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Roll Off Dumpster FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                What&apos;s the difference between a roll off and a regular dumpster?
              </h3>
              <p className="text-secondary-600">
                Roll off dumpsters are temporary containers delivered on a truck and placed at your location
                for a specific project. Regular dumpsters (front-load) are permanent fixtures at businesses
                emptied on a weekly schedule. Roll offs are open-top for easy loading, while front-load
                dumpsters have lids and are smaller.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                How much space do I need for a roll off dumpster?
              </h3>
              <p className="text-secondary-600">
                You need about 60 feet of straight clearance for the delivery truck, plus the footprint of
                the dumpster itself (10-22 feet long by 8 feet wide). The area should be flat and accessible
                — driveways work great. We&apos;ll place boards under the wheels to protect your surface.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                Can I put a roll off dumpster on the street?
              </h3>
              <p className="text-secondary-600">
                Many cities allow street placement with a permit. Requirements vary by location — some cities
                are strict about permits and time limits, others are more flexible. We can help you understand
                local requirements when you call to order.
              </p>
            </div>

            <div className="bg-secondary-50 rounded-xl p-6">
              <h3 className="font-bold text-secondary-900 mb-2">
                How full can I load a roll off dumpster?
              </h3>
              <p className="text-secondary-600">
                Debris should not extend above the top edge of the container. This is a safety and legal
                requirement — overfilled dumpsters can&apos;t be transported on public roads. If your dumpster
                is getting full, call us to swap it out for an empty one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order Your Roll Off Dumpster?</h2>
          <p className="text-xl text-secondary-300 mb-8">
            Same-day delivery available in most areas. All-inclusive pricing with no hidden fees.
          </p>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
          >
            <Phone className="h-6 w-6" />
            Call {phone}
          </a>
          <p className="text-secondary-400 mt-4">
            Serving residential and commercial customers nationwide
          </p>
        </div>
      </section>
    </>
  );
}
