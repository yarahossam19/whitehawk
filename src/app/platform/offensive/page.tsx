import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ModulePage } from "@/components/site/ModulePage/ModulePage";
import { LazyTicketingDemo } from "@/components/site/ui/ticketing-offensive-demo/LazyTicketingDemo";
import {
  Bug,
  Crosshair,
  SlidersHorizontal,
  Radar,
  ListChecks,
  Ticket,
  Layers,
  BookOpen,
  FileText,
  Code2,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/platform/offensive",
  title: "Offensive Security — White Hawk",
  description:
    "Vulnerability assessment, penetration testing, configuration review and CIS benchmarking — continuous offensive testing with every finding tracked to a fix.",
});

export default function OffensivePage() {
  return (
    <ModulePage
      config={{
        variant: "offensive",
        eyebrow: "Offensive Security",
        title: (
          <>
            See the weaknesses <span className={styles.accent}>others can't</span>.
          </>
        ),
        description:
          "Continuous testing across your apps, cloud, network and identity layers — every finding ranked by real exposure and routed to an owner with a fix.",
        primaryColor: "rgba(244, 63, 94, 0.75)",
        capabilities: [
          { icon: Bug, title: "Vulnerability assessment", description: "Weaknesses across apps, infrastructure, cloud and identity — ranked by exposure and business impact, not CVSS alone." },
          { icon: Crosshair, title: "Penetration testing", description: "Real attack paths against approved targets, chaining vulnerabilities the way adversaries actually do." },
          { icon: SlidersHorizontal, title: "Security configuration review", description: "Firewalls, cloud accounts, operating systems and identity providers checked against hardening baselines." },
          { icon: Code2, title: "Source code review", description: "Manual and automated review of application code to catch insecure logic, secrets and unsafe dependencies before release." },
          { icon: Radar, title: "Automated security scans", description: "Continuous scanning catches newly introduced exposures and recurring issues without manual follow-up." },
          { icon: ListChecks, title: "CIS benchmark assessment", description: "Servers, endpoints and cloud workloads scored against CIS Benchmarks to close hardening gaps." },
          { icon: Ticket, title: "Ticketing and reporting", description: "Every finding becomes a ticket with an owner, evidence and a fix — plus technical and executive reports." },
          { icon: Layers, title: "Full-stack coverage", description: "Network, web, API, mobile, source code, AD, POS, physical and OT/ICS testing in one program." },
          { icon: BookOpen, title: "Advisory and enablement", description: "Guided remediation, retesting and team training so fixes actually land." },
        ],
        howItWorks: {
          heading: "From finding to fixed, on one thread",
          body: "Every engagement runs the same loop: assess what's exposed, simulate how it breaks, track each fix to an owner, and generate the reports your auditors and executives ask for.",
          steps: [
            { text: "Assess apps, cloud, network and identity for real exposure", icon: Radar },
            { text: "Simulate real attack paths against approved targets", icon: Crosshair },
            { text: "Track every finding to an owner until it's verified fixed", icon: Ticket },
            { text: "Generate technical reports and executive summaries", icon: FileText },
          ],
        },
        productViewLabel: "offensive",
        productView: <LazyTicketingDemo variant="offensive" />,
        useCases: [
          { title: "Continuous red team", description: "Always-on offensive coverage instead of one annual pentest PDF." },
          { title: "Merger due diligence", description: "An attacker's view of the acquisition target in days, not quarters." },
          { title: "Pre-release hardening", description: "Ship features knowing the exploit surface instead of guessing at it." },
        ],
        // The integrated tools carrying offensive-side tags on the product's
        // integrations screen: Kali / Nessus (network, web, AD and API testing)
        // and the NVD CVE feed.
        integrations: ["Kali / Nessus"],
        faqs: [
          { q: "Are tests automated or human-led?", a: "Both. Automated scans run continuously for breadth; our testers run the penetration tests and configuration reviews where depth matters. One report covers both." },
          { q: "Which test types are in scope?", a: "Network, web, API, mobile, application, source code, Active Directory, POS, physical and OT/ICS — black, grey or white box." },
          { q: "How do findings reach my team?", a: "Each finding becomes a ticket with severity, CVSS, evidence and an assigned owner, syncing two-way with your existing tracker." },
        ],
      }}
    />
  );
}
