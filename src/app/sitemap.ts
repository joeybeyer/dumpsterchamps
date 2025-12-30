import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dumpsterchamps.com";

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
  ];

  // Dumpster size pages
  const sizes = await prisma.dumpsterSize.findMany({
    select: { slug: true, updatedAt: true },
  });

  const sizePages: MetadataRoute.Sitemap = sizes.map((size) => ({
    url: `${baseUrl}/${size.slug}`,
    lastModified: size.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Service pages
  const services = await prisma.service.findMany({
    select: { slug: true, updatedAt: true },
  });

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // State pages
  const states = await prisma.state.findMany({
    select: { slug: true, updatedAt: true },
  });

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/dumpster-rental-${state.slug}`,
    lastModified: state.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // City pages
  const cities = await prisma.city.findMany({
    select: { slug: true, updatedAt: true },
  });

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/dumpster-rental-${city.slug}`,
    lastModified: city.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...staticPages,
    ...sizePages,
    ...servicePages,
    ...statePages,
    ...cityPages,
  ];
}
