import { toast } from "sonner";

export type ImportRowError = {
  row: number;
  errors: Record<string, string[]>;
};

export type GroupedImportError = {
  field: string;
  fieldLabel: string;
  message: string;
  rows: number[];
};

function formatFieldLabel(field: string): string {
  return field
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatRowRanges(rows: number[]): string {
  if (rows.length === 0) return "";

  const sorted = [...new Set(rows)].sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
      continue;
    }

    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    start = sorted[i];
    end = sorted[i];
  }

  ranges.push(start === end ? `${start}` : `${start}-${end}`);
  return ranges.join(", ");
}

export function groupImportErrors(rowErrors: ImportRowError[]): GroupedImportError[] {
  const map = new Map<string, GroupedImportError>();

  for (const rowError of rowErrors) {
    for (const [field, messages] of Object.entries(rowError.errors ?? {})) {
      for (const message of messages) {
        const key = `${field}::${message}`;
        const existing = map.get(key);

        if (existing) {
          existing.rows.push(rowError.row);
          continue;
        }

        map.set(key, {
          field,
          fieldLabel: formatFieldLabel(field),
          message,
          rows: [rowError.row],
        });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    const fieldCompare = a.fieldLabel.localeCompare(b.fieldLabel);
    if (fieldCompare !== 0) return fieldCompare;
    return a.message.localeCompare(b.message);
  });
}

export function summarizeImportErrors(
  groupedErrors: GroupedImportError[],
  rowErrors: ImportRowError[]
): string {
  const rowCount = rowErrors.length;
  const issueCount = groupedErrors.length;

  if (rowCount === 0) return "Import failed due to validation errors.";

  return `${issueCount} validation issue${issueCount === 1 ? "" : "s"} across ${rowCount} row${rowCount === 1 ? "" : "s"}.`;
}

export function extractImportRowErrors(data: unknown): ImportRowError[] | null {
  if (!data || typeof data !== "object") return null;

  const errors = (data as { errors?: unknown }).errors;
  if (!Array.isArray(errors) || errors.length === 0) return null;

  const normalized = errors.filter(
    (item): item is ImportRowError =>
      !!item &&
      typeof item === "object" &&
      typeof (item as ImportRowError).row === "number" &&
      typeof (item as ImportRowError).errors === "object"
  );

  return normalized.length > 0 ? normalized : null;
}

export function showImportValidationToast(
  summary: string,
  onViewDetails: () => void
): void {
  toast.error("Import failed", {
    description: summary,
    action: {
      label: "View Details",
      onClick: onViewDetails,
    },
  });
}
