import type { KanbanColumn } from "./kanbanTypes";

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+)\s*)?\)$/;

function isSafeColorString(value: string): boolean {
  const s = value.trim();
  return HEX.test(s) || RGB.test(s);
}

function parseColor(input: string): { r: number; g: number; b: number; a: number } | null {
  const s = input.trim();
  if (!isSafeColorString(s)) return null;

  if (s.startsWith("#")) {
    const raw = s.slice(1);
    if (raw.length === 3) {
      const r = parseInt(raw[0] + raw[0], 16);
      const g = parseInt(raw[1] + raw[1], 16);
      const b = parseInt(raw[2] + raw[2], 16);
      return { r, g, b, a: 1 };
    }
    if (raw.length === 6 || raw.length === 8) {
      const r = parseInt(raw.slice(0, 2), 16);
      const g = parseInt(raw.slice(2, 4), 16);
      const b = parseInt(raw.slice(4, 6), 16);
      const a = raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }
    return null;
  }

  const m = s.match(RGB);
  if (!m) return null;
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  const a = m[4] !== undefined ? Number(m[4]) : 1;
  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return { r, g, b, a };
}

/**
 * Background only: RGBA using the color’s RGB and a fixed opacity (ignores any alpha on `input`).
 */
export function colorWithOpacity(input: string, opacity: number): string | undefined {
  const p = parseColor(input);
  if (!p) return undefined;
  const o = Math.min(1, Math.max(0, opacity));
  return `rgba(${p.r}, ${p.g}, ${p.b}, ${o})`;
}

/** Solid `rgb()` for text/icon — no alpha so the header content is never translucent. */
export function opaqueRgbColor(input: string): string | undefined {
  const p = parseColor(input);
  if (!p) return undefined;
  return `rgb(${p.r}, ${p.g}, ${p.b})`;
}

/** Count pill tint (background only; text stays opaque via parent `color`). */
export function themedCountPillBackground(accent: string): string | undefined {
  const p = parseColor(accent);
  if (!p) return undefined;
  return `rgba(${p.r}, ${p.g}, ${p.b}, 0.3)`;
}

/**
 * Resolves header background: column `status.color`, then column `color`,
 * then first task `status.color`.
 */
export function resolveKanbanColumnColor(column: KanbanColumn): string | undefined {
  const raw =
    column.status?.color?.trim() ||
    column.color?.trim() ||
    column.tasks?.find((t) => t.status?.color?.trim())?.status?.color?.trim();
  if (!raw || !isSafeColorString(raw)) return undefined;
  return raw;
}
