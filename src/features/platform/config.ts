export type PlatformType = "offensive" | "defensive" | "grc" | "asset-management";

export interface ActivityItem {
  title: string;
  description: string;
  /** URL slug for the Learn-More page. Falls back to slugified title. */
  slug?: string;
}

export interface SuccessStory {
  company: string;
  result: string;
  /** Subtext shown in quotation style under the result */
  quote: string;
}

export interface MissionCard {
  title: string;
  description: string;
  icon: "track" | "generate" | "simulate";
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface PlatformPageConfig {
  title: string;
  hero: {
    /** Each entry renders on its own line inside the H1. */
    titleLines: string[];
    subtitle: string;
    ctaLabel: string;
  };
  activities: {
    sectionTitle: string;
    sectionSubtitle?: string;
    items: ActivityItem[];
  };
  mission: {
    cards: MissionCard[];
  };
  successStories: {
    sectionTitle: string;
    items: SuccessStory[];
  };
  faqs: {
    sectionTitle: string;
    sectionSubtitle?: string;
    items: FaqEntry[];
  };
}

export const PLATFORM_CONFIG: Record<PlatformType, PlatformPageConfig> = {
  offensive: {
    title: "Offensive Security",
    hero: {
      titleLines: [
        "Offensive Security",
        "That Proves Exploitability —",
        "Not Just CVE Lists",
      ],
      subtitle:
        "WhiteHawk's offensive security module simulates real-world attackers against your environment. Our offensive security team holds OSCP, OSWE, OSEP, OSWP, CEH, CRTP, C|PENT, and GPEN certifications and has run engagements against banks, fintechs, museums, and healthcare networks across MENA.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Defensive Security Solutions",
      sectionSubtitle: "Our Defensive Security Solutions combine human-led SOC operations with AI-driven correlation, automated containment, and continuous Threat Hunting. Every component reduces mean-time-to-respond without flooding your team with low-fidelity noise - cyber defense at MENA scale.",
      items: [
        {
          title: "Vulnerability Assessment",
          description:
"Vulnerability Assessment maps every weakness across your attack surface - applications, infrastructure, cloud workloads, and identity layers - then proves which ones are actually exploitable in your specific environment, the foundation of any offensive security program."        },
        {
          title: "Penetration Testing",
          description:
"Penetration Testing is authorized, hands-on simulation of a real attack against your systems. WhiteHawk pen testers chain vulnerabilities the way adversaries do, exposing the realistic blast radius of every weakness across your stack."        },
        {
          title: "Security Configuration Review",
          description:
"A security configuration review validates that your firewalls, cloud accounts, identity providers, and operating systems are hardened against known misconfigurations - the silent root cause behind most breaches uncovered by offensive security engagements today."        },
        {
          title: "Automated Security Scans",
          description:
"Continuous, automated security scans run inside the WhiteHawk platform around the clock. New assets, new code, and new exposures are flagged in real time and routed to the right team automatically."        },
        {
          title: "CIS Benchmark Assessment",
          description:
"Our CIS benchmark assessment measures servers, workstations, and cloud workloads against the Center for Internet Security baseline - the same standard auditors use to score security maturity, integrated with our offensive security findings."        },
        {
          title: "Ticketing and Reporting",
          description:
"Every Vulnerability Assessment finding becomes a ticket with an owner, severity, business impact, and step-by-step fix. Reports come in two layers: technical depth for engineers and an executive view for boards."        },
      ],
    },
    mission: {
      cards: [
        {
          title: "Simulate Real-World Attacks",
          description:
            "We conduct penetration testing and vulnerability assessments to mimic real-world cyberattacks, identifying potential weaknesses before attackers can exploit them.",
          icon: "simulate",
        },
        {
          title: "Track",
          description:
            "We provide detailed reports—both executive summaries and technical assessments—to track progress, document vulnerabilities, and ensure compliance.",
          icon: "track",
        },
        {
          title: "Generate",
          description:
            "Generate audit-ready reports and compliance documentation to streamline assessments and demonstrate due care.",
          icon: "generate",
        },
      ],
    },
    successStories: {
      sectionTitle: "Success Stories",
      items: [
        {
          company: "Fintech Enterprise",
          result: "Reduced vulnerability window by 75%",
          quote:
"WhiteHawk's offensive simulations helped us identify a critical API flaw that traditional scanners missed. We patched it within hours."        },
        {
          company: "Healthcare Provider",
          result: "HIPAA compliance achieved in record time",
          quote:
            "Automated reporting from the offensive module gave auditors exactly what they needed, saving weeks of manual documentation.",
        },
      ],
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "Why is offensive security important for businesses?",
          answer:
            "Defensive tools tell you what is happening. Offensive security tells you what could happen. It is the only way to validate that your existing controls actually stop a determined attacker.",
        },
        {
          question: "What is offensive security?",
          answer:
            "Offensive security is the practice of simulating real-world attacks against your own systems - Penetration Testing, red teaming, and Vulnerability Assessment - to find exploitable weaknesses before adversaries do.",
        },
        {
          question:
            "What is the difference between Penetration Testing and Vulnerability Assessment?",
          answer:
            "A Vulnerability Assessment lists weaknesses. A Penetration Testing engagement exploits them. Vulnerability Assessment is breadth; Penetration Testing is depth - both belong in a mature offensive security program.",
        },
        {
          question:
            "How often should offensive security assessments be performed?",
          answer:
            "Annually at minimum for compliance. Quarterly for regulated industries. Continuous through the WhiteHawk platform for organizations that want to catch exposures the moment they appear - surfaced through ongoing vulnerability analysis.",
        },
        {
          question:
            "What types of vulnerabilities can offensive security identify?",
          answer:
            "Application flaws (OWASP Top 10), infrastructure misconfigurations, weak identity controls, exposed secrets, cloud account drift, supply-chain risk, and human-layer weaknesses surfaced via phishing simulation and pen testing.",
        },
        {
          question: "Does offensive security help with compliance requirements?",
          answer:
            "Yes. SAMA CSF, NCA ECC, PCI-DSS 4.0, ISO 27001, and CBE all require documented Penetration Testing. Our offensive security reports map directly to control evidence.",
        },
        {
          question:
            "What industries benefit most from offensive security solutions?",
          answer:
            "Banking, fintech, healthcare, energy, and government — any sector where a successful breach has regulatory consequences, financial liability, or public-trust impact.",
        },
      ],
    },
  },
  defensive: {
    title: "Defensive Security",
    hero: {
      titleLines: [
        "Cyber Defense",
        "That Never Sleeps",
      ],
      subtitle:"Cyber defense is no longer a periscope-up exercise. WhiteHawk's defensive module is the always-on cyber defense engine for organizations that cannot afford downtime. We ingest telemetry from your network, endpoints, cloud, and identity layer, correlate it in under 200 milliseconds, and contain confirmed threats before they spread - backed by a 24/7 SOC across Egypt, KSA, the UK, and the US.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Defensive Security Solutions",
      sectionSubtitle: "Our Defensive Security Solutions combine human-led SOC operations with AI-driven correlation, automated containment, and continuous Threat Hunting. Every component reduces mean-time-to-respond without flooding your team with low-fidelity noise - cyber defense at MENA scale.",
      items: [
        {
          title: "SOC Alerts and Management",
          description:
"Real-time SOC alerts and 24/7 incident management across Egypt, KSA, the UK, the US, and Libya. Behavioral analytics distinguish normal operations from credential misuse and lateral movement before damage is done."        },{
          title: "Threat Intelligence",
          description:
"Threat intelligence is the difference between reactive defense and informed defense. We enrich every alert with geographic context, threat-actor attribution, and exploit availability data - pulled from open, commercial, and dark-web sources."},        {
          title: "Threat Hunting",
          description:
"Threat Hunting is proactive cyber defense - we go looking for adversaries already inside your environment instead of waiting for an alert. Our hunters use behavioral analytics, hypothesis-driven queries, and TTPs from current ATT&CK observations." },
        {
          title: "Data Breach Monitoring",
          description:
"Data breach monitoring spans dark-web sources, credential-paste sites, and code-repository leaks. We surface exposed company credentials, leaked customer records, and stolen API keys before attackers operationalize them."
    },
        {
          title: "Ticketing and Reporting",
          description:
"Incidents move end-to-end through a single workflow: detection, triage, containment, recovery, and post-incident reporting. Executive summaries, regulator-ready forensics, and engineer-facing tickets generated from one source of truth."
 },
  
      ],
    },
    mission: {
      cards: [
        {
          title: "Detect Threats in Real-Time",
          description:
"We use continuous monitoring to detect suspicious activities immediately, allowing your team to respond quickly and prevent damage",          icon: "simulate",
        },
        {
          title: "Integrate Threat Intelligence for Proactive Defense",
          description:
"We integrate up-to-date threat feeds to ensure your organization is always prepared to face the latest attack vectors",          icon: "track",
        },
        {
          title: "Automate Security Responses",
          description:
"With SOC integration and automated playbooks, we streamline response times and reduce human error, ensuring a faster and more accurate reaction to threats",          icon: "generate",
        },
      ],
    },
    successStories: {
      sectionTitle: "Success Stories",
      items: [
        {
          company: "FinTech Enterprise",
          result: "Reduced vulnerability window by 75%",
          quote:
"WhiteHawk's offensive simulations helped us identify a critical API flaw that traditional scanners missed. We patched it within hours.",        },
        {
          company: "Retail Enterprise",
          result: "HIPAA compliance achieved in record time",
          quote:
            "Proactive monitoring caught issues at the edge before they hit stores. Leadership sees security as a business enabler now.",
        },
      ],
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "What is defensive security?",
          answer:
"Defensive security covers everything done to detect, contain, and recover from active cyber threats - SOC monitoring, SIEM correlation, Threat Hunting, incident response, and automated remediation working as one cyber defense program.",        },
        {
          question: "How does cyber defense protect businesses from cyber threats?",
          answer:
"It watches network, endpoint, cloud, and identity telemetry continuously, correlates signals across sources, raises high-fidelity alerts, and contains confirmed incidents before they reach critical data or operations.",        },
        {
          question: "What services are included in Defensive Security Solutions?",
          answer:
"24/7 SOC monitoring, SIEM management, threat intelligence enrichment, Threat Hunting, incident response, DFIR, automated containment, and ongoing security posture reporting.",        },
        {
          question: "Why is continuous security monitoring important?",
          answer:
"Attackers operate around the clock. Gaps between business hours, weekends, and holidays are exactly when most successful intrusions happen. Continuous monitoring closes those cyber defense gaps.",        },
        {
          question: "What is the role of SOC in defensive security?",
          answer:
"The Security Operations Center is the human layer that triages alerts, runs Threat Hunting, executes incident response, and translates technical events into business actions.",        },
        {
          question: "How do SIEM solutions improve threat detection?",
          answer:
"SIEM platforms aggregate logs from across your stack and apply correlation rules to surface attack patterns invisible to any single tool. WhiteHawk overlays AI-driven analytics on top of standard SIEM logic, enriched by cyber threat intelligence.",        },
        {
          question: "What is the difference between defensive and offensive security?",
          answer:
"Offensive security simulates attacks to find weaknesses. Cyber defense detects and contains real attacks in progress. Mature programs run both - offensive tells you what to fix, defensive catches what gets missed.",        },
      ],
    },
  },
  grc: {
    title: "GRC",
    hero: {
      titleLines: ["GRC Compliance", "Without the Audit-Season Panic"],
      subtitle:"GRC compliance is where most security programs lose money — manual evidence collection, last-minute audit prep, and policy documents nobody reads. WhiteHawk's GRC compliance module continuously maps governance risk and compliance controls to the frameworks your regulator audits against, so the evidence is already there when the auditor walks in.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "GRC Activities",
      sectionSubtitle: "Comprehensive testing and assessment capabilities.",
      items: [
        {
          title: "Data Collection",
          description:
"Data collection consolidates telemetry, control evidence, and policy artifacts from across your stack into one continuously updated source of truth - replacing the spreadsheets that audit season historically lives and dies inside."        },
        {
          title: "Gap Assessment",
          description:
"Gap assessment scores your current GRC compliance posture against the target framework - SAMA CSF, NCA ECC, ISO 27001, PCI-DSS 4.0 - and produces a prioritized remediation plan with assigned owners.",        },
        {
          title: "Risk Management",
          description:
"Quantified risk registers replace heat-map theater. Every risk is scored by likelihood, impact, and current control coverage - feeding the governance risk and compliance picture continuously, not annually."        },
        {
          title: "Governance Management",
          description:"Governance management keeps every policy version-controlled, mapped to the relevant control, owned by a named individual, and reviewed on a documented cadence - not buried in a shared drive nobody opens.",
                },        {
          title: "Compliance Management",
          description:
"Compliance management tracks live GRC compliance posture across SAMA, NCA ECC and CCC, CBE, FRA 139, ISO/IEC 27001:2022, PCI-DSS 4.0, HIPAA, GDPR, Aramco CCC, DIFC, and ADGM - concurrently, not sequentially.",        },
        {
          title: "Audit Management",
          description:
"Audit management stops being a fire drill. Evidence is collected continuously, mapped to control IDs, timestamped, and exportable in the format your auditor requested - long before the audit window opens."      },
{
  title: "Ticketing and Reporting",
  description:
"Every GRC compliance gap becomes a ticket with an owner, deadline, and remediation plan. Reports come in two layers: technical depth for engineers, executive view for boards and regulators on demand.",   }  ],
    },
    mission: {
      cards: [
        {
          title: "Automate Compliance Monitoring and Reporting",
          description:
"We automate the process of tracking and reporting compliance with key industry standards (e.g., NIST, ISO, PCI), saving you time and reducing human errors.",   
       icon: "simulate",
        },
        {
          title: "Identify, Assess, and Mitigate Risks",
          description:
"White Hawk continuously monitors and assesses risk across your organization, providing a comprehensive view and actionable steps to mitigate identified threats",
          icon: "track",
        },
        {
          title: "Provide Audit-Ready Documentation",
          description:
"We generate detailed, compliance-driven reports, ensuring you are always prepared for internal or external audits, and reducing audit-related stress",
          icon: "generate",
        },
      ],
    },
    successStories: {
      sectionTitle: "Success Stories",
      items: [
        {
          company: "SaaS Provider",
          result: "SOC 2 Type II in 6 months",
          quote:
            "We mapped controls once and reused evidence across audits. What used to take quarters now takes weeks.",
        },
        {
          company: "Global Enterprise",
          result: "Unified view across 4 frameworks",
          quote:
            "Risk, policy, and compliance live in one workspace. No more spreadsheets or duplicate questionnaires.",
        },
      ],
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "How does GRC compliance help organizations manage risk and compliance?",
          answer:
"GRC compliance creates one common language across security, legal, finance, and operations - so risk decisions are documented, traceable, and aligned with the regulations your business is actually subject to.",        },
        {
          question: "What services are included in GRC solutions?",
          answer:
"Framework gap assessment, control implementation, evidence automation, policy management, risk register maintenance, audit support, and continuous monitoring of your governance risk and compliance posture."        },
        {
          question:
            "Why is regulatory compliance important for businesses?",
          answer:
"Beyond avoiding fines, regulatory compliance is increasingly a precondition for winning enterprise contracts, banking relationships, cyber insurance, and public-sector tenders across MENA."        },
        {
          question: "How do GRC frameworks improve security governance?",
          answer:
"Frameworks force structure: every control has an owner, every policy has a review cycle, and every risk has a documented response - converting security from heroics to repeatable engineering."        },
        {
          question: "What industries benefit most from GRC services?",
          answer:
"Banking, fintech, leasing, healthcare, energy, and government - sectors where a regulator can fine, suspend, or revoke an operating license over a GRC compliance failure."        },
        {
          question: "What is the difference between GRC and cybersecurity operations?",
          answer:
"Operations stop attackers in real time. GRC compliance proves to regulators, customers, and the board that your operations are designed correctly, executed consistently, and improving over time."        },
       
      ],
    },
  },
  "asset-management": {
    title: "Asset Management",
    hero: {
      titleLines: [
        "Asset Management",
        "That Closes Your Real Attack Surface",
      ],
      subtitle:"Asset Management is the foundation of every other security control. If you cannot see an asset, you cannot patch it, monitor it, or prove it is compliant. WhiteHawk Asset Management discovers every device, application, cloud workload, identity, and shadow-IT instance across your estate - agentless or agent-based - and scores each by business criticality.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Asset Management Operation",
      items: [
        {
          title: "IT Assets Management",
          description:
"IT assets management goes beyond inventory. WhiteHawk correlates every asset with its known vulnerabilities, configuration drift, exposure level, and the controls protecting it - turning a static IT assets management list into a living risk picture."        },
        {
          title: "Non-IT Assets Management",
          description:
"Non-IT Asset Management extends visibility to OT, ICS, SCADA, medical devices, and physical-access systems - the operational technology layer attackers increasingly target across MENA's banks, hospitals, and critical infrastructure operators.", }
,   {
          title: "Automated Asset Discovery",
          description:
"Agentless and agent-based scanning continuously identifies on-prem servers, AWS and Azure workloads, SaaS applications, IoT devices, and unmanaged cloud accounts - eliminating the shadow IT that hides behind every successful breach. Core to our asset management operation playbook."},
      ],
    },
    mission: {
      cards: [
        {
          title: "Achieve Complete Visibility of All Assets",
          description:
"We ensure full visibility across both IT and non-IT assets, giving you the ability to monitor everything connected to your network and improve security posture",          icon: "simulate",
        },
        {
          title: "Automate Asset Discovery and Classification",
          description:
            "White Hawk automatically identifies and categorizes assets as they come online, so you’re always aware of your network’s state in real-time",
          icon: "track",
        },
        {
          title: "Monitor and Secure All Devices",
          description:
            "From IT infrastructure to IoT devices, we continuously monitor assets to identify vulnerabilities and ensure compliance with security policies.",
          icon: "generate",
        },
      ],
    },
    successStories: {
      sectionTitle: "Success Stories",
      items: [
        {
          company: "Manufacturing",
          result: "40% of previously unknown assets discovered",
          quote:
            "Shadow IT and OT devices showed up in the first scan. We finally know what we need to protect.",
        },
        {
          company: "Technology Company",
          result: "Unified asset view across 3 clouds",
          quote:
            "One inventory across AWS, Azure, and on-prem. Security and IT finally agree on the same source of truth.",
        },
      ],
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "What is cybersecurity Asset Management?",
          answer:
"It is the practice of continuously identifying, classifying, and monitoring every digital and operational asset connected to your environment - the foundation that every other security control sits on top of."        },
        {
          question: "How does Asset Management improve organizational security?",
          answer:
"You cannot defend what you cannot see. Comprehensive Asset Management eliminates blind spots, enables accurate vulnerability prioritization, and is required evidence for almost every compliance framework."        },
        {
          question:
            "What types of assets should be monitored in a cybersecurity program?",
          answer:
"Endpoints, servers, network devices, cloud accounts and workloads, SaaS applications, IoT, OT and ICS, identity providers, mobile devices, and any third-party integrations connected to your environment - covered by IT assets management plus non-IT inventory."        },
        {
          question: "Why is real-time asset visibility important?",
          answer:
"A device that joins the network at 9am and is exploited at 9:30am will not appear in a quarterly inventory. Real-time visibility is the only way to defend a modern, dynamic estate."        },
        {
          question: "How does Asset Management help reduce security risks?",
          answer:
"It eliminates shadow IT, surfaces unpatched assets, prevents configuration drift, and ensures every defensive control is mapped to a real, accounted-for asset rather than a hopeful assumption."        },
        {
          question: "What is the role of Asset Management in compliance?",
          answer:
"Almost every framework - SAMA, NCA, ISO 27001, PCI-DSS, HIPAA - requires a current, accurate asset inventory. Without an asset management operation in place, compliance evidence cannot be reliably produced."        },
        {
          question: "How can automated Asset Management platforms improve security operations?",
          answer:
"Automation removes the human bottleneck. Discovery, classification, and risk scoring run continuously, freeing analysts to act on findings instead of chasing spreadsheets."        },
      ],
    },
  },
};

export const PLATFORM_TYPES: PlatformType[] = ["offensive", "defensive", "grc", "asset-management"];

export function getPlatformConfig(type: string): PlatformPageConfig | null {
  if (PLATFORM_TYPES.includes(type as PlatformType)) {
    return PLATFORM_CONFIG[type as PlatformType];
  }
  return null;
}
