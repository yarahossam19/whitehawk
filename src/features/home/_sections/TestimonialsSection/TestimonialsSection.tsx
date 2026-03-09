"use client";

import styles from "./TestimonialsSection.module.scss";

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
];

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 1l2.5 6.5L19 8l-5 4.5 1.5 6.5L10 14l-5.5 5 1.5-6.5L1 8l6.5-.5L10 1z" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Trusted by leaders who value safety.</h2>
        <p className={styles.subtitle}>
          Join thousands of businesses that sleep soundly with WhiteHawk.
        </p>
        <div className={styles.cards}>
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className={styles.card}>
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
    </section>
  );
}
