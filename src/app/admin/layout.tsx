import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminAuthGate } from "./admin-auth-gate";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAuthGate>{children}</AdminAuthGate>;
}
