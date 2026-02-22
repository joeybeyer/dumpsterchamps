import Link from "next/link";
import { Ruler, DollarSign, Trash2, BookOpen, ArrowRight } from "lucide-react";

// Pillar pages that city blog posts link UP to (Ferris Wheel model)
// These are the "money pages" that gain authority from all spoke content
const pillarPages = [
  {
    id: "sizes",
    title: "Complete Dumpster Size Guide",
    titleEs: "Guía Completa de Tamaños de Contenedores",
    description: "Find the perfect size for your project",
    descriptionEs: "Encuentra el tamaño perfecto para tu proyecto",
    href: "/blog/dumpster-sizes-guide",
    icon: Ruler,
    categories: ["sizing-guide", "home-improvement", "construction-guide"],
  },
  {
    id: "pricing",
    title: "2026 Pricing Guide",
    titleEs: "Guía de Precios 2026",
    description: "Understand costs and avoid hidden fees",
    descriptionEs: "Entiende los costos y evita cargos ocultos",
    href: "/blog/dumpster-rental-cost-guide",
    icon: DollarSign,
    categories: ["pricing-guide", "money-saving", "comparison-guide", "consumer-protection"],
  },
  {
    id: "disposal",
    title: "What Can Go in a Dumpster",
    titleEs: "¿Qué Se Puede Poner en un Contenedor?",
    description: "Know what's accepted and prohibited",
    descriptionEs: "Conoce qué se acepta y qué está prohibido",
    href: "/blog/what-can-go-in-dumpster",
    icon: Trash2,
    categories: ["disposal-guide", "eco-friendly", "regulations-guide"],
  },
  {
    id: "how-to",
    title: "First-Timer's Rental Guide",
    titleEs: "Guía para Principiantes de Alquiler",
    description: "Step-by-step rental process",
    descriptionEs: "Proceso de alquiler paso a paso",
    href: "/blog/how-to-rent-dumpster",
    icon: BookOpen,
    categories: ["how-to-guide", "booking-guide", "scheduling-guide", "preparation-guide", "loading-tips", "mistakes-guide", "faq"],
  },
];

interface RelatedPillarLinksProps {
  currentCategory: string;
  cityName?: string;
  variant?: "full" | "compact";
  locale?: string;
}

export function RelatedPillarLinks({ currentCategory, cityName, variant = "full", locale }: RelatedPillarLinksProps) {
  const isEs = locale === 'es';
  // Find the most relevant pillar page based on category
  const primaryPillar = pillarPages.find((p) => p.categories.includes(currentCategory));

  // Get other pillar pages for secondary links
  const otherPillars = pillarPages.filter((p) => p.id !== primaryPillar?.id).slice(0, 2);

  if (variant === "compact") {
    return (
      <div className="bg-secondary-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          {isEs ? 'Guías Relacionadas' : 'Related Guides'}
        </h3>
        <div className="space-y-3">
          {primaryPillar && (
            <Link
              href={primaryPillar.href}
              className="flex items-center gap-3 text-primary-600 hover:text-primary-700 font-medium"
            >
              <primaryPillar.icon className="h-5 w-5" />
              {isEs ? primaryPillar.titleEs : primaryPillar.title}
            </Link>
          )}
          {otherPillars.map((pillar) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="flex items-center gap-3 text-secondary-600 hover:text-primary-600"
            >
              <pillar.icon className="h-5 w-5" />
              {isEs ? pillar.titleEs : pillar.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-secondary-50 to-white rounded-xl p-6 border border-secondary-200">
      <div className="text-center mb-6">
        <span className="text-primary-600 text-sm font-semibold uppercase tracking-wide">
          {isEs ? 'Aprende Más' : 'Learn More'}
        </span>
        <h3 className="text-xl font-bold text-secondary-900 mt-1">
          {isEs ? 'Guías Esenciales de Alquiler de Contenedores' : 'Essential Dumpster Rental Guides'}
        </h3>
        {cityName && (
          <p className="text-secondary-600 text-sm mt-1">
            {isEs ? `Recursos expertos para residentes de ${cityName}` : `Expert resources for ${cityName} residents`}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {pillarPages.map((pillar) => (
          <Link
            key={pillar.id}
            href={pillar.href}
            className={`flex items-start gap-3 p-4 rounded-lg transition-all ${
              pillar.id === primaryPillar?.id
                ? "bg-primary-50 border-2 border-primary-200 hover:border-primary-400"
                : "bg-white border border-secondary-200 hover:border-primary-300 hover:shadow-sm"
            }`}
          >
            <div className={`p-2 rounded-lg ${
              pillar.id === primaryPillar?.id
                ? "bg-primary-600 text-white"
                : "bg-secondary-100 text-secondary-600"
            }`}>
              <pillar.icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`font-semibold ${
                pillar.id === primaryPillar?.id
                  ? "text-primary-900"
                  : "text-secondary-900"
              }`}>
                {isEs ? pillar.titleEs : pillar.title}
              </h4>
              <p className="text-sm text-secondary-600">{isEs ? pillar.descriptionEs : pillar.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {primaryPillar && (
        <div className="mt-6 text-center">
          <Link
            href={primaryPillar.href}
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
          >
            {isEs ? `Leer la Guía Completa de ${(primaryPillar.titleEs ?? primaryPillar.title).split(" ").slice(-2).join(" ")}` : `Read the Complete ${primaryPillar.title.split(" ").slice(-2).join(" ")}`}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

// Simple inline link component for use within content
export function PillarLink({ category, children }: { category: string; children?: React.ReactNode }) {
  const pillar = pillarPages.find((p) => p.categories.includes(category));

  if (!pillar) return null;

  return (
    <Link href={pillar.href} className="text-primary-600 font-medium hover:underline">
      {children || pillar.title}
    </Link>
  );
}
