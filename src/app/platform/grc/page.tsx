import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ModulePage } from "@/components/site/ModulePage/ModulePage";
import {
  AlertTriangle,
  Bot,
  ClipboardCheck,
  FileSearch,
  FileText,
  FolderOpen,
  Gauge,
  Scale,
  Ticket,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/platform/grc",
  title: "GRC System — WhiteHawk",
  description:
    "Continuous GRC — controls mapped to SAMA CSF, NCA ECC, ISO/IEC 27001 and PCI DSS 4.0, with evidence collected as those controls operate.",
});

export default function GrcPage() {
  return (
    <ModulePage
      config={{
        variant: "grc",
        eyebrow: "Governance, Risk & Compliance",
        title: (
          <>
            <span className={styles.accent}>Always audit ready</span>, not just before the audit.
          </>
        ),
        description:
          "Controls map continuously to the frameworks your regulator audits against — so the evidence is already there when the auditor walks in.",
        primaryColor: "rgba(22, 163, 74, 0.7)",
        capabilities: [
          { icon: FolderOpen, title: "Data and evidence collection", description: "Control evidence, documents, screenshots and technical inputs stay connected to the right controls and frameworks." },
          { icon: Gauge, title: "Gap assessment", description: "Scores your posture against the frameworks in scope and ranks missing controls by remediation priority." },
          { icon: AlertTriangle, title: "Risk management", description: "A living register linking each risk to likelihood, impact, affected assets, owners and mitigation plans." },
          { icon: Scale, title: "Governance management", description: "Policies, procedures, responsibilities and review cycles in one place, with ownership, approvals and versions." },
          { icon: ClipboardCheck, title: "Compliance management", description: "Requirements tracked across regional and international frameworks from a single view of progress." },
          { icon: FileSearch, title: "Audit management", description: "Control evidence, ownership records, timestamps and remediation status kept audit-ready year-round." },
          { icon: Ticket, title: "Ticketing and reporting", description: "Gaps, risks and findings become assigned tickets — and reports at the depth each audience needs." },
          { icon: Bot, title: "Automated monitoring", description: "Tracking and reporting against standards like NIST, ISO and PCI runs itself, with less room for human error." },
        ],
        howItWorks: {
          heading: "Continuous compliance, not audit-season panic",
          body: "Manual evidence collection, last-minute prep and policies nobody reads are where GRC programs lose money. Controls map to your frameworks once, then the evidence keeps flowing on its own.",
          steps: [
            { text: "Map controls to the frameworks your regulator audits against", icon: ClipboardCheck },
            { text: "Collect evidence continuously as controls operate", icon: FolderOpen },
            { text: "Score gaps and assign remediation with owners and deadlines", icon: Gauge },
            { text: "Generate audit packs and regulator-ready reports", icon: FileText },
          ],
        },
        useCases: [
          { title: "Regulator readiness", description: "SAMA, NCA, CBE and FRA obligations tracked from one place." },
          { title: "Audit readiness", description: "Evidence, owners and timestamps already organized when the auditor arrives." },
          { title: "Board and exec reporting", description: "One dataset, reported at the depth each audience actually needs." },
        ],
        faqs: [
          { q: "Which frameworks do you support?", a: "SAMA CSF, NCA ECC, ISO/IEC 27001, PCI DSS 4.0, CBE, FRA 139, HIPAA, GDPR, Aramco CCC, DIFC and ADGM — plus any custom control set." },
          { q: "What's included in the GRC module?", a: "Evidence collection, gap assessment, a risk register, governance and policy management, compliance tracking, audit preparation, and ticketing with reporting." },
          { q: "How is this different from security operations?", a: "Security operations detect and respond to threats. GRC proves your controls work — same underlying data, a different audience and evidence trail." },
        ],
      }}
    />
  );
}
