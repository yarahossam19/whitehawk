export type PlatformType = "offensive" | "defensive" | "grc" | "asset-management";

export interface ActivityItem {
  title: string;
  description: string;
}

export interface SuccessStory {
  result: string;
  company: string;
}

export interface MissionCard {
  title: string;
  description: string;
  icon: "track" | "generate" | "simulate";
}

export interface PlatformPageConfig {
  title: string;
  hero: {
    title: string;
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
}

export const PLATFORM_CONFIG: Record<PlatformType, PlatformPageConfig> = {
  offensive: {
    title: "Offensive Security",
    hero: {
      title: "Stay Ahead of Threats with Proactive Offensive Security",
      subtitle:
        "WhiteHawk simulates real-world vulnerabilities to uncover weaknesses before exploitation, ensuring your systems stay secure.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Security Activities",
      sectionSubtitle: "Comprehensive testing and assessment capabilities.",
      items: [
        {
          title: "Vulnerability Assessment",
          description:
            "Run regular assessments to ensure vulnerabilities are identified and mitigated before exploitation.",
        },
        {
          title: "Penetration Testing",
          description:
            "Identify vulnerabilities in your network, systems, and applications through realistic attack simulations.",
        },
        {
          title: "Security Configuration Review",
          description:
            "Review system and cloud configurations to uncover misconfigurations that increase attack risk.",
        },
        {
          title: "Automated Security Scans",
          description:
            "Perform active, attack-style scans that mimic hacker behavior to uncover real weaknesses.",
        },
        {
          title: "CIS Benchmark Assessment",
          description:
            "Assess systems against CIS Benchmarks to measure hardening and security compliance.",
        },
        {
          title: "Ticketing and Reporting",
          description:
            "Track vulnerabilities through the entire resolution process and generate compliance-driven reports.",
        },
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
        { result: "Reduced vulnerability window by 75%", company: "Fintech Enterprise" },
        { result: "HIPAA compliance achieved in record time", company: "Healthcare Provider" },
      ],
    },
  },
  defensive: {
    title: "Defensive Security",
    hero: {
      title: "Strengthen Your Defenses with 24/7 Protection",
      subtitle:
        "Continuous monitoring and rapid response to keep your organization secure against evolving threats.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Defensive Capabilities",
      sectionSubtitle: "Around-the-clock surveillance and response.",
      items: [
        {
          title: "Continuous Monitoring",
          description:
            "24/7 automated surveillance that never sleeps, ensuring threats are detected as they emerge.",
        },
        {
          title: "Incident Response",
          description:
            "Rapid detection and response workflows to contain and remediate security incidents.",
        },
        {
          title: "Threat Intelligence",
          description:
            "Leverage real-time threat intelligence to stay ahead of known and emerging attack patterns.",
        },
        {
          title: "Security Operations Center",
          description:
            "Centralized visibility and control across your entire security infrastructure.",
        },
        {
          title: "Endpoint Detection",
          description:
            "Detect and respond to threats across endpoints, servers, and cloud workloads.",
        },
        {
          title: "Log Management & Analytics",
          description:
            "Correlate logs and events to uncover hidden threats and support compliance reporting.",
        },
      ],
    },
    mission: {
      cards: [
        {
          title: "Detect and Respond Faster",
          description:
            "We provide continuous monitoring and intelligent alerting so your team can respond to threats before they impact the business.",
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
        { result: "Mean time to detect reduced by 60%", company: "Financial Services" },
        { result: "Zero critical incidents in 12 months", company: "Retail Enterprise" },
      ],
    },
  },
  grc: {
    title: "GRC",
    hero: {
      title: "Governance, Risk, and Compliance Made Simple",
      subtitle:
        "Unify policies, risk assessments, and compliance in one platform so you can prove and improve your security posture.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "GRC Capabilities",
      sectionSubtitle: "See every corner of your program in one place.",
      items: [
        {
          title: "Policy Management",
          description:
            "Create, distribute, and attest to policies with automated workflows and version control.",
        },
        {
          title: "Risk Assessment",
          description:
            "Identify, assess, and prioritize risks with consistent frameworks and clear reporting.",
        },
        {
          title: "Compliance Frameworks",
          description:
            "Map controls to multiple frameworks (SOC 2, ISO 27001, NIST, HIPAA) and streamline audits.",
        },
        {
          title: "Control Testing",
          description:
            "Schedule and track control tests with evidence collection and remediation follow-up.",
        },
        {
          title: "Audit Readiness",
          description:
            "Generate audit-ready reports and dashboards for auditors and leadership.",
        },
        {
          title: "Vendor Risk",
          description:
            "Assess and monitor third-party risk with questionnaires and continuous monitoring.",
        },
      ],
    },
    mission: {
      cards: [
        {
          title: "One Source of Truth",
          description:
            "We bring policies, risk, and compliance into a single workspace so you can demonstrate due care and pass audits with confidence.",
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
        { result: "SOC 2 Type II in 6 months", company: "SaaS Provider" },
        { result: "Unified view across 4 frameworks", company: "Global Enterprise" },
      ],
    },
  },
  "asset-management": {
    title: "Asset Management",
    hero: {
      title: "Complete Visibility Across Every Asset",
      subtitle:
        "Discover, inventory, and secure IT and non-IT assets so nothing slips through the cracks.",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Asset Capabilities",
      sectionSubtitle: "Full lifecycle visibility and control.",
      items: [
        {
          title: "Asset Discovery",
          description:
            "Automatically discover and classify assets across your network, cloud, and endpoints.",
        },
        {
          title: "Unified Inventory",
          description:
            "Single inventory for hardware, software, cloud resources, and critical business assets.",
        },
        {
          title: "Vulnerability Mapping",
          description:
            "Map vulnerabilities to specific assets and prioritize remediation by criticality.",
        },
        {
          title: "Lifecycle Tracking",
          description:
            "Track procurement, deployment, changes, and retirement for every asset.",
        },
        {
          title: "Software Compliance",
          description:
            "Monitor license usage and ensure compliance with software agreements.",
        },
        {
          title: "Reporting & Dashboards",
          description:
            "Dashboards and reports for asset coverage, risk, and compliance status.",
        },
      ],
    },
    mission: {
      cards: [
        {
          title: "Know What You Have",
          description:
            "You can't secure what you can't see. We help you maintain an accurate, up-to-date view of every asset so security and IT stay aligned.",
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
        { result: "40% of previously unknown assets discovered", company: "Manufacturing" },
        { result: "Unified asset view across 3 clouds", company: "Technology Company" },
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
