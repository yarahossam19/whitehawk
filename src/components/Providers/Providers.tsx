"use client";

import { PrimeReactProvider } from "primereact/api";
import { DemoModalProvider } from "@/contexts/DemoModalContext";
import { DemoModalLazyHost } from "@/components/Providers/DemoModalLazyHost";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      <DemoModalProvider>
        {children}
        <DemoModalLazyHost />
      </DemoModalProvider>
    </PrimeReactProvider>
  );
}
