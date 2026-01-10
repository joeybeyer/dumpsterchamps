import Link from "next/link";
import { MapPin, Calculator, ChevronRight } from "lucide-react";

interface Neighborhood {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  zipCodes?: string | null;
}

interface NeighborhoodGridProps {
  neighborhoods: Neighborhood[];
  cityName: string;
  citySlug: string;
  stateName: string;
  coordinates?: { lat: number; lng: number } | null;
  gbpEmbed?: string | null;
}

export function NeighborhoodGrid({
  neighborhoods,
  cityName,
  citySlug,
  stateName,
  coordinates,
  gbpEmbed,
}: NeighborhoodGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
          Neighborhoods We Serve in {cityName}
        </h2>
        <p className="text-secondary-600 text-center mb-8 max-w-2xl mx-auto">
          We provide dumpster rental services throughout {cityName} and surrounding areas.
          Same-day delivery available in most neighborhoods.
        </p>

        {/* Layout: Always 2 columns on large screens */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Neighborhoods list - takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.id || neighborhood.slug}
                  href={`/dumpster-rental-${citySlug}/${neighborhood.slug}`}
                  className="bg-secondary-50 rounded-lg p-4 hover:bg-secondary-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                        {neighborhood.name}
                      </h3>
                      {neighborhood.description && (
                        <p className="text-sm text-secondary-600 mt-1">
                          {neighborhood.description}
                        </p>
                      )}
                      {neighborhood.zipCodes && (
                        <p className="text-xs text-secondary-500 mt-1">
                          ZIP: {neighborhood.zipCodes}
                        </p>
                      )}
                      <span className="text-xs text-primary-600 mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View details <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Calculator CTA - takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">What Size Dumpster Do I Need?</h3>
              </div>
              <p className="text-primary-100 mb-6">
                Not sure which dumpster size is right for your {cityName} project? 
                Use our free calculator to get a personalized recommendation in 30 seconds.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <span className="bg-white/20 rounded-full p-1">✓</span>
                  Avoid overpaying for too much space
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-white/20 rounded-full p-1">✓</span>
                  Prevent weight overage fees
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-white/20 rounded-full p-1">✓</span>
                  Get accurate price estimates
                </li>
              </ul>
              <Link
                href="/calculator"
                className="block w-full bg-white text-primary-600 text-center py-3 px-6 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Try the Calculator →
              </Link>
            </div>
          </div>
        </div>

        {neighborhoods.length === 0 && (
          <div className="bg-secondary-50 rounded-lg p-6 text-center">
            <p className="text-secondary-600">
              We serve all neighborhoods in {cityName}. Contact us for delivery to your area.
            </p>
          </div>
        )}

        {/* Service area note */}
        <div className="mt-8 bg-primary-50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-1">
                Local Service, Fast Delivery
              </h3>
              <p className="text-secondary-600">
                Our local team knows {cityName} inside and out. We understand the best routes,
                local regulations, and can often provide same-day delivery to any neighborhood
                in the {cityName} metro area.
              </p>
            </div>
          </div>
        </div>

        {/* Google Business Profile Embed */}
        {gbpEmbed && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-secondary-900 mb-4 text-center">
              Find Us on Google
            </h3>
            <div
              className="w-full rounded-xl overflow-hidden shadow-lg [&>iframe]:w-full [&>iframe]:h-[400px] [&>iframe]:border-0"
              dangerouslySetInnerHTML={{ __html: gbpEmbed }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
