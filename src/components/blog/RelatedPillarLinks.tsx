import Link from "next/link";
import { Ruler, DollarSign, Trash2, BookOpen, ArrowRight } from "lucide-react";

// Pillar pages that city blog posts link UP to (Ferris Wheel model)
// These are the "money pages" that gain authority from all spoke content
const pillarPages = [
  {
    id: "sizes",
    title: "Complete Dumpster Size Guide",
    description: "Find the perfect size for your project",
    href: "/blog/dumpster-sizes-guide",
    icon: Ruler,
    categories: ["sizing-guide", "home-improvement", "construction-guide"],
  },
  {
    id: "pricing",
    title: "2026 Pricing Guide",
    description: "Understand costs and avoid hidden fees",
    href: "/blog/dumpster-rental-cost-guide",
    icon: DollarSign,
    categories: ["pricing-guide", "money-saving", "comparison-guide", "consumer-protection"],
  },
  {
    id: "disposal",
    title: "What Can Go in a Dumpster",
    description: "Know what's accepted and prohibited",
    href: "/blog/what-can-go-in-dumpster",
    icon: Trash2,
    categories: ["disposal-guide", "eco-friendly", "regulations-guide"],
  },
  {
    id: "how-to",
    title: "First-Timer's Rental Guide",
    description: "Step-by-step rental process",
    href: "/blog/how-to-rent-dumpster",
    icon: BookOpen,
    categories: ["how-to-guide", "booking-guide", "scheduling-guide", "preparation-guide", "loading-tips", "mistakes-guide", "faq"],
  },
];

interface RelatedPillarLinksProps {
  currentCategory: string;
  cityName?: string;
  variant?: "full" | "compact";
}

export function RelatedPillarLinks({ currentCategory, cityName, variant = "full" }: RelatedPillarLinksProps) {
  // Find the most relevant pillar page based on category
  const primaryPillar = pillarPages.find((p) => p.categories.includes(currentCategory));

  // Get other pillar pages for secondary links
  const otherPillars = pillarPages.filter((p) => p.id !== primaryPillar?.id).slice(0, 2);

  if (variant === "compact") {
    return (
      <div className="bg-secondary-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Related Guides
        </h3>
        <div className="space-y-3">
          {primaryPillar && (
            <Link
              href={primaryPillar.href}
              className="flex items-center gap-3 text-primary-600 hover:text-primary-700 font-medium"
            >
              <primaryPillar.icon className="h-5 w-5" />
              {primaryPillar.title}
            </Link>
          )}
          {otherPillars.map((pillar) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="flex items-center gap-3 text-secondary-600 hover:text-primary-600"
            >
              <pillar.icon className="h-5 w-5" />
              {pillar.title}
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
          Learn More
        </span>
        <h3 className="text-xl font-bold text-secondary-900 mt-1">
          Essential Dumpster Rental Guides
        </h3>
        {cityName && (
          <p className="text-secondary-600 text-sm mt-1">
            Expert resources for {cityName} residents
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
                {pillar.title}
              </h4>
              <p className="text-sm text-secondary-600">{pillar.description}</p>
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
            Read the Complete {primaryPillar.title.split(" ").slice(-2).join(" ")}
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
