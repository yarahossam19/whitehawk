/** Figma 864:7568 */
export const CAPABILITY_ACCORDIONS = [
  {
    id: "offensive",
    title: "Offensive Security",
    body: "Offer comprehensive vulnerability assessments, automated penetration testing, and configuration reviews. Identify weaknesses before attackers do.",
    bullets: ["Vulnerability Management", "Automated Pen Testing", "Cloud Config Review"],
  },
  {
    id: "defensive",
    title: "Defensive Security",
    body: "Provide 24/7 monitoring capabilities, threat hunting services, and rapid incident response tools. Detect anomalies in real-time.",
    bullets: ["SIEM & Log Management", "Endpoint Detection", "Network Traffic Analysis"],
  },
  {
    id: "grc",
    title: "GRC & Compliance",
    body: "Streamline compliance journeys for ISO 27001, SOC 2, HIPAA, and more. Manage risks and gather audit-ready evidence automatically.",
    bullets: ["Compliance Frameworks", "Third-Party Risk", "Policy Management"],
  },
  {
    id: "assets",
    title: "Asset Visibility",
    body: "Discover every asset on the network, from IT servers to IoT devices. Track software licenses and manage exposure surfaces.",
    bullets: ["Automated Discovery", "Shadow IT Detection", "Attack Surface Management"],
  },
] as const;

/** Figma 864:7693 — middle tier shown in hover state on load */
export const PARTNER_TIERS = [
  {
    name: "Registered",
    tagline: "Entry level partnership",
    highlights: [
      "Access to partner portal",
      "Basic enablement materials",
      "Referral opportunities",
    ],
  },
  {
    name: "Certified",
    tagline: "For delivery partners",
    highlights: [
      "Technical Certification",
      "Delivery Enablement",
      "Margin Incentives",
      "NFR Licenses",
    ],
    featured: true,
  },
  {
    name: "Strategic",
    tagline: "For market leaders",
    highlights: [
      "Joint marketing funds",
      "Dedicated success manager",
      "Early product access",
      "Executive sponsorship",
    ],
  },
] as const;

export const PARTNER_BENEFITS = [
  "Recurring revenue on a sticky platform",
  "Differentiated story: one workspace, not ten tools",
  "Faster proposals with packaged capabilities",
  "Dedicated partner success and enablement",
];
