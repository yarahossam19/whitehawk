"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./NavBar.module.scss";
import logo from "@/../public/assets/icons/logo/whitehawk-logo.svg";
import menuIcon from "@/../public/assets/icons/navbar/menu-icon.svg";
import defensive from "@/../public/assets/icons/navbar/Defensive.svg";
import offensive from "@/../public/assets/icons/navbar/Offensive.svg";
import grc from "@/../public/assets/icons/navbar/GRC.svg";
import assetManagement from "@/../public/assets/icons/navbar/Asset Management.svg";
import fintechCompany from "@/../public/assets/icons/navbar/Money.svg";
import publicSectors from "@/../public/assets/icons/navbar/Gavel.svg";
import healthcareOrganizations from "@/../public/assets/icons/navbar/Hospital.svg";
const PLATFORM_ITEMS: { name: string; description: string; slug: string; icon: string }[] = [
  { name: "Offensive", description: "Identify and simulate real-world attacks", slug: "offensive", icon: offensive },
  { name: "Defensive", description: "Strengthen defenses across systems", slug: "defensive", icon: defensive },
  { name: "GRC", description: "Manage policies, risk, and compliance", slug: "grc", icon: grc },
  { name: "Asset Management", description: "Track, manage, and secure all assets", slug: "asset-management", icon: assetManagement },
];

const SOLUTIONS_ITEMS: { name: string; description: string; slug: string; icon: string }[] = [
  { name: "Fintech Company", description: "Manage risk across financial platforms", slug: "fintech-company", icon: fintechCompany },
  { name: "Public Sectors", description: "Protect critical public infrastructure", slug: "public-sectors", icon: publicSectors },
  { name: "Healthcare Organizations", description: "Protect patient data and systems", slug: "healthcare-organizations", icon: healthcareOrganizations },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`${styles.chevron} ${open ? styles.open : ""}`}
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
    >
      {children}
    </Link>
  );
}

function DropdownItem({
  href,
  name,
  description,
  icon,
}: {
  href: string;
  name: string;
  description: string;
  icon?: string;
}) {
  return (
    <Link href={href} className={styles.dropdownItem}>
      <div className={styles.dropdownItemIcon}>
        {icon ? <Image src={icon} alt="" width={30} height={30} /> : null}
      </div>
      <div className={styles.dropdownItemText}>
        <span className={styles.dropdownItemName}>{name}</span>
        <span className={styles.dropdownItemDesc}>{description}</span>
      </div>
    </Link>
  );  
}

const MOBILE_BREAKPOINT = 901;

