import { z } from "zod";

/**
 * The stored shape of an article body written in the visual editor.
 *
 * It is TipTap/ProseMirror JSON, restricted to the nodes and marks the editor
 * offers (see src/components/blog-editor/extensions.ts). The server validates
 * every save against `docSchema`, and the public renderer only knows these
 * node types, so an unexpected node can neither be stored nor rendered.
 */

export type Locale = "en" | "ar";
export const LOCALES: readonly Locale[] = ["en", "ar"] as const;

export type Mark =
  | { type: "bold" }
  | { type: "italic" }
  | { type: "link"; attrs: { href: string; [key: string]: unknown } };

export type TextNode = { type: "text"; text: string; marks?: Mark[] };
export type HardBreakNode = { type: "hardBreak" };
export type InlineNode = TextNode | HardBreakNode;

export type ParagraphNode = { type: "paragraph"; content?: InlineNode[] };
export type HeadingNode = {
  type: "heading";
  attrs: { level: 2 | 3; tocLabel?: string | null };
  content?: InlineNode[];
};
export type ListItemNode = { type: "listItem"; content: BlockNode[] };
export type BulletListNode = { type: "bulletList"; content: ListItemNode[] };
export type OrderedListNode = {
  type: "orderedList";
  attrs?: { start?: number; [key: string]: unknown };
  content: ListItemNode[];
};
export type BlockquoteNode = { type: "blockquote"; content: BlockNode[] };
export type KeyTakeawaysNode = {
  type: "keyTakeaways";
  attrs: { title: string };
  content: BulletListNode[];
};
export type FigureNode = {
  type: "figure";
  attrs: { src: string; alt: string; width?: number | null; height?: number | null };
  content?: InlineNode[];
};
export type TableCellNode = {
  type: "tableCell" | "tableHeader";
  attrs?: { colspan?: number; rowspan?: number; [key: string]: unknown };
  content: BlockNode[];
};
export type TableRowNode = { type: "tableRow"; content: TableCellNode[] };
export type TableNode = { type: "table"; attrs?: { wide?: boolean }; content: TableRowNode[] };

export type BlockNode =
  | ParagraphNode
  | HeadingNode
  | BulletListNode
  | OrderedListNode
  | BlockquoteNode
  | KeyTakeawaysNode
  | FigureNode
  | TableNode;

export type DocNode = { type: "doc"; content: BlockNode[] };

export const EMPTY_DOC: DocNode = { type: "doc", content: [{ type: "paragraph" }] };

// -------- URL rules --------

/** https/http, mailto, a site-relative path (not protocol-relative) or an in-page anchor. */
const SAFE_HREF = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;
/** Images uploaded through the editor, or an absolute https URL. */
const SAFE_IMAGE_SRC = /^(\/api\/uploads\/[0-9a-f-]{36}\.[a-z0-9]{3,4}|https:\/\/\S+)$/i;

export function isSafeHref(href: string): boolean {
  return SAFE_HREF.test(href.trim()) && !/\s/.test(href.trim());
}

export function isSafeImageSrc(src: string): boolean {
  return SAFE_IMAGE_SRC.test(src.trim());
}

// -------- validation --------

const markSchema: z.ZodType<Mark> = z.union([
  z.object({ type: z.literal("bold") }),
  z.object({ type: z.literal("italic") }),
  z.object({
    type: z.literal("link"),
    attrs: z
      .object({ href: z.string().max(2000).refine(isSafeHref, "Unsafe link") })
      .passthrough(),
  }),
]);

const inlineSchema: z.ZodType<InlineNode> = z.union([
  z.object({
    type: z.literal("text"),
    text: z.string().max(20_000),
    marks: z.array(markSchema).max(4).optional(),
  }),
  z.object({ type: z.literal("hardBreak") }),
]);

const inlineContent = z.array(inlineSchema).max(2_000).optional();

