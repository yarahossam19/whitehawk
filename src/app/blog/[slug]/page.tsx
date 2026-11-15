import type { Metadata } from "next";
import { PostRoute, postMetadata } from "./post-route";

type Params = { slug: string };

// Posts are edited via the admin CMS — revalidate periodically instead of
// freezing the article at build time. Saving a post also refreshes it at once.
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata(slug, "en");
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <PostRoute slug={slug} locale="en" />;
}
