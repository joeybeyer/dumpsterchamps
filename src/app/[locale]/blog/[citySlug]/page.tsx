import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BLOG_TEMPLATES, processContent } from "@/data/blogTemplates";
import { setRequestLocale } from "next-intl/server";

// Force dynamic rendering to prevent DB access at build time
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ citySlug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug } = await params;

  const city = await prisma.city.findFirst({
    where: {
      OR: [
        { slug: citySlug },
        { slug: { endsWith: `-${citySlug}` } },
      ],
    },
    include: { state: true },
  });

  if (!city) return { title: "Blog Not Found" };

  return {
    title: `Dumpster Rental Guides for ${city.name}, ${city.state.abbr} | Expert Tips [2026]`,
    description: `Expert dumpster rental guides for ${city.name}. Learn about sizing, pricing, permits, and best practices. ${BLOG_TEMPLATES.length} comprehensive guides available.`,
  };
}

// generateStaticParams removed - using force-dynamic instead

export default async function CityBlogIndex({ params }: PageProps) {
  const { citySlug, locale } = await params;
  setRequestLocale(locale);

  const city = await prisma.city.findFirst({
    where: {
      OR: [
        { slug: citySlug },
        { slug: { endsWith: `-${citySlug}` } },
      ],
    },
    include: { state: true },
  });

  if (!city) return notFound();

  const moneyPageUrl = `/dumpster-rental-${city.slug}`;

  // Group templates by category
  const categories = BLOG_TEMPLATES.reduce(
    (acc, template) => {
      const cat = template.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(template);
      return acc;
    },
    {} as Record<string, typeof BLOG_TEMPLATES>
  );

  const isEs = locale === 'es';

  const categoryLabels: Record<string, string> = isEs ? {
    "sizing-guide": "Guías de Tamaño",
    "pricing-guide": "Guías de Precios",
    "how-to-guide": "Guías Prácticas",
    "scheduling-guide": "Programación",
    "preparation-guide": "Preparación",
    "comparison-guide": "Comparaciones",
    "disposal-guide": "Info de Eliminación",
    "regulations-guide": "Reglamentos y Permisos",
    "money-saving": "Consejos para Ahorrar",
    "loading-tips": "Consejos de Carga",
    "eco-friendly": "Ecológico",
    "mistakes-guide": "Evitar Errores",
    "faq": "Preguntas Frecuentes",
    "booking-guide": "Ayuda para Reservar",
    "home-improvement": "Mejoras del Hogar",
    "construction-guide": "Construcción",
    "consumer-protection": "Protección al Consumidor",
  } : {
    "sizing-guide": "Sizing Guides",
    "pricing-guide": "Pricing Guides",
    "how-to-guide": "How-To Guides",
    "scheduling-guide": "Scheduling",
    "preparation-guide": "Preparation",
    "comparison-guide": "Comparisons",
    "disposal-guide": "Disposal Info",
    "regulations-guide": "Regulations & Permits",
    "money-saving": "Money-Saving Tips",
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
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-secondary-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">{isEs ? 'Inicio' : 'Home'}</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={moneyPageUrl} className="hover:text-white">{city.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Blog</span>
          </nav>

          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {isEs
              ? `Guías de Alquiler de Contenedores en ${city.name}, ${city.state.abbr}`
              : `Dumpster Rental Guides for ${city.name}, ${city.state.abbr}`}
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl">
            {isEs
              ? `${BLOG_TEMPLATES.length} guías expertas para ayudarle con su proyecto de alquiler de contenedores. Desde elegir el tamaño correcto hasta evitar errores comunes.`
              : `${BLOG_TEMPLATES.length} expert guides to help you with your dumpster rental project. From choosing the right size to avoiding common mistakes.`}
          </p>
        </div>
      </section>

      {/* Blog Grid by Category */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {Object.entries(categories).map(([category, templates]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 pb-2 border-b border-secondary-200">
                {categoryLabels[category] || category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => {
                  const title = processContent(
                    template.titleTemplate,
                    city.name,
                    city.state.name,
                    city.state.abbr
                  );
                  const excerpt = processContent(
                    template.excerptTemplate,
                    city.name,
                    city.state.name,
                    city.state.abbr
                  );
                  const slug = template.slugTemplate.replace("[CITY_SLUG]", citySlug);

                  return (
                    <Link
                      key={template.id}
                      href={`/blog/${citySlug}/${slug}`}
                      className="group bg-secondary-50 rounded-xl p-6 hover:bg-primary-50 hover:shadow-md transition-all"
                    >
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                        {categoryLabels[template.category] || template.category}
                      </span>
                      <h3 className="text-lg font-semibold text-secondary-900 mt-2 mb-2 group-hover:text-primary-600 transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-secondary-600 line-clamp-2">{excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                        {isEs ? 'Leer Guía' : 'Read Guide'} <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Money Page */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isEs ? `¿Listo para Alquilar un Contenedor en ${city.name}?` : `Ready to Rent a Dumpster in ${city.name}?`}
          </h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            {isEs
              ? '¡Obtenga su cotización gratis hoy! Entrega el mismo día disponible con precios fijos.'
              : 'Get your free quote today! Same-day delivery available with flat-rate pricing.'}
          </p>
          <Link
            href={moneyPageUrl}
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            {isEs ? `Cotización Gratis en ${city.name}` : `Get a Free Quote in ${city.name}`}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
