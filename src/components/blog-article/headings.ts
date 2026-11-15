import { inlineText, type BlockNode, type DocNode, type HeadingNode } from "@/lib/blog/doc";

export type HeadingEntry = { id: string; level: 2 | 3; text: string; label: string };

/**
 * A URL fragment for a heading. Keeps letters and digits from every script,
 * so Arabic headings get real ids (the old renderer kept only a–z/0–9 and
 * gave every Arabic heading `id=""`). Accents and Arabic diacritics are
 * dropped so the id doesn't depend on how fully a heading was vowelled.
 */
export function slugifyHeading(text: string): string {
  return (
    text
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/[\s-]+/g, "-")
      .slice(0, 80) || "section"
  );
}

// Depth-first, in document order — the same order renderDoc.tsx renders in.
function walk(nodes: Array<{ type: string; content?: unknown }>, visit: (heading: HeadingNode) => void) {
  for (const node of nodes) {
    if (node.type === "heading") visit(node as HeadingNode);
    else if (Array.isArray(node.content) && node.type !== "paragraph" && node.type !== "figure") {
      walk(node.content as BlockNode[], visit);
    }
  }
}

/**
 * Every heading in document order with a unique id. The renderer walks the
 * document in the same order and takes ids from this list, so the table of
 * contents and the headings it links to always agree.
 */
export function headingEntries(doc: DocNode): HeadingEntry[] {
  const seen = new Map<string, number>();
  const entries: HeadingEntry[] = [];
  walk(doc.content, (heading) => {
    const text = inlineText(heading.content).trim();
    const base = slugifyHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    entries.push({
      id: count === 1 ? base : `${base}-${count}`,
      level: heading.attrs.level,
      text,
      label: heading.attrs.tocLabel?.trim() || text,
    });
  });
  return entries;
}
