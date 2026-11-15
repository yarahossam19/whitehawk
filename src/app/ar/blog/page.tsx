import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { listPublishedPosts } from "@/lib/posts";
import { BlogIndexClient } from "@/app/blog/blog-index-client";

export const metadata: Metadata = pageMetadata({
  path: "/ar/blog",
  title: "Blog (Arabic) — WhiteHawk",
  description: "Arabic editions of articles from the WhiteHawk team.",
  languages: { en: "/blog", ar: "/ar/blog", "x-default": "/blog" },
});

// Same caching and build-time fallback as the English index (src/app/blog/page.tsx).
export const revalidate = 60;

export default async function ArabicBlogIndexPage() {
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  try {
    posts = await listPublishedPosts("ar");
  } catch (err) {
    console.error("[blog/ar] Failed to load published posts:", err);
  }

  return (
    <SiteLayout>
      <BlogIndexClient posts={posts} locale="ar" />
    </SiteLayout>
  );
}
