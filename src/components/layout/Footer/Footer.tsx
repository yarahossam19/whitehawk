"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import whitehawkLogo from "@/../public/assets/icons/logo/whitehawk-logo.svg";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="28" viewBox="0 0 23 28" fill="none" aria-hidden>
      <path d="M14.09 15.5L22 5h-2.3l-6.87 7.98L6.83 5H2l8.2 11.91L2 23h2.3l7.31-8.5L17.17 23H22l-7.91-7.5z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink}>
              <Image src={whitehawkLogo} alt="WhiteHawk" width={169} height={24} />
            </Link>
            <p className={styles.description}>
              Empowering businesses with intelligent, continuous security monitoring. We are your trusted partner in the digital landscape.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="X (Twitter)">
                <XIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <nav className={styles.navColumn}>
            <p className={styles.navHeading}>Home</p>
            <ul className={styles.navList}>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="#">Pricing</Link></li>
              <li><Link href="/company">Company</Link></li>
              <li><Link href="#">Resources</Link></li>
            </ul>
          </nav>

          <nav className={styles.navColumn}>
            <p className={styles.navHeading}>Platform</p>
            <ul className={styles.navList}>
              <li><Link href="#">Offensive</Link></li>
              <li><Link href="#">Defensive</Link></li>
              <li><Link href="#">GRC</Link></li>
              <li><Link href="#">Asset Management</Link></li>
            </ul>
          </nav>

          <nav className={styles.navColumn}>
            <p className={styles.navHeading}>Solutions</p>
            <ul className={styles.navList}>
              <li><Link href="#">Fintech Company</Link></li>
              <li><Link href="#">Public Sectors</Link></li>
              <li><Link href="#">Healthcare Organizations</Link></li>
            </ul>
          </nav>

          <div className={styles.badges} aria-label="Certifications">
            {["ISO 27001", "ISO 9001:2015", "SOC 2", "CREST", "PCI DSS", "GDPR"].map((title) => (
              <div key={title} className={styles.badge} title={title} role="img" aria-label={title} />
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2026 WhiteHawk Security. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
