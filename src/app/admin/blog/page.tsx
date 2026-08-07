"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminDeletePost, adminListAllPosts, isCurrentUserAdmin } from "@/lib/posts.actions";
import type { Post } from "@/lib/posts";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Button } from "@/components/site/ui/Button/Button";
import { Section } from "@/components/site/ui/Section/Section";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Pencil, Plus, Trash2, Circle, CheckCircle2 } from "lucide-react";
import styles from "./page.module.scss";

export default function AdminBlogPage() {
  const qc = useQueryClient();

  const roleQ = useQuery({ queryKey: ["is-admin"], queryFn: () => isCurrentUserAdmin() });
  const postsQ = useQuery({
    queryKey: ["admin-posts"],
    queryFn: () => adminListAllPosts(),
    enabled: !!roleQ.data,
  });

  const delMut = useMutation({
    mutationFn: (id: string) => adminDeletePost(id),
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["posts", "published"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to delete"),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  if (roleQ.isLoading) {
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
          <div className={styles.deniedEyebrow}>Access denied</div>
          <h1 className={styles.deniedTitle}>Admin access required</h1>
          <p className={styles.deniedText}>
            The first person to register for this project becomes admin automatically. You are signed in
            but not the admin — ask them to grant you the role.
          </p>
          <div className={styles.deniedActions}>
            <Button as="link" to="/" variant="ghost">Home</Button>
            <Button onClick={signOut} variant="accent">
              <LogOut size={14} /> Sign out
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Section>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.eyebrow}>Admin</div>
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.subtitle}>Create, edit and publish articles.</p>
          </div>
          <div className={styles.headerActions}>
            <Button as="link" to="/admin/blog/new" variant="accent">
              <Plus size={14} /> New article
            </Button>
            <Button onClick={signOut} variant="ghost">
              <LogOut size={14} /> Sign out
            </Button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <div className={styles.tableHead}>
            <div>Title</div>
            <div>Status</div>
            <div>Category</div>
            <div>Updated</div>
            <div className={styles.alignRight}>Actions</div>
          </div>

          {postsQ.isLoading && <div className={styles.tableLoading}>Loading posts…</div>}
          {postsQ.data?.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyTitle}>No posts yet</div>
              <p className={styles.emptyText}>Write the first one.</p>
              <Button as="link" to="/admin/blog/new" variant="accent" className={styles.emptyButton}>
                <Plus size={14} /> New article
              </Button>
            </div>
          )}

          {postsQ.data?.map((p: Post) => (
            <div key={p.id} className={styles.row}>
              <div className={styles.titleCell}>
                <div className={styles.postTitle}>{p.title}</div>
                <div className={styles.postSlug}>/{p.slug}</div>
              </div>
              <div>
                {p.published ? (
                  <span className={styles.badgePublished}>
                    <CheckCircle2 size={12} /> Published
                  </span>
                ) : (
                  <span className={styles.badgeDraft}>
                    <Circle size={10} /> Draft
                  </span>
                )}
              </div>
              <div className={styles.cellText}>{p.category}</div>
              <div className={styles.cellText}>
                {new Date(p.updated_at).toLocaleDateString()}
              </div>
              <div className={styles.rowActions}>
                <Link
                  href={`/admin/blog/${p.id}`}
                  className={styles.iconBtn}
                  title="Edit"
                >
                  <Pencil size={13} />
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${p.title}"?`)) delMut.mutate(p.id);
                  }}
                  className={styles.iconBtnDanger}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
