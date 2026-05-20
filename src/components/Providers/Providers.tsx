"use client";

import React from "react";
import { PrimeReactProvider } from "primereact/api";
import { DemoModalProvider } from "@/contexts/DemoModalContext";
import { FreeTrialModalProvider } from "@/contexts/FreeTrialModalContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { DemoModalLazyHost } from "@/components/Providers/DemoModalLazyHost";
import { FreeTrialModalLazyHost } from "@/components/Providers/FreeTrialModalLazyHost";
import { suppressRscErrors } from "@/lib/suppressRscErrors";

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    suppressRscErrors();
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
