"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import styles from "./TestimonialCarousel.module.scss";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Testimonials as a scroll-snap track: one card per view on mobile, two from
 * md up, with page dots and arrows underneath. Scrolling is native (swipe,
 * trackpad and keyboard all work, smoothness comes from CSS `scroll-behavior`)
 * — state here only mirrors the scroll position so the controls stay in sync.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  // One measurement pass reused by scroll, resize and the arrow handlers: the
  // slide count per view is a CSS decision, so we read it back off the DOM
  // rather than duplicating the breakpoint in JS.
  const metrics = useCallback(() => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return null;
    const second = first.nextElementSibling as HTMLElement | null;
    const stride = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    if (stride <= 0) return null;
    const perView = Math.max(1, Math.round(el.clientWidth / stride));
    return { el, stride, perView, pageWidth: stride * perView };
  }, []);

  const sync = useCallback(() => {
    const m = metrics();
    if (!m) return;
    setPages(Math.ceil(items.length / m.perView));
    setPage(Math.round(m.el.scrollLeft / m.pageWidth));
  }, [items.length, metrics]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // No `behavior` — that leaves the CSS `scroll-behavior` in charge, so the
  // reduced-motion override in the stylesheet applies to these jumps too.
  const goTo = (next: number) => {
    const m = metrics();
    if (!m) return;
    m.el.scrollTo({ left: Math.max(0, next) * m.pageWidth });
  };

  return (
    <div className={styles.root}>
      <ul
        ref={trackRef}
        onScroll={sync}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        className={styles.track}
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={styles.slide}
          >
            <figure className={styles.card}>
              <Quote aria-hidden size={26} className={styles.glyph} />
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.footer}>
                <span aria-hidden className={styles.avatar}>
                  {initials(t.name)}
                </span>
                <span className={styles.person}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous testimonials"
            className={styles.arrow}
          >
            <ChevronLeft size={16} />
          </button>

          <div className={styles.dots}>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonials, page ${i + 1} of ${pages}`}
                aria-current={i === page}
                className={`${styles.dot} ${i === page ? styles.dotActive : ""}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page >= pages - 1}
            aria-label="Next testimonials"
            className={styles.arrow}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
