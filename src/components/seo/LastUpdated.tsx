import { Calendar } from "lucide-react";

interface LastUpdatedProps {
  date: Date | string;
  className?: string;
  showIcon?: boolean;
  prefix?: string;
}

/**
 * Visible timestamp component for content freshness signals.
 * AI systems (ChatGPT, etc.) give 1.8x more citations to pages with visible timestamps.
 * Also includes dateModified schema for SEO.
 */
export function LastUpdated({
  date,
  className = "",
  showIcon = true,
  prefix = "Last Updated:",
}: LastUpdatedProps) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Format: "December 31, 2025"
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ISO format for schema
  const isoDate = dateObj.toISOString();

  return (
    <>
      <div className={`flex items-center gap-2 text-sm text-secondary-500 ${className}`}>
        {showIcon && <Calendar className="h-4 w-4" />}
        <time dateTime={isoDate}>
          {prefix} {formattedDate}
        </time>
      </div>
    </>
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished?: Date | string;
  dateModified: Date | string;
  author?: string;
  image?: string;
}

/**
 * Article schema with dateModified for content freshness signals.
 */
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = "Dumpster Champs",
  image,
}: ArticleSchemaProps) {
  const modifiedDate = typeof dateModified === "string" ? new Date(dateModified) : dateModified;
  const publishedDate = datePublished
    ? typeof datePublished === "string"
      ? new Date(datePublished)
      : datePublished
    : modifiedDate;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedDate.toISOString(),
    dateModified: modifiedDate.toISOString(),
    author: {
      "@type": "Organization",
      name: author,
      url: "https://www.dumpsterchamps.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Dumpster Champs",
      url: "https://www.dumpsterchamps.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dumpsterchamps.com/logo.png",
      },
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  dateModified: Date | string;
}

/**
 * WebPage schema with dateModified for service/location pages.
 */
export function WebPageSchema({
  title,
  description,
  url,
  dateModified,
}: WebPageSchemaProps) {
  const modifiedDate = typeof dateModified === "string" ? new Date(dateModified) : dateModified;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    dateModified: modifiedDate.toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Dumpster Champs",
      url: "https://www.dumpsterchamps.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
