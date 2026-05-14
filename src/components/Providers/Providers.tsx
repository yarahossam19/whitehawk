"use client";

import React from "react";
import { PrimeReactProvider } from "primereact/api";
import { DemoModalProvider } from "@/contexts/DemoModalContext";
import { FreeTrialModalProvider } from "@/contexts/FreeTrialModalContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { DemoModalLazyHost } from "@/components/Providers/DemoModalLazyHost";
import { FreeTrialModalLazyHost } from "@/components/Providers/FreeTrialModalLazyHost";

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
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
        // load non-blocking: start as print then switch to all on load
        link.media = "print";
        link.onload = () => {
          link.media = "all";
        };
        document.head.appendChild(link);
        created.push(link);
      }
    }

    return () => {
      for (const el of created) el.remove();
    };
  }, []);

  return (
    <PrimeReactProvider>
      <ToastProvider>
        <DemoModalProvider>
          <FreeTrialModalProvider>
            {children}
            <DemoModalLazyHost />
            <FreeTrialModalLazyHost />
          </FreeTrialModalProvider>
        </DemoModalProvider>
      </ToastProvider>
    </PrimeReactProvider>
  );
}
