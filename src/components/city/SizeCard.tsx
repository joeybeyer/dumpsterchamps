import Link from "next/link";
import Image from "next/image";
import { Check, Truck, User, Home, Wrench, TreePine, Hammer, Trash2, Building2, Briefcase, type LucideIcon } from "lucide-react";
import { BookSizeButton } from "./BookSizeButton";

function getIconForItem(item: string): LucideIcon {
  const lower = item.toLowerCase();
  if (lower.includes("landscap") || lower.includes("yard") || lower.includes("garden") || lower.includes("tree")) return TreePine;
  if (lower.includes("roof")) return Hammer;
  if (lower.includes("deck") || lower.includes("floor") || lower.includes("demolit")) return Hammer;
  if (lower.includes("commercial") || lower.includes("estate") || lower.includes("briefcase")) return Briefcase;
  if (lower.includes("construction") || lower.includes("build")) return Building2;
  if (lower.includes("renovation") || lower.includes("remodel") || lower.includes("removal")) return Wrench;
  if (lower.includes("cleanout") || lower.includes("cleanup") || lower.includes("junk")) return Trash2;
  return Home;
}

interface SizeCardProps {
  size: number;
  price: number;
  weight: string;
  dimensions: string;
  capacity: string;
  idealFor: readonly string[];
  isPopular?: boolean;
  locale?: string;
}

// Size-specific labels for quick decision making
const sizeLabels: Record<number, string> = {
  10: "Garage Cleanouts",
  15: "Room Renovations",
  20: "Full Home Projects",
  30: "Large Construction",
  40: "Major Demolition",
};

const sizeLabelsEs: Record<number, string> = {
  10: "Limpieza de Garaje",
  15: "Renovaciones de Cuartos",
  20: "Proyectos de Hogar Completo",
  30: "Construcción Grande",
  40: "Demolición Mayor",
};

// Truck load equivalents for mental anchoring
const truckLoads: Record<number, number> = {
  10: 4,
  15: 6,
  20: 8,
  30: 12,
  40: 16,
};

// Extract truck load number from capacity string (e.g., "~6 pickup truck loads" -> 6)
function getTruckLoads(capacity: string): number | null {
  const match = capacity.match(/~?(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export function SizeCard({
  size,
  price,
  weight,
  dimensions,
  capacity,
  idealFor,
  isPopular = false,
  locale,
}: SizeCardProps) {
  const isEs = locale === 'es';
  const truckLoadCount = truckLoads[size] || getTruckLoads(capacity);
  const sizeLabel = (isEs ? sizeLabelsEs[size] : sizeLabels[size]) || "";

  return (
    <div
      className={`relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-2 ${
        isPopular ? "border-primary-500 ring-2 ring-primary-100" : "border-transparent"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {isEs ? 'Más Popular' : 'Most Popular'}
        </div>
      )}

      <Link href={`/${size}-yard-dumpster`}>
        <div className="text-center mb-4">
          <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-secondary-50">
            <Image
              src={`/images/dumpsters/${size}-yard.webp`}
              alt={`${size} Yard Dumpster`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className={`absolute top-2 right-2 ${
              isPopular ? "bg-primary-600" : "bg-secondary-800"
            } text-white text-sm font-bold px-2 py-1 rounded-md`}>
              {size} YD
            </div>
            {/* Scale reference - person silhouette */}
            <div className="absolute bottom-2 left-2 flex items-end gap-0.5 opacity-60">
              <User className="h-4 w-4 text-secondary-600" />
              <span className="text-[10px] text-secondary-600">5&apos;10&quot;</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-secondary-900">{size} Yard Dumpster</h3>
          {/* Project-based label for quick decision */}
          {sizeLabel && (
            <p className="text-sm font-medium text-primary-600">{isEs ? 'Mejor para' : 'Best for'} {sizeLabel}</p>
          )}
          <p className="text-xs text-secondary-500">{dimensions}</p>
        </div>

        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-primary-600">${price}</span>
          <p className="text-sm text-secondary-500">{isEs ? `Tarifa fija • ${weight} incluido` : `Flat rate • ${weight} included`}</p>

          {/* All-Inclusive Pricing badge */}
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
            <Check className="h-3 w-3 text-green-600" />
            <span className="text-xs font-medium text-green-700">
              {isEs ? 'Precio Todo Incluido' : 'All-Inclusive Pricing'}
            </span>
          </div>
        </div>

        {/* Visual truck capacity indicator - more prominent */}
        <div className="mb-4 bg-secondary-50 rounded-lg py-2 px-3">
          <div className="flex items-center justify-center gap-2 text-secondary-700">
            <Truck className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-semibold">= {truckLoadCount} {isEs ? 'cargas de camioneta' : 'pickup truck loads'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-secondary-700 uppercase">{isEs ? 'Ideal Para:' : 'Ideal For:'}</p>
          {idealFor.slice(0, 3).map((item, index) => {
            const Icon = getIconForItem(item);
            return (
              <div key={index} className="flex items-center gap-2 text-sm text-secondary-600">
                <Icon className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </Link>

      {/* Book This Size CTA - captures intent at decision moment */}
      {/* Min heights ensure 44px touch targets for mobile accessibility */}
      <div className="mt-4 pt-4 border-t border-secondary-100 space-y-2">
        <BookSizeButton
          size={size}
          label={isEs ? `Reservar ${size} Yards` : `Book ${size} Yard`}
        />
        <Link
          href={`/${size}-yard-dumpster`}
          className="flex items-center justify-center text-center text-secondary-500 text-sm hover:text-primary-600 transition-colors py-2 min-h-[44px]"
        >
          {isEs ? 'Ver Detalles' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}
