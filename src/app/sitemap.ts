import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dumpsterchamps.com";

// pSEO: Size slugs to generate pages for
const SIZE_SLUGS = [
  '10-yard-dumpster',
  '15-yard-dumpster',
  '20-yard-dumpster',
  '30-yard-dumpster',
  '40-yard-dumpster',
];

// pSEO: Use case slugs to generate pages for
const USE_CASE_SLUGS = [
  'roofing-dumpster',
  'construction-dumpster',
  'renovation-dumpster',
  'cleanout-dumpster',
  'estate-cleanout-dumpster',
  'yard-waste-dumpster',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dumpster-sizes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dumpster-rental-prices`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roll-off-dumpster-rental`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/construction-dumpster-rental`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/residential-dumpster-rental`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/small-dumpster-rental`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // PAA (People Also Ask) Guide Pages
    {
      url: `${baseUrl}/how-much-does-dumpster-rental-cost`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/what-size-dumpster-do-i-need`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/do-i-need-permit-for-dumpster`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Dumpster size pages
  const sizes = await prisma.dumpsterSize.findMany({
    select: { slug: true, createdAt: true },
  });

  const sizePages: MetadataRoute.Sitemap = sizes.map((size) => ({
    url: `${baseUrl}/${size.slug}`,
    lastModified: size.createdAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Service pages
  const services = await prisma.service.findMany({
    select: { slug: true, createdAt: true },
  });

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: service.createdAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // State pages
  const states = await prisma.state.findMany({
    select: { slug: true, createdAt: true },
  });

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/dumpster-rental-${state.slug}`,
    lastModified: state.createdAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // City pages
  const cities = await prisma.city.findMany({
    select: { slug: true, createdAt: true },
  });

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/dumpster-rental-${city.slug}`,
    lastModified: city.createdAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Neighborhood pages
  const neighborhoods = await prisma.neighborhood.findMany({
    select: { slug: true, createdAt: true, city: { select: { slug: true } } },
  });

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${baseUrl}/dumpster-rental-${n.city.slug}/${n.slug}`,
    lastModified: n.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog pillar pages
  const blogPillarPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/dumpster-sizes-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/dumpster-rental-cost-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/what-can-go-in-dumpster`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/how-to-rent-dumpster`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/dumpster-rental-hidden-fees`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/roll-off-vs-front-load-dumpster`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/20-yard-dumpster-capacity`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/cheapest-way-to-rent-dumpster`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/dumpster-permit-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Skip city-specific blog posts from sitemap - focus on quality pages only
  // City blog indexes and individual posts are generated on-demand but not in sitemap

  // pSEO: Generate size and use case pages for each city
  const pseoPages: MetadataRoute.Sitemap = [];
  for (const city of cities) {
    const citySlug = `dumpster-rental-${city.slug}`;

    // Add size pages for this city
    for (const sizeSlug of SIZE_SLUGS) {
      pseoPages.push({
        url: `${baseUrl}/${citySlug}/${sizeSlug}`,
        lastModified: city.createdAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // Add use case pages for this city
    for (const useCaseSlug of USE_CASE_SLUGS) {
      pseoPages.push({
        url: `${baseUrl}/${citySlug}/${useCaseSlug}`,
        lastModified: city.createdAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [
    ...staticPages,
    ...sizePages,
    ...servicePages,
    ...statePages,
    ...cityPages,
    ...neighborhoodPages,
    ...blogPillarPages,
    ...pseoPages,
  ];
}
