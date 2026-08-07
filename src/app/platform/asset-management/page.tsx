import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ModulePage } from "@/components/site/ModulePage/ModulePage";
import AssetInventoryDemo from "@/components/site/ui/asset-management-demo/AssetInventoryDemo";
import {
  Activity,
  ClipboardCheck,
  CloudOff,
  Factory,
  Gauge,
  Network,
  Search,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/platform/asset-management",
  title: "Asset Management — WhiteHawk",
  description:
    "Agentless and agent-based discovery across devices, cloud workloads, identities, SaaS and OT — every asset correlated with its vulnerabilities and scored by business criticality.",
});

export default function AssetManagementPage() {
  return (
    <ModulePage
      config={{
        variant: "asset",
        eyebrow: "Asset Management",
        title: (
          <>
            You can't secure what you can't <span className={styles.accent}>see</span>.
          </>
        ),
        description:
          "Asset management is the foundation of every other control. WhiteHawk discovers every device, application, cloud workload, identity and shadow-IT instance, then scores each by business criticality.",
        primaryColor: "rgba(217, 119, 6, 0.7)",
        capabilities: [
          { icon: Server, title: "IT asset management", description: "Goes beyond inventory — every asset correlated with its vulnerabilities, configuration drift and protecting controls." },
          { icon: Factory, title: "Non-IT asset management", description: "Visibility extended to OT, ICS, SCADA, medical devices and physical-access systems." },
          { icon: Search, title: "Automated discovery", description: "Agentless and agent-based scanning across on-prem servers, AWS and Azure workloads, SaaS and IoT." },
          { icon: CloudOff, title: "Shadow IT and unmanaged cloud", description: "Surfaces the unmanaged accounts and unknown assets that hide behind most successful breaches." },
          { icon: Gauge, title: "Business criticality scoring", description: "Each asset scored by what it's worth to the business, so effort lands on the crown jewels." },
          { icon: ShieldCheck, title: "Control coverage", description: "See which assets your SIEM, EDR and patching actually cover — and which ones nothing is watching." },
          { icon: UserCheck, title: "Ownership and lifecycle", description: "Active, disabled and orphaned assets tracked with an accountable owner on each." },
          { icon: ClipboardCheck, title: "Compliance-ready inventory", description: "The asset register auditors ask for, current enough to prove coverage on demand." },
        ],
        howItWorks: {
          heading: "From unknown assets to a living risk picture",
          body: "If you can't see an asset, you can't patch it, monitor it or prove it's compliant. Discovery, correlation and criticality scoring run continuously across both IT and non-IT.",
          steps: [
            { text: "Discover every asset, agentless or agent-based", icon: Search },
            { text: "Correlate each one with its vulnerabilities and controls", icon: Network },
            { text: "Score by business criticality and exposure", icon: Gauge },
            { text: "Monitor coverage and ownership continuously", icon: Activity },
          ],
        },
        productViewLabel: "assets",
        productView: <AssetInventoryDemo />,
        useCases: [
          { title: "Shadow IT sprawl", description: "Find unmanaged cloud accounts and orphaned assets before an attacker does." },
          { title: "OT and critical infrastructure", description: "Bring OT, ICS and medical devices into the same inventory as IT." },
          { title: "Right-sized security", description: "Put controls where business criticality says they actually matter." },
        ],
        // The real connector inventory from the product's Asset Management
        // integrations screen, in its own grouping: network discovery, cloud
        // providers, then identity/endpoint/security sources.
        integrations: [
          "SNMP discovery",
          "Active discovery",
          "Wireless discovery",
          "AWS",
          "Microsoft Azure",
          "Google Cloud",
          "Alibaba Cloud",
          "Active Directory",
          "Asset Agent",
          "EDR",
          "SIEM",
        ],
        faqs: [
          { q: "How is this different from a CMDB?", a: "A CMDB is a static list. Here every asset is correlated with its vulnerabilities, configuration drift and protecting controls, so it stays a live risk picture." },
          { q: "Do I need to install agents?", a: "No. Discovery runs agentless, with agent-based scanning available where you want deeper detail on a host." },
          { q: "What types of assets should be monitored?", a: "Anything with an attack surface — servers, endpoints, cloud workloads, SaaS, identities and IoT, plus OT, ICS, SCADA and physical-access systems." },
        ],
      }}
    />
  );
}
