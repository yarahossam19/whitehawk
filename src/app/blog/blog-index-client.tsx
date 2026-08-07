"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/site/ui/Button/Button";
import { Section } from "@/components/site/ui/Section/Section";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { ArrowUpRight, Search, Clock } from "lucide-react";
import type { Post } from "@/lib/posts";
import styles from "./blog-index-client.module.scss";

type PostSummary = Omit<Post, "body" | "created_at" | "updated_at" | "published">;

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

export function BlogIndexClient({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [visible, setVisible] = useState(PAGE);

  // Featured = first comparison post, else first post
  const featured = useMemo(() => {
    return posts.find((p) => isComparison(p.category)) ?? posts[0] ?? null;
  }, [posts]);

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

      {/* 2 · FEATURED COMPARISON POST */}
      {featured && (
        <section className={styles.featured}>
          <div className={styles.featuredInner}>
            <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredMedia}>
                {featured.cover_url ? (
                  <Image src={featured.cover_url} alt={featured.title} fill className={styles.featuredImage} />
                ) : (
                  <CoverArt seed={featured.slug} />
                )}
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.featuredBadges}>
                  {isComparison(featured.category) ? <VsBadge /> : null}
                  <CategoryChip label={featured.category} />
                  <span className={styles.featuredLabel}>Featured</span>
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.featuredAuthor}>{featured.author_name}</span>
                  <span>·</span>
                  <span>{fmt(featured.published_at)}</span>
                  <span>·</span>
                  <span className={styles.readTime}><Clock size={12} /> {featured.read_minutes} min</span>
                </div>
                <div>
                  <span className={styles.featuredCtaText}>
                    Read comparison <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
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
              <Link key={p.id} href={`/blog/${p.slug}`} className={styles.card}>
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
                  <h3 className={styles.cardTitle}>
                    {p.title}
                  </h3>
                  <p className={styles.cardExcerpt}>{p.excerpt}</p>
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

      {/* 4 · NEWSLETTER */}
      <Section bg="wash">
        <div className={styles.newsletterCard}>
          <div className={styles.eyebrow}>Stay in the loop</div>
          <h2 className={styles.newsletterTitle}>
            One well-written email a month
          </h2>
          <p className={styles.newsletterBody}>
            The best of the journal, no fluff. Unsubscribe anytime.
          </p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className={styles.newsletterInput}
            />
            <Button variant="accent" type="submit">Subscribe</Button>
          </form>
        </div>
      </Section>

      {/* 5 · CTA */}
      <CTABand
        title="See WhiteHawk running against your stack"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />
    </>
  );
}
