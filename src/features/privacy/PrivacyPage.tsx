"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./PrivacyPage.module.scss";
import {
  PRIVACY_META,
  TOC_ITEMS,
  SECTION_ICONS,
} from "./privacyData";

export function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <div className={styles.heroIconWrap}>
            <Image
              src={SECTION_ICONS.intro}
              alt=""
              width={20}
              height={20}
              className={styles.heroIcon}
            />
          </div>
          <span className={styles.heroBadgeLabel}>Legal Documentation</span>
        </div>
        <h1 className={styles.title}>Privacy Policy</h1>
        <div className={styles.meta}>
          <span>Effective Date: {PRIVACY_META.effectiveDate}</span>
          <span className={styles.metaSep}>|</span>
          <span>Last Updated: {PRIVACY_META.lastUpdated}</span>
        </div>
      </div>

      <div className={styles.content}>
        <nav className={styles.toc} aria-label="Table of contents">
          <h2 className={styles.tocTitle}>Table of Contents</h2>
          <div className={styles.tocGrid}>
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={styles.tocLink}
              >
                <span className={styles.tocNum}>{item.num}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <section id="intro" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.intro}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 01</span>
              <h2 className={styles.sectionTitle}>Introduction</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk Security (&quot;WhiteHawk,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of your personal information. As a cybersecurity company, we hold ourselves to the highest standards of data protection — the same standards we help our clients achieve.</p>
            <p>This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website (whitehawk.com), use our All-in-One cybersecurity platform, or interact with us through our marketing channels, including &quot;Request a Demo&quot; and &quot;Start Free Trial&quot; forms.</p>
            <p>Our platform provides Offensive Security (vulnerability scanning and penetration testing), Defensive Security (real-time threat monitoring and incident response), Governance, Risk & Compliance (GRC), and Asset Management services. Given the sensitive nature of these operations, this policy specifically addresses how we handle both your personal data and your organizational system data.</p>
            <p>By accessing our website or using our platform, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the terms herein, please discontinue use of our services immediately.</p>
          </div>
        </section>

        <section id="information" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.information}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 02</span>
              <h2 className={styles.sectionTitle}>Information We Collect</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>We collect information through several channels, depending on your interaction with WhiteHawk:</p>
            <div className={styles.greyBox}>
              <h3 className={styles.greyBoxTitle}>2.1 Information You Provide Directly</h3>
              <p><strong>Contact & Account Information:</strong> When you submit a &quot;Request a Demo&quot; or &quot;Start Free Trial&quot; form, we collect your full name, business email address, phone number, company name, job title, and company size.</p>
              <p><strong>Login Credentials:</strong> When you create a WhiteHawk platform account, we collect your email address and a securely hashed password. We also support single sign-on (SSO) authentication through third-party identity providers.</p>
              <p><strong>Payment Information:</strong> For subscription and transaction processing, we collect billing details. Payment card information is processed by our PCI DSS-compliant payment processor and is never stored on our servers.</p>
              <p><strong>Support Communications:</strong> Any information you provide when contacting our support team, including ticket content, email correspondence, and call recordings (with prior consent).</p>
            </div>
            <div className={styles.greyBox}>
              <h3 className={styles.greyBoxTitle}>2.2 Information Collected Automatically</h3>
              <p><strong>User Activity Logs:</strong> We record platform usage data including login timestamps, pages accessed, features used, scan configurations, and report generation activity. This data is used to deliver and improve our services.</p>
              <p><strong>Device & Browser Information:</strong> IP address, browser type, operating system, device identifiers, and referring URLs.</p>
              <p><strong>Cookies & Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and gather analytical data. See Section 08 (Cookie Policy) for details.</p>
            </div>
            <div className={styles.greyBox}>
              <h3 className={styles.greyBoxTitle}>2.3 Client System & Infrastructure Data</h3>
              <p>Given the nature of our cybersecurity services, WhiteHawk processes data related to your organization&apos;s IT infrastructure:</p>
              <p><strong>Vulnerability Scan Data:</strong> Information gathered during offensive security assessments, including open ports, software versions, configuration details, and identified vulnerabilities.</p>
              <p><strong>Asset Inventory Data:</strong> Hardware and software asset information, network topology data, and endpoint configurations collected through our Asset Management module.</p>
              <p><strong>Security Event Data:</strong> Logs, alerts, and telemetry data processed through our Defensive Security module for threat detection and incident response.</p>
              <p><strong>Compliance Data:</strong> Policy documents, audit evidence, risk assessments, and compliance status information managed within our GRC module.</p>
              <div className={styles.callout}>
                <strong>Data Isolation Guarantee:</strong> All client system data is logically isolated in dedicated, tenant-specific environments. No client&apos;s infrastructure data is ever commingled with another client&apos;s data. Access is strictly controlled through role-based access controls (RBAC) and multi-factor authentication (MFA).
              </div>
            </div>
          </div>
        </section>

        <section id="use" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.use}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 03</span>
              <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk processes your information for the following purposes, each grounded in a lawful basis under applicable data protection regulations:</p>
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <h4>Service Delivery</h4>
                <p>To provide our cybersecurity services, including vulnerability scanning, real-time threat monitoring, compliance reporting, and asset management. This constitutes the core performance of our contractual obligations.</p>
              </div>
              <div className={styles.card}>
                <h4>Transaction Processing</h4>
                <p>To process subscriptions, manage billing cycles, issue invoices, and handle refund requests in accordance with our commercial agreements.</p>
              </div>
              <div className={styles.card}>
                <h4>Security Alerts & Reports</h4>
                <p>To send critical security alerts, vulnerability notifications, compliance deadline reminders, and periodic security posture reports as part of our service.</p>
              </div>
              <div className={styles.card}>
                <h4>Platform Improvement</h4>
                <p>To improve our threat detection algorithms, enhance platform performance, and develop new security features. Where possible, this is done using aggregated, anonymized data.</p>
              </div>
              <div className={styles.card}>
                <h4>Communication</h4>
                <p>To respond to your inquiries, provide technical support, and send service-related notifications. Marketing communications are only sent with your explicit consent.</p>
              </div>
              <div className={styles.card}>
                <h4>Legal & Compliance</h4>
                <p>To comply with applicable laws, regulations, and legal processes, and to enforce our Terms of Service and protect our rights and the rights of our users.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="sharing" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.sharing}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 04</span>
              <h2 className={styles.sectionTitle}>Data Sharing & Third Parties</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk does not sell, rent, or trade your personal information or client system data. We share data only in the following limited circumstances:</p>
            <div className={styles.borderList}>
              <div className={styles.borderItem}>
                <h4>4.1 Infrastructure & Service Providers</h4>
                <p>We engage trusted infrastructure providers to host and deliver our platform. These include <strong>Amazon Web Services (AWS)</strong> for cloud infrastructure and compute services, and <strong>Microsoft Azure</strong> for specific service integrations. All sub-processors are bound by strict data processing agreements (DPAs) that require them to protect your data at a level consistent with this policy and applicable laws.</p>
              </div>
              <div className={`${styles.borderItem} ${styles.borderItemAlt}`}>
                <h4>4.2 Technology Partners</h4>
                <p>WhiteHawk integrates with technology partners such as <strong>Edraky</strong> and other cybersecurity ecosystem partners solely for the purpose of enhancing service delivery (e.g., threat intelligence feeds, vulnerability databases). Data shared with partners is limited to what is strictly necessary for service functionality.</p>
              </div>
              <div className={`${styles.borderItem} ${styles.borderItemLight}`}>
                <h4>4.3 Legal & Regulatory Disclosure</h4>
                <p>We may disclose information if required by law, regulation, subpoena, court order, or governmental request. We will notify affected clients of such disclosures to the extent legally permitted.</p>
              </div>
              <div className={`${styles.borderItem} ${styles.borderItemFaint}`}>
                <h4>4.4 Business Transfers</h4>
                <p>In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction. We will provide notice and, where applicable, offer choices before your data is transferred and becomes subject to a different privacy policy.</p>
              </div>
            </div>
            <div className={styles.noteBox}>
              <p>A current list of our sub-processors is available upon request. We will notify existing customers of any material changes to our sub-processor list at least 30 days in advance.</p>
            </div>
          </div>
        </section>

        <section id="international" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.international}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 05</span>
              <h2 className={styles.sectionTitle}>International Data Transfers</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk operates globally and may transfer, store, and process your information in countries other than your country of residence. We are committed to ensuring that all international data transfers comply with applicable data protection laws.</p>
            <div className={styles.greyBox}>
              <h3 className={styles.greyBoxTitle}>GDPR Compliance (European Economic Area)</h3>
              <p>For users and clients in the European Economic Area (EEA), United Kingdom, and Switzerland, WhiteHawk processes personal data in compliance with the General Data Protection Regulation (GDPR). We ensure lawful transfer of data outside the EEA through:</p>
              <p><strong>Standard Contractual Clauses (SCCs):</strong> We execute EU-approved Standard Contractual Clauses with all sub-processors and data recipients located outside the EEA.</p>
              <p><strong>Adequacy Decisions:</strong> Where applicable, we transfer data to countries recognized by the European Commission as providing adequate data protection.</p>
              <p><strong>Data Sovereignty Options:</strong> Enterprise clients may request data residency within specific geographic regions. WhiteHawk supports EU-based data hosting through our AWS and Azure infrastructure.</p>
            </div>
            <div className={styles.greyBox}>
              <h3 className={styles.greyBoxTitle}>Additional Regional Compliance</h3>
              <p><strong>AICPA SOC 2 Type II:</strong> Our platform undergoes annual SOC 2 Type II audits, verifying that our security, availability, processing integrity, confidentiality, and privacy controls meet AICPA standards.</p>
              <p><strong>ISO 27001:</strong> WhiteHawk maintains ISO 27001 certification for our information security management system (ISMS), ensuring systematic management of sensitive company and customer information.</p>
              <p><strong>PCI DSS:</strong> All payment processing is handled in accordance with PCI DSS requirements, ensuring the secure handling of cardholder data.</p>
            </div>
          </div>
        </section>

        <section id="security" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.security}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 06</span>
              <h2 className={styles.sectionTitle}>Data Security & Retention</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>As a cybersecurity company, data security is not merely a compliance requirement — it is foundational to our identity. WhiteHawk implements comprehensive, defense-in-depth security measures to protect the data entrusted to us.</p>
            <div className={styles.cardGrid2x2}>
              <div className={styles.securityCard}>
                <h4>Encryption</h4>
                <p>All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Database-level encryption and key management are handled through dedicated hardware security modules (HSMs).</p>
              </div>
              <div className={styles.securityCard}>
                <h4>Access Controls</h4>
                <p>Strict role-based access controls (RBAC) with mandatory multi-factor authentication (MFA) for all platform access. Privileged access is governed by just-in-time (JIT) provisioning.</p>
              </div>
              <div className={styles.securityCard}>
                <h4>Infrastructure Security</h4>
                <p>Our platform is hosted on SOC 2-certified cloud infrastructure with network segmentation, intrusion detection/prevention systems (IDS/IPS), and continuous security monitoring.</p>
              </div>
              <div className={styles.securityCard}>
                <h4>Security Operations</h4>
                <p>Our internal security team conducts regular penetration testing, vulnerability assessments, and security code reviews. Incident response procedures are tested quarterly.</p>
              </div>
            </div>
            <div className={styles.greyBox}>
              <h3 className={styles.greyBoxTitle}>Data Retention</h3>
              <p><strong>Account Data:</strong> Retained for the duration of your active subscription, plus 90 days following account termination to facilitate data export requests.</p>
              <p><strong>Security Scan & Monitoring Data:</strong> Retained for a default period of 12 months, configurable by the client up to 36 months based on compliance requirements.</p>
              <p><strong>Compliance & Audit Data:</strong> Retained in accordance with applicable regulatory requirements, typically between 5 and 7 years.</p>
              <p><strong>Marketing Contact Data:</strong> Retained until you withdraw consent or request deletion, whichever occurs first.</p>
              <p><strong>Server Logs:</strong> Automatically purged after 180 days unless required for an active investigation or legal hold.</p>
            </div>
          </div>
        </section>

        <section id="rights" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.rights}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 07</span>
              <h2 className={styles.sectionTitle}>Your Rights & Choices</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk respects your data privacy rights. Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
            <div className={styles.rightsList}>
              {[
                { num: 1, title: "Right of Access", desc: "You may request a copy of the personal data we hold about you, including information about how it is processed and to whom it has been disclosed." },
                { num: 2, title: "Right to Rectification", desc: "You may request correction of inaccurate or incomplete personal data. You can also update most account information directly through the WhiteHawk platform." },
                { num: 3, title: "Right to Erasure (Right to Be Forgotten)", desc: "You may request deletion of your personal data, subject to our legal obligations to retain certain records for compliance, tax, or contractual purposes." },
                { num: 4, title: "Right to Data Portability", desc: "You may request that your personal data be provided to you in a structured, commonly used, and machine-readable format." },
                { num: 5, title: "Right to Restrict Processing", desc: "You may request that we limit the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data." },
                { num: 6, title: "Right to Object", desc: "You may object to the processing of your personal data for direct marketing purposes or where processing is based on legitimate interests." },
              ].map((item) => (
                <div key={item.num} className={styles.rightsCard}>
                  <div className={styles.rightsNum}>{item.num}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.borderedBox}>
              <h4>Opt-Out of Marketing Communications</h4>
              <p>You may opt out of receiving promotional emails at any time by:</p>
              <ul>
                <li>Clicking the &quot;Unsubscribe&quot; link in any marketing email.</li>
                <li>Updating your communication preferences in your WhiteHawk account settings.</li>
                <li>Contacting us at <Link href="mailto:privacy@whitehawk.com" className={styles.link}>privacy@whitehawk.com</Link>.</li>
              </ul>
              <p>Please note that opting out of marketing communications does not affect service-related notifications, such as security alerts and compliance reports, which are essential to the delivery of our platform.</p>
            </div>
            <p>To exercise any of these rights, please contact our Data Protection Officer at <Link href="mailto:dpo@whitehawk.com" className={styles.link}>dpo@whitehawk.com</Link>. We will respond to verified requests within 30 days (or within the timeframe required by applicable law). We may request verification of your identity before processing your request to protect against unauthorized access.</p>
          </div>
        </section>

        <section id="cookies" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.cookies}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 08</span>
              <h2 className={styles.sectionTitle}>Cookie Policy</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content.</p>
            <div className={styles.cookieList}>
              <div className={styles.cookieItem}>
                <h4>Strictly Necessary Cookies</h4>
                <p>Required for the operation of our website and platform. These include session cookies, authentication tokens, and security cookies. These cannot be disabled.</p>
              </div>
              <div className={`${styles.cookieItem} ${styles.cookieItem80}`}>
                <h4>Analytical / Performance Cookies</h4>
                <p>Used to collect information about how visitors use our website, including pages visited, time spent, and navigation paths. This data is aggregated and anonymized.</p>
              </div>
              <div className={`${styles.cookieItem} ${styles.cookieItem60}`}>
                <h4>Functional Cookies</h4>
                <p>Used to remember your preferences and settings, such as language, region, and display preferences, to provide a more personalized experience.</p>
              </div>
              <div className={`${styles.cookieItem} ${styles.cookieItem40}`}>
                <h4>Marketing Cookies</h4>
                <p>Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns. These cookies track your activity across websites.</p>
              </div>
            </div>
            <p>You can manage your cookie preferences through your browser settings or through our cookie consent banner displayed on your first visit. For more information, please refer to our full Cookie Policy, accessible via the cookie settings link in the website footer.</p>
          </div>
        </section>

        <section id="changes" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.changes}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 09</span>
              <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>WhiteHawk reserves the right to update this Privacy Policy at any time to reflect changes in our practices, technology, legal requirements, or business operations.</p>
            <p>When we make material changes to this policy, we will:</p>
            <ul>
              <li>Update the &quot;Last Updated&quot; date at the top of this page.</li>
              <li>Provide prominent notice on our website (e.g., a banner notification).</li>
              <li>For material changes affecting existing clients, send email notification at least 30 days prior to the changes taking effect.</li>
              <li>Where required by applicable law, obtain your consent before implementing changes that affect the processing of your personal data.</li>
            </ul>
            <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconWrap}>
              <Image
                src={SECTION_ICONS.contact}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <div>
              <span className={styles.sectionLabel}>SECTION 10</span>
              <h2 className={styles.sectionTitle}>Contact Us</h2>
            </div>
          </div>
          <div className={styles.sectionBody}>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through any of the following channels:</p>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <h4>Data Protection Officer</h4>
                <p><strong>Email:</strong> <Link href="mailto:dpo@whitehawk.com" className={styles.link}>dpo@whitehawk.com</Link></p>
                <p><strong>Subject Line:</strong> Privacy Inquiry — [Your Name]</p>
              </div>
              <div className={styles.contactCard}>
                <h4>General Privacy</h4>
                <p><strong>Email:</strong> <Link href="mailto:privacy@whitehawk.com" className={styles.link}>privacy@whitehawk.com</Link></p>
                <p><strong>Support:</strong> <Link href="mailto:support@whitehawk.com" className={styles.link}>support@whitehawk.com</Link></p>
              </div>
            </div>
            <div className={styles.greyBox}>
              <p><strong>EU Representative:</strong> If you are located in the European Economic Area and wish to exercise your rights under the GDPR, you may also contact our designated EU representative at <Link href="mailto:eu-representative@whitehawk.com" className={styles.link}>eu-representative@whitehawk.com</Link></p>
            </div>
            <p>If you believe that your data protection rights have been violated, you have the right to lodge a complaint with a supervisory authority in the EU member state of your habitual residence, place of work, or place of the alleged infringement.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
