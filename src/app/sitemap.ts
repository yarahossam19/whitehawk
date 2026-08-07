import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/posts";

const SITE_URL = "https://whitehawk.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/platform`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/platform/offensive`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/platform/defensive`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/platform/grc`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/platform/asset-management`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/integrations`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/partners`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/company`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/customers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.6 },
    // NOTE: /admin/* is intentionally excluded (noindex'd, not for search
    // discovery) and /auth is a utility page not meant for search discovery.
  ];

  // Blog posts are sourced from Supabase (see src/lib/posts.ts). Best-effort
  // fetch of published posts to include individual post URLs; if the data
  // source is unreachable (e.g. missing env vars in a preview environment),
  // fall back gracefully to the static routes above instead of failing
  // sitemap generation.
  let blogPostRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await listPublishedPosts();
    blogPostRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Dynamic blog post URLs should be added once the blog data source is
    // confirmed reachable in this environment.
  }

  return [...staticRoutes, ...blogPostRoutes];
}
