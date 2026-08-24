import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ModulePage } from "@/components/site/ModulePage/ModulePage";
import { LazyTicketingDemo } from "@/components/site/ui/ticketing-offensive-demo/LazyTicketingDemo";
import {
  Activity,
  Bell,
  Crosshair,
  Download,
  Eye,
  FileSearch,
  FileText,
  Inbox,
  Radar,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  Ticket,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/platform/defensive",
  title: "Defensive Security — White Hawk",
  description:
    "SOC alerts, threat intelligence, threat hunting and breach monitoring in one investigation queue — with automated containment that cuts mean-time-to-respond.",
});

export default function DefensivePage() {
  return (
    <ModulePage
      config={{
        variant: "defensive",
        eyebrow: "Defensive Security",
        title: (
          <>
            <span className={styles.accent}>Invisible</span> until it isn't.
          </>
        ),
        description:
          "One place to monitor threats, investigate alerts and coordinate response — telemetry, intelligence and hunting all feeding a single investigation queue.",
        primaryColor: "rgba(37, 99, 235, 0.75)",
        capabilities: [
          { icon: Bell, title: "SOC alerts and management", description: "Real-time alerts and 24/7 incident management, staffed across Egypt, KSA, the UK, the US and Libya." },
          { icon: Radar, title: "Threat intelligence", description: "Every alert enriched with actor attribution, geographic context and exploit data from open, commercial and dark-web sources." },
          { icon: Crosshair, title: "Threat hunting", description: "Hypothesis-driven hunts for adversaries already inside, using behavioral analytics and current ATT&CK TTPs." },
          { icon: Eye, title: "Data breach monitoring", description: "Dark-web sources, credential-paste sites and code repositories watched for leaked credentials, records and API keys." },
          { icon: Ticket, title: "Ticketing and reporting", description: "One workflow from detection to post-incident — engineer tickets, executive summaries and regulator-ready forensics." },
          { icon: ShieldAlert, title: "Automated containment", description: "Playbooks contain the threat and cut response time before an analyst has to step in." },
          { icon: Activity, title: "AI-driven correlation", description: "Correlates telemetry into single incidents and keeps low-fidelity noise out of the queue." },
          { icon: Inbox, title: "One investigation queue", description: "SIEM, IDS and endpoint signals land in one place instead of three separate consoles." },
        ],
        howItWorks: {
          heading: "From first signal to closed incident",
          body: "Human-led SOC operations with AI-driven correlation and automated containment behind them. Every stage cuts mean-time-to-respond without flooding your team with low-fidelity noise.",
          steps: [
            { text: "Detect suspicious activity the moment it appears", icon: Bell },
            { text: "Triage and enrich each alert with threat intelligence", icon: Radar },
            { text: "Contain the threat with automated playbooks", icon: ShieldAlert },
            { text: "Report with executive summaries and forensics", icon: FileText },
          ],
        },
        productViewLabel: "defensive",
        productView: <LazyTicketingDemo variant="defensive" />,
        spotlight: {
          eyebrow: "SOC AI",
          title: "AI-assisted triage, with an analyst still holding the pen",
          body: "SOC AI pulls alerts from your SIEM, investigates them against the raw logs, and proposes a response action for an analyst to approve. Connecting the SIEM is the only required step — every stage after it is off by default and switches on when you're ready.",
          steps: [
            {
              icon: Download,
              title: "Pull from your SIEM",
              description: "Alerts come from your connected SIEM on demand, or on an interval. A run still going when the next tick arrives is skipped, never queued.",
            },
            {
              icon: FileSearch,
              title: "Investigate the raw logs",
              description: "Read-only queries gather the evidence behind an alert — what else that host or user did around the same time. Nothing is ever written back.",
            },
            {
              icon: Sparkles,
              title: "Propose, then approve",
              description: "Each alert becomes a ticket carrying the engine's verdict and confidence, plus a response action that only runs once an analyst approves it.",
            },
            {
              icon: RefreshCw,
              title: "Calibrate on outcomes",
              description: "Closing an alert as a true or false positive is sent back to the engine, so triage gets sharper the longer you run it.",
            },
          ],
          notes: [
            "Response actions ship in dry run — the whole flow executes, nothing reaches your tools.",
            "Every module has its own on/off toggle, and the LLM starts off.",
            "Approved actions run through your EDR, AD and firewall: isolate a host, disable an account, block an IP.",
          ],
        },
        useCases: [
          { title: "24/7 SOC operations", description: "One console for monitoring, investigation and response instead of three." },
          { title: "Incident response", description: "From first alert to root cause in under an hour, with a full audit trail." },
          { title: "Insider threat", description: "Behavioral analytics on identity and data access, built in." },
        ],
        // SOC AI's own Integrations tab (every supported SIEM, plus a generic
        // connector for anything else, and Threat Hunting), the EDR / AD /
        // firewall it pushes approved response actions through, and the
        // integrated tools whose data feeds defensive work: Dexpose
        // (info-stealer and public-breach data), Ransomware Live and NVD CVE.
        integrations: [
          "Splunk",
          "Microsoft Sentinel",
          "Elastic",
          "QRadar",
          "Wazuh",
          "FortiSIEM",
          "Generic SIEM",
          "Threat Hunting",
          "EDR",
          "Active Directory",
          "Firewall",
          "Dexpose",
          "Ransomware Live",
          "NVD CVE",
        ],
        faqs: [
          { q: "Do you replace my SIEM?", a: "Either way works. White Hawk ingests SIEM, IDS and endpoint signals alongside your existing stack, or runs as the primary investigation queue itself." },
          { q: "Is the SOC human-led or automated?", a: "Human-led, with AI-driven correlation and automated playbooks handling containment and noise so analysts spend their time on real incidents." },
          { q: "What does threat hunting cover?", a: "Hypothesis-driven hunts across SIEM logs and network traffic, using behavioral analytics, anomaly detection and TTPs from current ATT&CK observations." },
        ],
      }}
    />
  );
}
