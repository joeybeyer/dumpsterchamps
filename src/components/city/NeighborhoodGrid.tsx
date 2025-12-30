import { MapPin } from "lucide-react";

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
  stateName: string;
  coordinates?: { lat: number; lng: number } | null;
}

export function NeighborhoodGrid({
  neighborhoods,
  cityName,
  stateName,
  coordinates,
}: NeighborhoodGridProps) {
  // Google Maps embed URL
  const mapSrc = coordinates
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""}&q=${encodeURIComponent(cityName + ", " + stateName)}&center=${coordinates.lat},${coordinates.lng}&zoom=11`
    : `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""}&q=${encodeURIComponent(cityName + ", " + stateName)}&zoom=11`;

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Neighborhoods list */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              {neighborhoods.map((neighborhood) => (
                <div
                  key={neighborhood.id || neighborhood.slug}
                  className="bg-secondary-50 rounded-lg p-4 hover:bg-secondary-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-secondary-900">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {neighborhoods.length === 0 && (
              <div className="bg-secondary-50 rounded-lg p-6 text-center">
                <p className="text-secondary-600">
                  We serve all neighborhoods in {cityName}. Contact us for delivery to your area.
                </p>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="bg-secondary-100 rounded-xl overflow-hidden h-[400px] lg:h-auto">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Service area map for ${cityName}`}
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] bg-secondary-100">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-secondary-700 mb-2">
                    Serving {cityName} Area
                  </h3>
                  <p className="text-sm text-secondary-500">
                    We deliver dumpsters throughout {cityName} and surrounding communities.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

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
      </div>
    </section>
  );
}
