import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Dumpster Rental Locations | Dumpster Champs",
  description:
    "Find dumpster rental services near you. Dumpster Champs serves locations nationwide with fast delivery and competitive pricing.",
};

export default async function LocationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const states = await prisma.state.findMany({
    include: {
      _count: {
        select: { cities: true },
      },
    },
    orderBy: { name: "asc" },
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
            <span className="text-white">Locations</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Dumpster Rental Locations
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            Dumpster Champs provides affordable roll-off dumpster rentals
            nationwide. Find service in your state below.
          </p>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {states.map((state) => (
              <Link
                key={state.id}
                href={`/dumpster-rental-${state.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <div>
                    <span className="font-medium text-secondary-900 group-hover:text-primary-600">
                      {state.name}
                    </span>
                    <p className="text-sm text-secondary-500">
                      {state._count.cities} cities
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-secondary-400 group-hover:text-primary-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don&apos;t See Your City?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We&apos;re constantly expanding our service areas. Contact us to check
            availability in your location.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
