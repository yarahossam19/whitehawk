"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/site/ui/Button/Button";
import { Section } from "@/components/site/ui/Section/Section";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { ArrowUpRight, Search, Clock } from "lucide-react";
import type { PostListItem } from "@/lib/posts";
import type { Locale } from "@/lib/blog/doc";
import { articlePath, dirOf, strings } from "@/components/blog-article/i18n";
import { ArticleHero } from "@/components/blog-article/ArticleHero";
import { articleFontVariables } from "@/components/blog-article/fonts";
import "@/styles/blog-article.scss";
import styles from "./blog-index-client.module.scss";

type PostSummary = PostListItem;

const CATEGORIES = ["All", "Comparisons", "Product", "Threat intel", "Guides"] as const;
const PAGE = 6;

function fmt(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function isComparison(cat: string) {
  return cat.toLowerCase() === "comparisons" || cat.toLowerCase() === "comparison";
}

function CoverArt({ seed, className = "" }: { seed: string; className?: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue1 = 210 + (h % 40);
  const hue2 = 220 + ((h >> 5) % 30);
  const angle = h % 360;
  return (
    <div
      aria-hidden
      className={`${styles.coverArt} ${className}`}
      style={{ background: `linear-gradient(${angle}deg, hsl(${hue1} 65% 22%), hsl(${hue2} 75% 42%))` }}
    >
      <div
        className={styles.coverArtGlow}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 80% 60%, rgba(37,99,235,0.5), transparent 45%)",
        }}
      />
      <div
        className={styles.coverArtGrid}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

function VsBadge() {
  return <span className={styles.vsBadge}>WhiteHawk vs</span>;
}

function CategoryChip({ label }: { label: string }) {
  return <span className={styles.categoryChip}>{label}</span>;
}

/**
 * The blog index. `locale` picks which language version the cards link to;
 * the page itself stays English, and Arabic card text carries lang/dir so it
 * reads right-to-left.
 */
export function BlogIndexClient({ posts, locale = "en" }: { posts: PostSummary[]; locale?: Locale }) {
  const textProps = locale === "en" ? {} : { lang: locale, dir: dirOf(locale) };
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [visible, setVisible] = useState(PAGE);

  // Featured = the newest post (the list is ordered newest first), whatever its category.
  const featured = posts[0] ?? null;

  const filtered = useMemo(() => {
    return posts
      .filter((p) => (featured ? p.id !== featured.id : true))
      .filter((p) => {
        if (cat === "All") return true;
        if (cat === "Comparisons") return isComparison(p.category);
        return p.category.toLowerCase() === cat.toLowerCase();
      })
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [posts, featured, cat, query]);

  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* 1 · HEADER + SEARCH */}
      <section className={styles.header}>
        <div aria-hidden className={styles.headerDots} />
        <div className={styles.headerInner}>
          <div className={styles.eyebrow}>Resources · Blog</div>
          <h1 className={styles.title}>
            Comparisons, deep-dives and threat intel from the <span className={styles.titleAccent}>unified</span> security stack.
          </h1>
          <p className={styles.subtitle}>
            Head-to-head "WhiteHawk vs …" articles, product notes, threat research and playbooks from the team building
            the platform.
          </p>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Search the blog…"
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* 2 · FEATURED (newest) POST — the same hero as the top of the article,
          with or without a cover image. */}
      {featured && (
        <section className={styles.featured}>
          <div className={styles.featuredInner}>
            <Link
              href={articlePath(featured.slug, locale)}
              className={`wg-article ${articleFontVariables} ${styles.featuredHero}`}
              lang={locale}
              dir={dirOf(locale)}
            >
              <ArticleHero
                locale={locale}
                title={featured.title}
                titleLead={featured.title_lead}
                excerpt={featured.excerpt}
                eyebrow={featured.eyebrow || featured.category}
                publishedAt={featured.published_at}
                readMinutes={featured.read_minutes}
                coverUrl={featured.cover_url}
                headingLevel="h2"
                footer={
                  <span className="wg-hero-cta">
                    {strings(locale).readArticle} <ArrowUpRight size={16} />
                  </span>
                }
              />
            </Link>
          </div>
        </section>
      )}

      {/* 3 · CATEGORY FILTER + POST GRID */}
      <Section>
        <div className={styles.filterRow}>
          <div className={styles.categories}>
            {CATEGORIES.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCat(c);
                    setVisible(PAGE);
                  }}
                  className={`${styles.categoryButton} ${active ? styles.categoryButtonActive : ""}`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className={styles.resultCount}>
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </div>
        </div>

        {shown.length === 0 ? (
          <div className={styles.emptyState}>
            No articles match your filters yet.
          </div>
        ) : (
          <div className={styles.grid}>
            {shown.map((p) => (
              <Link key={p.id} href={articlePath(p.slug, locale)} className={styles.card}>
                <div className={styles.cardMedia}>
                  {p.cover_url ? (
                    <Image src={p.cover_url} alt={p.title} fill className={styles.cardImage} />
                  ) : (
                    <CoverArt seed={p.slug} />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardCategoryRow}>
                    {isComparison(p.category) ? <VsBadge /> : <CategoryChip label={p.category} />}
                  </div>
                  <h3 className={styles.cardTitle} {...textProps}>
                    {p.title}
                  </h3>
                  <p className={styles.cardExcerpt} {...textProps}>{p.excerpt}</p>
                  <div className={styles.cardMeta}>
                    <span>{fmt(p.published_at)}</span>
                    <span>·</span>
                    <span className={styles.readTime}><Clock size={11} /> {p.read_minutes} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className={styles.loadMoreWrap}>
            <Button variant="ghost" onClick={() => setVisible((v) => v + PAGE)}>
              Load more
            </Button>
          </div>
        )}
      </Section>

      {/* 4 · CTA */}
      <CTABand
        title="See WhiteHawk running against your stack"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />
    </>
  );
}
