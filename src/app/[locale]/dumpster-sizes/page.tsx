import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Ruler, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Dumpster Sizes Guide | Dumpster Champs",
  description:
    "Compare dumpster sizes from 10 to 40 yards. Find the right size for your project with our comprehensive size guide.",
};

export default async function DumpsterSizesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

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
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{isEs ? 'Tamaños de Contenedores' : 'Dumpster Sizes'}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? 'Guía de Tamaños de Contenedores' : 'Dumpster Size Guide'}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? '¿No sabe qué tamaño de contenedor necesita? Use nuestra guía para encontrar el tamaño perfecto para su proyecto.'
              : 'Not sure which dumpster size you need? Use our guide to find the perfect fit for your project.'}
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
                      <span className="font-medium">{isEs ? 'Dimensiones' : 'Dimensions'}</span>
                    </div>
                    <p className="text-secondary-900">{size.dimensions}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-secondary-600 mb-2">
                      <Package className="h-4 w-4" />
                      <span className="font-medium">{isEs ? 'Capacidad' : 'Capacity'}</span>
                    </div>
                    <p className="text-secondary-900">{size.capacity}</p>
                  </div>

                  <div className="flex items-center">
                    <Link
                      href={`/${size.slug}`}
                      className="w-full lg:w-auto bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
                    >
                      {isEs ? 'Ver Detalles' : 'View Details'}
                    </Link>
                  </div>
                </div>

                <div className="bg-secondary-50 px-6 py-4 border-t border-secondary-200">
                  <p className="text-sm text-secondary-600">
                    <span className="font-medium">{isEs ? 'Ideal para:' : 'Best for:'}</span>{" "}
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
              {isEs ? '¿Aún No Sabe Qué Tamaño Necesita?' : 'Still Not Sure Which Size You Need?'}
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              {isEs
                ? 'Nuestro equipo puede ayudarle a elegir el tamaño de contenedor correcto para su proyecto. Llámenos o solicite una cotización y recomendaremos la mejor opción según sus necesidades.'
                : "Our team can help you choose the right dumpster size for your project. Give us a call or request a quote, and we'll recommend the best option based on your needs."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {isEs ? 'Obtener Cotización Gratis' : 'Get a Free Quote'}
              </Link>
              <a
                href="tel:8888600710"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                {isEs ? 'Llamar (888) 860-0710' : 'Call (888) 860-0710'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Dumpster Sizes", url: "https://www.dumpsterchamps.com/dumpster-sizes" },
        ]}
      />
      <FAQSchema
        faqs={[
          { question: "What dumpster size do I need?", answer: "The right dumpster size depends on your project. A 10-yard is best for small cleanouts, 15-yard for medium projects, 20-yard for kitchen/bathroom remodels, 30-yard for major renovations, and 40-yard for new construction or large demos." },
          { question: "How much can a 10-yard dumpster hold?", answer: "A 10-yard dumpster holds about 3-4 pickup truck loads or 2 tons of debris. It's ideal for garage cleanouts, small bathroom remodels, or debris from flooring projects." },
          { question: "How much can a 20-yard dumpster hold?", answer: "A 20-yard dumpster holds about 7-8 pickup truck loads or 3 tons of debris. This is our most popular size for kitchen remodels, roof tear-offs, and large home cleanouts." },
          { question: "What happens if I choose the wrong size?", answer: "If you need a larger size, we can swap out your dumpster for a bigger one. If you choose too large, you won't lose money - you'll just have more space than needed." },
        ]}
      />
    </>
  );
}
