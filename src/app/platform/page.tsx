import { PlatformOverview } from "@/features/platform/PlatformOverview/PlatformOverview";

export const metadata = {
  title: "Platform Services | WhiteHawk",
  description:
    "Four WhiteHawk service pillars — Offensive Security, Defensive Security, GRC Compliance, and Asset Management. Built for MENA enterprises.",
};

export default function PlatformIndexPage() {
  return <PlatformOverview />;
}
