import { docPlainText, parseStoredDoc, type DocNode, type Locale } from "./doc";
import { markdownToDoc } from "./markdown";

/**
 * Helpers shared by the server (saving, the DB migration) and the editor
 * (the read-time shown next to the form). No server-only imports.
 */

export type BodyFormat = "markdown" | "doc";

/** The article body as a document, whichever format it was stored in. */
export function bodyToDoc(body: string, format: BodyFormat): DocNode {
  return format === "doc" ? parseStoredDoc(body) : markdownToDoc(body);
}

// Average silent reading speed for web articles; Arabic words are longer on
// average, so it reads at fewer words per minute.
const WORDS_PER_MINUTE: Record<Locale, number> = { en: 220, ar: 180 };

export function readMinutes(doc: DocNode, locale: Locale): number {
  const words = docPlainText(doc).split(/\s+/).filter(Boolean).length;
  return Math.min(120, Math.max(1, Math.ceil(words / WORDS_PER_MINUTE[locale])));
}

/**
 * Splits a title into the bold lead and the lighter rest of the hero heading.
 * An override is used when the title starts with it; otherwise the split
 * falls after the first colon. No usable split → the whole title is the lead.
 */
export function splitTitle(title: string, override?: string | null): { lead: string; rest: string } {
  const clean = title.trim();
  const lead = override?.trim();
  if (lead && clean.startsWith(lead) && lead.length < clean.length) {
    return { lead, rest: clean.slice(lead.length).trim() };
  }
  const colon = clean.indexOf(":");
  if (colon > 0 && colon < clean.length - 1) {
    return { lead: clean.slice(0, colon + 1), rest: clean.slice(colon + 1).trim() };
  }
  return { lead: clean, rest: "" };
}
