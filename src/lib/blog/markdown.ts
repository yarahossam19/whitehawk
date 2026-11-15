import {
  isSafeHref,
  type BlockNode,
  type DocNode,
  type InlineNode,
  type ListItemNode,
  type Mark,
  type TableCellNode,
} from "./doc";

/**
 * Converts the Markdown subset the old textarea editor accepted into the
 * visual editor's document format. It understands exactly what the previous
 * renderer did — `##`/`###` headings, `-` and `1.` lists, single-line `>`
 * quotes, pipe tables, and inline **bold**, *italic*, `code` and
 * [links](https://…) — so posts written before the editor change render the
 * same content in the new design, and open in the editor without edits.
 *
 * Output is plain data, never HTML, so nothing here needs escaping.
 */

type InlinePattern = { re: RegExp; kind: "link" | "bold" | "code" | "italic" };

// Order breaks ties when two patterns start at the same index.
const PATTERNS: InlinePattern[] = [
  { re: /\[([^\]]+?)\]\((https?:[^)\s]+)\)/, kind: "link" },
  { re: /\*\*(.+?)\*\*/, kind: "bold" },
  { re: /`([^`]+)`/, kind: "code" },
  { re: /\*(.+?)\*/, kind: "italic" },
];

export function parseInlineMarkdown(source: string, marks: Mark[] = []): InlineNode[] {
  const out: InlineNode[] = [];
  let rest = source;

  const pushText = (text: string, withMarks: Mark[]) => {
    if (!text) return;
    out.push(withMarks.length ? { type: "text", text, marks: withMarks } : { type: "text", text });
  };

  while (rest.length) {
    let best: { index: number; match: RegExpExecArray; kind: InlinePattern["kind"] } | null = null;
    for (const { re, kind } of PATTERNS) {
      const match = re.exec(rest);
      if (match && (best === null || match.index < best.index)) {
        best = { index: match.index, match, kind };
      }
    }
    if (!best) {
      pushText(rest, marks);
      break;
    }

    pushText(rest.slice(0, best.index), marks);
    const [whole, inner, href] = best.match;
    if (best.kind === "code") {
      pushText(inner, marks);
    } else if (best.kind === "link") {
      if (isSafeHref(href)) {
        out.push(...parseInlineMarkdown(inner, [...marks, { type: "link", attrs: { href } }]));
      } else {
        pushText(whole, marks);
      }
    } else {
      out.push(...parseInlineMarkdown(inner, [...marks, { type: best.kind }]));
    }
    rest = rest.slice(best.index + whole.length);
  }
  return out;
}

function paragraph(text: string): BlockNode {
  const content = parseInlineMarkdown(text);
  return content.length ? { type: "paragraph", content } : { type: "paragraph" };
}

function listItem(text: string): ListItemNode {
  return { type: "listItem", content: [paragraph(text)] };
}

function cell(type: TableCellNode["type"], text: string): TableCellNode {
  return { type, content: [paragraph(text)] };
}

export function markdownToDoc(md: string): DocNode {
  const lines = md.split(/\r?\n/);
  const out: BlockNode[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];
  let numberedStart = 1;
  let tableRows: string[] = [];

  const flushBullets = () => {
    if (bullets.length) out.push({ type: "bulletList", content: bullets.map(listItem) });
    bullets = [];
  };
  const flushNumbered = () => {
    if (numbered.length) {
      out.push({
        type: "orderedList",
        ...(numberedStart !== 1 ? { attrs: { start: numberedStart } } : {}),
        content: numbered.map(listItem),
      });
    }
    numbered = [];
  };
  const flushTable = () => {
    if (!tableRows.length) return;
    const rows = tableRows
      .map((r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()))
      .filter((r) => !r.every((c) => /^:?-{3,}:?$/.test(c) || c === ""));
    tableRows = [];
    if (!rows.length) return;
    const width = Math.max(...rows.map((r) => r.length));
    const pad = (r: string[]) => [...r, ...Array(width - r.length).fill("")];
    const [head, ...body] = rows;
    out.push({
      type: "table",
      content: [
        { type: "tableRow", content: pad(head).map((c) => cell("tableHeader", c)) },
        ...body.map((r) => ({
          type: "tableRow" as const,
          content: pad(r).map((c) => cell("tableCell", c)),
        })),
      ],
    });
  };
  const flushAll = () => {
    flushBullets();
    flushNumbered();
    flushTable();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (/^\|.*\|\s*$/.test(line)) {
      flushBullets();
      flushNumbered();
      tableRows.push(line);
      continue;
    }
    flushTable();

    let match: RegExpMatchArray | null;
    if ((match = line.match(/^###\s+(.*)$/))) {
      flushAll();
      out.push({ type: "heading", attrs: { level: 3 }, content: parseInlineMarkdown(match[1]) });
    } else if ((match = line.match(/^##\s+(.*)$/))) {
      flushAll();
      out.push({ type: "heading", attrs: { level: 2 }, content: parseInlineMarkdown(match[1]) });
    } else if ((match = line.match(/^>\s+(.*)$/))) {
      flushAll();
      out.push({ type: "blockquote", content: [paragraph(match[1])] });
    } else if ((match = line.match(/^-\s+(.*)$/))) {
      flushNumbered();
      bullets.push(match[1]);
    } else if ((match = line.match(/^(\d+)\.\s+(.*)$/))) {
      flushBullets();
      if (!numbered.length) numberedStart = Number(match[1]) || 1;
      numbered.push(match[2]);
    } else if (line.trim() === "") {
      flushAll();
    } else {
      flushAll();
      out.push(paragraph(line));
    }
  }
  flushAll();

  return { type: "doc", content: out.length ? out : [{ type: "paragraph" }] };
}
