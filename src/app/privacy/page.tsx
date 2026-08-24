import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Section } from "@/components/site/ui/Section/Section";
import {
  Info,
  Database,
  Settings,
  Share2,
  Globe,
  ShieldCheck,
  UserCheck,
  Cookie,
  RefreshCw,
  Mail,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy — White Hawk",
  description:
    "White Hawk Security Privacy Policy. Learn how we collect, use, and protect your personal and organizational data.",
});

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "information", label: "Information We Collect" },
  { id: "use", label: "How We Use Your Information" },
  { id: "sharing", label: "Data Sharing & Third Parties" },
  { id: "international", label: "International Data Transfers" },
  { id: "security", label: "Data Security & Retention" },
  { id: "rights", label: "Your Rights & Choices" },
  { id: "cookies", label: "Cookie Policy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
] as const;

const rights = [
  { title: "Right of Access", body: "You may request a copy of the personal data we hold about you, including information about how it is processed and to whom it has been disclosed." },
  { title: "Right to Rectification", body: "You may request correction of inaccurate or incomplete personal data. You can also update most account information directly through the White Hawk platform." },
  { title: "Right to Erasure (Right to Be Forgotten)", body: "You may request deletion of your personal data, subject to our legal obligations to retain certain records for compliance, tax, or contractual purposes." },
  { title: "Right to Data Portability", body: "You may request that your personal data be provided to you in a structured, commonly used, and machine-readable format." },
  { title: "Right to Restrict Processing", body: "You may request that we limit the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data." },
  { title: "Right to Object", body: "You may object to the processing of your personal data for direct marketing purposes or where processing is based on legitimate interests." },
];

const cookieTypes = [
  { title: "Strictly Necessary Cookies", body: "Required for the operation of our website and platform. These include session cookies, authentication tokens, and security cookies. These cannot be disabled." },
  { title: "Analytical / Performance Cookies", body: "Used to collect information about how visitors use our website, including pages visited, time spent, and navigation paths. This data is aggregated and anonymized." },
  { title: "Functional Cookies", body: "Used to remember your preferences and settings, such as language, region, and display preferences, to provide a more personalized experience." },
  { title: "Marketing Cookies", body: "Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns. These cookies track your activity across websites." },
];

const retention = [
  { title: "Account Data", body: "Retained for the duration of your active subscription, plus 90 days following account termination to facilitate data export requests." },
  { title: "Security Scan & Monitoring Data", body: "Retained for a default period of 12 months, configurable by the client up to 36 months based on compliance requirements." },
  { title: "Compliance & Audit Data", body: "Retained in accordance with applicable regulatory requirements, typically between 5 and 7 years." },
  { title: "Marketing Contact Data", body: "Retained until you withdraw consent or request deletion, whichever occurs first." },
  { title: "Server Logs", body: "Automatically purged after 180 days unless required for an active investigation or legal hold." },
];

const usePurposes = [
  { title: "Service Delivery", body: "To provide our cybersecurity services, including vulnerability scanning, real-time threat monitoring, compliance reporting, and asset management. This constitutes the core performance of our contractual obligations." },
  { title: "Transaction Processing", body: "To process subscriptions, manage billing cycles, issue invoices, and handle refund requests in accordance with our commercial agreements." },
  { title: "Security Alerts & Reports", body: "To send critical security alerts, vulnerability notifications, compliance deadline reminders, and periodic security posture reports as part of our service." },
  { title: "Platform Improvement", body: "To improve our threat detection algorithms, enhance platform performance, and develop new security features. Where possible, this is done using aggregated, anonymized data." },
  { title: "Communication", body: "To respond to your inquiries, provide technical support, and send service-related notifications. Marketing communications are only sent with your explicit consent." },
  { title: "Legal & Compliance", body: "To comply with applicable laws, regulations, and legal processes, and to enforce our Terms of Service and protect our rights and the rights of our users." },
];

