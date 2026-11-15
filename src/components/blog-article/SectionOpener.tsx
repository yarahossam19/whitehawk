"use client";

import { useEffect } from "react";

// Matches the stylesheet: from 1024px the sidebar contents list shows and
// sections are always open; below it they fold.
const DESKTOP = "(min-width: 1024px)";

/**
 * Article sections are <details class="wg-sec"> (see renderDoc).
 *
 * Desktop: every section is open and stays open, like the reference design.
 * The headings can't be clicked shut, and the contents list just jumps.
 *
 * Below 1024px: sections start folded. A heading or its entry in the
 * Contents box opens and closes it; an in-text #link, the hash the page was
 * opened with, and back/forward always open the section they point into.
 *
 * Printing opens every section.
 */
export function SectionOpener() {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const sections = () => document.querySelectorAll<HTMLDetailsElement>(".wg-article details.wg-sec");

    const syncToViewport = () => {
      sections().forEach((section) => {
        const summary = section.querySelector<HTMLElement>(":scope > summary");
        if (desktop.matches) {
          section.open = true;
          // Not a control on desktop, so not a tab stop either.
          summary?.setAttribute("tabindex", "-1");
        } else {
          summary?.removeAttribute("tabindex");
        }
      });
    };

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
    const sectionOf = (el: Element | null) => el?.closest<HTMLDetailsElement>("details.wg-sec") ?? null;

    const open = (hash: string): HTMLElement | null => {
      const target = findTarget(hash);
      const section = sectionOf(target);
      if (section && !section.open) section.open = true;
      return target;
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;

      // Desktop: a heading click (or Enter on it) must not fold the section.
      const summary = el?.closest?.(".wg-article details.wg-sec > summary");
      if (summary && desktop.matches) {
        e.preventDefault();
        return;
      }

      const link = el?.closest?.<HTMLAnchorElement>('.wg-article a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const fromToc = link.closest(".toc, .wg-toc") !== null;
      const section = sectionOf(findTarget(href));

      if (fromToc && section?.open && !desktop.matches) {
        // Fold it. Handled here rather than by the browser, so the hash
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
    const onPrint = () => sections().forEach((d) => (d.open = true));

    syncToViewport();
    // The browser's own jump to the hash happened before the section was open.
    open(window.location.hash)?.scrollIntoView();

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("beforeprint", onPrint);
    desktop.addEventListener("change", syncToViewport);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("beforeprint", onPrint);
      desktop.removeEventListener("change", syncToViewport);
    };
  }, []);

  return null;
}
