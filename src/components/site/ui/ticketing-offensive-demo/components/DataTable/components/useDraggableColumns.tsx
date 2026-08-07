import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

export type UseDraggableColumnsOptions = {
  /** Stable key; when set, column order + visibility persist together under one localStorage entry. */
  persistenceKey?: string;
};

function sameColumnIdSet<TData>(
  a: ColumnDef<TData, any>[],
  b: ColumnDef<TData, any>[]
): boolean {
  const idsA = new Set(a.map((c) => c.id).filter(Boolean) as string[]);
  const idsB = new Set(b.map((c) => c.id).filter(Boolean) as string[]);
  if (idsA.size !== idsB.size) return false;
  for (const id of idsA) {
    if (!idsB.has(id)) return false;
  }
  return true;
}

/** Row selection checkbox column stays first; eye/actions stay last. */
const LEADING_CHROME_COLUMN_IDS = ["select"] as const;
const TRAILING_CHROME_COLUMN_IDS = ["eye", "actions"] as const;

function normalizeSavedColumnOrderIds(savedIds: string[]): string[] {
  const leading = new Set<string>(LEADING_CHROME_COLUMN_IDS);
  const trailing = new Set<string>(TRAILING_CHROME_COLUMN_IDS);
  const head = LEADING_CHROME_COLUMN_IDS.filter((id) => savedIds.includes(id));
  const main = savedIds.filter((id) => !leading.has(id) && !trailing.has(id));
  const tail = TRAILING_CHROME_COLUMN_IDS.filter((id) => savedIds.includes(id));
  return [...head, ...main, ...tail];
}

/** Reorders chrome: `select` first, `eye` / `actions` last. */
function ensureChromeColumnsLast<TData>(cols: ColumnDef<TData, any>[]): ColumnDef<TData, any>[] {
  if (!cols.length) return cols;
  const rawIds = cols.map((c) => c.id).filter(Boolean) as string[];
  const hasSelect = rawIds.includes("select");
  let normalizedIds = normalizeSavedColumnOrderIds(rawIds);
  if (hasSelect && !normalizedIds.includes("select")) {
    normalizedIds = ["select", ...normalizedIds];
  }
  return reconcileOrderFromIds(normalizedIds, cols);
}

function reconcileOrderFromIds<TData>(
  savedIds: string[],
  incoming: ColumnDef<TData, any>[]
): ColumnDef<TData, any>[] {
  const normalizedIds = normalizeSavedColumnOrderIds(savedIds);
  const byId = new Map<string, ColumnDef<TData, any>>();
  for (const c of incoming) {
    const id = c.id as string | undefined;
    if (id) byId.set(id, c);
  }
  const result: ColumnDef<TData, any>[] = [];
  const used = new Set<string>();
  for (const id of normalizedIds) {
    const col = byId.get(id);
    if (col) {
      result.push(col);
      used.add(id);
    }
  }
  for (const col of incoming) {
    const id = col.id as string | undefined;
    if (id && !used.has(id)) {
      result.push(col);
      used.add(id);
    }
  }
  return result;
}

export function reconcileColumnOrder<TData>(
  previousOrdered: ColumnDef<TData, any>[],
  incoming: ColumnDef<TData, any>[]
): ColumnDef<TData, any>[] {
  if (!incoming.length) return [];
  if (!previousOrdered.length) return incoming;
  return reconcileOrderFromIds(
    previousOrdered.map((c) => c.id).filter(Boolean) as string[],
    incoming
  );
}

/** True when the table has at least one data column (not only chrome like eye/actions). */
function hasPersistableColumnSet<TData>(columns: ColumnDef<TData, any>[]): boolean {
  return columns.some((c) => {
    const id = c.id as string | undefined;
    return id && id !== "select" && id !== "eye" && id !== "actions";
  });
}

