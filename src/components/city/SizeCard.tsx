import Link from "next/link";
import Image from "next/image";
import { Check, Truck } from "lucide-react";

interface SizeCardProps {
  size: number;
  price: number;
  weight: string;
  dimensions: string;
  capacity: string;
  idealFor: readonly string[];
  isPopular?: boolean;
}

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
}: SizeCardProps) {
  const truckLoads = getTruckLoads(capacity);

  return (
    <div
      className={`relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border-2 ${
        isPopular ? "border-primary-500 ring-2 ring-primary-100" : "border-transparent"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
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
          </div>
          <h3 className="text-xl font-bold text-secondary-900">{size} Yard Dumpster</h3>
          <p className="text-sm text-secondary-500">{dimensions}</p>
        </div>

        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-primary-600">${price}</span>
          <p className="text-sm text-secondary-500">Flat rate • {weight} included</p>
        </div>

        {/* Visual truck capacity indicator */}
        <div className="mb-4">
          {truckLoads ? (
            <div className="flex items-center justify-center gap-2 text-secondary-600">
              <Truck className="h-5 w-5 text-secondary-500" />
              <span className="text-sm font-medium">x {truckLoads} pickup loads</span>
            </div>
          ) : (
            <p className="text-sm text-secondary-600 text-center">{capacity}</p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-secondary-700 uppercase">Ideal For:</p>
          {idealFor.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-secondary-600">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Link>

      {/* Book This Size CTA - captures intent at decision moment */}
      <div className="mt-4 pt-4 border-t border-secondary-100 space-y-2">
        <a
          href="#quote-form"
          className="block w-full bg-primary-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Book {size} Yard
        </a>
        <Link
          href={`/${size}-yard-dumpster`}
          className="block text-center text-secondary-500 text-sm hover:text-primary-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
