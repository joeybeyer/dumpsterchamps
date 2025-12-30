interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  phone?: string;
  email?: string;
  url?: string;
  city?: string;
  state?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function LocalBusinessSchema({
  name = "Dumpster Champs",
  description = "Affordable dumpster rental services for residential and commercial customers.",
  phone = "(888) 860-0710",
  email = "contact@dumpsterchamps.com",
  url = "https://www.dumpsterchamps.com",
  city,
  state,
  latitude,
  longitude,
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: city ? `Dumpster Champs - ${city}${state ? `, ${state}` : ""}` : name,
    description,
    telephone: phone,
    email,
    url,
    "@id": url,
    priceRange: "$495-$795",
    ...(latitude && longitude && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: latitude,
        longitude: longitude,
      },
    }),
    areaServed: city
      ? {
          "@type": "City",
          name: city,
          ...(state && { containedInPlace: { "@type": "State", name: state } }),
        }
      : {
          "@type": "Country",
          name: "United States",
        },
    serviceType: [
      "Dumpster Rental",
      "Roll Off Dumpster Rental",
      "Construction Dumpster Rental",
      "Residential Dumpster Rental",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dumpster Rental Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "10 Yard Dumpster Rental" },
          price: "495",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "15 Yard Dumpster Rental" },
          price: "550",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "20 Yard Dumpster Rental" },
          price: "595",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "30 Yard Dumpster Rental" },
          price: "695",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "40 Yard Dumpster Rental" },
          price: "795",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = "Dumpster Champs",
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: provider,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  priceRange: string;
}

export function ProductSchema({
  name,
  description,
  url,
  priceRange,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: priceRange.match(/\$(\d+)/)?.[1] || "350",
      highPrice: priceRange.match(/\$\d+-\$?(\d+)/)?.[1] || "850",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface AggregateRatingSchemaProps {
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
}

export function AggregateRatingSchema({
  ratingValue = 4.9,
  reviewCount = 500,
  bestRating = 5,
  worstRating = 1,
}: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dumpster Champs",
    "@id": "https://www.dumpsterchamps.com",
    url: "https://www.dumpsterchamps.com",
    telephone: "(888) 860-0710",
    priceRange: "$495-$795",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: bestRating,
      worstRating: worstRating,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ReviewSchemaProps {
  reviews: Array<{
    author: string;
    reviewBody: string;
    ratingValue: number;
    datePublished?: string;
  }>;
}

export function ReviewSchema({ reviews }: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dumpster Champs",
    "@id": "https://www.dumpsterchamps.com",
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: review.datePublished || new Date().toISOString().split("T")[0],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