export function useDraggableColumns<TData>(
  initialColumns: ColumnDef<TData, any>[],
  options?: UseDraggableColumnsOptions
) {
  const MAX_VISIBLE_COLUMNS = 10;
  const persistenceKey = options?.persistenceKey;

  const storageKey = useMemo(() => {
    if (persistenceKey) return `datatable-layout-v1-${persistenceKey}`;
    return `table-column-visibility-${initialColumns.map((c) => c.id).join("-")}`;
  }, [persistenceKey, initialColumns]);

  const columnSignature = useMemo(
    () => initialColumns.map((c) => c.id ?? "").join("|"),
    [initialColumns]
  );

  const clampVisibility = (
    visibility: Record<string, boolean>,
    columns: ColumnDef<TData, any>[]
  ): Record<string, boolean> => {
    const result: Record<string, boolean> = {};
    let count = 0;
    for (const col of columns) {
      const id = (col.id ?? "") as string;
      if (!id) continue;
      const meta: any = (col as any).meta || {};
      const excludedFromCap =
        meta.excludeFromVisibilityCap ||
        meta.hideInVisibilityMenu ||
        id === "select" ||
        id === "actions";
      const wantVisible = visibility[id] ?? true;
      if (excludedFromCap) {
        result[id] = true;
        continue;
      }
      if (wantVisible && count < MAX_VISIBLE_COLUMNS) {
        result[id] = true;
        count++;
      } else {
        result[id] = false;
      }
    }
    for (const key of Object.keys(visibility)) {
      if (!(key in result)) {
        if (visibility[key] && count < MAX_VISIBLE_COLUMNS) {
          result[key] = true;
          count++;
        } else {
          result[key] = false;
        }
      }
    }
    return result;
  };

  const defaultVisibilityFor = (columns: ColumnDef<TData, any>[]) =>
    clampVisibility(Object.fromEntries(columns.map((c) => [c.id ?? "", true])), columns);

  const [orderedColumns, setOrderedColumnsState] = useState<ColumnDef<TData, any>[]>(() =>
    initialColumns.length ? ensureChromeColumnsLast(initialColumns) : []
  );

  /** True only after the user changes order/visibility in this session (not merely loaded layout from localStorage). */
  const [userHasEditedLayout, setUserHasEditedLayout] = useState(false);

  /** Skip the first persist when using persistenceKey so we never overwrite localStorage with API order before layout hydration runs. */
  const skipInitialPersistRef = useRef(persistenceKey ? true : false);

  const [columnVisibility, _setColumnVisibility] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") {
      return defaultVisibilityFor(initialColumns);
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return defaultVisibilityFor(initialColumns);
      const parsed = JSON.parse(saved);
      if (persistenceKey && parsed && typeof parsed === "object" && parsed.visibility) {
        return clampVisibility(
          { ...Object.fromEntries(initialColumns.map((c) => [c.id ?? "", true])), ...parsed.visibility },
          initialColumns
        );
      }
      if (!persistenceKey && parsed && typeof parsed === "object" && !Array.isArray(parsed.order)) {
        const parsedVisibility = parsed as Record<string, boolean>;
        const defaultVisibility = Object.fromEntries(initialColumns.map((c) => [c.id ?? "", true]));
        return clampVisibility({ ...defaultVisibility, ...parsedVisibility }, initialColumns);
      }
    } catch (error) {
      console.warn("Failed to load column layout from localStorage:", error);
    }
    return defaultVisibilityFor(initialColumns);
  });

  // New column set (e.g. navigated to another page): user must interact again before we show "Reset".
  useEffect(() => {
    setUserHasEditedLayout(false);
  }, [columnSignature]);

  const setOrderedColumns: Dispatch<SetStateAction<ColumnDef<TData, any>[]>> = useCallback(
    (updater) => {
      setUserHasEditedLayout(true);
      setOrderedColumnsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        return ensureChromeColumnsLast(next);
      });
    },
    []
  );

  // Apply saved column order before paint so the persist effect does not overwrite localStorage with API order on refresh.
  // Important: skip reading localStorage until data columns exist — early in load `baseColumns` is only [eye, actions],
  // and applying a full saved `order` against that would corrupt state and the next persist would wipe localStorage.
  useLayoutEffect(() => {
    if (!initialColumns.length) {
      setOrderedColumnsState([]);
      return;
    }

    const canApplySavedLayout = !persistenceKey || hasPersistableColumnSet(initialColumns);

    setOrderedColumnsState((prev) => {
      if (persistenceKey && typeof window !== "undefined" && canApplySavedLayout) {
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.order && Array.isArray(parsed.order) && parsed.order.length) {
              const fromStorage = ensureChromeColumnsLast(
                reconcileOrderFromIds(parsed.order, initialColumns)
              );
              if (sameColumnIdSet(fromStorage, initialColumns)) {
                return fromStorage;
              }
            }
          }
        } catch {
          /* ignore */
        }
      }

      if (prev.length === 0) {
        return ensureChromeColumnsLast(initialColumns);
      }
      return ensureChromeColumnsLast(reconcileColumnOrder(prev, initialColumns));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columnSignature tracks column set; avoids resetting order on every parent render
  }, [columnSignature, persistenceKey, storageKey]);

  useEffect(() => {
    _setColumnVisibility((prev) => {
      const base = Object.fromEntries(initialColumns.map((c) => [c.id ?? "", true]));
      return clampVisibility({ ...base, ...prev }, initialColumns);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when column set (signature) changes
  }, [columnSignature]);

  // Persist visibility (legacy key) or full layout (persistence key)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (persistenceKey) {
      if (!hasPersistableColumnSet(orderedColumns) || orderedColumns.length !== initialColumns.length) {
        return;
      }
    }
    if (skipInitialPersistRef.current) {
      skipInitialPersistRef.current = false;
      return;
    }
    try {
      if (persistenceKey) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            order: normalizeSavedColumnOrderIds(
              orderedColumns.map((c) => c.id).filter(Boolean) as string[]
            ),
            visibility: columnVisibility,
          })
        );
      } else {
        localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
      }
    } catch (error) {
      console.warn("Failed to save column layout to localStorage:", error);
    }
  }, [columnVisibility, orderedColumns, persistenceKey, storageKey, columnSignature]);

  const toggleVisibility = (id: string) => {
    setUserHasEditedLayout(true);
    _setColumnVisibility((prev) => {
      const isCurrentlyVisible = !!prev[id];
      if (!isCurrentlyVisible) {
        let visibleCount = 0;
        for (const col of orderedColumns) {
          const colId = (col.id ?? "") as string;
          if (!colId) continue;
          const meta: any = (col as any).meta || {};
          const excludedFromCap =
            meta.excludeFromVisibilityCap ||
            meta.hideInVisibilityMenu ||
            colId === "select" ||
            colId === "actions" ||
            colId === "eye";
          if (!excludedFromCap && prev[colId]) {
            visibleCount++;
          }
        }
        if (visibleCount >= MAX_VISIBLE_COLUMNS) {
          return prev;
        }
      }
      return { ...prev, [id]: !prev[id] };
    });
  };

  const resetTableLayout = useCallback(() => {
    setOrderedColumnsState(ensureChromeColumnsLast(initialColumns));
    const clamped = defaultVisibilityFor(initialColumns);
    _setColumnVisibility(clamped);
    setUserHasEditedLayout(false);
  }, [initialColumns]);

  const layoutDiffersFromDefault = useMemo(() => {
    if (!initialColumns.length || !orderedColumns.length) return false;
    if (orderedColumns.length !== initialColumns.length) return false;
    if (
      persistenceKey &&
      (!hasPersistableColumnSet(initialColumns) || !hasPersistableColumnSet(orderedColumns))
    ) {
      return false;
    }

    const defaultOrderIds = initialColumns.map((c) => c.id).filter(Boolean) as string[];
    const currentOrderIds = orderedColumns.map((c) => c.id).filter(Boolean) as string[];
    const orderDiff = JSON.stringify(defaultOrderIds) !== JSON.stringify(currentOrderIds);

    const defVis = defaultVisibilityFor(initialColumns);
    const visDiff = initialColumns.some((c) => {
      const id = (c.id ?? "") as string;
      if (!id) return false;
      const meta: any = (c as any).meta || {};
      if (meta.hideInVisibilityMenu || meta.excludeFromVisibilityCap) return false;
      // Missing keys must inherit defVis, not `true` — otherwise capped-hidden columns look "customized"
      const effectiveVisible = columnVisibility[id] ?? defVis[id];
      return defVis[id] !== effectiveVisible;
    });

    return orderDiff || visDiff;
  }, [initialColumns, orderedColumns, columnVisibility, persistenceKey]);

  /** Shown only if layout is non-default AND the user changed it this session (persisted alone does not show the button). */
  const isLayoutCustomized = layoutDiffersFromDefault && userHasEditedLayout;

  const setColumnVisibility = (
    next: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => {
    _setColumnVisibility((prev) => {
      const resolved = typeof next === "function" ? (next as (p: Record<string, boolean>) => Record<string, boolean>)(prev) : next;
      return clampVisibility(resolved, initialColumns);
    });
  };

  return {
    orderedColumns,
    setOrderedColumns,
    columnVisibility,
    setColumnVisibility,
    toggleVisibility,
    /** Resets column order and visibility to match the current column definitions. */
    resetTableLayout,
    isLayoutCustomized,
  };
}
