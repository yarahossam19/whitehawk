"use client";

/**
 * AssetInventoryDemo — standalone interactive clone of the Asset Inventory
 * home page, built for embedding on the marketing site.
 *
 * Zero dependency on the product codebase: no API calls, no routing, no
 * internal component library. Only external deps are `react` and
 * `lucide-react`, styled with Tailwind utility classes.
 *
 * Drop this single file into any React + Tailwind project and render
 * `<AssetInventoryDemo />`. All data is mock and all edits are local state
 * (nothing persists past a page refresh) — safe for visitors to click around.
 */

// Tailwind entry, scoped to this folder only (see tailwind-entry.css) — the
// rest of the site is SCSS Modules with Tailwind removed, so without this the
// utility classes below generate no CSS at all.
import "./tailwind-entry.css";

import {
  AlertTriangle,
  Cloud,
  Database,
  Edit,
  Laptop,
  Monitor,
  MoreVertical,
  Network,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Trash2,
  Wifi,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Design tokens — pulled from the real app's globals.css so the demo  */
/* matches production styling despite having no shared CSS.            */
/* ------------------------------------------------------------------ */

const COLOR = {
  primary: "#008fe3",
  primaryHover: "#3fc3e8",
  cardBg: "#ffffff",
  cardBorder: "#e5e5e5",
  panelBg: "#f0f0f0",
  headingText: "#737373",
  valueText: "#262626",
  mutedText: "#8c8c8c",
  danger: "#ea2340",
  low: "#1ba967",
  lowBg: "rgba(0,154,83,0.15)",
  medium: "#ff5900",
  mediumBg: "rgba(255,89,0,0.15)",
  high: "#a32000",
  highBg: "rgba(231,69,30,0.2)",
  critical: "#b6041e",
  criticalBg: "rgba(234,35,64,0.15)",
} as const;

type Severity = "low" | "medium" | "high" | "critical";

const SEVERITY_STYLE: Record<Severity, { bg: string; fg: string }> = {
  low: { bg: COLOR.lowBg, fg: COLOR.low },
  medium: { bg: COLOR.mediumBg, fg: COLOR.medium },
  high: { bg: COLOR.highBg, fg: COLOR.high },
  critical: { bg: COLOR.criticalBg, fg: COLOR.critical },
};

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type IconKey =
  | "cloud"
  | "network"
  | "laptop"
  | "server"
  | "mobile"
  | "database"
  | "printer"
  | "shield"
  | "wifi"
  | "monitor";

interface Category {
  id: string;
  name: string;
  icon: IconKey;
  totalAssets: number;
  newThisMonth: number;
  status: { low: number; medium: number; high: number; critical: number };
  activeRate: number;
  isDefault: boolean;
}

interface VendorAsset {
  id: string;
  name: string;
  type: string;
  severity: Severity;
}

interface Vendor {
  id: string;
  name: string;
  isActive: boolean;
  totalAssets: number;
  criticalAssets: number;
  createdAt: string;
  assets: VendorAsset[];
}

interface ScanRun {
  id: number;
  status: "completed" | "failed" | "running";
  startedAt: string;
  completedAt: string | null;
  errorMessage: string | null;
}

/* ------------------------------------------------------------------ */
/* Icon option list — used for category cards + the create/edit form   */
/* ------------------------------------------------------------------ */

const ICON_OPTIONS: Record<
  IconKey,
  { label: string; Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; tint: string }
> = {
  cloud: { label: "Cloud Infrastructure", Icon: Cloud, tint: "#0A8AE7" },
  network: { label: "Network Devices", Icon: Network, tint: "#1BA967" },
  laptop: { label: "Endpoints & Laptops", Icon: Laptop, tint: "#7C49FA" },
  server: { label: "Servers", Icon: Server, tint: "#008FE3" },
  mobile: { label: "Mobile Devices", Icon: Smartphone, tint: "#DB44FA" },
  database: { label: "Databases", Icon: Database, tint: "#E0A800" },
  printer: { label: "Printers & Peripherals", Icon: Printer, tint: "#F58515" },
  shield: { label: "Security Appliances", Icon: ShieldCheck, tint: "#EA2340" },
  wifi: { label: "Wireless", Icon: Wifi, tint: "#737373" },
  monitor: { label: "Monitors", Icon: Monitor, tint: "#7C49FA" },
};

function tintBg(hex: string) {
  return hex + "33";
}

/* ------------------------------------------------------------------ */
/* Mock data                                                            */
/* ------------------------------------------------------------------ */

const ANCHOR = new Date("2026-07-27T09:00:00Z").getTime();
const HOUR = 60 * 60 * 1000;

function isoOffset(hoursAgo: number) {
  return new Date(ANCHOR - hoursAgo * HOUR).toISOString();
}

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-cloud",
    name: "Cloud Infrastructure",
    icon: "cloud",
    totalAssets: 128,
    newThisMonth: 12,
    status: { low: 92, medium: 24, high: 9, critical: 3 },
    activeRate: 82,
    isDefault: true,
  },
  {
    id: "cat-network",
    name: "Network Devices",
    icon: "network",
    totalAssets: 64,
    newThisMonth: 4,
    status: { low: 40, medium: 15, high: 6, critical: 3 },
    activeRate: 74,
    isDefault: true,
  },
  {
    id: "cat-endpoints",
    name: "Endpoints & Laptops",
    icon: "laptop",
    totalAssets: 342,
    newThisMonth: 28,
    status: { low: 210, medium: 90, high: 30, critical: 12 },
    activeRate: 91,
    isDefault: true,
  },
  {
    id: "cat-servers",
    name: "Servers",
    icon: "server",
    totalAssets: 56,
    newThisMonth: 2,
    status: { low: 30, medium: 18, high: 6, critical: 2 },
    activeRate: 88,
    isDefault: true,
  },
  {
    id: "cat-mobile",
    name: "Mobile Devices",
    icon: "mobile",
    totalAssets: 198,
    newThisMonth: 19,
    status: { low: 140, medium: 40, high: 15, critical: 3 },
    activeRate: 77,
    isDefault: false,
  },
  {
    id: "cat-database",
    name: "Databases",
    icon: "database",
    totalAssets: 24,
    newThisMonth: 1,
    status: { low: 15, medium: 6, high: 2, critical: 1 },
    activeRate: 95,
    isDefault: false,
  },
  {
    id: "cat-printers",
    name: "Printers & Peripherals",
    icon: "printer",
    totalAssets: 41,
    newThisMonth: 0,
    status: { low: 35, medium: 5, high: 1, critical: 0 },
    activeRate: 68,
    isDefault: false,
  },
  {
    id: "cat-security",
    name: "Security Appliances",
    icon: "shield",
    totalAssets: 18,
    newThisMonth: 3,
    status: { low: 10, medium: 5, high: 2, critical: 1 },
    activeRate: 99,
    isDefault: false,
  },
];

