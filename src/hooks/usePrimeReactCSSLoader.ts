import { useEffect } from "react";

let cssLoaded = false;

/**
 * Lazily loads PrimeReact CSS only when first needed.
 * Prevents 30+ KiB of CSS from blocking initial page load on mobile.
 * CSS loads only once, on first modal interaction.
 */
export function usePrimeReactCSSLoader() {
  useEffect(() => {
    if (cssLoaded) return;

    const links = [
      {
        id: "prime-theme",
        href: "https://unpkg.com/primereact/resources/themes/lara-light-cyan/theme.css",
      },
      {
        id: "primereact",
        href: "https://unpkg.com/primereact/resources/primereact.min.css",
      },
      { id: "primeicons", href: "https://unpkg.com/primeicons/primeicons.css" },
    ];

    const created: HTMLLinkElement[] = [];

    for (const l of links) {
      if (!document.getElementById(l.id)) {
        const link = document.createElement("link");
        link.id = l.id;
        link.rel = "stylesheet";
        link.href = l.href;
        link.media = "print";
        link.onload = () => {
          link.media = "all";
        };
        document.head.appendChild(link);
        created.push(link);
      }
    }

    cssLoaded = true;

    return () => {
      for (const el of created) el.remove();
      cssLoaded = false;
    };
  }, []);
}
