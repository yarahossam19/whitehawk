"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { TicketingDemoVariant } from "./index";

/**
 * Viewport-gated loader for the embedded ticketing demo.
 *
 * The demo is a full app surface — TanStack Table, dnd-kit, Radix, PrimeReact
 * and its theme — which is roughly 700 KB of JS and 440 KB of CSS. It lives in
 * the "Product view" section, several screens down the Offensive/Defensive
 * pages, so loading it eagerly meant every visitor paid for it during the
 * window that decides LCP and Total Blocking Time, whether or not they ever
 * scrolled to it.
 *
 * `ssr: false` because nothing here is content a crawler needs: the table
 * renders mock data behind a 100 ms loading skeleton even when server-rendered,
 * so its markup carries no indexable value.
 */
const TicketingDemo = dynamic(() => import("./index").then((m) => m.TicketingDemo), {
  ssr: false,
});

export function LazyTicketingDemo({ variant }: { variant: TicketingDemoVariant }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      // Generous margin: the chunk is large, so start fetching well before the
      // section reaches the viewport to avoid a visible pop-in.
      { rootMargin: "600px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        <TicketingDemo variant={variant} />
      ) : (
        // Reserves roughly the demo's own height so the swap doesn't shift the
        // rest of the page. Styled inline rather than in offensive.scss, since
        // that stylesheet only arrives with the deferred chunk.
        <div
          aria-hidden
          style={{
            minHeight: "clamp(420px, 55vh, 820px)",
            borderRadius: 16,
            border: "1px solid #d9d9d9",
            background: "linear-gradient(180deg, #fbfcfd 0%, #f5f7fa 100%)",
          }}
        />
      )}
    </div>
  );
}

export default LazyTicketingDemo;
