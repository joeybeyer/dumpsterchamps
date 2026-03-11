import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Truck, HardHat, Home, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { setRequestLocale } from "next-intl/server";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Dumpster Rental Services",
  description:
    "Explore our dumpster rental services including roll-off dumpsters, construction dumpsters, and residential dumpsters. Fast delivery and competitive pricing.",
};

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === 'es';

  const serviceDetails = [
    {
      slug: "roll-off-dumpster-rental",
      icon: Truck,
      features: isEs ? [
        "Disponible en tamaños de 10-40 yardas",
        "Fácil carga con puerta trasera",
        "Versátil para cualquier tipo de residuo",
        "Entrega y recogida rápidas",
      ] : [
        "Available in 10-40 yard sizes",
        "Easy loading with rear door",
        "Versatile for any waste type",
        "Quick delivery and pickup",
      ],
    },
    {
      slug: "construction-dumpsters",
      icon: HardHat,
      features: isEs ? [
        "Construcción resistente",
        "Maneja concreto y escombros",
        "Perfecto para obras de construcción",
        "Opciones de alquiler a largo plazo",
      ] : [
        "Heavy-duty construction",
        "Handles concrete and debris",
        "Perfect for job sites",
        "Long-term rental options",
      ],
    },
    {
      slug: "residential-dumpsters",
      icon: Home,
      features: isEs ? [
        "Cabe en la mayoría de entradas",
        "Perfecto para proyectos del hogar",
        "Precios amigables",
        "Períodos de alquiler flexibles",
      ] : [
        "Fits in most driveways",
        "Perfect for home projects",
        "Friendly pricing",
        "Flexible rental periods",
      ],
    },
  ];

  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
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
            <span className="text-white">{isEs ? 'Servicios' : 'Services'}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {isEs ? 'Nuestros Servicios' : 'Our Services'}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? 'Desde limpiezas residenciales hasta grandes proyectos de construcción, tenemos la solución de contenedor correcta para sus necesidades.'
              : 'From residential cleanouts to large construction projects, we have the right dumpster solution for your needs.'}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service) => {
              const details = serviceDetails.find((d) => d.slug === service.slug);
              const Icon = details?.icon || Truck;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-8 p-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary-100 p-3 rounded-lg">
                          <Icon className="h-8 w-8 text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-secondary-900">
                          {service.name}
                        </h2>
                      </div>
                      <p className="text-secondary-600 mb-6">
                        {service.description}
                      </p>

                      {details && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {details.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div className="bg-green-600 rounded-full p-0.5">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-secondary-700 text-sm">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center">
                      <Link
                        href={`/${service.slug}`}
                        className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
                      >
                        {isEs ? 'Más Información' : 'Learn More'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isEs ? '¿Listo para Alquilar un Contenedor?' : 'Ready to Rent a Dumpster?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {isEs
              ? '¡Obtenga una cotización gratis hoy y tenga su contenedor entregado tan pronto como mañana!'
              : 'Get a free quote today and have your dumpster delivered as soon as tomorrow!'}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            {isEs ? 'Obtener Cotización Gratis' : 'Get a Free Quote'}
          </Link>
        </div>
      </section>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: "Services", url: "https://www.dumpsterchamps.com/services" },
        ]}
      />
    </>
  );
}
