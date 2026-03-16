import type { MetadataRoute } from "next";
import { PLATFORM_TYPES } from "@/features/platform/config";
import { SOLUTION_TYPES } from "@/features/solutions/config";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://whitehawk.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/company`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/partners`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
  const platformRoutes = PLATFORM_TYPES.map((type) => ({
    url: `${base}/platform/${type}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  const solutionRoutes = SOLUTION_TYPES.map((type) => ({
    url: `${base}/solutions/${type}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  return [...staticRoutes, ...platformRoutes, ...solutionRoutes];
}
