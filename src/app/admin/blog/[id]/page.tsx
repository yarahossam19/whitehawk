"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Eye, ImageUp, Save } from "lucide-react";
import styles from "./page.module.scss";

const MAX_COVER_BYTES = 5 * 1024 * 1024;

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  cover_url: "",
  category: "Insights",
  tags: "",
  author_name: "WhiteHawk Team",
  read_minutes: 5,
  published: false,
};

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
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const router = useRouter();
  const qc = useQueryClient();

  const roleQ = useQuery({ queryKey: ["is-admin"], queryFn: () => isCurrentUserAdmin() });
  const postQ = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => adminGetPost(id),
    enabled: !isNew && !!roleQ.data,
  });

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (postQ.data) {
      const p = postQ.data as Post;
      setForm({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        body: p.body,
        cover_url: p.cover_url ?? "",
        category: p.category,
        tags: p.tags.join(", "),
        author_name: p.author_name,
        read_minutes: p.read_minutes,
        published: p.published,
      });
      setSlugTouched(true);
    }
  }, [postQ.data]);

  useEffect(() => {
    if (isNew && !slugTouched) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, isNew, slugTouched]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt,
        body: form.body,
        cover_url: form.cover_url ? form.cover_url : null,
        category: form.category,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        author_name: form.author_name,
        read_minutes: Number(form.read_minutes),
        published: form.published,
      };
      if (isNew) return adminCreatePost(payload);
      return adminUpdatePost({ id, ...payload });
    },
    onSuccess: (row: any) => {
      toast.success(isNew ? "Article created" : "Saved");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["posts", "published"] });
      qc.invalidateQueries({ queryKey: ["admin-post"] });
      if (isNew && row?.id) {
        router.replace(`/admin/blog/${row.id}`);
      }
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to save"),
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

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (k === "slug") setSlugTouched(true);
    setForm((s) => ({ ...s, [k]: e.target.value }));
  };

  const onCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      toast.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("post-covers").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("post-covers").getPublicUrl(path);
      setForm((s) => ({ ...s, cover_url: data.publicUrl }));
      toast.success("Cover image uploaded");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SiteLayout>
      <Section>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <Button as="link" to="/admin/blog" variant="ghost" size="sm">
              <ArrowLeft size={14} /> All posts
            </Button>
            <h1 className={styles.title}>
              {isNew ? "New article" : "Edit article"}
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
            <Button variant="accent" onClick={() => save.mutate()} disabled={save.isPending}>
              <Save size={14} /> {save.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.editorCard}>
            {preview ? (
              <div className={styles.preview}>
                <div className={styles.previewCategory}>
                  {form.category}
                </div>
                <h2 className={styles.previewTitle}>
                  {form.title || "Untitled"}
                </h2>
                <p className={styles.previewExcerpt}>{form.excerpt}</p>
                <pre className={styles.previewBody}>
                  {form.body}
                </pre>
              </div>
            ) : (
              <>
                <Field label="Title">
                  <input
                    value={form.title}
                    onChange={set("title")}
                    className={styles.titleInput}
                  />
                </Field>
                <Field label="Excerpt (1–2 sentence summary)">
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={set("excerpt")}
                    className={styles.excerptInput}
                  />
                </Field>
                <Field label="Body">
                  <textarea
                    rows={20}
                    value={form.body}
                    onChange={set("body")}
                    placeholder={"## Section heading\n\nParagraph text with **bold** and *italic*.\n\n- Bullet one\n- Bullet two\n\n> Pull quote\n\n| Capability | WhiteHawk | Other |\n| --- | --- | --- |\n| Offensive + defensive | ✓ | — |"}
                    className={styles.bodyInput}
                  />
                  <p className={styles.bodyHelp}>
                    Markdown: <code>## H2</code>, <code>### H3</code>, <code>- list</code>,{" "}
                    <code>1. list</code>, <code>&gt; quote</code>, <code>**bold**</code>, <code>*italic*</code>,{" "}
                    <code>[text](https://…)</code>, and pipe tables (great for "WhiteHawk vs …" comparisons).
                    H2 headings auto-populate the table of contents.
                  </p>
                </Field>
              </>
            )}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.metaCard}>
              <div className={styles.metaEyebrow}>Metadata</div>
              <Field label="Slug">
                <input value={form.slug} onChange={set("slug")} className={styles.input} />
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={set("category")} className={styles.input}>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <p className={styles.fieldHelp}>
                  Pick <strong>Comparisons</strong> to surface the "WhiteHawk vs" badge and place the post in the
                  featured comparison slot on the blog.
                </p>
              </Field>
              <Field label="Tags (comma separated)">
                <input value={form.tags} onChange={set("tags")} className={styles.input} placeholder="edr, siem, roi" />
              </Field>
              <Field label="Author">
                <input value={form.author_name} onChange={set("author_name")} className={styles.input} />
              </Field>
              <Field label="Read time (minutes)">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={form.read_minutes}
                  onChange={(e) => setForm((s) => ({ ...s, read_minutes: Number(e.target.value) }))}
                  className={styles.input}
                />
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
                  Paste a URL or upload an image. Used as the article hero, the card thumbnail on{" "}
                  <code>/blog</code>, and the social share image.
                </p>
              </Field>
            </div>
            {!isNew && form.published && (
              <div className={styles.liveUrlCard}>
                <div className={styles.liveUrlLabel}>Live URL</div>
                <a
                  href={`/blog/${form.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.liveUrlLink}
                >
                  /blog/{form.slug}
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>
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
