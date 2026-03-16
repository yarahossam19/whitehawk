export type PlatformType = "offensive" | "defensive" | "grc" | "asset-management";

export interface ActivityItem {
  title: string;
  description: string;
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
"Simulate real-world cyberattacks to uncover vulnerabilities before they are exploited. White Hawk’s Offensive Security module ensures your systems are always tested and secure",
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
  },
  defensive: {
    title: "Defensive Security",
    hero: {
      title: "Strengthen Your Defenses with Proactive Offensive Security",
      subtitle:
      "Detect threats in real-time and automate responses to keep your systems secure. White Hawk’s Defensive Security module ensures you can respond quickly and effectively to emerging risks",
            ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Security Activities",
      sectionSubtitle: "Comprehensive testing and assessment capabilities.",
      items: [
        {
          title: "SOC Alerts and Management",
          description:
          "Receive real-time alerts for suspicious activity and manage incidents to protect your organization from potential breaches",        },
        {
          title: "Threat Intelligence",
          description:
"Integrate threat feeds to stay ahead of emerging attack techniques and vulnerabilities, ensuring proactive protection"        },
        {
          title: "Threat Hunting",
          description:
"Continuously search for signs of malicious activity within your network, identifying risks before they escalate into serious breaches"        },
        {
          title: "Data Breach Monitoring",
          description:
"Monitor for signs of data leakage or breach activity to reduce impact and response time"        },
        {
          title: "Ticketing and Reporting",
          description:
"Manage incidents end-to-end and generate operational and executive reports"        },
  
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
  },
  grc: {
    title: "GRC",
    hero: {
      title: "Simplify Compliance and Mitigate Risk",
      subtitle:"Ensure your organization meets regulatory standards and effectively manages risk with White Hawk’s GRC module. Automate your compliance checks and risk assessments for continuous security",      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Security Activities",
      sectionSubtitle: "Comprehensive testing and assessment capabilities.",
      items: [
        {
          title: "Data Collection",
          description:
            "Collect and consolidate data from all your systems, ensuring visibility and access to critical security metrics in one place.",
        },
        {
          title: "Gap Assessment",
          description:
            "Perform comprehensive assessments to identify security vulnerabilities and get actionable recommendations to improve your security posture.",
        },
        {
          title: "Risk Management",
          description:
            "Assess, prioritize, and mitigate security risks to ensure that your organization is protected against potential threats and vulnerabilitie.",
        },
        {
          title: "Governance Management",
          description:
            "Manage security policies, roles, and responsibilities across the organization."},
        {
          title: "Compliance Management",
          description:
            "Monitor compliance status across frameworks and regulations in real time.",
        },
        {
          title: "Audit Management",
          description:
"Prepare for internal and external audits with centralized evidence and audit trails"        },
{
  title: "Ticketing and Reporting",
  description:
"Track compliance tasks and generate audit-ready reports with full traceability.",    }  ],
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
  },
  "asset-management": {
    title: "Asset Management",
    hero: {
      title: "Gain Full Control  Over Your IT and Non-IT Assets",
      subtitle:
"Monitor and secure all your assets—from IoT devices to critical infrastructure—using White Hawk’s Asset Management module. Ensure nothing goes unprotected, inside or outside your network",
      ctaLabel: "Get Demo",
    },
    activities: {
      sectionTitle: "Security Activities",
      sectionSubtitle: "Comprehensive testing and assessment capabilities.",
      items: [
        {
          title: "IT Assets Management",
          description:
            "Continuously monitor your network devices, servers, and workstations to ensure they are secure and compliant with your internal policies.",
        },
        {
          title: "Non-IT Assets Management",
          description:
"Gain visibility and security over IoT devices, machinery, and other non-IT assets, ensuring all devices are protected from cyber threats",     }
,   {
          title: "Automated Asset Discovery",
          description:
"Automatically detect and catalog new assets as they come online, providing real-time updates to your asset inventory",        },

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
  },
};

export const PLATFORM_TYPES: PlatformType[] = ["offensive", "defensive", "grc", "asset-management"];

export function getPlatformConfig(type: string): PlatformPageConfig | null {
  if (PLATFORM_TYPES.includes(type as PlatformType)) {
    return PLATFORM_CONFIG[type as PlatformType];
  }
  return null;
}
