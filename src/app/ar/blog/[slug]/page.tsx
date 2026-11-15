import type { Metadata } from "next";
import { PostRoute, postMetadata } from "@/app/blog/[slug]/post-route";

type Params = { slug: string };

// Same caching as the English article (src/app/blog/[slug]/page.tsx).
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata(slug, "ar");
}

export default async function ArabicPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <PostRoute slug={slug} locale="ar" />;
}
