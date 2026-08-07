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
  const posts = await listPublishedPosts();

  return (
    <SiteLayout>
      <BlogIndexClient posts={posts} />
    </SiteLayout>
  );
}
