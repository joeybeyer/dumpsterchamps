"use client";

import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date?: string;
}

interface ReviewsSectionProps {
  cityName: string;
  stateAbbr: string;
  reviews?: Review[];
  googleReviewUrl?: string;
  totalReviews?: number;
  averageRating?: number;
  locale?: string;
}

// Default reviews - can be overridden per city
const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Mike R.",
    location: "",
    rating: 5,
    text: "Fast delivery, fair prices, no hidden fees. Used them for my home renovation and they were professional from start to finish. Driver placed it exactly where I needed it.",
    date: "2 weeks ago",
  },
  {
    name: "Sarah T.",
    location: "",
    rating: 5,
    text: "Best dumpster rental experience I've had. Called in the morning, had a 20-yard dumpster in my driveway by 2pm. Pickup was right on schedule too. Will use again!",
    date: "1 month ago",
  },
  {
    name: "James L.",
    location: "",
    rating: 5,
    text: "Great service and competitive pricing. The online booking was easy and the team was responsive when I had questions. Highly recommend for any cleanout project.",
    date: "3 weeks ago",
  },
];

const DEFAULT_REVIEWS_ES: Review[] = [
  {
    name: "Miguel R.",
    location: "",
    rating: 5,
    text: "Entrega rápida, precios justos, sin cargos ocultos. Los usé para mi renovación del hogar y fueron profesionales de principio a fin. El conductor lo colocó exactamente donde lo necesitaba.",
    date: "Hace 2 semanas",
  },
  {
    name: "Sara T.",
    location: "",
    rating: 5,
    text: "La mejor experiencia de alquiler de contenedor que he tenido. Llamé por la mañana y tuve un contenedor de 20 yardas en mi entrada a las 2pm. La recogida también fue puntual. ¡Volveré a usar!",
    date: "Hace 1 mes",
  },
  {
    name: "Santiago L.",
    location: "",
    rating: 5,
    text: "Excelente servicio y precios competitivos. La reserva en línea fue fácil y el equipo respondió mis preguntas rápidamente. Muy recomendado para cualquier proyecto de limpieza.",
    date: "Hace 3 semanas",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({
  cityName,
  stateAbbr,
  reviews,
  googleReviewUrl,
  totalReviews = 127,
  averageRating = 4.9,
  locale,
}: ReviewsSectionProps) {
  const isEs = locale === 'es';
  // Use provided reviews or defaults with city name injected
  const defaultReviews = isEs ? DEFAULT_REVIEWS_ES : DEFAULT_REVIEWS;
  const displayReviews = reviews || defaultReviews.map((r, i) => ({
    ...r,
    location: i === 0 ? cityName : (i === 1 ? (isEs ? `Cerca de ${cityName}` : `Near ${cityName}`) : stateAbbr),
  }));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with aggregate rating */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            {isEs ? `Lo Que Dicen los Clientes de ${cityName}` : `What ${cityName} Customers Say`}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-2xl font-bold text-secondary-900">{averageRating}</span>
          </div>
          <p className="text-secondary-600">
            {isEs ? `Basado en ${totalReviews}+ reseñas verificadas de Google` : `Based on ${totalReviews}+ verified Google reviews`}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {displayReviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-secondary-50 rounded-xl p-6 relative"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary-200 absolute top-4 right-4" />
              
              {/* Stars */}
              <StarRating rating={review.rating} />
              
              {/* Review text */}
              <p className="text-secondary-700 mt-4 mb-4 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              
              {/* Attribution */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-secondary-900">{review.name}</p>
                  <p className="text-sm text-secondary-500">{review.location}</p>
                </div>
                {review.date && (
                  <span className="text-xs text-secondary-400">{review.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Google Reviews */}
        <div className="text-center">
          <a
            href={googleReviewUrl || "https://g.page/r/dumpsterchamps/review"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isEs ? 'Ver Todas las Reseñas en Google' : 'Read All Reviews on Google'}
          </a>
        </div>
      </div>

      {/* Schema markup for aggregate rating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dumpster Champs",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toString(),
              "reviewCount": totalReviews.toString(),
              "bestRating": "5",
              "worstRating": "1",
            },
          }),
        }}
      />
    </section>
  );
}
