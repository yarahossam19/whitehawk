import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug, listPublishedPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Button } from "@/components/site/ui/Button/Button";
import { Section } from "@/components/site/ui/Section/Section";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { ShareButtons } from "./share-buttons";
import { TocNav } from "./toc-nav";
import { NewsletterForm } from "./newsletter-form";
import styles from "./page.module.scss";

type Params = { slug: string };

// Posts are edited via the admin CMS — revalidate periodically instead of
// freezing the article at build time.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Article not found — WhiteHawk", robots: { index: false, follow: false } };
  }
  return {
    ...pageMetadata({
      path: `/blog/${post.slug}`,
      title: `${post.title} — WhiteHawk`,
      description: post.excerpt ?? "",
      ogTitle: post.title,
      ogDescription: post.excerpt ?? "",
      type: "article",
      // Falls back to the site card when a post has no cover, rather than
      // shipping a social preview with no image at all.
      ...(post.cover_url ? { image: post.cover_url } : {}),
    }),
    ...(post.published_at
      ? { other: { "article:published_time": post.published_at } }
      : {}),
  };
}

function slugifyHeading(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

type Node = { key: number; el: React.ReactNode; heading?: { id: string; text: string; level: 2 | 3 } };

function renderMarkdown(md: string): Node[] {
  const lines = md.split(/\r?\n/);
  const out: Node[] = [];
  let key = 0;
  let listBuf: string[] = [];
  let olBuf: string[] = [];
  let tableBuf: string[] = [];

  const inline = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, `<code class="${styles.inlineCode}">$1</code>`)
      .replace(/\[(.+?)\]\((https?:[^)]+)\)/g, `<a href="$2" class="${styles.mdLink}" target="_blank" rel="noreferrer">$1</a>`);

  const flushUl = () => {
    if (listBuf.length) {
      out.push({
        key: key++,
        el: (
          <ul key={key} className={styles.mdList}>
            {listBuf.map((li, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: inline(li) }} />
            ))}
          </ul>
        ),
      });
      listBuf = [];
    }
  };
  const flushOl = () => {
    if (olBuf.length) {
      out.push({
        key: key++,
        el: (
          <ol key={key} className={styles.mdOrderedList}>
            {olBuf.map((li, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: inline(li) }} />
            ))}
          </ol>
        ),
      });
      olBuf = [];
    }
  };
  const flushTable = () => {
    if (!tableBuf.length) return;
    // Parse pipe table
    const rows = tableBuf.map((r) =>
      r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()),
    );
    // Drop separator row if present (---)
    const clean = rows.filter((r) => !r.every((c) => /^-{3,}$/.test(c) || c === ""));
    if (clean.length) {
      const [head, ...body] = clean;
      out.push({
        key: key++,
        el: (
          <div key={key} className={styles.mdTableWrap}>
            <table className={styles.mdTable}>
              <thead>
                <tr className={styles.mdTableHeadRow}>
                  {head.map((h, i) => (
                    <th
                      key={i}
                      className={`${styles.mdTableHeadCell} ${
                        i === 0 ? styles.mdTableHeadCellLeft : styles.mdTableHeadCellCenter
                      }`}
                      dangerouslySetInnerHTML={{ __html: inline(h) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((r, ri) => (
                  <tr key={ri} className={styles.mdTableRow}>
                    {r.map((c, ci) => (
                      <td
                        key={ci}
                        className={`${styles.mdTableCell} ${ci === 0 ? styles.mdTableCellLeft : styles.mdTableCellCenter}`}
                        dangerouslySetInnerHTML={{ __html: inline(c) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      });
    }
    tableBuf = [];
  };
  const flushAll = () => {
    flushUl();
    flushOl();
    flushTable();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\|.*\|\s*$/.test(line)) {
      flushUl();
      flushOl();
      tableBuf.push(line);
      continue;
    }
    flushTable();

    if (/^###\s+/.test(line)) {
      flushAll();
      const text = line.replace(/^###\s+/, "");
      const id = slugifyHeading(text);
      out.push({
        key: key++,
        heading: { id, text, level: 3 },
        el: (
          <h3 id={id} key={key} className={styles.mdH3}>
            {text}
          </h3>
        ),
      });
    } else if (/^##\s+/.test(line)) {
      flushAll();
      const text = line.replace(/^##\s+/, "");
      const id = slugifyHeading(text);
      out.push({
        key: key++,
        heading: { id, text, level: 2 },
        el: (
          <h2 id={id} key={key} className={styles.mdH2}>
            {text}
          </h2>
        ),
      });
    } else if (/^>\s+/.test(line)) {
      flushAll();
      out.push({
        key: key++,
        el: (
          <blockquote
            key={key}
            className={styles.mdBlockquote}
            dangerouslySetInnerHTML={{ __html: inline(line.replace(/^>\s+/, "")) }}
          />
        ),
      });
    } else if (/^-\s+/.test(line)) {
      flushOl();
      listBuf.push(line.replace(/^-\s+/, ""));
    } else if (/^\d+\.\s+/.test(line)) {
      flushUl();
      olBuf.push(line.replace(/^\d+\.\s+/, ""));
    } else if (line.trim() === "") {
      flushAll();
    } else {
      flushAll();
      out.push({
        key: key++,
        el: (
          <p
            key={key}
            className={styles.mdParagraph}
            dangerouslySetInnerHTML={{ __html: inline(line) }}
          />
        ),
      });
    }
  }
  flushAll();
  return out;
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

function VsBadge() {
  return (
    <span className={styles.vsBadge}>
      WhiteHawk vs
    </span>
  );
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

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await listPublishedPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const comparison = isComparison(post.category);

  const rendered = renderMarkdown(post.body);
  const toc = rendered.filter((n) => n.heading?.level === 2).map((n) => n.heading!);

  return (
    <SiteLayout>
      {/* 1 · ARTICLE HEADER */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.breadcrumb}>
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>{post.category}</span>
          </div>
          <div className={styles.metaBadges}>
            {comparison && <VsBadge />}
            <span className={styles.categoryBadge}>
              {post.category}
            </span>
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className={styles.tagBadge}>
                #{t}
              </span>
            ))}
          </div>
          <h1 className={styles.title}>
            {post.title}
          </h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.byline}>
            <AuthorAvatar name={post.author_name} size={44} />
            <div className={styles.bylineInfo}>
              <div className={styles.bylineName}>{post.author_name}</div>
              <div className={styles.bylineMeta}>
                <span className={styles.bylineMetaItem}><Calendar size={12} /> {fmtDate(post.published_at)}</span>
                <span>·</span>
                <span className={styles.bylineMetaItem}><Clock size={12} /> {post.read_minutes} min read</span>
              </div>
            </div>
            <div className={styles.bylineShare}>
              <ShareButtons title={post.title} />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · HERO IMAGE */}
      <section className={styles.coverSection}>
        <div className={styles.coverInner}>
          <div className={styles.coverFrame} style={{ aspectRatio: "16 / 8" }}>
            {post.cover_url ? (
              <Image src={post.cover_url} alt={post.title} fill className={styles.coverImage} />
            ) : (
              <CoverGradient seed={post.slug} />
            )}
          </div>
        </div>
      </section>

      {/* 3 · BODY + TOC */}
      <Section>
        <div className={styles.layoutGrid}>
          <article className={styles.articleBody}>
            {rendered.map((n) => (
              <div key={n.key}>{n.el}</div>
            ))}
          </article>

          <aside className={styles.tocSidebar}>
            <div className={styles.tocSidebarSticky}>
              <TocNav toc={toc} />
              <div className={styles.demoCard}>
                <div className={styles.demoCardTitle}>See WhiteHawk live</div>
                <p className={styles.demoCardText}>
                  Watch the unified platform run against your own stack.
                </p>
                <Button as="link" to="/contact" variant="accent" size="sm" className={styles.demoCardButton}>
                  Book a Demo
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* 4 · AUTHOR BIO */}
      <Section bg="wash">
        <div className={styles.authorCard}>
          <AuthorAvatar name={post.author_name} size={64} />
          <div className={styles.authorCardInfo}>
            <div className={styles.authorCardName}>{post.author_name}</div>
            <div className={styles.authorCardRole}>WhiteHawk Team</div>
            <p className={styles.authorCardBio}>
              Writing about the unified security stack — offensive, defensive, GRC and everything between.
            </p>
          </div>
        </div>
      </Section>

      {/* 5 · CTA BAND */}
      <CTABand
        title="Bring the whole security program under one roof"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />

      {/* 6 · RELATED POSTS */}
      {related.length > 0 && (
        <Section>
          <div className={styles.relatedHeader}>
            <div className={styles.relatedEyebrow}>Keep reading</div>
            <h2 className={styles.relatedTitle}>More from the journal</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className={styles.relatedCard}
              >
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
                      <VsBadge />
                    ) : (
                      <span className={styles.relatedCardCategoryBadge}>
                        {p.category}
                      </span>
                    )}
                  </div>
                  <div className={styles.relatedCardTitle}>{p.title}</div>
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
          <h2 className={styles.newsletterTitle}>
            Fresh comparisons in your inbox
          </h2>
          <NewsletterForm />
        </div>
      </Section>
    </SiteLayout>
  );
}
