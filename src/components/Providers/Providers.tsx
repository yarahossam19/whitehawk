"use client";

import { PrimeReactProvider } from "primereact/api";
import { DemoModalProvider } from "@/contexts/DemoModalContext";
import { RequestDemoModal } from "@/components/RequestDemoModal/RequestDemoModal";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      <DemoModalProvider>
        {children}
        <RequestDemoModal />
      </DemoModalProvider>
    </PrimeReactProvider>
  );
}
