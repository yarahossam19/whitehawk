"use client";

import styles from "./TestimonialsSection.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "WhiteHawk gave us the confidence to expand our digital services without fear. It's like having a dedicated security team on standby 24/7.",
    name: "Sarah Jenkins",
    role: "CTO, FinTech Solutions",
    initials: "SJ",
    tag: "# Primitive.img",
  },
  {
    quote:
      "We needed a partner that could scale with our growth. WhiteHawk delivered—clear visibility, fewer fires, and real peace of mind.",
    name: "David Chen",
    role: "Founder, Chen Logistics",
    initials: "DC",
    tag: null,
  },
  {
    quote:
      "From day one, WhiteHawk made compliance and risk feel manageable. Our auditors noticed the difference. So did our board.",
    name: "Emily Ross",
    role: "Director of Ops, Nexus Inc.",
    initials: "ER",
    tag: null,
  },
  {
    quote:
      "The visibility alone changed how we operate. We finally have one place for risk, assets, and compliance evidence—without chasing spreadsheets.",
    name: "Michael Patel",
    role: "VP Security, Horizon Retail",
    initials: "MP",
    tag: null,
  },
  {
    quote:
      "WhiteHawk helped us standardize reporting across business units. We cut audit prep time dramatically and leadership gets clear answers fast.",
    name: "Ava Thompson",
    role: "GRC Manager, NorthBridge",
    initials: "AT",
    tag: null,
  },
  {
    quote:
      "We onboarded quickly and saw value in weeks. The platform makes it easy to track progress and communicate risk in plain language.",
    name: "Luis Garcia",
    role: "CISO, Meridian Health",
    initials: "LG",
    tag: null,
  },
  {
    quote:
      "The workflow is clean and the evidence trail is solid. It’s the first time our team felt ahead of compliance instead of behind it.",
    name: "Priya Nair",
    role: "Security Lead, Atlas Manufacturing",
    initials: "PN",
    tag: null,
  },
];

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 1l2.5 6.5L19 8l-5 4.5 1.5 6.5L10 14l-5.5 5 1.5-6.5L1 8l6.5-.5L10 1z" />
    </svg>
  );
}

export function TestimonialsSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useMemo(() => {
    return () => {
      const el = scrollerRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 2);
      setCanNext(el.scrollLeft < max - 2);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(`[data-testimonial-card="true"]`);
    const step = first ? first.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Trusted by leaders who value safety.</h2>
          <p className={styles.subtitle}>
            Join thousands of businesses that sleep soundly with WhiteHawk.
          </p>
        </div>
        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous reviews"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next reviews"
          >
            <span aria-hidden>›</span>
          </button>
          <div ref={scrollerRef} className={styles.scroller} role="list" aria-label="Customer reviews">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className={styles.card}
                role="listitem"
                data-testimonial-card="true"
                tabIndex={-1}
              >
              <div className={styles.stars} aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar} aria-hidden>
                  {t.initials}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorRow}>
                    <cite className={styles.name}>{t.name}</cite>
                    {t.tag && (
                      <span className={styles.tag}>{t.tag}</span>
                    )}
                  </div>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </div>
            </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
