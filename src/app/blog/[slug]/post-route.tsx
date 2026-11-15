import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getPublishedPostBySlug, hasPublishedTranslation, listPublishedPosts } from "@/lib/posts";
import type { Locale } from "@/lib/blog/doc";
import { bodyToDoc } from "@/lib/blog/post-text";
import { pageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Section } from "@/components/site/ui/Section/Section";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { ArticlePage } from "@/components/blog-article/ArticlePage";
import { articlePath, dirOf } from "@/components/blog-article/i18n";
import { ShareButtons } from "./share-buttons";
import { NewsletterForm } from "./newsletter-form";
import styles from "./page.module.scss";

/**
 * One implementation for /blog/[slug] and /ar/blog/[slug]. The article area
 * is the reference design in the post's own language; the sections below it
 * (author, CTA, related posts, newsletter) stay English, like the rest of
 * the site chrome.
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

function CoverGradient({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue1 = 210 + (h % 40);
  const hue2 = 220 + ((h >> 5) % 30);
  const angle = h % 360;
  return (
    <div
      className={styles.coverGradient}
      style={{ background: `linear-gradient(${angle}deg, hsl(${hue1} 65% 22%), hsl(${hue2} 75% 42%))` }}
    />
  );
}

function fmtDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function isComparison(cat: string) {
  return cat.toLowerCase() === "comparisons" || cat.toLowerCase() === "comparison";
}

function AuthorAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38), fontWeight: 700 }}
    >
      {initials}
    </span>
  );
}

export async function PostRoute({ slug, locale }: { slug: string; locale: Locale }) {
  const post = await getPublishedPostBySlug(slug, locale);
  if (!post) notFound();

  const allPosts = await listPublishedPosts(locale);
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const doc = bodyToDoc(post.body, post.body_format);

  return (
    <SiteLayout>
      {/* 1–3 · ARTICLE: hero, table of contents, body (reference design) */}
      {/* Older rows can be published without a publish date; the hero always shows one. */}
      <ArticlePage post={{ ...post, published_at: post.published_at ?? post.updated_at }} doc={doc} />

      {/* 4 · AUTHOR BIO */}
      <Section bg="wash">
        <div className={styles.authorCard}>
          <AuthorAvatar name={post.author_name} size={64} />
          <div className={styles.authorCardInfo}>
            {/* The author's name is in the post's language. */}
            <div className={styles.authorCardName} dir="auto">
              {post.author_name}
            </div>
            <div className={styles.authorCardRole}>WhiteHawk Team</div>
            <p className={styles.authorCardBio}>
              Writing about the unified security stack — offensive, defensive, GRC and everything between.
            </p>
            <div className={styles.authorShare}>
              <ShareButtons title={post.title} />
            </div>
          </div>
        </div>
      </Section>

      {/* 5 · CTA BAND */}
      <CTABand
        title="Bring the whole security program under one roof"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />

      {/* 6 · RELATED POSTS — same language as the article */}
      {related.length > 0 && (
        <Section>
          <div className={styles.relatedHeader}>
            <div className={styles.relatedEyebrow}>Keep reading</div>
            <h2 className={styles.relatedTitle}>More from the journal</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <Link key={p.id} href={articlePath(p.slug, locale)} className={styles.relatedCard}>
                <div className={styles.relatedCardImageWrap}>
                  {p.cover_url ? (
                    <Image src={p.cover_url} alt={p.title} fill className={styles.relatedCardImage} />
                  ) : (
                    <CoverGradient seed={p.slug} />
                  )}
                </div>
                <div className={styles.relatedCardBody}>
                  <div className={styles.relatedCardBadgeRow}>
                    {isComparison(p.category) ? (
                      <span className={styles.vsBadge}>WhiteHawk vs</span>
                    ) : (
                      <span className={styles.relatedCardCategoryBadge}>{p.category}</span>
                    )}
                  </div>
                  <div className={styles.relatedCardTitle} lang={locale} dir={dirOf(locale)}>
                    {p.title}
                  </div>
                  <div className={styles.relatedCardMeta}>
                    {fmtDate(p.published_at)} · {p.read_minutes} min
                  </div>
                  <div className={styles.relatedCardReadMore}>
                    Read <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* 7 · NEWSLETTER */}
      <Section bg="wash">
        <div className={styles.newsletterCard}>
          <div className={styles.newsletterEyebrow}>Get the next post</div>
          <h2 className={styles.newsletterTitle}>Fresh comparisons in your inbox</h2>
          <NewsletterForm />
        </div>
      </Section>
    </SiteLayout>
  );
}
