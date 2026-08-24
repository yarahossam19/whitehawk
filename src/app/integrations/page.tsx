import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IntegrationsClient } from "./integrations-client";

export const metadata: Metadata = pageMetadata({
  path: "/integrations",
  title: "Integrations — White Hawk",
  description:
    "White Hawk connects to network discovery, AWS, Azure, Google and Alibaba Cloud, Active Directory, EDR, SIEM and threat-intel feeds.",
  ogTitle: "White Hawk integrations",
  ogDescription:
    "Every connector White Hawk ships, across discovery, cloud, identity, detection and threat intel.",
});

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}
