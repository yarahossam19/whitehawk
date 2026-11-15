import type { Locale } from "@/lib/blog/doc";

/** The article area's own fixed text. Everything else on the page stays English. */
const STRINGS = {
  en: {
    contents: "Contents",
    keyTakeaways: "Key takeaways",
    readArticle: "Read article",
    readTime: (minutes: number) => `${formatNumber(minutes, "en")} min read`,
  },
  ar: {
    contents: "المحتويات",
    keyTakeaways: "أهم النقاط",
    readArticle: "اقرأ المقال",
    readTime: (minutes: number) =>
      `${formatNumber(minutes, "ar")} ${minutes >= 3 && minutes <= 10 ? "دقائق" : "دقيقة"} قراءة`,
  },
} as const;

export function strings(locale: Locale) {
  return STRINGS[locale];
}

// ar-EG writes Arabic-Indic digits (١٦) and Arabic month names.
const INTL_LOCALE: Record<Locale, string> = { en: "en-GB", ar: "ar-EG" };

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale]).format(value);
}

/** "11 November 2026" / "١١ نوفمبر ٢٠٢٦". Fixed time zone so server and browser agree. */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function articlePath(slug: string, locale: Locale): string {
  return locale === "ar" ? `/ar/blog/${slug}` : `/blog/${slug}`;
}
