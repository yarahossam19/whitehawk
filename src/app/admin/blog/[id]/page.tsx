"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Button } from "@/components/site/ui/Button/Button";
import { Section } from "@/components/site/ui/Section/Section";
import {
  adminCreatePost,
  adminGetPost,
  adminUpdatePost,
  isCurrentUserAdmin,
} from "@/lib/posts.actions";
import type { Post } from "@/lib/posts";
import { EMPTY_DOC, type DocNode, type Locale } from "@/lib/blog/doc";
import { bodyToDoc, readMinutes, splitTitle } from "@/lib/blog/post-text";
import { BlogEditor } from "@/components/blog-editor/BlogEditor";
import { uploadImage } from "@/components/blog-editor/upload";
import { ArticlePage } from "@/components/blog-article/ArticlePage";
import { ArticleCta } from "@/components/blog-article/ArticleCta";
import { articlePath, dirOf } from "@/components/blog-article/i18n";
import { toast } from "sonner";
import { ArrowLeft, Eye, ImageUp, Save } from "lucide-react";
import styles from "./page.module.scss";

const emptyForm = {
  slug: "",
  locale: "en" as Locale,
  title: "",
  title_lead: "",
  eyebrow: "",
  excerpt: "",
  cover_url: "",
  category: "Insights",
  tags: "",
  author_name: "WhiteHawk Team",
  published: false,
};

type Form = typeof emptyForm;

