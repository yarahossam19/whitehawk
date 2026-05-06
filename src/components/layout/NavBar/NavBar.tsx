"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useLeadModalOpener } from "@/hooks/useLeadModalOpener";
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

const SOLUTIONS_ITEMS: { name: string; description: string; slug: string; icon: string; subitems?: { name: string; description: string; icon: string }[] }[] = [
  { name: "Fintech Company", description: "Manage risk across financial platforms", slug: "fintech-company", icon: fintechCompany },
  { name: "Public Sectors", description: "Protect critical public infrastructure", slug: "public-sectors", icon: publicSectors },
  { name: "Healthcare Organizations", description: "Protect patient data and systems", slug: "healthcare-organizations", icon: healthcareOrganizations },
];

const INDUSTRY_CATEGORIES: { name: string; subitems: { name: string; description: string; icon: string }[] }[] = [
  {
    name: "Vertical Industries",
    subitems: [
      { name: "Fintech Company", description: "Manage risk across financial platforms", icon: fintechCompany },
      { name: "Public Sectors", description: "Protect critical public infrastructure", icon: publicSectors },
      { name: "Healthcare Organizations", description: "Protect patient data and systems", icon: healthcareOrganizations },
    ],
  },
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
    <Link href={href} className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
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

function SubDropdownItem({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon?: string;
}) {
  return (
    <div className={styles.subDropdownItem}>
      <div className={styles.subDropdownItemIcon}>
        {icon ? <Image src={icon} alt="" width={30} height={30} /> : null}
      </div>
      <div className={styles.subDropdownItemText}>
        <span className={styles.subDropdownItemName}>{name}</span>
        <span className={styles.subDropdownItemDesc}>{description}</span>
      </div>
    </div>
  );
}

const MOBILE_BREAKPOINT = 901;

export function NavBar() {
  const pathname = usePathname();
  const { openFromButtonTitle } = useLeadModalOpener();
  const [platformOpen, setPlatformOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(true);
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
    setMobilePlatformOpen(true);
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isPlatformActive = pathname?.startsWith("/platform");
  const isSolutionsActive = pathname?.startsWith("/solutions");

  return (
    <header className={styles.header}>
      <nav className={styles.nav} role="navigation" aria-label="Main">
        <button
          type="button"
          className={styles.menuToggle}
          onClick={openMobile}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Image src={menuIcon} alt="" width={40} height={40} />
        </button>

        <Link href="/" className={styles.logoWrap}>
          <Image
            src={logo}
            alt="WhiteHawk"
            width={141}
            height={20}
            priority
            fetchPriority="high"
            className={styles.logo}
          />
        </Link>

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
          <PrimaryButton title="Sign in" variant="secondary" href="https://app.whitehawk.io/" target="_blank" className={styles.signInButton} />
          <PrimaryButton
            title="Request a Demo"
            variant="primary"
            onClick={() => openFromButtonTitle("Request a Demo")}
            className={styles.requestDemoButton}
          />
        </div>
      </nav>

      {/* Tablet / mobile: backdrop + drawer from right (Figma 1310:8904 / 1309:7393) */}
      <div
        className={`${styles.drawerRoot} ${mobileOpen ? styles.drawerRootOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={styles.drawerBackdrop}
          aria-label="Close menu"
          onClick={closeMobile}
        />
        <div
          className={`${styles.drawerPanel} ${mobileOpen ? styles.drawerPanelOpen : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button type="button" className={styles.drawerClose} onClick={closeMobile} aria-label="Close menu">
            <CloseIcon />
          </button>
          <div className={styles.drawerScroll}>
            <Link
              href="/"
              className={`${styles.drawerNavItem} ${pathname === "/" ? styles.drawerNavActive : ""}`}
              onClick={closeMobile}
            >
              Home
            </Link>

            <div className={styles.drawerGroup}>
              <button
                type="button"
                className={styles.drawerNavTrigger}
                onClick={() => setMobilePlatformOpen((v) => !v)}
                aria-expanded={mobilePlatformOpen}
              >
                Platform
                <ChevronDown open={mobilePlatformOpen} />
              </button>
              {mobilePlatformOpen && (
                <div className={styles.drawerSubNav}>
                  {PLATFORM_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/platform/${item.slug}`}
                      className={styles.drawerSubLink}
                      onClick={closeMobile}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.drawerGroup}>
              <button
                type="button"
                className={styles.drawerNavTrigger}
                onClick={() => setMobileSolutionsOpen((v) => !v)}
                aria-expanded={mobileSolutionsOpen}
              >
                Solutions
                <ChevronDown open={mobileSolutionsOpen} />
              </button>
              {mobileSolutionsOpen && (
                <div className={styles.drawerSubNav}>
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/solutions/${item.slug}`}
                      className={styles.drawerSubLink}
                      onClick={closeMobile}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/partners"
              className={`${styles.drawerNavItem} ${pathname === "/partners" ? styles.drawerNavActive : ""}`}
              onClick={closeMobile}
            >
              Partners
            </Link>
            <Link
              href="/company"
              className={`${styles.drawerNavItem} ${pathname === "/company" ? styles.drawerNavActive : ""}`}
              onClick={closeMobile}
            >
              Company
            </Link>
            <Link href="#" className={styles.drawerNavItem} onClick={closeMobile}>
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
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
