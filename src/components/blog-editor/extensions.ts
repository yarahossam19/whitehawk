import { Extension, Node, type Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extensions";
import { isSafeHref, isSafeImageSrc, type Locale } from "@/lib/blog/doc";

/**
 * The editor's blocks. Each one maps to a piece of the reference design, and
 * the editor renders them with the same classes (wg-keys, wg-fig, wg-wide…),
 * so what authors see while typing is what readers get.
 *
 * Keep in step with docSchema (src/lib/blog/doc.ts), which validates saves,
 * and renderDoc (src/components/blog-article/renderDoc.tsx), which renders
 * the public page.
 */

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      insertFigure: (attrs: { src: string; alt?: string; width?: number | null; height?: number | null }) => ReturnType;
    };
    keyTakeaways: {
      insertKeyTakeaways: (title: string) => ReturnType;
    };
  }
}

/** Attributes added to built-in nodes: a heading's short TOC label, a table's wide flag. */
const BlogAttributes = Extension.create({
  name: "blogAttributes",
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          tocLabel: {
            default: null,
            parseHTML: (el) => el.getAttribute("data-toc-label"),
            renderHTML: (attrs) => (attrs.tocLabel ? { "data-toc-label": attrs.tocLabel } : {}),
          },
        },
      },
      {
        types: ["table"],
        attributes: {
          wide: {
            default: false,
            parseHTML: (el) => el.classList.contains("wg-wide"),
            renderHTML: (attrs) => (attrs.wide ? { class: "wg-wide" } : {}),
          },
        },
      },
    ];
  },
});

/** aside.wg-keys — a titled box holding one bullet list. */
export const KeyTakeaways = Node.create({
  name: "keyTakeaways",
  group: "block",
  content: "bulletList",
  defining: true,
  isolating: true,

  addAttributes() {
    return { title: { default: "Key takeaways", renderHTML: () => ({}) } };
  },

  parseHTML() {
    return [
      {
        tag: 'aside[data-type="key-takeaways"]',
        contentElement: ".wg-keys-body",
        getAttrs: (el) => ({ title: el.querySelector(".wg-keys-title")?.textContent ?? "" }),
      },
    ];
  },

  renderHTML({ node }) {
    // The title is edited in the side panel, not in the text.
    return [
      "aside",
      { class: "wg-keys", "data-type": "key-takeaways" },
      ["p", { class: "wg-keys-title", contenteditable: "false" }, node.attrs.title],
      ["div", { class: "wg-keys-body" }, 0],
    ];
  },

  addCommands() {
    return {
      insertKeyTakeaways:
        (title) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { title },
            content: [
              {
                type: "bulletList",
                content: [{ type: "listItem", content: [{ type: "paragraph" }] }],
              },
            ],
          }),
    };
  },
});

function numberAttr(value: string | null): number | null {
  const n = value ? Number.parseInt(value, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** figure.wg-fig — an uploaded image with an optional caption typed under it. */
export const Figure = Node.create({
  name: "figure",
  group: "block",
  content: "inline*",
  draggable: true,
  selectable: true,
  isolating: true,

  addAttributes() {
    return {
      src: { default: "" },
      alt: { default: "" },
      width: { default: null },
      height: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: (el) => (el as HTMLElement).querySelector("figcaption") ?? document.createElement("figcaption"),
        getAttrs: (el) => {
          const img = el.querySelector("img");
          const src = img?.getAttribute("src") ?? "";
          // Pasted base64 or http images aren't stored; upload them instead.
          if (!isSafeImageSrc(src)) return false;
          return {
            src,
            alt: img?.getAttribute("alt") ?? "",
            width: numberAttr(img?.getAttribute("width") ?? null),
            height: numberAttr(img?.getAttribute("height") ?? null),
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    const { src, alt, width, height } = node.attrs;
    return [
      "figure",
      { class: "wg-fig" },
      ["img", { src, alt, width, height, draggable: "false", contenteditable: "false" }],
      ["figcaption", {}, 0],
    ];
  },

  addCommands() {
    return {
      insertFigure:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { alt: "", ...attrs } }),
    };
  },
});

const DEFAULT_TAKEAWAYS_TITLE: Record<Locale, string> = { en: "Key takeaways", ar: "أهم النقاط" };

export function defaultTakeawaysTitle(locale: Locale) {
  return DEFAULT_TAKEAWAYS_TITLE[locale];
}

export function blogExtensions(): Extensions {
  return [
    StarterKit.configure({
      heading: { levels: [2, 3] },
      // Not part of the design.
      code: false,
      codeBlock: false,
      horizontalRule: false,
      strike: false,
      underline: false,
      link: {
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        isAllowedUri: (url) => isSafeHref(url),
      },
    }),
    TableKit.configure({ table: { resizable: false } }),
    BlogAttributes,
    KeyTakeaways,
    Figure,
    Placeholder.configure({
      placeholder: ({ node }) =>
        node.type.name === "heading" ? "Heading" : "Write, or paste from a document…",
    }),
  ];
}