const security = [
  { title: "Encryption", body: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Database-level encryption and key management are handled through dedicated hardware security modules (HSMs)." },
  { title: "Access Controls", body: "Strict role-based access controls (RBAC) with mandatory multi-factor authentication (MFA) for all platform access. Privileged access is governed by just-in-time (JIT) provisioning." },
  { title: "Infrastructure Security", body: "Our platform is hosted on SOC 2-certified cloud infrastructure with network segmentation, intrusion detection/prevention systems (IDS/IPS), and continuous security monitoring." },
  { title: "Security Operations", body: "Our internal security team conducts regular penetration testing, vulnerability assessments, and security code reviews. Incident response procedures are tested quarterly." },
];

export default function PrivacyPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>Legal Documentation</div>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroMeta}>
            Effective Date: February 11, 2026 &nbsp;|&nbsp; Last Updated: February 11, 2026
          </p>
        </div>
      </section>

      <Section>
        <div className={styles.layout}>
          {/* Sticky table of contents */}
          <nav aria-label="Table of contents" className={styles.toc}>
            <div className={styles.tocLabel}>On this page</div>
            <ul className={styles.tocList}>
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className={styles.tocLink}>
                    <span className={styles.tocNum}>{String(i + 1).padStart(2, "0")}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className={styles.content}>
            <section id="intro" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Info size={18} />
                </span>
                <span className={styles.blockKicker}>Section 01</span>
              </div>
              <h2 className={styles.blockTitle}>Introduction</h2>
              <p>
                White Hawk Security ("White Hawk," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. As a cybersecurity company, we hold ourselves to the highest standards of data protection — the same standards we help our clients achieve.
              </p>
              <p>
                This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website, use our All-in-One cybersecurity platform, or interact with us through our marketing channels, including "Request a Demo" and "Start Free Trial" forms.
              </p>
              <p>
                Our platform provides Offensive Security (vulnerability scanning and penetration testing), Defensive Security (real-time threat monitoring and incident response), Governance, Risk & Compliance (GRC), and Asset Management services. Given the sensitive nature of these operations, this policy specifically addresses how we handle both your personal data and your organizational system data.
              </p>
              <p>
                By accessing our website or using our platform, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the terms herein, please discontinue use of our services immediately.
              </p>
            </section>

            <section id="information" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Database size={18} />
                </span>
                <span className={styles.blockKicker}>Section 02</span>
              </div>
              <h2 className={styles.blockTitle}>Information We Collect</h2>
              <p>We collect information through several channels, depending on your interaction with White Hawk:</p>

              <h3 className={styles.subTitle}>2.1 Information You Provide Directly</h3>
              <ul className={styles.fieldList}>
                <li><strong>Contact & Account Information:</strong> When you submit a "Request a Demo" or "Start Free Trial" form, we collect your full name, business email address, phone number, company name, job title, and company size.</li>
                <li><strong>Login Credentials:</strong> When you create a White Hawk platform account, we collect your email address and a securely hashed password. We also support single sign-on (SSO) authentication through third-party identity providers.</li>
                <li><strong>Payment Information:</strong> For subscription and transaction processing, we collect billing details. Payment card information is processed by our PCI DSS-compliant payment processor and is never stored on our servers.</li>
                <li><strong>Support Communications:</strong> Any information you provide when contacting our support team, including ticket content, email correspondence, and call recordings (with prior consent).</li>
              </ul>

              <h3 className={styles.subTitle}>2.2 Information Collected Automatically</h3>
              <ul className={styles.fieldList}>
                <li><strong>User Activity Logs:</strong> We record platform usage data including login timestamps, pages accessed, features used, scan configurations, and report generation activity. This data is used to deliver and improve our services.</li>
                <li><strong>Device & Browser Information:</strong> IP address, browser type, operating system, device identifiers, and referring URLs.</li>
                <li><strong>Cookies & Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and gather analytical data. See Section 08 (Cookie Policy) for details.</li>
              </ul>

              <h3 className={styles.subTitle}>2.3 Client System & Infrastructure Data</h3>
              <p>Given the nature of our cybersecurity services, White Hawk processes data related to your organization's IT infrastructure:</p>
              <ul className={styles.fieldList}>
                <li><strong>Vulnerability Scan Data:</strong> Information gathered during offensive security assessments, including open ports, software versions, configuration details, and identified vulnerabilities.</li>
                <li><strong>Asset Inventory Data:</strong> Hardware and software asset information, network topology data, and endpoint configurations collected through our Asset Management module.</li>
                <li><strong>Security Event Data:</strong> Logs, alerts, and telemetry data processed through our Defensive Security module for threat detection and incident response.</li>
                <li><strong>Compliance Data:</strong> Policy documents, audit evidence, risk assessments, and compliance status information managed within our GRC module.</li>
              </ul>

              <div className={styles.callout}>
                <strong>Data Isolation Guarantee:</strong> All client system data is logically isolated in dedicated, tenant-specific environments. No client's infrastructure data is ever commingled with another client's data. Access is strictly controlled through role-based access controls (RBAC) and multi-factor authentication (MFA).
              </div>
            </section>

            <section id="use" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Settings size={18} />
                </span>
                <span className={styles.blockKicker}>Section 03</span>
              </div>
              <h2 className={styles.blockTitle}>How We Use Your Information</h2>
              <p>
                White Hawk processes your information for the following purposes, each grounded in a lawful basis under applicable data protection regulations:
              </p>
              <div className={styles.cardGrid}>
                {usePurposes.map((p) => (
                  <div key={p.title} className={styles.miniCard}>
                    <div className={styles.miniCardTitle}>{p.title}</div>
                    <p className={styles.miniCardBody}>{p.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="sharing" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Share2 size={18} />
                </span>
                <span className={styles.blockKicker}>Section 04</span>
              </div>
              <h2 className={styles.blockTitle}>Data Sharing & Third Parties</h2>
              <p>
                White Hawk does not sell, rent, or trade your personal information or client system data. We share data only in the following limited circumstances:
              </p>

              <h3 className={styles.subTitle}>4.1 Infrastructure & Service Providers</h3>
              <p>
                We engage trusted infrastructure providers to host and deliver our platform. These include <strong>Amazon Web Services (AWS)</strong> for cloud infrastructure and compute services, and <strong>Microsoft Azure</strong> for specific service integrations. All sub-processors are bound by strict data processing agreements (DPAs) that require them to protect your data at a level consistent with this policy and applicable laws.
              </p>

              <h3 className={styles.subTitle}>4.2 Technology Partners</h3>
              <p>
                White Hawk integrates with technology partners such as <strong>Edraky</strong> and other cybersecurity ecosystem partners solely for the purpose of enhancing service delivery (e.g., threat intelligence feeds, vulnerability databases). Data shared with partners is limited to what is strictly necessary for service functionality.
              </p>

              <h3 className={styles.subTitle}>4.3 Legal & Regulatory Disclosure</h3>
              <p>
                We may disclose information if required by law, regulation, subpoena, court order, or governmental request. We will notify affected clients of such disclosures to the extent legally permitted.
              </p>

              <h3 className={styles.subTitle}>4.4 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction. We will provide notice and, where applicable, offer choices before your data is transferred and becomes subject to a different privacy policy.
              </p>

              <div className={styles.callout}>
                A current list of our sub-processors is available upon request. We will notify existing customers of any material changes to our sub-processor list at least 30 days in advance.
              </div>
            </section>

            <section id="international" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Globe size={18} />
                </span>
                <span className={styles.blockKicker}>Section 05</span>
              </div>
              <h2 className={styles.blockTitle}>International Data Transfers</h2>
              <p>
                White Hawk operates globally and may transfer, store, and process your information in countries other than your country of residence. We are committed to ensuring that all international data transfers comply with applicable data protection laws.
              </p>

              <h3 className={styles.subTitle}>GDPR Compliance (European Economic Area)</h3>
              <p>
                For users and clients in the European Economic Area (EEA), United Kingdom, and Switzerland, White Hawk processes personal data in compliance with the General Data Protection Regulation (GDPR). We ensure lawful transfer of data outside the EEA through:
              </p>
              <ul className={styles.fieldList}>
                <li><strong>Standard Contractual Clauses (SCCs):</strong> We execute EU-approved Standard Contractual Clauses with all sub-processors and data recipients located outside the EEA.</li>
                <li><strong>Adequacy Decisions:</strong> Where applicable, we transfer data to countries recognized by the European Commission as providing adequate data protection.</li>
                <li><strong>Data Sovereignty Options:</strong> Enterprise clients may request data residency within specific geographic regions. White Hawk supports EU-based data hosting through our AWS and Azure infrastructure.</li>
              </ul>

              <h3 className={styles.subTitle}>Additional Regional Compliance</h3>
              <ul className={styles.fieldList}>
                <li><strong>AICPA SOC 2 Type II:</strong> Our platform undergoes annual SOC 2 Type II audits, verifying that our security, availability, processing integrity, confidentiality, and privacy controls meet AICPA standards.</li>
                <li><strong>ISO 27001:</strong> White Hawk maintains ISO 27001 certification for our information security management system (ISMS), ensuring systematic management of sensitive company and customer information.</li>
                <li><strong>PCI DSS:</strong> All payment processing is handled in accordance with PCI DSS requirements, ensuring the secure handling of cardholder data.</li>
              </ul>
            </section>

            <section id="security" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <ShieldCheck size={18} />
                </span>
                <span className={styles.blockKicker}>Section 06</span>
              </div>
              <h2 className={styles.blockTitle}>Data Security & Retention</h2>
              <p>
                As a cybersecurity company, data security is not merely a compliance requirement — it is foundational to our identity. White Hawk implements comprehensive, defense-in-depth security measures to protect the data entrusted to us.
              </p>
              <div className={styles.cardGrid}>
                {security.map((s) => (
                  <div key={s.title} className={styles.miniCard}>
                    <div className={styles.miniCardTitle}>{s.title}</div>
                    <p className={styles.miniCardBody}>{s.body}</p>
                  </div>
                ))}
              </div>

              <h3 className={styles.subTitle}>Data Retention</h3>
              <ul className={styles.fieldList}>
                {retention.map((r) => (
                  <li key={r.title}><strong>{r.title}:</strong> {r.body}</li>
                ))}
              </ul>
            </section>

            <section id="rights" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <UserCheck size={18} />
                </span>
                <span className={styles.blockKicker}>Section 07</span>
              </div>
              <h2 className={styles.blockTitle}>Your Rights & Choices</h2>
              <p>
                White Hawk respects your data privacy rights. Depending on your jurisdiction, you may have the following rights regarding your personal data:
              </p>
              <ol className={styles.rightsList}>
                {rights.map((r) => (
                  <li key={r.title}>
                    <div className={styles.rightsTitle}>{r.title}</div>
                    <p className={styles.rightsBody}>{r.body}</p>
                  </li>
                ))}
              </ol>

              <h3 className={styles.subTitle}>Opt-Out of Marketing Communications</h3>
              <p>You may opt out of receiving promotional emails at any time by:</p>
              <ul className={styles.fieldList}>
                <li>Clicking the "Unsubscribe" link in any marketing email.</li>
                <li>Updating your communication preferences in your White Hawk account settings.</li>
                <li>Contacting us at <a href="mailto:privacy@White Hawk.com">privacy@White Hawk.com</a>.</li>
              </ul>
              <p>
                Please note that opting out of marketing communications does not affect service-related notifications, such as security alerts and compliance reports, which are essential to the delivery of our platform.
              </p>
              <p>
                To exercise any of these rights, please contact our Data Protection Officer at <a href="mailto:dpo@White Hawk.com">dpo@White Hawk.com</a>. We will respond to verified requests within 30 days (or within the timeframe required by applicable law). We may request verification of your identity before processing your request to protect against unauthorized access.
              </p>
            </section>

            <section id="cookies" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Cookie size={18} />
                </span>
                <span className={styles.blockKicker}>Section 08</span>
              </div>
              <h2 className={styles.blockTitle}>Cookie Policy</h2>
              <p>
                White Hawk uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content.
              </p>
              <div className={styles.cardGrid}>
                {cookieTypes.map((c) => (
                  <div key={c.title} className={styles.miniCard}>
                    <div className={styles.miniCardTitle}>{c.title}</div>
                    <p className={styles.miniCardBody}>{c.body}</p>
                  </div>
                ))}
              </div>
              <p>
                You can manage your cookie preferences through your browser settings or through our cookie consent banner displayed on your first visit. For more information, please refer to our full Cookie Policy, accessible via the cookie settings link in the website footer.
              </p>
            </section>

            <section id="changes" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <RefreshCw size={18} />
                </span>
                <span className={styles.blockKicker}>Section 09</span>
              </div>
              <h2 className={styles.blockTitle}>Changes to This Policy</h2>
              <p>
                White Hawk reserves the right to update this Privacy Policy at any time to reflect changes in our practices, technology, legal requirements, or business operations.
              </p>
              <p>When we make material changes to this policy, we will:</p>
              <ul className={styles.fieldList}>
                <li>Update the "Last Updated" date at the top of this page.</li>
                <li>Provide prominent notice on our website (e.g., a banner notification).</li>
                <li>For material changes affecting existing clients, send email notification at least 30 days prior to the changes taking effect.</li>
                <li>Where required by applicable law, obtain your consent before implementing changes that affect the processing of your personal data.</li>
              </ul>
              <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>
            </section>

            <section id="contact" className={styles.block}>
              <div className={styles.blockHead}>
                <span className={styles.blockIcon}>
                  <Mail size={18} />
                </span>
                <span className={styles.blockKicker}>Section 10</span>
              </div>
              <h2 className={styles.blockTitle}>Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through any of the following channels:
              </p>
              <div className={styles.cardGrid}>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardTitle}>Data Protection Officer</div>
                  <p className={styles.miniCardBody}>
                    <a href="mailto:dpo@White Hawk.com">dpo@White Hawk.com</a>
                    <br />
                    Subject Line: Privacy Inquiry — [Your Name]
                  </p>
                </div>
                <div className={styles.miniCard}>
                  <div className={styles.miniCardTitle}>General Privacy</div>
                  <p className={styles.miniCardBody}>
                    <a href="mailto:privacy@White Hawk.com">privacy@White Hawk.com</a>
                    <br />
                    Support: <a href="mailto:support@White Hawk.com">support@White Hawk.com</a>
                  </p>
                </div>
              </div>
              <p>
                <strong>EU Representative:</strong> If you are located in the European Economic Area and wish to exercise your rights under the GDPR, you may also contact our designated EU representative at <a href="mailto:eu-representative@White Hawk.com">eu-representative@White Hawk.com</a>.
              </p>
              <p>
                If you believe that your data protection rights have been violated, you have the right to lodge a complaint with a supervisory authority in the EU member state of your habitual residence, place of work, or place of the alleged infringement.
              </p>
              <p className={styles.backLink}>
                <Link href="/">← Back to home</Link>
              </p>
            </section>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