const CATEGORY_OPTIONS = ["Comparisons", "Product", "Threat intel", "Guides", "Insights"] as const;

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export default function EditPostPage() {
  // useSearchParams needs a Suspense boundary above it.
  return (
    <Suspense fallback={null}>
      <EditPost />
    </Suspense>
  );
}

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const search = useSearchParams();
  const isNew = id === "new";
  // "Add Arabic version" opens /admin/blog/new?locale=ar&from=<english post id>.
  const fromId = isNew ? search.get("from") : null;
  const startLocale: Locale = isNew && search.get("locale") === "ar" ? "ar" : "en";
  const router = useRouter();
  const qc = useQueryClient();

  const roleQ = useQuery({ queryKey: ["is-admin"], queryFn: () => isCurrentUserAdmin() });
  const postQ = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => adminGetPost(id),
    enabled: !isNew && !!roleQ.data,
  });
  const fromQ = useQuery({
    queryKey: ["admin-post", fromId],
    queryFn: () => adminGetPost(fromId!),
    enabled: !!fromId && !!roleQ.data,
  });

  const [form, setForm] = useState<Form>({ ...emptyForm, locale: startLocale });
  const [doc, setDoc] = useState<DocNode>(EMPTY_DOC);
  // The editor reads its content once, on mount, so it waits for the post.
  const [editorReady, setEditorReady] = useState(isNew && !fromId);
  const [legacyMarkdown, setLegacyMarkdown] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editing an existing post.
  useEffect(() => {
    if (!postQ.data) return;
    const p = postQ.data as Post;
    setForm({
      slug: p.slug,
      locale: p.locale,
      title: p.title,
      title_lead: p.title_lead ?? "",
      eyebrow: p.eyebrow,
      excerpt: p.excerpt,
      cover_url: p.cover_url ?? "",
      category: p.category,
      tags: p.tags.join(", "),
      author_name: p.author_name,
      published: p.published,
    });
    setDoc(bodyToDoc(p.body, p.body_format));
    setLegacyMarkdown(p.body_format === "markdown");
    setPublishedAt(p.published_at);
    setSlugTouched(true);
    setEditorReady(true);
  }, [postQ.data]);

  // Starting the other-language version of an existing post: same slug and
  // shared metadata, empty text.
  useEffect(() => {
    if (!fromQ.data) return;
    const p = fromQ.data as Post;
    setForm((f) => ({
      ...f,
      slug: p.slug,
      cover_url: p.cover_url ?? "",
      category: p.category,
      tags: p.tags.join(", "),
      author_name: p.author_name,
    }));
    setSlugTouched(true);
    setEditorReady(true);
  }, [fromQ.data]);
  useEffect(() => {
    if (fromQ.isError) setEditorReady(true);
  }, [fromQ.isError]);

  useEffect(() => {
    if (isNew && !slugTouched) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, isNew, slugTouched]);

  const minutes = useMemo(() => readMinutes(doc, form.locale), [doc, form.locale]);
  const titleSplit = useMemo(() => splitTitle(form.title, form.title_lead), [form.title, form.title_lead]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: form.slug,
        locale: form.locale,
        title: form.title,
        title_lead: form.title_lead.trim() ? form.title_lead.trim() : null,
        eyebrow: form.eyebrow,
        excerpt: form.excerpt,
        // ProseMirror keeps node attributes in prototype-less objects, which a
        // server action can't receive as data (they arrive as a function and
        // fail validation). A JSON round trip turns them into plain objects.
        body: JSON.parse(JSON.stringify(doc)) as DocNode,
        cover_url: form.cover_url ? form.cover_url : null,
        category: form.category,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        author_name: form.author_name,
        published: form.published,
      };
      if (isNew) return adminCreatePost(payload);
      return adminUpdatePost({ id, ...payload });
    },
    onSuccess: (row: Post) => {
      if (row.published) {
        toast.success(isNew ? "Article published" : "Saved and published");
      } else {
        // Drafts don't appear on the blog; say so, or it looks like a failed save.
        toast.success("Saved as a draft", {
          description: "Not on the blog yet. Tick “Published” and save to make it live.",
        });
      }
      setLegacyMarkdown(false);
      setPublishedAt(row.published_at);
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["posts", "published"] });
      qc.invalidateQueries({ queryKey: ["admin-post"] });
      if (isNew && row?.id) {
        router.replace(`/admin/blog/${row.id}`);
      }
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Failed to save"),
  });

  if (roleQ.isLoading || (!isNew && postQ.isLoading)) {
    return (
      <SiteLayout>
        <div className={styles.loadingWrap}>Loading…</div>
      </SiteLayout>
    );
  }

  if (roleQ.data === false) {
    return (
      <SiteLayout>
        <div className={styles.deniedWrap}>
          <h1 className={styles.deniedTitle}>Admin access required</h1>
        </div>
      </SiteLayout>
    );
  }

  const set =
    (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (k === "slug") setSlugTouched(true);
      setForm((s) => ({ ...s, [k]: e.target.value }));
    };

  const onCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const image = await uploadImage(file);
      setForm((s) => ({ ...s, cover_url: image.url }));
      toast.success("Cover image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const textDir = dirOf(form.locale);

  return (
    <SiteLayout>
      <Section className={preview ? styles.previewing : undefined}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <Button as="link" to="/admin/blog" variant="ghost" size="sm">
              <ArrowLeft size={14} /> All posts
            </Button>
            <h1 className={styles.title}>
              {isNew
                ? form.locale === "ar"
                  ? "New Arabic version"
                  : "New article"
                : form.locale === "ar"
                  ? "Edit Arabic version"
                  : "Edit article"}
            </h1>
          </div>
          <div className={styles.headerActions}>
            <Button variant="ghost" onClick={() => setPreview((v) => !v)}>
              <Eye size={14} /> {preview ? "Editor" : "Preview"}
            </Button>
            <label className={styles.publishedLabel}>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((s) => ({ ...s, published: e.target.checked }))}
              />
              Published
            </label>
            <Button variant="accent" onClick={() => save.mutate()} disabled={save.isPending || !editorReady}>
              <Save size={14} /> {save.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        <div className={styles.contentGrid} hidden={preview}>
          <div className={styles.editorCard}>
            {legacyMarkdown && (
              <p className={styles.notice}>
                This post was written in the old Markdown editor. It has been opened in the visual editor; saving
                stores it in the new format.
              </p>
            )}
            <Field label="Title">
              <input value={form.title} onChange={set("title")} className={styles.titleInput} dir={textDir} />
              <p className={styles.fieldHelp} dir={textDir}>
                Hero: <strong>{titleSplit.lead || "…"}</strong>
                {titleSplit.rest && <span className={styles.titleRest}> {titleSplit.rest}</span>}
              </p>
            </Field>
            <Field label="Excerpt (1–2 sentence summary)">
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={set("excerpt")}
                className={styles.excerptInput}
                dir={textDir}
              />
            </Field>
            <Field label="Body">
              {editorReady ? (
                <BlogEditor key={id} initialDoc={doc} locale={form.locale} onChange={setDoc} />
              ) : (
                <div className={styles.loadingInline}>Loading…</div>
              )}
              <p className={styles.bodyHelp}>
                Section headings (H2) build the table of contents automatically. Use the toolbar for takeaway boxes,
                tables and images; click inside one to change its options.
              </p>
            </Field>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.metaCard}>
              <div className={styles.metaEyebrow}>Metadata</div>
              <Field label="Language">
                <select
                  value={form.locale}
                  onChange={(e) => setForm((s) => ({ ...s, locale: e.target.value as Locale }))}
                  className={styles.input}
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic (العربية)</option>
                </select>
                <p className={styles.fieldHelp}>
                  The Arabic version of an article uses the same slug as the English one.
                </p>
              </Field>
              <Field label="Slug">
                <input value={form.slug} onChange={set("slug")} className={styles.input} dir="ltr" />
              </Field>
              <Field label="Hero label (small blue text above the title)">
                <input
                  value={form.eyebrow}
                  onChange={set("eyebrow")}
                  placeholder={form.category}
                  maxLength={60}
                  className={styles.input}
                  dir={textDir}
                />
                <p className={styles.fieldHelp}>
                  Type your own text here, e.g. &quot;PDPL guide 2026&quot;. When empty, the hero shows the category (
                  <strong>{form.category}</strong>).
                </p>
              </Field>
              <Field label="Bold part of the title (optional)">
                <input
                  value={form.title_lead}
                  onChange={set("title_lead")}
                  placeholder="Splits after the first colon by default"
                  className={styles.input}
                  dir={textDir}
                />
                <p className={styles.fieldHelp}>
                  Must be the start of the title. The rest of the title shows on a new line in a lighter style.
                </p>
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={set("category")} className={styles.input}>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className={styles.fieldHelp}>
                  Pick <strong>Comparisons</strong> to surface the &quot;WhiteHawk vs&quot; badge and place the post
                  in the featured comparison slot on the blog.
                </p>
              </Field>
              <Field label="Tags (comma separated)">
                <input value={form.tags} onChange={set("tags")} className={styles.input} placeholder="edr, siem, roi" />
              </Field>
              <Field label="Author">
                <input value={form.author_name} onChange={set("author_name")} className={styles.input} />
              </Field>
              <Field label="Read time">
                <p className={styles.readTime}>
                  {minutes} min — calculated from the text
                </p>
              </Field>
              <Field label="Cover / hero image">
                {form.cover_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.cover_url} alt="Cover preview" className={styles.coverPreview} />
                )}
                <div className={styles.coverRow}>
                  <input
                    value={form.cover_url}
                    onChange={set("cover_url")}
                    placeholder="https://…"
                    className={styles.input}
                    dir="ltr"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onCoverFileChange}
                    className={styles.hiddenFileInput}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <ImageUp size={14} /> {uploading ? "Uploading…" : "Upload"}
                  </Button>
                </div>
                <p className={styles.fieldHelp}>
                  Used as the article hero, the card thumbnail on <code>/blog</code>, and the social share image. A
                  white or transparent background blends into the hero panel.
                </p>
              </Field>
            </div>
            {!isNew && form.published && (
              <div className={styles.liveUrlCard}>
                <div className={styles.liveUrlLabel}>Live URL</div>
                <a
                  href={articlePath(form.slug, form.locale)}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.liveUrlLink}
                >
                  {articlePath(form.slug, form.locale)}
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Preview: the same components at the same full page width as the
          public article (not inside the admin's 1200px column), so what's
          shown here is what readers see. */}
      {preview && (
        <>
          <ArticlePage
            post={{
              locale: form.locale,
              title: form.title || "Untitled",
              title_lead: form.title_lead || null,
              excerpt: form.excerpt,
              eyebrow: form.eyebrow,
              category: form.category,
              // A draft has no publish date yet; show today's so the hero looks as it will.
              published_at: publishedAt ?? new Date().toISOString(),
              read_minutes: minutes,
              cover_url: form.cover_url || null,
            }}
            doc={doc}
          />
          <ArticleCta />
        </>
      )}
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}
