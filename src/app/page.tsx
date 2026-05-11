import type { Metadata } from "next";
import Home from "@/features/home";

export const metadata: Metadata = {
  title: {
    absolute: "Cybersecurity System for MENA Enterprises | WhiteHawk",
  },
  description:
    "WhiteHawk is the AI cybersecurity system unifying offensive, defensive, asset management, and GRC into one cybersecurity platform. MENA-built.",
  openGraph: {
    title: "WhiteHawk | Unified Cybersecurity Platform",
    description:
      "Automate vulnerability management, streamline compliance, and detect threats across your organization in one integrated platform.",
  },
};

export default function HomePage() {
  return <Home />;
}
