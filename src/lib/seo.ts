import type { Metadata } from "next";

export const SITE_URL = "https://whitehawk.io";
export const SITE_NAME = "WhiteHawk";
export const OG_IMAGE = "/og.png";

interface PageMetadataInput {
  /** Route path, leading slash, no trailing slash (root is "/"). Becomes the canonical. */
  path: string;
  title: string;
  description: string;
  /** Social-card overrides; fall back to `title` / `description`. */
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
  /** Absolute or root-relative image URL, e.g. a blog post's cover. */
  image?: string;
}

/**
 * Builds a page's metadata with its canonical URL and a complete social card.
 *
 * Exists because Next merges metadata **shallowly**: a page that declares its
 * own `openGraph` replaces the root layout's entire object rather than adding
 * to it, so every page here that set an og title/description was silently
 * dropping `url`, `siteName`, `locale` and the og:image the root layout
 * defines. Same for `twitter`. Routing all pages through one builder keeps
 * those fields present and keeps the canonical next to the path that owns it.
 *
 * Pages that should stay out of the index (admin, auth, missing posts) set
 * `robots` directly instead of using this.
 */
export function pageMetadata({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  type = "website",
  image = OG_IMAGE,
}: PageMetadataInput): Metadata {
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;
  // Dimensions are only declared for the site's own card, whose size is known.
  // A caller-supplied image (a blog cover, arbitrary admin-entered URL) has
  // unknown dimensions, and asserting 1200×630 for it would make crawlers
  // render it at the wrong aspect ratio.
  const ogImage =
    image === OG_IMAGE
      ? { url: image, width: 1200, height: 630, alt: socialTitle }
      : { url: image, alt: socialTitle };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
