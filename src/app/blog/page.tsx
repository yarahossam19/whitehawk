import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { listPublishedPosts } from "@/lib/posts";
import { BlogIndexClient } from "./blog-index-client";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog — WhiteHawk vs alternatives, product & threat intel",
  description:
    "Comparison articles, product deep-dives, threat intel and guides from the WhiteHawk team.",
});

// Posts are edited via the admin CMS — revalidate periodically instead of
// freezing the list at build time.
export const revalidate = 60;

export default async function BlogIndexPage() {
  // Best-effort fetch, matching src/app/sitemap.ts: if the data source is
  // unreachable (e.g. missing env vars during a Docker image build) render an
  // empty list rather than failing the build. ISR fills it in on the first
  // request after deploy.
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  try {
    posts = await listPublishedPosts();
  } catch (err) {
    console.error("[blog] Failed to load published posts:", err);
  }

  return (
    <SiteLayout>
      <BlogIndexClient posts={posts} />
    </SiteLayout>
  );
}