function vendorAssets(prefix: string, type: string, count: number): VendorAsset[] {
  const severities: Severity[] = ["low", "low", "low", "medium", "medium", "high", "critical"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    name: `${prefix.toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
    type,
    severity: severities[i % severities.length],
  }));
}

const INITIAL_VENDORS: Vendor[] = [
  {
    id: "ven-cisco",
    name: "Cisco Systems",
    isActive: true,
    totalAssets: 86,
    criticalAssets: 4,
    createdAt: "2023-02-14T00:00:00Z",
    assets: vendorAssets("csc", "Network Switch", 6),
  },
  {
    id: "ven-dell",
    name: "Dell Technologies",
    isActive: true,
    totalAssets: 214,
    criticalAssets: 9,
    createdAt: "2022-11-03T00:00:00Z",
    assets: vendorAssets("dl", "Laptop", 7),
  },
  {
    id: "ven-paloalto",
    name: "Palo Alto Networks",
    isActive: true,
    totalAssets: 32,
    criticalAssets: 2,
    createdAt: "2024-01-22T00:00:00Z",
    assets: vendorAssets("pa", "Firewall", 5),
  },
  {
    id: "ven-azure",
    name: "Microsoft Azure",
    isActive: true,
    totalAssets: 156,
    criticalAssets: 6,
    createdAt: "2021-08-19T00:00:00Z",
    assets: vendorAssets("az", "Cloud VM", 6),
  },
  {
    id: "ven-fortinet",
    name: "Fortinet",
    isActive: false,
    totalAssets: 47,
    criticalAssets: 3,
    createdAt: "2023-06-30T00:00:00Z",
    assets: vendorAssets("fnt", "Security Appliance", 4),
  },
  {
    id: "ven-hp",
    name: "HP Inc.",
    isActive: true,
    totalAssets: 68,
    criticalAssets: 1,
    createdAt: "2022-04-11T00:00:00Z",
    assets: vendorAssets("hp", "Printer", 4),
  },
];

const INITIAL_SCAN_RUNS: ScanRun[] = [
  { id: 42, status: "completed", startedAt: isoOffset(2), completedAt: isoOffset(1.9), errorMessage: null },
  { id: 41, status: "completed", startedAt: isoOffset(26), completedAt: isoOffset(25.85), errorMessage: null },
  { id: 40, status: "failed", startedAt: isoOffset(50), completedAt: isoOffset(49.9), errorMessage: "Timed out connecting to vendor API" },
  { id: 39, status: "completed", startedAt: isoOffset(74), completedAt: isoOffset(73.8), errorMessage: null },
  { id: 38, status: "completed", startedAt: isoOffset(98), completedAt: isoOffset(97.9), errorMessage: null },
  { id: 37, status: "completed", startedAt: isoOffset(122), completedAt: isoOffset(121.85), errorMessage: null },
  { id: 36, status: "failed", startedAt: isoOffset(146), completedAt: isoOffset(145.95), errorMessage: "Credential rejected by scanner" },
  { id: 35, status: "completed", startedAt: isoOffset(170), completedAt: isoOffset(169.8), errorMessage: null },
  { id: 34, status: "completed", startedAt: isoOffset(194), completedAt: isoOffset(193.9), errorMessage: null },
  { id: 33, status: "completed", startedAt: isoOffset(218), completedAt: isoOffset(217.85), errorMessage: null },
  { id: 32, status: "completed", startedAt: isoOffset(242), completedAt: isoOffset(241.9), errorMessage: null },
  { id: 31, status: "completed", startedAt: isoOffset(266), completedAt: isoOffset(265.8), errorMessage: null },
  { id: 30, status: "failed", startedAt: isoOffset(290), completedAt: isoOffset(289.9), errorMessage: "Network unreachable" },
  { id: 29, status: "completed", startedAt: isoOffset(314), completedAt: isoOffset(313.85), errorMessage: null },
  { id: 28, status: "completed", startedAt: isoOffset(338), completedAt: isoOffset(337.9), errorMessage: null },
  { id: 27, status: "completed", startedAt: isoOffset(362), completedAt: isoOffset(361.8), errorMessage: null },
  { id: 26, status: "completed", startedAt: isoOffset(386), completedAt: isoOffset(385.9), errorMessage: null },
  { id: 25, status: "completed", startedAt: isoOffset(410), completedAt: isoOffset(409.85), errorMessage: null },
  { id: 24, status: "completed", startedAt: isoOffset(434), completedAt: isoOffset(433.9), errorMessage: null },
  { id: 23, status: "completed", startedAt: isoOffset(458), completedAt: isoOffset(457.8), errorMessage: null },
];

/* ------------------------------------------------------------------ */
/* Small shared building blocks                                        */
/* ------------------------------------------------------------------ */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatDateShort(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDuration(startIso: string, endIso: string | null) {
  if (!endIso) return "—";
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return "—";
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

function PrimaryButton({
  children,
  onClick,
  variant = "solid",
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    solid: "text-white shadow-sm",
    ghost: "border border-[#d9d9d9] text-[#595959] hover:bg-[#f5f5f5]",
    danger: "bg-[#ea2340] text-white hover:bg-[#c81d37]",
  } as const;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(base, styles[variant])}
      style={
        variant === "solid"
          ? { backgroundColor: COLOR.primary }
          : undefined
      }
      onMouseEnter={(e) => {
        if (variant === "solid") e.currentTarget.style.backgroundColor = COLOR.primaryHover;
      }}
      onMouseLeave={(e) => {
        if (variant === "solid") e.currentTarget.style.backgroundColor = COLOR.primary;
      }}
    >
      {children}
    </button>
  );
}

function SeverityBadge({ severity, label }: { severity: Severity; label: string }) {
  const s = SEVERITY_STYLE[severity];
  return (
    <span
      className="rounded px-1.5 py-0.5 text-[10px] font-medium leading-tight"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Stat cards row                                                       */
/* ------------------------------------------------------------------ */

function ProgressRing({ percentage }: { percentage: number }) {
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative h-[65px] w-[65px] shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e5f4ec" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={COLOR.low}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold" style={{ color: COLOR.low }}>
        {percentage}%
      </div>
    </div>
  );
}

function StatCard({
  icon,
  iconTint,
  title,
  value,
  unit,
  change,
  progress,
  linkText,
}: {
  icon: React.ReactNode;
  iconTint: string;
  title: string;
  value: number | string;
  unit: string;
  change?: string;
  progress?: number;
  linkText?: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border p-2" style={{ backgroundColor: COLOR.panelBg, borderColor: COLOR.cardBorder }}>
      <div className="mb-1 flex items-center gap-1.5">
        <div
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: iconTint + "1a" }}
        >
          <span style={{ color: iconTint }}>{icon}</span>
        </div>
        <span className="truncate text-xs font-semibold" style={{ color: COLOR.valueText }}>
          {title}
        </span>
      </div>
      <div className="flex min-h-[80px] items-center justify-center gap-6 rounded-lg bg-white/60 p-2">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-end justify-center gap-1">
            <h2 className="text-3xl font-semibold leading-none" style={{ color: COLOR.valueText }}>
              {value}
            </h2>
            <span className="pb-0.5 text-sm" style={{ color: COLOR.mutedText }}>
              {unit}
            </span>
          </div>
          {change && <span className="text-xs" style={{ color: COLOR.low }}>{change}</span>}
          {linkText && (
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs underline" style={{ color: COLOR.primary }}>
              {linkText}
            </a>
          )}
        </div>
        {progress !== undefined && <ProgressRing percentage={progress} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Category card + grid                                                */
/* ------------------------------------------------------------------ */

function CategoryCardView({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const opt = ICON_OPTIONS[category.icon];
  const Icon = opt.Icon;

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <div className="flex flex-col gap-5 rounded-2xl border p-3" style={{ borderColor: COLOR.cardBorder, backgroundColor: COLOR.cardBg }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div
            className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: tintBg(opt.tint) }}
          >
            <Icon size={18} className="" />
          </div>
          <span className="truncate font-bold" style={{ color: COLOR.valueText }}>
            {category.name}
          </span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded p-1 text-[#8c8c8c] hover:bg-[#f0f0f0]"
            aria-label="Category actions"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-full z-10 min-w-[150px] rounded-lg border bg-white p-2 shadow-lg"
              style={{ borderColor: COLOR.cardBorder }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-[#f5f5f5]"
                style={{ color: COLOR.valueText }}
              >
                <Edit size={16} /> Edit
              </button>
              {!category.isDefault && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-[#f5f5f5]"
                  style={{ color: COLOR.danger }}
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-end gap-1">
            <h2 className="text-3xl font-semibold leading-none" style={{ color: COLOR.valueText }}>
              {category.totalAssets}
            </h2>
            <span className="pb-0.5 text-xs" style={{ color: COLOR.headingText }}>
              Assets
            </span>
          </div>
          {category.newThisMonth > 0 && (
            <span className="text-xs" style={{ color: COLOR.low }}>
              +{category.newThisMonth} This Month↑
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <SeverityBadge severity="low" label={`Low ${category.status.low}`} />
          <SeverityBadge severity="medium" label={`Medium ${category.status.medium}`} />
          <SeverityBadge severity="high" label={`High ${category.status.high}`} />
          <SeverityBadge severity="critical" label={`Critical ${category.status.critical}`} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold" style={{ color: COLOR.headingText }}>
            Active Asset Rate
          </span>
          <span className="text-xs font-semibold" style={{ color: COLOR.valueText }}>
            {category.activeRate}%
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#e5e5e5]">
          <div className="h-full rounded-full" style={{ width: `${category.activeRate}%`, backgroundColor: COLOR.low }} />
        </div>
      </div>
    </div>
  );
}

function AddCategoryTile({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[260px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-[#8c8c8c] hover:bg-[#fafafa]"
      style={{ borderColor: COLOR.cardBorder }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: tintBg(COLOR.primary) }}>
        <Plus size={22} style={{ color: COLOR.primary }} />
      </div>
      <span className="text-sm font-medium">Add Category</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Vendor table                                                         */
/* ------------------------------------------------------------------ */

function VendorRow({
  vendor,
  onOpenAssets,
  onEdit,
  onDelete,
}: {
  vendor: Vendor;
  onOpenAssets: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <tr onClick={onOpenAssets} className="cursor-pointer border-b last:border-b-0 hover:bg-[#f9fafb]" style={{ borderColor: COLOR.cardBorder }}>
      <td className="px-3 py-2.5 text-sm font-medium" style={{ color: COLOR.valueText }}>
        <span className="flex items-center gap-2">
          {vendor.name}
          {!vendor.isActive && (
            <span className="rounded bg-[#f0f0f0] px-1.5 py-0.5 text-[10px] font-medium text-[#8c8c8c]">Inactive</span>
          )}
        </span>
      </td>
      <td className="px-3 py-2.5 text-sm" style={{ color: COLOR.valueText }}>
        {vendor.totalAssets}
      </td>
      <td className="px-3 py-2.5 text-sm" style={{ color: COLOR.valueText }}>
        {vendor.criticalAssets}
      </td>
      <td className="px-3 py-2.5 text-sm" style={{ color: COLOR.valueText }}>
        {formatDateShort(vendor.createdAt)}
      </td>
      <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="relative inline-block" ref={menuRef}>
          <button onClick={() => setMenuOpen((v) => !v)} className="rounded p-1 text-[#8c8c8c] hover:bg-[#f0f0f0]" aria-label="Vendor actions">
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-full z-10 min-w-[130px] rounded-lg border bg-white p-2 text-left shadow-lg"
              style={{ borderColor: COLOR.cardBorder }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-[#f5f5f5]"
                style={{ color: COLOR.valueText }}
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-[#f5f5f5]"
                style={{ color: COLOR.danger }}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/* Scan history                                                         */
/* ------------------------------------------------------------------ */

function scanVariant(status: ScanRun["status"]): Severity {
  if (status === "completed") return "low";
  if (status === "failed") return "critical";
  return "medium";
}

const SCAN_PAGE_SIZE = 8;

function ScanHistoryTab({ runs, onSync, syncing }: { runs: ScanRun[]; onSync: () => void; syncing: boolean }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(runs.length / SCAN_PAGE_SIZE));
  const pageRuns = runs.slice((page - 1) * SCAN_PAGE_SIZE, page * SCAN_PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="rounded-2xl border p-4" style={{ backgroundColor: COLOR.cardBg, borderColor: COLOR.cardBorder }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold" style={{ color: COLOR.valueText }}>
          Sync Assets History
        </h3>
        <button
          type="button"
          disabled={syncing}
          onClick={onSync}
          className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
          style={{ color: "#2563eb", backgroundColor: "rgba(37,99,235,0.07)", borderColor: "rgba(37,99,235,0.35)" }}
        >
          <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Syncing..." : "Sync Assets"}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[640px]">
          <div
            className="grid items-center gap-3 border-b px-3 py-2 text-[11px] font-semibold uppercase tracking-wide"
            style={{ gridTemplateColumns: "56px 130px 130px 130px 80px 1fr", color: COLOR.mutedText, borderColor: COLOR.cardBorder }}
          >
            <span>Run</span>
            <span>Status</span>
            <span>Started</span>
            <span>Completed</span>
            <span>Duration</span>
            <span>Error</span>
          </div>
          {pageRuns.length === 0 && (
            <div className="px-3 py-6 text-center text-sm" style={{ color: COLOR.mutedText }}>
              No sync runs yet.
            </div>
          )}
          {pageRuns.map((run) => {
            const variant = scanVariant(run.status);
            const style = SEVERITY_STYLE[variant];
            const running = run.status === "running";
            return (
              <div
                key={run.id}
                className="grid items-center gap-3 border-b px-3 py-2.5 text-[13px] last:border-b-0"
                style={{ gridTemplateColumns: "56px 130px 130px 130px 80px 1fr", color: COLOR.valueText, borderColor: COLOR.cardBorder }}
              >
                <span className="font-semibold" style={{ color: COLOR.mutedText }}>
                  #{run.id}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs capitalize" style={{ color: style.fg }}>
                  <span className="relative flex h-1.5 w-1.5">
                    {running && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: style.fg }} />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: style.fg }} />
                  </span>
                  {run.status}
                </span>
                <span>{formatDateTime(run.startedAt)}</span>
                <span>{formatDateTime(run.completedAt)}</span>
                <span>{formatDuration(run.startedAt, run.completedAt)}</span>
                <span className="truncate" style={{ color: run.errorMessage ? COLOR.critical : COLOR.valueText }} title={run.errorMessage || undefined}>
                  {run.errorMessage || "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-4 text-[13px]" style={{ color: COLOR.mutedText }}>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border px-2.5 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: COLOR.cardBorder, color: COLOR.valueText }}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border px-2.5 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: COLOR.cardBorder, color: COLOR.valueText }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modals                                                               */
/* ------------------------------------------------------------------ */

function ModalShell({ title, onClose, children, width = "max-w-md" }: { title: string; onClose: () => void; children: React.ReactNode; width?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className={cx("w-full rounded-2xl bg-white p-5 shadow-xl", width)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: COLOR.valueText }}>
            {title}
          </h3>
          <button onClick={onClose} className="rounded p-1 text-[#8c8c8c] hover:bg-[#f0f0f0]" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CategoryFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial: Category | null;
  onClose: () => void;
  onSubmit: (data: { name: string; icon: IconKey }) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState<IconKey>(initial?.icon ?? "cloud");

  return (
    <ModalShell title={initial ? "Edit Category" : "Add Category"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onSubmit({ name: name.trim(), icon });
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: COLOR.headingText }}>
            Category Name
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. IoT Devices"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#008fe3]"
            style={{ borderColor: COLOR.cardBorder }}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: COLOR.headingText }}>
            Icon
          </label>
          <div className="grid grid-cols-5 gap-2">
            {(Object.keys(ICON_OPTIONS) as IconKey[]).map((key) => {
              const opt = ICON_OPTIONS[key];
              const Icon = opt.Icon;
              const active = icon === key;
              return (
                <button
                  type="button"
                  key={key}
                  title={opt.label}
                  onClick={() => setIcon(key)}
                  className={cx(
                    "flex h-11 items-center justify-center rounded-lg border-2 transition-colors",
                    active ? "border-[#008fe3]" : "border-transparent"
                  )}
                  style={{ backgroundColor: tintBg(opt.tint) }}
                >
                  <Icon size={18} style={{ color: opt.tint }} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <PrimaryButton variant="ghost" onClick={onClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton type="submit">{initial ? "Save Changes" : "Add Category"}</PrimaryButton>
        </div>
      </form>
    </ModalShell>
  );
}

function VendorFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial: Vendor | null;
  onClose: () => void;
  onSubmit: (data: { name: string; isActive: boolean }) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  return (
    <ModalShell title={initial ? "Edit Vendor" : "Add Vendor"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onSubmit({ name: name.trim(), isActive });
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: COLOR.headingText }}>
            Vendor Name
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Juniper Networks"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#008fe3]"
            style={{ borderColor: COLOR.cardBorder }}
          />
        </div>
        <label className="flex items-center gap-2 text-sm" style={{ color: COLOR.valueText }}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4" />
          Active vendor
        </label>
        <div className="mt-2 flex justify-end gap-2">
          <PrimaryButton variant="ghost" onClick={onClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton type="submit">{initial ? "Save Changes" : "Add Vendor"}</PrimaryButton>
        </div>
      </form>
    </ModalShell>
  );
}

function DeleteConfirmModal({ label, onClose, onConfirm }: { label: string; onClose: () => void; onConfirm: () => void }) {
  return (
    <ModalShell title="Confirm Deletion" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 rounded-lg p-3" style={{ backgroundColor: COLOR.criticalBg }}>
          <AlertTriangle size={20} style={{ color: COLOR.critical }} className="mt-0.5 shrink-0" />
          <p className="text-sm" style={{ color: COLOR.valueText }}>
            Are you sure you want to delete <strong>{label}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <PrimaryButton variant="ghost" onClick={onClose}>
            Cancel
          </PrimaryButton>
          <PrimaryButton variant="danger" onClick={onConfirm}>
            Delete
          </PrimaryButton>
        </div>
      </div>
    </ModalShell>
  );
}

function VendorAssetsModal({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  return (
    <ModalShell title={`${vendor.name} — Assets`} onClose={onClose} width="max-w-lg">
      <div className="max-h-[400px] overflow-y-auto rounded-lg border" style={{ borderColor: COLOR.cardBorder }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase" style={{ color: COLOR.mutedText, borderColor: COLOR.cardBorder }}>
              <th className="px-3 py-2 font-medium">Asset</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Severity</th>
            </tr>
          </thead>
          <tbody>
            {vendor.assets.map((a) => (
              <tr key={a.id} className="border-b last:border-b-0" style={{ borderColor: COLOR.cardBorder }}>
                <td className="px-3 py-2 font-medium" style={{ color: COLOR.valueText }}>
                  {a.name}
                </td>
                <td className="px-3 py-2" style={{ color: COLOR.valueText }}>
                  {a.type}
                </td>
                <td className="px-3 py-2">
                  <SeverityBadge severity={a.severity} label={a.severity[0].toUpperCase() + a.severity.slice(1)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalShell>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

type Tab = "categories" | "vendors" | "scan_history";
type DeleteTarget = { type: "category" | "vendor"; id: string; label: string } | null;

let nextCategoryId = 100;
let nextVendorId = 100;
let nextScanId = 43;

export default function AssetInventoryDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("categories");
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [scanRuns, setScanRuns] = useState<ScanRun[]>(INITIAL_SCAN_RUNS);
  const [syncing, setSyncing] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<"all" | "default" | "custom">("all");
  const [categorySearch, setCategorySearch] = useState("");

  const [categoryModal, setCategoryModal] = useState<{ open: boolean; data: Category | null }>({ open: false, data: null });
  const [vendorModal, setVendorModal] = useState<{ open: boolean; data: Vendor | null }>({ open: false, data: null });
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);
  const [viewingVendor, setViewingVendor] = useState<Vendor | null>(null);

  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchesTab = categoryFilter === "all" || (categoryFilter === "default" ? c.isDefault : !c.isDefault);
      const matchesSearch = !categorySearch || c.name.toLowerCase().includes(categorySearch.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [categories, categoryFilter, categorySearch]);

  const totals = useMemo(() => {
    const totalAssets = categories.reduce((sum, c) => sum + c.totalAssets, 0);
    const newThisMonth = categories.reduce((sum, c) => sum + c.newThisMonth, 0);
    const criticalTotal = categories.reduce((sum, c) => sum + c.status.critical, 0);
    const avgActiveRate = categories.length
      ? Math.round(categories.reduce((sum, c) => sum + c.activeRate, 0) / categories.length)
      : 0;
    const disabled = Math.max(0, Math.round(totalAssets * 0.06));
    return { totalAssets, newThisMonth, criticalTotal, avgActiveRate, disabled };
  }, [categories]);

  const vendorTotals = useMemo(() => {
    const total = vendors.length;
    const active = vendors.filter((v) => v.isActive).length;
    const criticalVendors = vendors.filter((v) => v.criticalAssets > 0).length;
    return { total, active, criticalVendors, activeRate: total ? Math.round((active / total) * 100) : 0 };
  }, [vendors]);

  function handleSync() {
    if (syncing) return;
    setSyncing(true);
    const runningRun: ScanRun = { id: nextScanId++, status: "running", startedAt: new Date().toISOString(), completedAt: null, errorMessage: null };
    setScanRuns((prev) => [runningRun, ...prev]);
    syncTimeoutRef.current = setTimeout(() => {
      setScanRuns((prev) =>
        prev.map((r) =>
          r.id === runningRun.id
            ? { ...r, status: "completed", completedAt: new Date().toISOString() }
            : r
        )
      );
      setSyncing(false);
    }, 2600);
  }

  function handleAddOrEditCategory(data: { name: string; icon: IconKey }) {
    if (categoryModal.data) {
      const id = categoryModal.data.id;
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: data.name, icon: data.icon } : c)));
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: `cat-new-${nextCategoryId++}`,
          name: data.name,
          icon: data.icon,
          totalAssets: 0,
          newThisMonth: 0,
          status: { low: 0, medium: 0, high: 0, critical: 0 },
          activeRate: 0,
          isDefault: false,
        },
      ]);
    }
    setCategoryModal({ open: false, data: null });
  }

  function handleAddOrEditVendor(data: { name: string; isActive: boolean }) {
    if (vendorModal.data) {
      const id = vendorModal.data.id;
      setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, name: data.name, isActive: data.isActive } : v)));
    } else {
      setVendors((prev) => [
        ...prev,
        {
          id: `ven-new-${nextVendorId++}`,
          name: data.name,
          isActive: data.isActive,
          totalAssets: 0,
          criticalAssets: 0,
          createdAt: new Date().toISOString(),
          assets: [],
        },
      ]);
    }
    setVendorModal({ open: false, data: null });
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.type === "category") {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    } else {
      setVendors((prev) => prev.filter((v) => v.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  }

  function resetDemo() {
    setCategories(INITIAL_CATEGORIES);
    setVendors(INITIAL_VENDORS);
    setScanRuns(INITIAL_SCAN_RUNS);
    setSyncing(false);
    setActiveTab("categories");
    setCategoryFilter("all");
    setCategorySearch("");
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
  }

  return (
    // `asset-inventory-demo` is the scope hook demo-base.css hangs its
    // Preflight stand-ins off — keep it on the root element.
    <div
      className="asset-inventory-demo mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-4 p-4 font-sans"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Top panel */}
      <div className="rounded-2xl border p-4" style={{ backgroundColor: COLOR.cardBg, borderColor: COLOR.cardBorder }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[22px] font-bold" style={{ color: COLOR.headingText }}>
              Assets Inventory
            </h2>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={{ backgroundColor: tintBg(COLOR.primary), color: COLOR.primary }}
            >
              Interactive Demo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium hover:bg-[#f5f5f5]"
              style={{ color: COLOR.mutedText }}
              title="Reset demo data"
            >
              <RotateCcw size={14} /> Reset
            </button>
            {activeTab === "vendors" && (
              <PrimaryButton onClick={() => setVendorModal({ open: true, data: null })}>
                <Plus size={16} /> Add Vendor
              </PrimaryButton>
            )}
            {activeTab === "categories" && (
              <PrimaryButton onClick={() => setCategoryModal({ open: true, data: null })}>
                <Plus size={16} /> Add Category
              </PrimaryButton>
            )}
          </div>
        </div>
        <p className="mb-3 mt-1 text-sm" style={{ color: COLOR.mutedText }}>
          Manage your organization&apos;s IT assets and infrastructure
        </p>
        <div className="flex w-full max-w-[340px] gap-1 rounded-lg bg-[#eeeeee] p-1">
          {(
            [
              { key: "categories", label: "Categories" },
              { key: "vendors", label: "Vendors" },
              { key: "scan_history", label: "Scan History" },
            ] as { key: Tab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cx(
                "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.key ? "bg-white font-bold shadow-sm" : "text-[#737373] hover:text-[#262626]"
              )}
              style={{ color: activeTab === tab.key ? COLOR.headingText : undefined }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories tab */}
      {activeTab === "categories" && (
        <>
          <div className="grid grid-cols-1 gap-4 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: COLOR.cardBg, borderColor: COLOR.cardBorder }}>
            <StatCard
              icon={<Database size={15} />}
              iconTint="#0A8AE7"
              title="Total Assets"
              value={totals.totalAssets}
              unit="Assets"
              change={totals.newThisMonth > 0 ? `+${totals.newThisMonth} This Month↑` : undefined}
            />
            <StatCard
              icon={<ShieldCheck size={15} />}
              iconTint="#1BA967"
              title="Active Assets"
              value={Math.round(totals.totalAssets * (totals.avgActiveRate / 100))}
              unit="Active"
              progress={totals.avgActiveRate}
            />
            <StatCard
              icon={<AlertTriangle size={15} />}
              iconTint="#EA2340"
              title="Disabled Assets"
              value={totals.disabled}
              unit="Assets"
              linkText="View disabled assets"
            />
          </div>

          <div className="rounded-2xl border p-4" style={{ backgroundColor: COLOR.cardBg, borderColor: COLOR.cardBorder }}>
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLOR.mutedText }} />
                <input
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full rounded-lg border bg-[#f7f7f7] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#008fe3]"
                  style={{ borderColor: COLOR.cardBorder }}
                />
              </div>
              <div className="flex gap-1 text-sm">
                {(
                  [
                    { key: "all", label: "All" },
                    { key: "default", label: "Default Category" },
                    { key: "custom", label: "Custom Category" },
                  ] as { key: typeof categoryFilter; label: string }[]
                ).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setCategoryFilter(t.key)}
                    className={cx(
                      "border-b-2 px-2 pb-1 text-xs font-medium sm:text-sm",
                      categoryFilter === t.key ? "border-[#008fe3]" : "border-transparent text-[#8c8c8c]"
                    )}
                    style={{ color: categoryFilter === t.key ? COLOR.valueText : undefined }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <CategoryCardView
                  key={category.id}
                  category={category}
                  onEdit={() => setCategoryModal({ open: true, data: category })}
                  onDelete={() => setDeleteTarget({ type: "category", id: category.id, label: category.name })}
                />
              ))}
              {categoryFilter !== "default" && <AddCategoryTile onClick={() => setCategoryModal({ open: true, data: null })} />}
            </div>
            {filteredCategories.length === 0 && (
              <p className="py-6 text-center text-sm" style={{ color: COLOR.mutedText }}>
                No categories match your search.
              </p>
            )}
          </div>
        </>
      )}

      {/* Vendors tab */}
      {activeTab === "vendors" && (
        <>
          <div className="grid grid-cols-1 gap-4 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: COLOR.cardBg, borderColor: COLOR.cardBorder }}>
            <StatCard icon={<Database size={15} />} iconTint="#0A8AE7" title="Total Vendors" value={vendorTotals.total} unit="Vendors" />
            <StatCard
              icon={<ShieldCheck size={15} />}
              iconTint="#1BA967"
              title="Active Vendors"
              value={vendorTotals.active}
              unit="Active"
              progress={vendorTotals.activeRate}
            />
            <StatCard
              icon={<AlertTriangle size={15} />}
              iconTint="#EA2340"
              title="Vendors With Critical Assets"
              value={vendorTotals.criticalVendors}
              unit="Vendors"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border" style={{ backgroundColor: COLOR.cardBg, borderColor: COLOR.cardBorder }}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: COLOR.cardBorder }}>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ color: COLOR.valueText }}>
                      Vendor Name
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ color: COLOR.valueText }}>
                      Total Assets
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ color: COLOR.valueText }}>
                      Total Critical Assets
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ color: COLOR.valueText }}>
                      Created Date
                    </th>
                    <th className="px-3 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <VendorRow
                      key={vendor.id}
                      vendor={vendor}
                      onOpenAssets={() => setViewingVendor(vendor)}
                      onEdit={() => setVendorModal({ open: true, data: vendor })}
                      onDelete={() => setDeleteTarget({ type: "vendor", id: vendor.id, label: vendor.name })}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {vendors.length === 0 && (
              <p className="py-8 text-center text-sm" style={{ color: COLOR.mutedText }}>
                No vendors yet — add one to get started.
              </p>
            )}
          </div>
        </>
      )}

      {/* Scan history tab */}
      {activeTab === "scan_history" && <ScanHistoryTab runs={scanRuns} onSync={handleSync} syncing={syncing} />}

      <p className="pb-2 text-center text-xs" style={{ color: COLOR.mutedText }}>
        All data shown is illustrative and resets on refresh — nothing here is connected to a real account.
      </p>

      {/* Modals */}
      {categoryModal.open && (
        <CategoryFormModal
          initial={categoryModal.data}
          onClose={() => setCategoryModal({ open: false, data: null })}
          onSubmit={handleAddOrEditCategory}
        />
      )}
      {vendorModal.open && (
        <VendorFormModal initial={vendorModal.data} onClose={() => setVendorModal({ open: false, data: null })} onSubmit={handleAddOrEditVendor} />
      )}
      {deleteTarget && (
        <DeleteConfirmModal label={deleteTarget.label} onClose={() => setDeleteTarget(null)} onConfirm={handleConfirmDelete} />
      )}
      {viewingVendor && <VendorAssetsModal vendor={viewingVendor} onClose={() => setViewingVendor(null)} />}
    </div>
  );
}
