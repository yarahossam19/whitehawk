import type { ReactNode } from "react";
import type { Locale } from "@/lib/blog/doc";
import { splitTitle } from "@/lib/blog/post-text";
import { formatDate, strings } from "./i18n";

type Props = {
  locale: Locale;
  title: string;
  titleLead: string | null;
  excerpt?: string;
  eyebrow: string;
  publishedAt: string | null;
  readMinutes: number;
  coverUrl: string | null;
  coverAlt?: string;
  /** h1 on the article itself; h2 where the page already has an h1 (the blog index). */
  headingLevel?: "h1" | "h2";
  /** Extra line under the meta, e.g. "Read article" on the blog index card. */
  footer?: ReactNode;
};

/**
 * header.wg-post-top from the reference, built from the post's fields. Also
 * used for the featured post on the blog index, so a post looks the same
 * there as at the top of the article, with or without a cover image.
 */
export function ArticleHero({
  locale,
  title,
  titleLead,
  excerpt,
  eyebrow,
  publishedAt,
  readMinutes,
  coverUrl,
  coverAlt = "",
  headingLevel = "h1",
  footer,
}: Props) {
  const { lead, rest } = splitTitle(title, titleLead);
  const t = strings(locale);
  const Heading = headingLevel;

  return (
    <header className="wg-post-top">
      <div className={`wg-post-top-in${coverUrl ? "" : " wg-post-top-in--text"}`}>
        <div className="wg-post-top-text">
          {eyebrow && <p className="wg-eyebrow">{eyebrow}</p>}
          <Heading className="wg-title" id={headingLevel === "h1" ? "top" : undefined}>
            <span className="wg-h1-lead">{lead}</span>
            {rest && (
              <>
                {" "}
                <span className="wg-h1-rest">{rest}</span>
              </>
            )}
          </Heading>
          <div className="wg-rule" />
          {excerpt?.trim() && <p className="wg-lede">{excerpt.trim()}</p>}
          <p className="wg-meta">
            {publishedAt && <time dateTime={publishedAt.slice(0, 10)}>{formatDate(publishedAt, locale)}</time>}
            <span>{t.readTime(readMinutes)}</span>
          </p>
          {footer}
        </div>
        {coverUrl && (
          <div className="wg-post-top-pic">
            {/* Plain <img>, as in the reference: covers are arbitrary URLs of unknown size. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverUrl} alt={coverAlt} fetchPriority="high" decoding="async" />
          </div>
        )}
      </div>
    </header>
  );
}
