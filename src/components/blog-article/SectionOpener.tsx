"use client";

import { useEffect } from "react";

/**
 * Article sections are closed <details> (see renderDoc). This keeps links and
 * sections in step:
 *  - a link in either table of contents toggles its section, like clicking
 *    the heading: a closed section opens and scrolls into view, an open one
 *    closes (and its heading is scrolled to, so the reader isn't left
 *    somewhere further down);
 *  - an in-text #link, the hash the page was opened with, and back/forward
 *    always open the section they point into;
 *  - printing opens every section.
 */
export function SectionOpener() {
  useEffect(() => {
    const findTarget = (hash: string): HTMLElement | null => {
      if (hash.length < 2) return null;
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // keep the raw id
      }
      return document.getElementById(id);
    };
    const sectionOf = (el: HTMLElement | null) => el?.closest<HTMLDetailsElement>("details.wg-sec") ?? null;

    const open = (hash: string): HTMLElement | null => {
      const target = findTarget(hash);
      const section = sectionOf(target);
      if (section && !section.open) section.open = true;
      return target;
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('.wg-article a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const fromToc = link.closest(".toc, .wg-toc") !== null;
      const target = findTarget(href);
      const section = sectionOf(target);

      if (fromToc && section?.open) {
        // Close it. Handled here rather than by the browser, so the hash
        // change doesn't reopen the section straight away.
        e.preventDefault();
        section.open = false;
        section.querySelector("h2")?.scrollIntoView({ block: "start" });
        if (window.location.hash !== href) history.pushState(null, "", href);
        return;
      }
      open(href);
    };
    const onHash = () => open(window.location.hash);
    const onPrint = () =>
      document.querySelectorAll<HTMLDetailsElement>(".wg-article details.wg-sec").forEach((d) => (d.open = true));

    // The browser's own jump to the hash happened while the section was closed.
    open(window.location.hash)?.scrollIntoView();
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("beforeprint", onPrint);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, []);

  return null;
}
