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
  gbpEmbed?: string | null;
}

export function NeighborhoodGrid({
  neighborhoods,
  cityName,
  stateName,
  coordinates,
  gbpEmbed,
}: NeighborhoodGridProps) {
  // Extract iframe src from embed code if present
  const extractIframeSrc = (embed: string) => {
    const match = embed.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const mapSrc = gbpEmbed ? extractIframeSrc(gbpEmbed) : null;

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

        {/* Layout: 2 columns with map when GBP embed exists, full width otherwise */}
        <div className={mapSrc ? "grid lg:grid-cols-2 gap-8" : ""}>
          {/* Neighborhoods list */}
          <div className={mapSrc ? "" : "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
            {mapSrc ? (
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
            ) : (
              neighborhoods.map((neighborhood) => (
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
              ))
            )}
          </div>

          {/* Google Business Profile Map */}
          {mapSrc && (
            <div className="bg-secondary-100 rounded-xl overflow-hidden h-[400px] lg:h-auto lg:min-h-[400px]">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Dumpster Rental Champs ${cityName} location`}
              />
            </div>
          )}
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
      </div>
    </section>
  );
}
