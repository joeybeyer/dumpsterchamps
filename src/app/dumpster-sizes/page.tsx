import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Ruler, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dumpster Sizes Guide | Dumpster Champs",
  description:
    "Compare dumpster sizes from 10 to 40 yards. Find the right size for your project with our comprehensive size guide.",
};

export default async function DumpsterSizesPage() {
  const sizes = await prisma.dumpsterSize.findMany({
    orderBy: { size: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-secondary-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Dumpster Sizes</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Dumpster Size Guide
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            Not sure which dumpster size you need? Use our guide to find the
            perfect fit for your project.
          </p>
        </div>
      </section>

      {/* Sizes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {sizes.map((size) => (
              <div
                key={size.id}
                className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden"
              >
                <div className="grid lg:grid-cols-4 gap-6 p-6">
                  <div className="flex items-center gap-6">
                    <div className="bg-primary-600 text-white text-3xl font-bold w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
                      {size.size}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-secondary-900">
                        {size.name}
                      </h2>
                      <p className="text-2xl font-bold text-primary-600">
                        {size.priceRange}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-secondary-600 mb-2">
                      <Ruler className="h-4 w-4" />
                      <span className="font-medium">Dimensions</span>
                    </div>
                    <p className="text-secondary-900">{size.dimensions}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-secondary-600 mb-2">
                      <Package className="h-4 w-4" />
                      <span className="font-medium">Capacity</span>
                    </div>
                    <p className="text-secondary-900">{size.capacity}</p>
                  </div>

                  <div className="flex items-center">
                    <Link
                      href={`/${size.slug}`}
                      className="w-full lg:w-auto bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="bg-secondary-50 px-6 py-4 border-t border-secondary-200">
                  <p className="text-sm text-secondary-600">
                    <span className="font-medium">Best for:</span>{" "}
                    {size.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Still Not Sure Which Size You Need?
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Our team can help you choose the right dumpster size for your
              project. Give us a call or request a quote, and we&apos;ll recommend
              the best option based on your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:8888600710"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Call (888) 860-0710
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
