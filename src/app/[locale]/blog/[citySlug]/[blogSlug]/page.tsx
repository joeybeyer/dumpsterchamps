import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone, ArrowRight, Calendar, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { QuoteForm } from "@/components/forms/QuoteForm";

// Force dynamic rendering to prevent DB access at build time
export const dynamic = "force-dynamic";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";
import { RelatedPillarLinks } from "@/components/blog/RelatedPillarLinks";
import { AuthorBox } from "@/components/blog/AuthorBox";
import {
  BLOG_TEMPLATES,
  getBlogTemplate,
  getNextBlogId,
  processContent,
} from "@/data/blogTemplates";

interface PageProps {
  params: Promise<{ citySlug: string; blogSlug: string }>;
}

// Find template by matching slug pattern
function findTemplateBySlug(blogSlug: string, citySlug: string) {
  for (const template of BLOG_TEMPLATES) {
    const expectedSlug = template.slugTemplate.replace("[CITY_SLUG]", citySlug);
    if (expectedSlug === blogSlug) {
      return template;
    }
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug, blogSlug } = await params;

  // Get city info
  const city = await prisma.city.findFirst({
    where: {
      OR: [
        { slug: citySlug },
        { slug: { endsWith: `-${citySlug}` } },
      ],
    },
    include: { state: true },
  });

  if (!city) return { title: "Blog Post Not Found" };

  // Find matching template
  const template = findTemplateBySlug(blogSlug, citySlug);
  if (!template) return { title: "Blog Post Not Found" };

  const title = processContent(template.metaTitleTemplate, city.name, city.state.name, city.state.abbr);
  const description = processContent(template.metaDescTemplate, city.name, city.state.name, city.state.abbr);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.dumpsterchamps.com/blog/${citySlug}/${blogSlug}`,
    },
  };
}

// generateStaticParams removed - using force-dynamic instead

export default async function CityBlogPost({ params }: PageProps) {
  const { citySlug, blogSlug } = await params;

  // Get city info
  const city = await prisma.city.findFirst({
    where: {
      OR: [
        { slug: citySlug },
        { slug: { endsWith: `-${citySlug}` } },
      ],
    },
    include: { state: true },
  });

  if (!city) return notFound();

  // Find matching template
  const template = findTemplateBySlug(blogSlug, citySlug);
  if (!template) return notFound();

  // Get next blog in Ferris Wheel
  const nextTemplateId = getNextBlogId(template.id);
  const nextTemplate = getBlogTemplate(nextTemplateId);

  // Process content with city data
  const title = processContent(template.titleTemplate, city.name, city.state.name, city.state.abbr);
  const content = processContent(template.contentTemplate, city.name, city.state.name, city.state.abbr);
  const excerpt = processContent(template.excerptTemplate, city.name, city.state.name, city.state.abbr);

  const phone = process.env.NEXT_PUBLIC_PHONE || "(888) 860-0710";

  // Money page URL (city page) - blogs link UP to money page
  const moneyPageUrl = `/dumpster-rental-${city.slug}`;
  const moneyPageAnchor = `dumpster rental in ${city.name}`;

  // Next blog URL for Ferris Wheel linking
  const nextBlogUrl = nextTemplate
    ? `/blog/${citySlug}/${nextTemplate.slugTemplate.replace("[CITY_SLUG]", citySlug)}`
    : null;
  const nextBlogTitle = nextTemplate
    ? processContent(nextTemplate.titleTemplate, city.name, city.state.name, city.state.abbr)
    : null;

  // Convert markdown-ish content to HTML sections
  const contentSections = content.split("\n\n").filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      <article>
        <header className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-secondary-300 text-sm mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={moneyPageUrl} className="hover:text-white">{city.name}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Blog</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 text-secondary-300 text-sm mb-4">
                <span className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full">
                  {template.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  8 min read
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-secondary-200">{excerpt}</p>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 prose prose-lg prose-secondary max-w-none">
                {contentSections.map((section, idx) => {
                  // Handle markdown headers
                  if (section.startsWith("# ")) {
                    return (
                      <h1 key={idx} className="text-3xl font-bold text-secondary-900 mb-4">
                        {section.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (section.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="text-2xl font-bold text-secondary-900 mt-8 mb-4">
                        {section.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (section.startsWith("### ")) {
                    return (
                      <h3 key={idx} className="text-xl font-semibold text-secondary-800 mt-6 mb-3">
                        {section.replace("### ", "")}
                      </h3>
                    );
                  }

                  // Handle tables
                  if (section.includes("|") && section.includes("---")) {
                    const lines = section.split("\n").filter((l) => l.trim());
                    const headers = lines[0]?.split("|").filter(Boolean).map((h) => h.trim());
                    const rows = lines.slice(2).map((row) =>
                      row.split("|").filter(Boolean).map((cell) => cell.trim())
                    );

                    return (
                      <div key={idx} className="overflow-x-auto my-6">
                        <table className="min-w-full border border-secondary-200 rounded-lg">
                          <thead className="bg-secondary-50">
                            <tr>
                              {headers?.map((h, i) => (
                                <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-secondary-900 border-b">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, ri) => (
                              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-secondary-50"}>
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-4 py-3 text-sm text-secondary-700 border-b">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // Handle lists
                  if (section.startsWith("- ") || section.startsWith("* ")) {
                    const items = section.split("\n").filter((l) => l.startsWith("- ") || l.startsWith("* "));
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="text-secondary-700">
                            {item.replace(/^[-*]\s+/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Handle numbered lists
                  if (/^\d+\.\s/.test(section)) {
                    const items = section.split("\n").filter((l) => /^\d+\.\s/.test(l));
                    return (
                      <ol key={idx} className="list-decimal list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="text-secondary-700">
                            {item.replace(/^\d+\.\s+/, "")}
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  // Handle bold text formatting
                  if (section.includes("**")) {
                    const formatted = section.replace(
                      /\*\*([^*]+)\*\*/g,
                      '<strong class="font-semibold text-secondary-900">$1</strong>'
                    );
                    return (
                      <p
                        key={idx}
                        className="text-secondary-700 leading-relaxed my-4"
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  }

                  // Regular paragraph
                  return (
                    <p key={idx} className="text-secondary-700 leading-relaxed my-4">
                      {section}
                    </p>
                  );
                })}

                {/* Ferris Wheel Links - Critical for content clustering */}
                <div className="mt-12 pt-8 border-t border-secondary-200">
                  {/* Link UP to Money Page (City Page) */}
                  <div className="bg-primary-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Ready to Get Started?
                    </h3>
                    <p className="text-secondary-600 mb-4">
                      Get a free quote for{" "}
                      <Link
                        href={moneyPageUrl}
                        className="text-primary-600 font-semibold hover:underline"
                      >
                        {moneyPageAnchor}
                      </Link>
                      . Same-day delivery available!
                    </p>
                    <Link
                      href={moneyPageUrl}
                      className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Get Your Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Link AROUND to Next Blog (Ferris Wheel) */}
                  {nextBlogUrl && nextBlogTitle && (
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <span className="text-sm font-semibold text-secondary-500 uppercase tracking-wide">
                        Continue Reading
                      </span>
                      <Link
                        href={nextBlogUrl}
                        className="block mt-2 text-lg font-semibold text-secondary-900 hover:text-primary-600 transition-colors"
                      >
                        {nextBlogTitle} →
                      </Link>
                    </div>
                  )}

                  {/* Link UP to Pillar Pages (Content Clustering) */}
                  <div className="mt-8">
                    <RelatedPillarLinks
                      currentCategory={template.category}
                      cityName={city.name}
                    />
                  </div>
                </div>

                {/* Author Box - Reusable container per SOP */}
                <AuthorBox cityName={city.name} stateName={city.state.name} />
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quote Form */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-secondary-200">
                    <h3 className="text-xl font-bold text-secondary-900 mb-4">
                      Get a Free Quote
                    </h3>
                    <QuoteForm cityName={city.name} stateName={city.state.name} />
                  </div>

                  {/* Call CTA */}
                  <div className="bg-primary-600 text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Need Help Now?</h3>
                    <p className="text-primary-100 text-sm mb-4">
                      Call for immediate assistance with your {city.name} project.
                    </p>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="flex items-center justify-center gap-2 bg-white text-primary-600 px-4 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      {phone}
                    </a>
                  </div>

                  {/* Pricing Quick Reference */}
                  <div className="bg-secondary-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                      {city.name} Pricing
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">10 Yard</span>
                        <span className="font-semibold">$495</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">15 Yard</span>
                        <span className="font-semibold">$550</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">20 Yard</span>
                        <span className="font-semibold text-primary-600">$595 ★</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">30 Yard</span>
                        <span className="font-semibold">$695</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">40 Yard</span>
                        <span className="font-semibold">$795</span>
                      </div>
                    </div>
                    <Link
                      href={moneyPageUrl}
                      className="block mt-4 text-center text-primary-600 font-semibold text-sm hover:underline"
                    >
                      View All Sizes →
                    </Link>
                  </div>

                  {/* Related Pillar Links - Compact Sidebar Version */}
                  <RelatedPillarLinks
                    currentCategory={template.category}
                    variant="compact"
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.dumpsterchamps.com" },
          { name: city.name, url: `https://www.dumpsterchamps.com/dumpster-rental-${city.slug}` },
          { name: "Blog", url: `https://www.dumpsterchamps.com/blog/${citySlug}/${blogSlug}` },
        ]}
      />
    </>
  );
}
