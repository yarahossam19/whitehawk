"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import {
  Bold,
  Columns3,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListChecks,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Rows3,
  Table as TableIcon,
  Trash2,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { isSafeHref, type DocNode, type Locale } from "@/lib/blog/doc";
import "@/styles/blog-article.scss";
import { articleFontVariables } from "@/components/blog-article/fonts";
import { dirOf } from "@/components/blog-article/i18n";
import { blogExtensions, defaultTakeawaysTitle } from "./extensions";
import { uploadImage } from "./upload";
import styles from "./BlogEditor.module.scss";

type Props = {
  initialDoc: DocNode;
  locale: Locale;
  onChange: (doc: DocNode) => void;
};

/**
 * The visual article editor. The writing surface uses the public article's
 * stylesheet (.wg-article .wg-post), so headings, lists, tables, takeaway
 * boxes and figures look as they will once published, in the post's language
 * and direction.
 *
 * Mount it once the post has loaded (it reads `initialDoc` only on mount).
 */
export function BlogEditor({ initialDoc, locale, onChange }: Props) {
  const extensions = useMemo(() => blogExtensions(), []);
  const editor = useEditor({
    extensions,
    content: initialDoc,
    // The admin page renders on the server too; the editor only exists in the browser.
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON() as DocNode),
    editorProps: { attributes: { class: styles.surface, spellcheck: "true" } },
  });

  if (!editor) return <div className={styles.loading}>Loading editor…</div>;

  return (
    <div className={styles.root}>
      <Toolbar editor={editor} locale={locale} />
      <BlockSettings editor={editor} />
      <div className={`wg-article ${articleFontVariables} ${styles.canvas}`} lang={locale} dir={dirOf(locale)}>
        <div className="wg-post">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

// ---------------- toolbar ----------------

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active ?? undefined}
      disabled={disabled}
      // Keep the text selection while clicking the toolbar.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`${styles.tool} ${active ? styles.toolActive : ""}`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, locale }: { editor: Editor; locale: Locale }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      paragraph: e.isActive("paragraph"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      link: e.isActive("link"),
      linkHref: (e.getAttributes("link").href as string | undefined) ?? "",
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const chain = () => editor.chain().focus();

  const openLink = () => {
    setLinkValue(state.linkHref);
    setLinkOpen(true);
  };

  const applyLink = () => {
    let href = linkValue.trim();
    if (!href) {
      chain().extendMarkRange("link").unsetLink().run();
      setLinkOpen(false);
      return;
    }
    // "example.com/page" → https://example.com/page
    if (!/^[a-z][a-z0-9+.-]*:|^\/|^#/i.test(href)) href = `https://${href}`;
    if (!isSafeHref(href)) {
      toast.error("Use a web address (https://…), a site path (/contact), an anchor (#section) or mailto:");
      return;
    }
    if (editor.state.selection.empty && !state.link) {
      chain()
        .insertContent({ type: "text", text: linkValue.trim(), marks: [{ type: "link", attrs: { href } }] })
        .run();
    } else {
      chain().extendMarkRange("link").setLink({ href }).run();
    }
    setLinkOpen(false);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const image = await uploadImage(file);
      chain().insertFigure({ src: image.url, width: image.width, height: image.height }).run();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.toolbarWrap}>
      <div className={styles.toolbar} role="toolbar" aria-label="Formatting">
        <div className={styles.group}>
          <ToolButton label="Paragraph" active={state.paragraph} onClick={() => chain().setParagraph().run()}>
            <Pilcrow size={16} />
          </ToolButton>
          <ToolButton
            label="Section heading (H2) — appears in the table of contents"
            active={state.h2}
            onClick={() => chain().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={16} />
          </ToolButton>
          <ToolButton label="Sub-heading (H3)" active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
            <Heading3 size={16} />
          </ToolButton>
        </div>

        <div className={styles.group}>
          <ToolButton label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}>
            <Bold size={16} />
          </ToolButton>
          <ToolButton label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}>
            <Italic size={16} />
          </ToolButton>
          <ToolButton label="Link" active={state.link || linkOpen} onClick={openLink}>
            <Link2 size={16} />
          </ToolButton>
        </div>

        <div className={styles.group}>
          <ToolButton label="Bulleted list" active={state.bullet} onClick={() => chain().toggleBulletList().run()}>
            <List size={16} />
          </ToolButton>
          <ToolButton label="Numbered list" active={state.ordered} onClick={() => chain().toggleOrderedList().run()}>
            <ListOrdered size={16} />
          </ToolButton>
          <ToolButton label="Quote" active={state.quote} onClick={() => chain().toggleBlockquote().run()}>
            <Quote size={16} />
          </ToolButton>
        </div>

        <div className={styles.group}>
          <ToolButton
            label="Key takeaways box"
            onClick={() => chain().insertKeyTakeaways(defaultTakeawaysTitle(locale)).run()}
          >
            <ListChecks size={16} />
            <span className={styles.toolText}>Takeaways</span>
          </ToolButton>
          <ToolButton
            label="Table"
            onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          >
            <TableIcon size={16} />
            <span className={styles.toolText}>Table</span>
          </ToolButton>
          <ToolButton label="Image" disabled={uploading} onClick={() => fileRef.current?.click()}>
            <ImagePlus size={16} />
            <span className={styles.toolText}>{uploading ? "Uploading…" : "Image"}</span>
          </ToolButton>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className={styles.hidden} />
        </div>

        <div className={styles.group}>
          <ToolButton label="Undo" disabled={!state.canUndo} onClick={() => chain().undo().run()}>
            <Undo2 size={16} />
          </ToolButton>
          <ToolButton label="Redo" disabled={!state.canRedo} onClick={() => chain().redo().run()}>
            <Redo2 size={16} />
          </ToolButton>
        </div>
      </div>

      {linkOpen && (
        <form
          className={styles.linkRow}
          onSubmit={(e) => {
            e.preventDefault();
            applyLink();
          }}
        >
          <input
            autoFocus
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://… , /contact or #section (empty removes the link)"
            className={styles.input}
            dir="ltr"
          />
          <button type="submit" className={styles.smallButton}>
            Apply
          </button>
          <button type="button" className={styles.smallButtonGhost} onClick={() => setLinkOpen(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

// ---------------- settings for the block under the cursor ----------------

function BlockSettings({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive("heading", { level: 2 }),
      tocLabel: (e.getAttributes("heading").tocLabel as string | null) ?? "",
      figure: e.isActive("figure"),
      alt: (e.getAttributes("figure").alt as string | undefined) ?? "",
      keys: e.isActive("keyTakeaways"),
      keysTitle: (e.getAttributes("keyTakeaways").title as string | undefined) ?? "",
      table: e.isActive("table"),
      tableWide: e.getAttributes("table").wide === true,
    }),
  });
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replacing, setReplacing] = useState(false);

  const update = (type: string, attrs: Record<string, unknown>) =>
    editor.chain().updateAttributes(type, attrs).run();

  const onReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setReplacing(true);
    try {
      const image = await uploadImage(file);
      update("figure", { src: image.url, width: image.width, height: image.height });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setReplacing(false);
    }
  };

  const panels: ReactNode[] = [];

  if (state.h2) {
    panels.push(
      <label key="h2" className={styles.setting}>
        <span className={styles.settingLabel}>Short label for the table of contents (optional)</span>
        <input
          value={state.tocLabel}
          maxLength={80}
          onChange={(e) => update("heading", { tocLabel: e.target.value || null })}
          placeholder="Uses the heading text when empty"
          className={styles.input}
          dir="auto"
        />
      </label>,
    );
  }

  if (state.figure) {
    panels.push(
      <div key="figure" className={styles.settingRow}>
        <label className={styles.setting}>
          <span className={styles.settingLabel}>Image description for screen readers (alt text)</span>
          <input
            value={state.alt}
            maxLength={300}
            onChange={(e) => update("figure", { alt: e.target.value })}
            placeholder="What the image shows"
            className={styles.input}
            dir="auto"
          />
        </label>
        <span className={styles.settingHint}>Type the caption under the image.</span>
        <button type="button" className={styles.smallButtonGhost} disabled={replacing} onClick={() => replaceRef.current?.click()}>
          {replacing ? "Uploading…" : "Replace image"}
        </button>
        <input ref={replaceRef} type="file" accept="image/*" onChange={onReplace} className={styles.hidden} />
        <button
          type="button"
          className={styles.smallButtonDanger}
          onClick={() => editor.chain().focus().deleteNode("figure").run()}
        >
          <Trash2 size={13} /> Remove image
        </button>
      </div>,
    );
  }

  if (state.keys) {
    panels.push(
      <div key="keys" className={styles.settingRow}>
        <label className={styles.setting}>
          <span className={styles.settingLabel}>Box title</span>
          <input
            value={state.keysTitle}
            maxLength={80}
            onChange={(e) => update("keyTakeaways", { title: e.target.value })}
            className={styles.input}
            dir="auto"
          />
        </label>
        <button
          type="button"
          className={styles.smallButtonDanger}
          onClick={() => editor.chain().focus().deleteNode("keyTakeaways").run()}
        >
          <Trash2 size={13} /> Remove box
        </button>
      </div>,
    );
  }

  if (state.table) {
    const run = (fn: (c: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) =>
      fn(editor.chain().focus()).run();
    panels.push(
      <div key="table" className={styles.settingRow}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={state.tableWide}
            onChange={(e) => update("table", { wide: e.target.checked })}
          />
          Wide table (scrolls sideways on phones instead of squeezing the columns)
        </label>
        <button type="button" className={styles.smallButtonGhost} onClick={() => run((c) => c.addRowAfter())}>
          <Rows3 size={13} /> Add row
        </button>
        <button type="button" className={styles.smallButtonGhost} onClick={() => run((c) => c.addColumnAfter())}>
          <Columns3 size={13} /> Add column
        </button>
        <button type="button" className={styles.smallButtonGhost} onClick={() => run((c) => c.deleteRow())}>
          Delete row
        </button>
        <button type="button" className={styles.smallButtonGhost} onClick={() => run((c) => c.deleteColumn())}>
          Delete column
        </button>
        <button type="button" className={styles.smallButtonDanger} onClick={() => run((c) => c.deleteTable())}>
          <Trash2 size={13} /> Delete table
        </button>
      </div>,
    );
  }

  if (panels.length === 0) {
    return (
      <p className={styles.settingsEmpty}>
        Click inside a section heading, image, takeaways box or table to see its options here.
      </p>
    );
  }
  return <div className={styles.settings}>{panels}</div>;
}