const blockSchema: z.ZodType<BlockNode> = z.lazy(() =>
  z.union([
    z.object({ type: z.literal("paragraph"), content: inlineContent }),
    z.object({
      type: z.literal("heading"),
      attrs: z
        .object({
          level: z.union([z.literal(2), z.literal(3)]),
          tocLabel: z.string().trim().max(80).nullable().optional(),
        })
        .passthrough(),
      content: inlineContent,
    }),
    bulletListSchema,
    z.object({
      type: z.literal("orderedList"),
      attrs: z
        .object({ start: z.number().int().min(0).max(10_000).optional() })
        .passthrough()
        .optional(),
      content: z.array(listItemSchema).max(500),
    }),
    z.object({ type: z.literal("blockquote"), content: z.array(blockSchema).max(200) }),
    z.object({
      type: z.literal("keyTakeaways"),
      attrs: z.object({ title: z.string().trim().max(80) }).passthrough(),
      content: z.array(bulletListSchema).min(1).max(1),
    }),
    z.object({
      type: z.literal("figure"),
      attrs: z
        .object({
          src: z.string().max(1000).refine(isSafeImageSrc, "Unsafe image"),
          alt: z.string().max(300),
          width: z.number().int().positive().max(20_000).nullable().optional(),
          height: z.number().int().positive().max(20_000).nullable().optional(),
        })
        .passthrough(),
      content: inlineContent,
    }),
    z.object({
      type: z.literal("table"),
      attrs: z.object({ wide: z.boolean().optional() }).passthrough().optional(),
      content: z.array(tableRowSchema).max(500),
    }),
  ]),
);

const listItemSchema: z.ZodType<ListItemNode> = z.lazy(() =>
  z.object({ type: z.literal("listItem"), content: z.array(blockSchema).max(50) }),
);

const bulletListSchema: z.ZodType<BulletListNode> = z.lazy(() =>
  z.object({ type: z.literal("bulletList"), content: z.array(listItemSchema).max(500) }),
);

const tableCellSchema: z.ZodType<TableCellNode> = z.lazy(() =>
  z.object({
    type: z.union([z.literal("tableCell"), z.literal("tableHeader")]),
    attrs: z
      .object({
        colspan: z.number().int().min(1).max(50).optional(),
        rowspan: z.number().int().min(1).max(500).optional(),
      })
      .passthrough()
      .optional(),
    content: z.array(blockSchema).max(50),
  }),
);

const tableRowSchema: z.ZodType<TableRowNode> = z.lazy(() =>
  z.object({ type: z.literal("tableRow"), content: z.array(tableCellSchema).max(50) }),
);

export const docSchema: z.ZodType<DocNode> = z.object({
  type: z.literal("doc"),
  content: z.array(blockSchema).max(5_000),
});

/** Reads a stored doc body. A malformed row renders as an empty article rather than a 500. */
export function parseStoredDoc(json: string): DocNode {
  try {
    const result = docSchema.safeParse(JSON.parse(json));
    if (result.success) return result.data;
  } catch {
    // fall through
  }
  return EMPTY_DOC;
}

// -------- text helpers --------

export function inlineText(content: InlineNode[] | undefined): string {
  if (!content) return "";
  return content.map((n) => (n.type === "text" ? n.text : " ")).join("");
}

type AnyNode = BlockNode | ListItemNode | TableRowNode | TableCellNode | InlineNode;

function nodeText(node: AnyNode): string {
  if (node.type === "text") return node.text;
  if (node.type === "hardBreak") return " ";
  if (node.type === "keyTakeaways") {
    return `${node.attrs.title} ${node.content.map(nodeText).join(" ")}`;
  }
  const content = (node as { content?: AnyNode[] }).content;
  return content ? content.map(nodeText).join(" ") : "";
}

/** All readable text in the article, used for the read-time estimate. */
export function docPlainText(doc: DocNode): string {
  return doc.content.map(nodeText).join("\n");
}
