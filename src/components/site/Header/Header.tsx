"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Radar, ShieldCheck, ClipboardList, Boxes, Layers, Newspaper, Users, Building2 } from "lucide-react";
import styles from "./Header.module.scss";

type NavKind = "link" | "menu";
type NavItem =
  | { kind: "link"; to: string; label: string }
  | {
      kind: "menu";
      label: string;
      key: string;
      items: Array<{ to: string; label: string; description?: string; icon?: React.ComponentType<{ size?: number; className?: string }> }>;
    };

const nav: NavItem[] = [
  {
    kind: "menu",
    key: "platform",
    label: "Platform",
    items: [
      { to: "/platform", label: "Platform overview", description: "How the four modules fit together.", icon: Layers },
      { to: "/platform/offensive", label: "Offensive Security", description: "See the vulnerabilities others can't.", icon: Radar },
      { to: "/platform/defensive", label: "Defensive Security", description: "24/7 detection, response, breach workflows.", icon: ShieldCheck },
      { to: "/platform/grc", label: "GRC System", description: "Audit-ready evidence, on demand.", icon: ClipboardList },
      { to: "/platform/asset-management", label: "Asset Management", description: "One inventory across 9 categories.", icon: Boxes },
    ],
  },
  { kind: "link", to: "/integrations", label: "Integrations" },
  { kind: "link", to: "/partners", label: "Partners" },
  // { kind: "link", to: "/pricing", label: "Pricing" },
  {
    kind: "menu",
    key: "resources",
    label: "Resources",
    items: [
      { to: "/blog", label: "Blog", description: "Field notes from the WhiteHawk team.", icon: Newspaper },
      // { to: "/customers", label: "Customer stories", description: "How real teams ship on WhiteHawk.", icon: Users },
      { to: "/company", label: "Company", description: "About us, mission, leadership.", icon: Building2 },
    ],
  },
  // { kind: "link", to: "/contact", label: "Contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src="/icons/logo/whitehawk-logo.svg"
        alt="WhiteHawk"
        width={141}
        height={16}
        priority
        className={`${styles.logoImg} ${light ? styles.logoImgLight : ""}`}
      />
    </Link>
  );
}

function DesktopMenu({
  item,
  openKey,
  setOpenKey,
}: {
  item: Extract<NavItem, { kind: "menu" }>;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
}) {
  const open = openKey === item.key;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenKey(null);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpenKey(null);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, setOpenKey]);

  return (
    <div ref={ref} className={styles.menuWrap} onMouseEnter={() => setOpenKey(item.key)} onMouseLeave={() => setOpenKey(null)}>
      <button
        type="button"
        onClick={() => setOpenKey(open ? null : item.key)}
        className={styles.menuTrigger}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {item.label}
        <ChevronDown size={14} className={`${styles.menuChevron} ${open ? styles.menuChevronOpen : ""}`} />
        <span className={`${styles.menuUnderline} ${open ? styles.menuUnderlineOpen : ""}`} />
      </button>
      {/*
        The wrapping div below starts flush at top-full (zero gap) and uses
        padding — not margin — to create the visual gap above the card. A
        margin-based gap left a dead hit-testing zone between the trigger and
        the menu: since absolutely-positioned children don't extend a
        position:relative parent's own box, moving the mouse through that gap
        geometrically left the hoverable area entirely, firing onMouseLeave
        and slamming the menu shut before the pointer ever reached it — the
        "glitch" where the submenu flickers/closes while trying to enter it.
        Padding keeps that space part of this element's own hit-testable box,
        so the hover state survives the trip from trigger to menu.
      */}
      <div role="menu" className={`${styles.menuPanelWrap} ${open ? styles.menuPanelWrapOpen : ""}`}>
        <div className={styles.menuPanel}>
          {item.items.map((sub) => {
            const Icon = sub.icon;
            return (
              <Link
                key={sub.to}
                href={sub.to}
                onClick={() => setOpenKey(null)}
                className={styles.menuItem}
                role="menuitem"
              >
                {Icon && (
                  <span className={styles.menuItemIcon}>
                    <Icon size={16} />
                  </span>
                )}
                <span className={styles.menuItemBody}>
                  <span className={styles.menuItemLabel}>{sub.label}</span>
                  {sub.description && <span className={styles.menuItemDescription}>{sub.description}</span>}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenKey(null);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Logo />
        <nav className={styles.nav}>
          {nav.map((n) =>
            n.kind === "link" ? (
              <Link
                key={n.to}
                href={n.to}
                className={`${styles.navLink} ${pathname === n.to ? styles.navLinkActive : ""}`}
              >
                {n.label}
                <span className={`${styles.navLinkUnderline} ${pathname === n.to ? styles.navLinkUnderlineActive : ""}`} />
              </Link>
            ) : (
              <DesktopMenu key={n.key} item={n} openKey={openKey} setOpenKey={setOpenKey} />
            ),
          )}
        </nav>
        <div className={styles.actions}>
          <Link href="/auth" className={styles.signIn}>
            Sign in
          </Link>
          <Link href="/contact" className={styles.cta}>
            Book a Demo
          </Link>
        </div>
        <button
          className={styles.menuToggle}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu size={18} className={`${styles.menuIcon} ${open ? styles.menuIconHidden : styles.menuIconVisible}`} />
          <X size={18} className={`${styles.menuIcon} ${open ? styles.menuIconVisible : styles.menuIconHidden}`} />
        </button>
      </div>
      <div className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}>
        <div className={styles.mobilePanelInner}>
          <div className={styles.mobileList}>
            {nav.map((n) =>
              n.kind === "link" ? (
                <Link key={n.to} href={n.to} onClick={() => setOpen(false)} className={styles.mobileLink}>
                  {n.label}
                </Link>
              ) : (
                <div key={n.key} className={styles.mobileMenuGroup}>
                  <button
                    className={styles.mobileMenuButton}
                    onClick={() => setExpanded((s) => ({ ...s, [n.key]: !s[n.key] }))}
                  >
                    {n.label}
                    <ChevronDown size={14} className={`${styles.mobileChevron} ${expanded[n.key] ? styles.mobileChevronOpen : ""}`} />
                  </button>
                  <div className={`${styles.mobileSubPanel} ${expanded[n.key] ? styles.mobileSubPanelOpen : ""}`}>
                    <div className={styles.mobileSubPanelInner}>
                      <div className={styles.mobileSubList}>
                        {n.items.map((sub) => (
                          <Link
                            key={sub.to}
                            href={sub.to}
                            onClick={() => setOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
            <Link href="/auth" onClick={() => setOpen(false)} className={styles.mobileSignIn}>
              Sign in
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className={styles.mobileCta}>
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
