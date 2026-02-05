import type { MetadataRoute } from "next";
import { getAllCaseStudies, getAllPrints } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sharonzhang.dev";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prints`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/travel`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/basketball`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/discuss`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/coffee`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic case study pages
  const caseStudies = await getAllCaseStudies();
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: new Date(cs.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic print pages
  const prints = await getAllPrints();
  const printPages: MetadataRoute.Sitemap = prints.map((print) => ({
    url: `${baseUrl}/prints/${print.slug}`,
    lastModified: new Date(print.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Forum topic pages
  const forumPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/discuss/ai-healthcare`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/discuss/3d-printing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/discuss/sports`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...caseStudyPages, ...printPages, ...forumPages];
}
