"use client";

import { useEffect, useState } from "react";
import styles from "./toc-nav.module.scss";

type Heading = { id: string; text: string; level: 2 | 3 };

export function TocNav({ toc }: { toc: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0.01 },
    );
    toc.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav>
      <div className={styles.tocEyebrow}>On this page</div>
      <ul>
        {toc.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`${styles.tocLink} ${active ? styles.tocLinkActive : ""}`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
