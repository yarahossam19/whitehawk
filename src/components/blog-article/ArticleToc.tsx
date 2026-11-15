"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * The reference's two tables of contents: the sticky sidebar list (desktop,
 * 1024px and up) and the collapsible <details> above the article (below
 * 1024px). Both are built from the article's H2s.
 *
 * The active sidebar link (`a.on`) follows the reader: the observer watches
 * every H2 and marks the one nearest the top of the viewport, below the
 * sticky site header. The reference hard-codes the first link as active;
 * that is the starting state here too.
 */
export function ArticleTocSidebar({ items, label }: { items: TocItem[]; label: string }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0 || !("IntersectionObserver" in window)) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // The band from just below the 64px sticky header to 30% down the screen.
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="toc" aria-label={label}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeId === item.id ? "on" : undefined}
          aria-current={activeId === item.id ? "location" : undefined}
          onClick={() => setActiveId(item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function ArticleTocMobile({ items, label }: { items: TocItem[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <details className="wg-toc">
      <summary>{label}</summary>
      <nav aria-label={label}>
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
