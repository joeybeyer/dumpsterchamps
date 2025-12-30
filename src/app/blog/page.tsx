import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, FileText, ArrowRight, Ruler, DollarSign, Trash2, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BLOG_TEMPLATES } from "@/data/blogTemplates";

export const metadata: Metadata = {
  title: "Dumpster Rental Blog & Guides | Expert Tips [2026] | Dumpster Champs",
  description:
    "Expert dumpster rental guides, tips, and how-to articles for 2026. Learn about sizing, pricing, permits, loading tips, and more. Find guides for your city.",
};

const pillarPages = [
  {
    title: "Complete Dumpster Size Guide",
    subtitle: "10, 15, 20, 30 & 40 Yard Explained",
    description: "Not sure which size you need? Our comprehensive guide breaks down every dumpster size with dimensions, capacity, and project recommendations.",
    href: "/blog/dumpster-sizes-guide",
    icon: Ruler,
    badge: "Most Popular",
  },
  {
    title: "Dumpster Rental Cost Guide",
    subtitle: "2026 Pricing Breakdown",
    description: "Understand exactly what you'll pay. Complete pricing breakdown including hidden fees to avoid and money-saving tips.",
    href: "/blog/dumpster-rental-cost-guide",
    icon: DollarSign,
    badge: "Updated for 2026",
  },
  {
    title: "What Can Go in a Dumpster?",
    subtitle: "Complete Disposal Guide",
    description: "Know what's allowed before you load. Complete list of accepted and prohibited items with disposal alternatives for hazardous materials.",
    href: "/blog/what-can-go-in-dumpster",
    icon: Trash2,
    badge: "Essential Reading",
  },
  {
    title: "How to Rent a Dumpster",
    subtitle: "First-Timer's Complete Guide",
    description: "New to dumpster rental? Our step-by-step guide walks you through the entire process from quote to pickup.",
    href: "/blog/how-to-rent-dumpster",
    icon: BookOpen,
    badge: "Start Here",
  },
];

export default async function BlogIndex() {
  const states = await prisma.state.findMany({
    include: {
      cities: {
        take: 5,
        orderBy: { name: "asc" },
      },
    },
    orderBy: { name: "asc" },
    take: 10, // Show top 10 states
  });

  // Category summary
  const categoryCount: Record<string, number> = {};
  BLOG_TEMPLATES.forEach((t) => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  });

  const categoryLabels: Record<string, string> = {
    "sizing-guide": "Sizing Guides",
    "pricing-guide": "Pricing Guides",
    "how-to-guide": "How-To Guides",
    "scheduling-guide": "Scheduling",
    "preparation-guide": "Preparation",
    "comparison-guide": "Comparisons",
    "disposal-guide": "Disposal Info",
    "regulations-guide": "Regulations",
    "money-saving": "Money-Saving",
    "loading-tips": "Loading Tips",
    "eco-friendly": "Eco-Friendly",
    "mistakes-guide": "Avoiding Mistakes",
    "faq": "FAQ",
    "booking-guide": "Booking Help",
    "home-improvement": "Home Improvement",
    "construction-guide": "Construction",
    "consumer-protection": "Consumer Protection",
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-secondary-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Blog</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Dumpster Rental Guides & Tips
            </h1>
            <p className="text-xl text-secondary-200">
              Expert guides to help you with your dumpster rental project.
              Find local tips for sizing, pricing, permits, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Pillar Guides */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
              Essential Guides for 2026
            </span>
            <h2 className="text-3xl font-bold text-secondary-900 mt-2">
              Start With Our Complete Guides
            </h2>
            <p className="text-secondary-600 mt-3 max-w-2xl mx-auto">
              Everything you need to know about dumpster rental in one place.
              These comprehensive guides answer the most common questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {pillarPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group bg-secondary-50 rounded-xl p-6 border border-secondary-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-600 transition-colors">
                    <page.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                      {page.badge}
                    </span>
                    <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-primary-600 font-medium">{page.subtitle}</p>
                    <p className="text-secondary-600 mt-2 text-sm">{page.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary-600 font-medium mt-3 text-sm group-hover:gap-2 transition-all">
                      Read Guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            {BLOG_TEMPLATES.length} City-Specific Guides Available
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <span
                key={key}
                className="bg-white px-4 py-2 rounded-full text-sm font-medium text-secondary-700 border border-secondary-200"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* City Blog Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
            Find Guides for Your City
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {states.map((state) => (
              <div key={state.id} className="bg-secondary-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {state.name}
                  </h3>
                </div>
                {state.cities.length > 0 ? (
                  <ul className="space-y-2">
                    {state.cities.map((city) => (
                      <li key={city.id}>
                        <Link
                          href={`/blog/${city.slug}`}
                          className="text-secondary-600 hover:text-primary-600 transition-colors flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          {city.name} Guides
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-secondary-500 text-sm">
                    Contact us for guides in {state.name}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
            >
              View All Locations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
            Popular Guide Topics
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_TEMPLATES.slice(0, 8).map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl p-6 border border-secondary-200"
              >
                <span className="text-xs font-semibold text-primary-600 uppercase">
                  {categoryLabels[template.category]}
                </span>
                <h3 className="text-lg font-semibold text-secondary-900 mt-2">
                  {template.titleTemplate.replace("[CITY]", "Your City")}
                </h3>
                <p className="text-sm text-secondary-600 mt-2 line-clamp-2">
                  {template.excerptTemplate.replace("[CITY]", "your city")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Rent a Dumpster?
          </h2>
          <p className="text-primary-100 mb-6">
            Get a free quote with same-day delivery available.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Get a Free Quote <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
