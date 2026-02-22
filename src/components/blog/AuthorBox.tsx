import Link from "next/link";
import { MapPin, Phone, Star, Shield, Clock } from "lucide-react";

interface AuthorBoxProps {
  cityName?: string;
  stateName?: string;
  locale?: string;
}

export function AuthorBox({ cityName, stateName, locale }: AuthorBoxProps) {
  const isEs = locale === 'es';
  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  return (
    <div className="bg-secondary-900 text-white rounded-xl p-6 mt-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold">
              Dumpster<span className="text-primary-400">Champs</span>
            </span>
          </Link>
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-secondary-200 mb-4">
            {isEs
              ? 'Dumpster Champs ofrece servicios de alquiler de contenedores asequibles y confiables'
              : 'Dumpster Champs provides affordable, reliable dumpster rental services'}
            {cityName && stateName && (
              <> {isEs ? 'en' : 'in'} <Link href={`/dumpster-rental-${cityName.toLowerCase().replace(/\s+/g, "-")}`} className="text-primary-400 hover:underline">{cityName}, {stateName}</Link></>
            )}
            {!cityName && (isEs ? ' a nivel nacional' : ' nationwide')}
            {isEs
              ? '. Con precios fijos transparentes y entrega el mismo día, hacemos que la eliminación de residuos sea simple para propietarios y contratistas.'
              : '. With transparent flat-rate pricing and same-day delivery, we make waste removal simple for homeowners and contractors alike.'}
          </p>

          {/* Trust Signals */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-secondary-300">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{isEs ? 'Calificación 4.9 (500+ Reseñas)' : '4.9 Rating (500+ Reviews)'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-300">
              <Shield className="h-4 w-4 text-primary-400" />
              <span>{isEs ? 'Con Licencia y Asegurado' : 'Licensed & Insured'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-300">
              <Clock className="h-4 w-4 text-primary-400" />
              <span>{isEs ? 'Entrega el Mismo Día' : 'Same-Day Delivery'}</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-secondary-300">
              <MapPin className="h-4 w-4" />
              <span>{isEs ? 'Sirviendo 500+ Ciudades a Nivel Nacional' : 'Serving 500+ Cities Nationwide'}</span>
            </div>
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-primary-400 hover:text-primary-300"
            >
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 pt-6 border-t border-secondary-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <p className="text-secondary-300 text-sm">
          {isEs ? '¿Listo para comenzar? Obtén una cotización gratis en 60 segundos.' : 'Ready to get started? Get a free quote in 60 seconds.'}
        </p>
        <Link
          href="/contact"
          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm"
        >
          {isEs ? 'Cotización Gratis' : 'Get Free Quote'}
        </Link>
      </div>
    </div>
  );
}
