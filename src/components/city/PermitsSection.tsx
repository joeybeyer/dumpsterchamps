import { FileText, AlertCircle, CheckCircle, Phone } from "lucide-react";

interface PermitsSectionProps {
  permits?: string | null;
  cityName: string;
  stateName: string;
  county?: string | null;
}

export function PermitsSection({ permits, cityName, stateName, county }: PermitsSectionProps) {
  const defaultPermitInfo = `In most cases, you don't need a permit for a dumpster placed on your private property in ${cityName}. However, if you need to place the dumpster on a public street, sidewalk, or right-of-way, you may need a permit from the ${cityName} ${county ? `or ${county}` : ""} Public Works Department. Our team can help guide you through the permit process if needed.`;

  const permitInfo = permits || defaultPermitInfo;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-secondary-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-secondary-700" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900">
              Dumpster Permits & Local Rules in {cityName}
            </h2>
          </div>

          <div className="bg-secondary-50 rounded-xl p-6 mb-6">
            <p className="text-secondary-600 leading-relaxed">{permitInfo}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* No permit needed */}
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-secondary-900">No Permit Usually Needed</h3>
              </div>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Dumpster on your driveway
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Dumpster on your private property
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Dumpster in your yard (with proper placement)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Commercial property you own/lease
                </li>
              </ul>
            </div>

            {/* Permit may be required */}
            <div className="bg-amber-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <h3 className="font-semibold text-secondary-900">Permit May Be Required</h3>
              </div>
              <ul className="space-y-2 text-sm text-secondary-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">!</span>
                  Dumpster on public street
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">!</span>
                  Blocking sidewalk or right-of-way
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">!</span>
                  HOA communities (check rules)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">!</span>
                  Historic districts (special regulations)
                </li>
              </ul>
            </div>
          </div>

          {/* Help banner */}
          <div className="mt-6 bg-primary-50 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-secondary-900 mb-1">
                  Need Help With Permits in {cityName}?
                </h4>
                <p className="text-sm text-secondary-600">
                  Our team knows {cityName} regulations and can help you determine if a permit
                  is needed. We'll guide you through the process if required.
                </p>
              </div>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/\D/g, "") || "8888600710"}`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>

          {/* Prohibited items */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Prohibited Items in {cityName}
            </h3>
            <div className="bg-red-50 rounded-xl p-6">
              <p className="text-sm text-secondary-600 mb-4">
                The following items cannot be placed in dumpsters due to local and federal
                regulations:
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {[
                  "Hazardous waste",
                  "Paint & chemicals",
                  "Batteries",
                  "Tires",
                  "Appliances w/ refrigerants",
                  "Medical waste",
                  "Asbestos",
                  "Electronics (e-waste)",
                  "Flammable liquids",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-secondary-700">
                    <span className="text-red-500">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
