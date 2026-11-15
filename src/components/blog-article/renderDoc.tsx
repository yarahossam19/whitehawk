import { Fragment, type ReactNode } from "react";
import type {
  BlockNode,
  DocNode,
  InlineNode,
  ListItemNode,
  TableCellNode,
  TableNode,
} from "@/lib/blog/doc";
import type { HeadingEntry } from "./headings";

/**
 * Turns an article document into the markup of the reference design
 * (aside.wg-keys, figure.wg-fig, div.table-wrap > table.wg-wide, …).
 *
 * Every node becomes a React element — nothing is injected as HTML — and
 * node types this file doesn't know are skipped, so stored content can't add
 * markup the design doesn't have. No hooks, so it runs on the server for the
 * public page and in the browser for the editor's preview.
 */

type Context = { headings: HeadingEntry[]; headingIndex: number };

const OWN_HOSTS = /^https?:\/\/(www\.)?whitehawk\.io(\/|$)/i;

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href) && !OWN_HOSTS.test(href);
}

function renderInline(nodes: InlineNode[] | undefined): ReactNode[] {
  if (!nodes) return [];
  return nodes.map((node, i) => {
    if (node.type === "hardBreak") return <br key={i} />;
    let el: ReactNode = node.text;
    let href: string | null = null;
    for (const mark of node.marks ?? []) {
      if (mark.type === "bold") el = <strong>{el}</strong>;
      else if (mark.type === "italic") el = <em>{el}</em>;
      else if (mark.type === "link") href = mark.attrs.href;
    }
    if (href) {
      return isExternal(href) ? (
        <a key={i} href={href} target="_blank" rel="noopener">
          {el}
        </a>
      ) : (
        <a key={i} href={href}>
          {el}
        </a>
      );
    }
    return <Fragment key={i}>{el}</Fragment>;
  });
}

/**
 * List items and table cells hold paragraphs in the editor, but the reference
 * writes their text directly (`<li>text</li>`), so a paragraph's own bottom
 * margin doesn't open a gap inside them. Consecutive paragraphs are joined
 * with a line break; anything else (a nested list) renders as a block.
 */
function renderFlow(blocks: BlockNode[], ctx: Context): ReactNode[] {
  const out: ReactNode[] = [];
  let previousWasText = false;
  blocks.forEach((block, i) => {
    if (block.type === "paragraph") {
      if (previousWasText) out.push(<br key={`br-${i}`} />);
      out.push(<Fragment key={i}>{renderInline(block.content)}</Fragment>);
      previousWasText = true;
    } else {
      out.push(renderBlock(block, i, ctx));
      previousWasText = false;
    }
  });
  return out;
}

function renderItems(items: ListItemNode[], ctx: Context): ReactNode[] {
  return items.map((item, i) => <li key={i}>{renderFlow(item.content, ctx)}</li>);
}

function renderCell(cell: TableCellNode, key: number, ctx: Context): ReactNode {
  const span = {
    colSpan: cell.attrs?.colspan && cell.attrs.colspan > 1 ? cell.attrs.colspan : undefined,
    rowSpan: cell.attrs?.rowspan && cell.attrs.rowspan > 1 ? cell.attrs.rowspan : undefined,
  };
  return cell.type === "tableHeader" ? (
    <th key={key} {...span}>
      {renderFlow(cell.content, ctx)}
    </th>
  ) : (
    <td key={key} {...span}>
      {renderFlow(cell.content, ctx)}
    </td>
  );
}

function renderTable(table: TableNode, key: number, ctx: Context): ReactNode {
  const rows = table.content;
  // A first row made only of header cells is the table head, as in the reference.
  const hasHead = rows.length > 0 && rows[0].content.every((c) => c.type === "tableHeader");
  const head = hasHead ? rows[0] : null;
  const body = hasHead ? rows.slice(1) : rows;
  return (
    <div key={key} className="table-wrap">
      <table className={table.attrs?.wide ? "wg-wide" : undefined}>
        {head && (
          <thead>
            <tr>{head.content.map((c, i) => renderCell(c, i, ctx))}</tr>
          </thead>
        )}
        <tbody>
          {body.map((row, r) => (
            <tr key={r}>{row.content.map((c, i) => renderCell(c, i, ctx))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: BlockNode, key: number, ctx: Context): ReactNode {
  switch (block.type) {
    case "paragraph":
      // The editor always keeps an empty paragraph at the end; it isn't content.
      if (!block.content?.length) return null;
      return <p key={key}>{renderInline(block.content)}</p>;

    case "heading": {
      const entry = ctx.headings[ctx.headingIndex++];
      const Tag = block.attrs.level === 2 ? "h2" : "h3";
      return (
        <Tag key={key} id={entry?.id}>
          {renderInline(block.content)}
        </Tag>
      );
    }

    case "bulletList":
      return <ul key={key}>{renderItems(block.content, ctx)}</ul>;

    case "orderedList": {
      const start = block.attrs?.start;
      return (
        <ol key={key} start={start && start !== 1 ? start : undefined}>
          {renderItems(block.content, ctx)}
        </ol>
      );
    }

    case "blockquote":
      return <blockquote key={key}>{block.content.map((b, i) => renderBlock(b, i, ctx))}</blockquote>;

    case "keyTakeaways": {
      const title = block.attrs.title.trim();
      return (
        <aside key={key} className="wg-keys" aria-label={title || undefined}>
          {title && <p className="wg-keys-title">{title}</p>}
          {block.content.map((list, i) => (
            <ul key={i}>{renderItems(list.content, ctx)}</ul>
          ))}
        </aside>
      );
    }

    case "figure": {
      const { src, alt, width, height } = block.attrs;
      const caption = block.content?.length ? renderInline(block.content) : null;
      return (
        <figure key={key} className="wg-fig">
          {/* Plain <img>, as in the reference: uploads have no fixed size or CDN. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={width ?? undefined}
            height={height ?? undefined}
            loading="lazy"
            decoding="async"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }

    case "table":
      return renderTable(block, key, ctx);

    default:
      return null;
  }
}

/**
 * Each H2 and the blocks after it (up to the next H2) form a collapsible
 * section: a closed <details> whose summary is the heading. Content before
 * the first H2 (intro, takeaways) is always visible. Native <details> works
 * without JavaScript and stays in the page for search engines; SectionOpener
 * opens a section when a link or the URL points inside it.
 */
export function renderDoc(doc: DocNode, headings: HeadingEntry[]): ReactNode[] {
  const ctx: Context = { headings, headingIndex: 0 };
  const out: ReactNode[] = [];
  let section: { key: number; heading: ReactNode; body: ReactNode[] } | null = null;

  const closeSection = () => {
    if (!section) return;
    out.push(
      <details key={`sec-${section.key}`} className="wg-sec">
        <summary>{section.heading}</summary>
        <div className="wg-sec-body">{section.body}</div>
      </details>,
    );
    section = null;
  };

  doc.content.forEach((block, i) => {
    if (block.type === "heading" && block.attrs.level === 2) {
      closeSection();
      section = { key: i, heading: renderBlock(block, i, ctx), body: [] };
    } else if (section) {
      section.body.push(renderBlock(block, i, ctx));
    } else {
      out.push(renderBlock(block, i, ctx));
    }
  });
  closeSection();
  return out;
}
