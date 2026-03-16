import type { Metadata } from "next";
import Home from "@/features/home";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Manage your entire cybersecurity program in one platform—offensive, defensive, GRC, and asset visibility with automated workflows and audit-ready reporting.",
  openGraph: {
    title: "WhiteHawk | Unified Cybersecurity Platform",
    description:
      "Automate vulnerability management, streamline compliance, and detect threats across your organization in one integrated platform.",
  },
};

export default function HomePage() {
  return <Home />;
}
