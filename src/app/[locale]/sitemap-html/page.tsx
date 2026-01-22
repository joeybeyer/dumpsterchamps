import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Package, Truck, FileText, HelpCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Sitemap | Dumpster Champs",
  description:
    "Browse all pages on Dumpster Champs. Find dumpster rental services, sizes, and locations across the United States.",
};

export default async function SitemapPage() {
  const [states, sizes, services] = await Promise.all([
    prisma.state.findMany({
      include: { cities: { orderBy: { name: "asc" } } },
      orderBy: { name: "asc" },
    }),
    prisma.dumpsterSize.findMany({ orderBy: { size: "asc" } }),
    prisma.service.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Sitemap</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Sitemap</h1>
          <p className="text-secondary-200">
            Browse all pages on Dumpster Champs
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Pages */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-bold text-secondary-900">
                  Main Pages
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Locations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dumpster-sizes"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Dumpster Sizes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tos"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/calculator"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Dumpster Size Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dumpster-rental-prices"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-secondary-600 hover:text-primary-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>

              {/* Helpful Guides (PAA Pages) */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-secondary-900">
                    Helpful Guides
                  </h2>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/how-much-does-dumpster-rental-cost"
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      2026 Dumpster Rental Cost Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/what-size-dumpster-do-i-need"
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      What Size Dumpster Do I Need?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/do-i-need-permit-for-dumpster"
                      className="text-secondary-600 hover:text-primary-600 transition-colors"
                    >
                      Dumpster Permit Guide
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Dumpster Sizes */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-secondary-900">
                    Dumpster Sizes
                  </h2>
                </div>
                <ul className="space-y-2">
                  {sizes.map((size) => (
                    <li key={size.id}>
                      <Link
                        href={`/${size.slug}`}
                        className="text-secondary-600 hover:text-primary-600 transition-colors"
                      >
                        {size.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-bold text-secondary-900">
                    Services
                  </h2>
                </div>
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/${service.slug}`}
                        className="text-secondary-600 hover:text-primary-600 transition-colors"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Locations - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-bold text-secondary-900">
                  Service Locations ({states.length} States,{" "}
                  {states.reduce((acc, s) => acc + s.cities.length, 0)} Cities)
                </h2>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {states.map((state) => (
                  <div key={state.id}>
                    <Link
                      href={`/dumpster-rental-${state.slug}`}
                      className="font-semibold text-secondary-900 hover:text-primary-600 transition-colors block mb-2"
                    >
                      {state.name} ({state.abbr})
                    </Link>
                    {state.cities.length > 0 && (
                      <ul className="space-y-1 pl-4 border-l-2 border-secondary-200">
                        {state.cities.map((city) => (
                          <li key={city.id}>
                            <Link
                              href={`/dumpster-rental-${city.slug}`}
                              className="text-sm text-secondary-600 hover:text-primary-600 transition-colors"
                            >
                              {city.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">
                {states.length}
              </div>
              <div className="text-secondary-600">States Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">
                {states.reduce((acc, s) => acc + s.cities.length, 0)}
              </div>
              <div className="text-secondary-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">
                {sizes.length}
              </div>
              <div className="text-secondary-600">Dumpster Sizes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">
                {services.length}
              </div>
              <div className="text-secondary-600">Service Types</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
