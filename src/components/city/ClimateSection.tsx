import { Sun, Cloud, Snowflake, Droplets, Calendar } from "lucide-react";

interface ClimateSectionProps {
  climate?: string | null;
  cityName: string;
  stateName: string;
}

// Default climate info by region
const getDefaultClimateInfo = (stateName: string): string => {
  const state = stateName.toLowerCase();

  // Southwest / Desert states
  if (["arizona", "nevada", "new mexico"].includes(state)) {
    return "Hot desert climate with intense summer heat. Best to schedule dumpster delivery early morning or evening during summer months (June-September). Fall and spring are ideal for outdoor projects. Monsoon season (July-August) may require covered storage for certain materials.";
  }

  // California
  if (state === "california") {
    return "Mediterranean climate with dry summers and mild winters. Year-round project conditions in most areas. Fire season awareness important in fall months. Some mountain areas may have winter weather restrictions.";
  }

  // Texas
  if (state === "texas") {
    return "Hot summers with mild winters in most regions. Spring (March-May) and fall (September-November) are optimal for outdoor projects. Summer heat advisories may affect work schedules. Hurricane season (June-November) can impact coastal areas.";
  }

  // Florida
  if (state === "florida") {
    return "Subtropical climate with hot, humid summers. Hurricane season (June-November) requires project planning flexibility. Rainy season afternoons (May-October) may affect loading schedules. Winter months offer ideal working conditions.";
  }

  // Northeast
  if (
    ["new york", "new jersey", "connecticut", "massachusetts", "pennsylvania", "rhode island", "maine", "new hampshire", "vermont"].includes(state)
  ) {
    return "Four distinct seasons with cold winters. Snow and ice may affect winter deliveries (December-February). Spring thaw (March-April) is popular for cleanout projects. Summer and fall offer best conditions for major renovations.";
  }

  // Midwest
  if (
    ["ohio", "michigan", "indiana", "illinois", "wisconsin", "minnesota", "iowa", "missouri"].includes(state)
  ) {
    return "Continental climate with cold winters and warm summers. Ground freeze affects December-February deliveries in some areas. Spring and fall are peak seasons for home projects. Tornado season (March-June) requires weather monitoring.";
  }

  // Southeast
  if (
    ["georgia", "alabama", "south carolina", "north carolina", "tennessee", "kentucky", "virginia", "mississippi", "louisiana", "arkansas"].includes(state)
  ) {
    return "Humid subtropical climate with mild winters. Year-round project conditions except during extreme summer heat. Hurricane preparedness important in coastal areas. Spring and fall offer most comfortable working conditions.";
  }

  // Pacific Northwest
  if (["washington", "oregon"].includes(state)) {
    return "Marine climate with wet winters and dry summers. Rain is common October-May, so plan accordingly. Summer months (June-September) offer ideal dry conditions. Covered storage recommended for moisture-sensitive materials.";
  }

  // Mountain West
  if (["colorado", "utah", "montana", "idaho", "wyoming"].includes(state)) {
    return "High altitude climate with significant seasonal variation. Winter snow can affect mountain area deliveries. Spring runoff season (April-May) may impact some locations. Summer offers excellent working conditions at all elevations.";
  }

  // Default
  return "Seasonal conditions may affect project scheduling. Contact us to discuss the best timing for your specific project and location. We offer flexible scheduling to work around weather conditions.";
};

export function ClimateSection({ climate, cityName, stateName }: ClimateSectionProps) {
  const climateInfo = climate || getDefaultClimateInfo(stateName);

  // Determine which icon to show based on state
  const getSeasonalIcon = () => {
    const state = stateName.toLowerCase();
    if (["arizona", "nevada", "texas", "florida", "california"].includes(state)) {
      return <Sun className="h-6 w-6 text-yellow-500" />;
    }
    if (
      ["washington", "oregon"].includes(state)
    ) {
      return <Cloud className="h-6 w-6 text-secondary-500" />;
    }
    if (
      ["minnesota", "michigan", "wisconsin", "maine", "vermont", "new hampshire"].includes(state)
    ) {
      return <Snowflake className="h-6 w-6 text-blue-500" />;
    }
    return <Droplets className="h-6 w-6 text-blue-400" />;
  };

  return (
    <section className="py-12 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              {getSeasonalIcon()}
            </div>
            <h2 className="text-2xl font-bold text-secondary-900">
              Best Time to Rent a Dumpster in {cityName}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-secondary-600 leading-relaxed mb-6">{climateInfo}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-secondary-900">Peak Season</h4>
                  <p className="text-sm text-secondary-600">
                    Spring and fall offer ideal conditions for most projects in {cityName}.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Sun className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-secondary-900">Year-Round Service</h4>
                  <p className="text-sm text-secondary-600">
                    We deliver dumpsters in {cityName} 365 days a year, weather permitting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
