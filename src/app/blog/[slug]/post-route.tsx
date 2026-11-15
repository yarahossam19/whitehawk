import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug, hasPublishedTranslation } from "@/lib/posts";
import type { Locale } from "@/lib/blog/doc";
import { bodyToDoc } from "@/lib/blog/post-text";
import { pageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { ArticlePage } from "@/components/blog-article/ArticlePage";
import { articlePath } from "@/components/blog-article/i18n";

/**
 * One implementation for /blog/[slug] and /ar/blog/[slug]. The article area
 * is the reference design in the post's own language, followed by the dark
 * CTA band (English, like the rest of the site chrome).
 */

const OTHER: Record<Locale, Locale> = { en: "ar", ar: "en" };

export async function postMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const post = await getPublishedPostBySlug(slug, locale);
  if (!post) {
    return { title: "Article not found — WhiteHawk", robots: { index: false, follow: false } };
  }

  // hreflang only when the other language is actually published, so search
  // engines are never pointed at a 404.
  const translated = await hasPublishedTranslation(slug, OTHER[locale]);
  const languages = translated
    ? {
        en: articlePath(slug, "en"),
        ar: articlePath(slug, "ar"),
        "x-default": articlePath(slug, "en"),
      }
    : undefined;

  return {
    ...pageMetadata({
      path: articlePath(slug, locale),
      title: `${post.title} — WhiteHawk`,
      description: post.excerpt ?? "",
      ogTitle: post.title,
      ogDescription: post.excerpt ?? "",
      type: "article",
      ogLocale: locale === "ar" ? "ar_EG" : "en_US",
      languages,
      // Falls back to the site card when a post has no cover, rather than
      // shipping a social preview with no image at all.
      ...(post.cover_url ? { image: post.cover_url } : {}),
    }),
    ...(post.published_at ? { other: { "article:published_time": post.published_at } } : {}),
  };
}

export async function PostRoute({ slug, locale }: { slug: string; locale: Locale }) {
  const post = await getPublishedPostBySlug(slug, locale);
  if (!post) notFound();

  const doc = bodyToDoc(post.body, post.body_format);

  return (
    <SiteLayout>
      {/* Article: hero, table of contents, body (reference design). Older rows
          can be published without a publish date; the hero always shows one. */}
      <ArticlePage post={{ ...post, published_at: post.published_at ?? post.updated_at }} doc={doc} />

      <CTABand
        title="Bring the whole security program under one roof"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />
    </SiteLayout>
  );
}
