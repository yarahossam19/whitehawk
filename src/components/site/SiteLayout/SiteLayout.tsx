"use client";

import { useEffect, type ReactNode } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import styles from "./SiteLayout.module.scss";

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
