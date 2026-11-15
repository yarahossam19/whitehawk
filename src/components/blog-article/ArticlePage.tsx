import type { DocNode, Locale } from "@/lib/blog/doc";
import "@/styles/blog-article.scss";
import { ArticleHero } from "./ArticleHero";
import { ArticleTocMobile, ArticleTocSidebar } from "./ArticleToc";
import { articleFontVariables } from "./fonts";
import { headingEntries } from "./headings";
import { dirOf, strings } from "./i18n";
import { renderDoc } from "./renderDoc";
import { SectionOpener } from "./SectionOpener";

export type ArticleData = {
  locale: Locale;
  title: string;
  title_lead: string | null;
  excerpt: string;
  eyebrow: string;
  category: string;
  published_at: string | null;
  read_minutes: number;
  cover_url: string | null;
};

/**
 * The article area of the reference design: hero, sidebar table of contents
 * and body. `lang`/`dir` are set here rather than on <html>, which stays
 * English for the site header and footer around it.
 */
export function ArticlePage({ post, doc }: { post: ArticleData; doc: DocNode }) {
  const headings = headingEntries(doc);
  const toc = headings.filter((h) => h.level === 2).map((h) => ({ id: h.id, label: h.label }));
  const t = strings(post.locale);

  return (
    <div className={`wg-article ${articleFontVariables}`} lang={post.locale} dir={dirOf(post.locale)}>
      <div className="container page">
        <ArticleHero
          locale={post.locale}
          title={post.title}
          titleLead={post.title_lead}
          excerpt={post.excerpt}
          eyebrow={post.eyebrow || post.category}
          publishedAt={post.published_at}
          readMinutes={post.read_minutes}
          coverUrl={post.cover_url}
        />
        <div className="post">
          {/* Kept even when empty, so the text column has the reference's width. */}
          <div className="side">
            <ArticleTocSidebar items={toc} label={t.contents} />
          </div>
          <article className="wg-post">
            <ArticleTocMobile items={toc} label={t.contents} />
            {renderDoc(doc, headings)}
          </article>
          <SectionOpener />
        </div>
      </div>
    </div>
  );
}
