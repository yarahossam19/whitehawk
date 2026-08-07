import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";
import { Logo } from "../Header/Header";
import styles from "./Footer.module.scss";

function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.163 519.284ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.828Z" />
    </svg>
  );
}

const socials = [
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/thewhiteguard/posts/?feedView=all" },
  { Icon: XLogo, label: "X", href: "https://x.com/WHITEGUARDLTD" },
  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/WHITEGUARD.IO" },
] as const;

const cols = [
  {
    title: "Platform",
    links: [
      { to: "/platform", label: "Overview" },
      { to: "/platform/offensive", label: "Offensive Security" },
      { to: "/platform/defensive", label: "Defensive Security" },
      { to: "/platform/grc", label: "GRC System" },
      { to: "/platform/asset-management", label: "Asset Management" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { to: "/integrations", label: "Integrations" },
      { to: "/partners", label: "Partners" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/customers", label: "Customer stories" },
      { to: "/company", label: "Company" },
    ],
  },
  {
    title: "Contact",
    links: [
      { to: "/contact", label: "Book a Demo" },
      { to: "/contact", label: "Talk to sales" },
      { to: "/auth", label: "Sign in" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <Logo />
            <p className={styles.blurb}>
              One platform to run your entire security program — offensive, defensive, GRC and asset management.
            </p>
            <div className={styles.social}>
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className={styles.colTitle}>{c.title}</div>
              <ul className={styles.colList}>
                {c.links.map((l, i) => (
                  <li key={i}>
                    <Link href={l.to} className={styles.colLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <div>© {new Date().getFullYear()} WhiteHawk Security, Inc. All rights reserved.</div>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy</Link>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