export function NavBar() {
  const pathname = usePathname();
  const { openDemoModal } = useDemoModal();
  const [platformOpen, setPlatformOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  const closeAll = useCallback(() => {
    setPlatformOpen(false);
    setSolutionsOpen(false);
  }, []);

  const togglePlatform = useCallback(() => {
    setPlatformOpen((v) => !v);
    setSolutionsOpen(false);
  }, []);

  const toggleSolutions = useCallback(() => {
    setSolutionsOpen((v) => !v);
    setPlatformOpen(false);
  }, []);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobilePlatformOpen(false);
    setMobileSolutionsOpen(false);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isPlatformActive = pathname?.startsWith("/platform");
  const isSolutionsActive = pathname?.startsWith("/solutions");

  return (
    <header className={styles.header}>
      <nav className={styles.nav} role="navigation" aria-label="Main">
        <Link href="/" className={styles.logoWrap}>
          <Image src={logo} alt="WhiteHawk" width={141} height={20} className={styles.logo} />
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={openMobile}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Image src={menuIcon} alt="" width={40} height={40} />
        </button>

        <div className={styles.links}>
          <NavLink href="/" isActive={pathname === "/"}>
            Home
          </NavLink>

          <div className={styles.dropdownWrap}>
            <button
              type="button"
              onClick={togglePlatform}
              aria-expanded={platformOpen}
              aria-haspopup="true"
              aria-controls="platform-menu"
              id="platform-trigger"
              className={`${styles.dropdownTrigger} ${isPlatformActive || platformOpen ? styles.active : ""}`}
            >
              Platform
              <ChevronDown open={platformOpen} />
            </button>
            {platformOpen && (
              <div
                id="platform-menu"
                role="menu"
                className={styles.menu}
                onMouseLeave={closeAll}
              >
                <div className={styles.menuInner}>
                  {PLATFORM_ITEMS.map((item) => (
                    <DropdownItem
                      key={item.slug}
                      href={`/platform/${item.slug}`}
                      name={item.name}
                      description={item.description}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.dropdownWrap}>
            <button
              type="button"
              onClick={toggleSolutions}
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              aria-controls="solutions-menu"
              id="solutions-trigger"
              className={`${styles.dropdownTrigger} ${isSolutionsActive || solutionsOpen ? styles.active : ""}`}
            >
              Solutions
              <ChevronDown open={solutionsOpen} />
            </button>
            {solutionsOpen && (
              <div
                id="solutions-menu"
                role="menu"
                className={styles.menu}
                onMouseLeave={closeAll}
              >
                <div className={styles.menuInner}>
                  {SOLUTIONS_ITEMS.map((item) => (
                    <DropdownItem
                      key={item.slug}
                      href={`/solutions/${item.slug}`}
                      name={item.name}
                      description={item.description}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink href="/partners" isActive={pathname === "/partners"}>
            Partners
          </NavLink>
          <NavLink href="/company" isActive={pathname === "/company"}>
            Company
          </NavLink>
        </div>

        <div className={styles.actions}>
          <PrimaryButton title="Sign in" variant="secondary" href="#" className={styles.signInButton}/>
          <PrimaryButton title="Request a Demo" variant="primary" onClick={openDemoModal} className={styles.requestDemoButton}/>
        </div>
      </nav>

      {/* Mobile overlay menu (Figma: Menu Interface - Tablet View) */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ""}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className={styles.mobileOverlayInner}>
          <button
            type="button"
            className={styles.mobileClose}
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
          <div className={styles.mobileNav}>
            <Link href="/" className={`${styles.mobileNavItem} ${pathname === "/" ? styles.active : ""}`} onClick={closeMobile}>
              Home
            </Link>

            <div className={styles.mobileNavItemWithSub}>
              <button
                type="button"
                className={styles.mobileNavItemTrigger}
                onClick={() => setMobilePlatformOpen((v) => !v)}
                aria-expanded={mobilePlatformOpen}
              >
                Platform
                <ChevronDown open={mobilePlatformOpen} />
              </button>
              {mobilePlatformOpen && (
                <div className={styles.mobileSubNav}>
                  {PLATFORM_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/platform/${item.slug}`}
                      className={styles.mobileSubNavLink}
                      onClick={closeMobile}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.mobileNavItemWithSub}>
              <button
                type="button"
                className={styles.mobileNavItemTrigger}
                onClick={() => setMobileSolutionsOpen((v) => !v)}
                aria-expanded={mobileSolutionsOpen}
              >
                Solutions
                <ChevronDown open={mobileSolutionsOpen} />
              </button>
              {mobileSolutionsOpen && (
                <div className={styles.mobileSubNav}>
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/solutions/${item.slug}`}
                      className={styles.mobileSubNavLink}
                      onClick={closeMobile}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/partners" className={`${styles.mobileNavItem} ${pathname === "/partners" ? styles.active : ""}`} onClick={closeMobile}>
              Partners
            </Link>
            <Link href="/company" className={`${styles.mobileNavItem} ${pathname === "/company" ? styles.active : ""}`} onClick={closeMobile}>
              Company
            </Link>
            <Link href="#" className={styles.mobileNavItem} onClick={closeMobile}>
              Resources
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
