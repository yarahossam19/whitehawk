"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Eye, MoreHorizontal, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import FilterPanel from "../Filter/Filter";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SearchBar from "../Searchbar/Searchbar";
import { ColumnVisibilityMenu } from "./components/ColumnVisibilityMenu";
import { BulkActionButtons } from "./components/BulkActionButtons";
import { TableSkeleton } from "./components/DataTableSkeleton";
import { useDraggableColumns } from "./components/useDraggableColumns";
import { KanbanToggle } from "./sections/KanabnToggle";
import { TableHeader } from "./sections/TableHeader";
import { TableMain } from "./sections/TableMain";
import { TablePagination } from "./sections/TablePagination";
import { TableTabs } from "./sections/TableTabs";
import { useTableLogic } from "./useTableLogic";

import "./data-table.scss";

import Kanban from "../Kanban/Kanban";
import type { KanbanColumn } from "../Kanban/kanbanTypes";

export function DataTable({
  columns,
  data,
  tabs = [],
  /** Seeds the initially-active tab (e.g. restored from a URL query param). Falls back to tabs[0]. */
  initialTab,
  tabRenderers,
  tabFilterOptions,
  kanbanView = false,
  kanbanColumns,
  search = true,
  filter = true,
  enableRowSelection = true,
  showColumnVisibility = true,
  initialPageSize = 10,
  searchPlaceholder = "Search...",
  title,
  filterOptions,
  button,
  exportButton,
  onExport = () => {},
  importButton,
  onImport = () => {},
  onButtonClick = () => {},
  onSelectionChange,
  onTabChange = () => {},
  actionsMenuOptions,
  onRowClick,
  loading,
  view: showEyeColumn,
  onEyeClick,
  onBulkEdit,
  onBulkDelete,
  paginationProps,
  onFilter = () => {},
  setSelectedIds = (ids: any) => {},
  selectedIds,
  // New props for permissions tab action buttons
  permissionsDirty = false,
  onPermissionsCancel,
  onPermissionsSave,
  // New prop for server-side filtering
  serverSideFiltering = false,
  // New prop for controlled filters
  filters,
  /** When set, column order + visibility persist in localStorage; shows “Reset columns to default” in the toolbar. */
  columnPersistenceKey,
}: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "");
  const [displayMode, setDisplayMode] = useState<"table" | "kanban">("table");
  const mixedSelectionToastRef = useRef<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  const selectionColumn = useMemo(() => {
    if (!enableRowSelection) return [];
    return [
      {
        id: "select",
        enableHiding: false,
        header: ({ table }: { table: { getIsAllPageRowsSelected: () => boolean; toggleAllPageRowsSelected: (value: boolean) => void } }) => {
          const isAllSelected = table.getIsAllPageRowsSelected();
          return (
            <div className="table-selection-cell">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => {
                  table.toggleAllPageRowsSelected(e.target.checked);
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="table-checkbox"
                aria-label="Select all rows on this page"
              />
            </div>
          );
        },
        cell: ({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (value: boolean) => void } }) => (
          <div className="table-selection-cell">
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={(e) => {
                row.toggleSelected(e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="table-checkbox"
              aria-label="Select row"
            />
          </div>
        ),
        meta: {
          fixed: "left",
          draggable: false,
          hideInVisibilityMenu: true,
          excludeFromVisibilityCap: true,
        },
      },
    ];
  }, [enableRowSelection]);

  const eyeColumn = useMemo(() => {
    if (!showEyeColumn) return [];
    return [
      {
        id: "eye",
        header: "",
        meta: {
          fixed: "right",
          draggable: false,
          hideInVisibilityMenu: true,
          excludeFromVisibilityCap: true,
        },
        cell: ({ row }: { row: { original: unknown } }) => (
          <div className="flex items-center justify-end ">
            <button
              className="p-1 rounded cursor-pointer table-eye-btn"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEyeClick?.(row.original);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              data-stop-row-click
              aria-label="View"
              title="View"
            >
              <Eye size={18} />
            </button>
          </div>
        ),
      },
    ];
  }, [showEyeColumn, onEyeClick]);
  const actionsColumn = useMemo(() => {
    if (
      !actionsMenuOptions ||
      (Array.isArray(actionsMenuOptions) && actionsMenuOptions.length === 0)
    )
      return [];
    return [
      {
        id: "actions",
        header: "",
        meta: {
          fixed: "right",
          draggable: false,
          hideInVisibilityMenu: true,
          excludeFromVisibilityCap: true,
        },
        cell: ({ row }: { row: { original: unknown } }) => {
          const options =
            typeof actionsMenuOptions === "function"
              ? actionsMenuOptions(row.original)
              : actionsMenuOptions;

          if (!options || options.length === 0) return null;

          return (
            <div className="flex items-center justify-end ">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="p-1 rounded cursor-pointer"
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    data-stop-row-click
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={6}
                  className="w-40 table-popover-content border rounded-md shadow-md bg-[var(--table-body-bg)] border-[var(--table-border)]"
                >
                  {options.map(
                    (opt: { label: string; onClick?: (row: unknown) => void }, idx: number) => (
                      <button
                        key={idx}
                        type="button"
                        className="menu-item w-full text-left"
                        onClick={() => opt.onClick?.(row.original)}
                      >
                        <span className={`menu-item__label ${opt.label}`}>{opt.label}</span>
                      </button>
                    )
                  )}
                </PopoverContent>
              </Popover>
            </div>
          );
        },
      },
    ];
  }, [actionsMenuOptions]);
  const baseColumns = useMemo(
    () => [...selectionColumn, ...columns, ...eyeColumn, ...actionsColumn],
    [selectionColumn, columns, actionsColumn, eyeColumn]
  );

  const {
    orderedColumns,
    setOrderedColumns,
    columnVisibility,
    setColumnVisibility,
    toggleVisibility,
    resetTableLayout,
  } = useDraggableColumns(baseColumns, { persistenceKey: columnPersistenceKey });

  const tableLogic = useTableLogic({
    data,
    columns: orderedColumns,
    columnVisibility,
    setColumnVisibility,
    initialPageSize,
    enableRowSelection,
    onSelectionChange,
  });

  const rowSelectionState = tableLogic?.table?.getState?.()?.rowSelection;

  const getStatusKey = (row: any) => {
    const statusValue = row?.status;

    if (statusValue && typeof statusValue === "object") {
      return String(statusValue.id ?? statusValue.value ?? statusValue.name ?? "");
    }

    return String(row?.status_id ?? statusValue ?? row?.status_name ?? "");
  };

  const handleBulkEdit = useCallback(
    (ids: Array<string | number>) => {
      onBulkEdit?.(ids);
    },
    [onBulkEdit]
  );

  const handleBulkDelete = useCallback(
    (ids: Array<string | number>) => {
      onBulkDelete?.(ids);
    },
    [onBulkDelete]
  );

  useEffect(() => {
    if (!enableRowSelection) return;

    const selectedRows = tableLogic?.table?.getSelectedRowModel?.().rows || [];
    const currentIds = selectedRows
      .map((r: any) => r.original?.ticket_id ?? r.original?.id)
      .filter((id: any) => id != null);

    if (JSON.stringify(currentIds) !== JSON.stringify(selectedIds)) {
      setSelectedIds(currentIds);
    }

    if (currentIds.length === 0) {
      mixedSelectionToastRef.current = null;
      return;
    }

    const selectedStatuses = Array.from(
      new Set(
        selectedRows
          .map((r: any) => getStatusKey(r.original))
          .filter((status: string) => status !== "")
      )
    );
    const selectionSignature = `${currentIds.map(String).join("|")}:${selectedStatuses.join("|")}`;

    if (selectedStatuses.length > 1) {
      if (mixedSelectionToastRef.current !== selectionSignature) {
        toast.error(
          "You can't edit the status of tickets with different statuses. Proceed if you're editing something else."
        );
        mixedSelectionToastRef.current = selectionSignature;
      }
    } else {
      mixedSelectionToastRef.current = null;
    }
  }, [enableRowSelection, tableLogic?.table, rowSelectionState, setSelectedIds, selectedIds]);

  useEffect(() => {
    if (!enableRowSelection) return;
    if (Array.isArray(selectedIds) && selectedIds.length === 0) {
      tableLogic?.table?.resetRowSelection?.();
    }
  }, [enableRowSelection, selectedIds, tableLogic?.table]);
  const handleSearch = useCallback(
    (term: string) => tableLogic.setGlobalFilter(term),
    [tableLogic.setGlobalFilter]
  );
  const handleFilter = useCallback(
    (filters: Record<string, unknown>) => {
      if (serverSideFiltering) {
        onFilter(filters);
      } else {
        const formatted = Object.entries(filters)
          .filter(([, v]) => v !== "" && v != null)
          .map(([key, val]) => ({ id: key, value: val }));
        tableLogic.setColumnFilters(formatted);
      }
    },
    [tableLogic.setColumnFilters, serverSideFiltering, onFilter]
  );

  const effectiveFilterOptions = useMemo(() => {
    if (tabFilterOptions && activeTab && tabFilterOptions[activeTab])
      return tabFilterOptions[activeTab];
    return filterOptions;
  }, [tabFilterOptions, activeTab, filterOptions]);

  const effectiveFilterEnabled = useMemo(() => {
    if (
      tabFilterOptions &&
      activeTab &&
      Object.prototype.hasOwnProperty.call(tabFilterOptions, activeTab)
    ) {
      const opts = tabFilterOptions[activeTab];
      return Array.isArray(opts) ? opts.length > 0 : !!opts;
    }
    return !!filter;
  }, [tabFilterOptions, activeTab, filter]);

  const effectiveLoading = typeof loading === "boolean" ? loading : isLoading;

  const showLayoutReset =
    Boolean(columnPersistenceKey) &&
    (!kanbanView || displayMode === "table") &&
    !(tabRenderers && tabRenderers[activeTab]);

  const layoutResetControl = showLayoutReset ? (
    <button
      type="button"
      className="table__layout-reset shrink-0"
      onClick={resetTableLayout}
      aria-label="Reset Columns To Default"
    >
      Reset Columns
    </button>
  ) : null;

  return (
    <div className="table">
      {button && (
        <div className="flex justify-between  ">
          <h2 className="table__title">{title}</h2>
          <PrimaryButton onClick={onButtonClick} buttonStyle="submit" className="add-this-button">
            <Plus />
            {button}
          </PrimaryButton>
        </div>
      )}
      {!button && title && <h2 className="table__title">{title}</h2>}
      {kanbanView && (
        <div className="table__kanban-toolbar">
          <div className="table__kanban-toolbar-toggle">
            <KanbanToggle value={displayMode} onChange={setDisplayMode} />
          </div>

          <div className="table__kanban-toolbar-actions">
            <div className="table__kanban-toolbar-reset">{layoutResetControl}</div>

            {showColumnVisibility && (
              <div className="table__kanban-toolbar-columns">
                <ColumnVisibilityMenu
                  columns={orderedColumns}
                  visibleColumns={columnVisibility}
                  onToggle={toggleVisibility}
                  onReorder={setOrderedColumns}
                  onReset={resetTableLayout}
                />
              </div>
            )}
          </div>

          {search && (
            <div className="table__kanban-toolbar-search">
              <SearchBar
                placeholder={searchPlaceholder}
                onSearch={handleSearch}
                className="table__search"
              />
            </div>
          )}

          {effectiveFilterEnabled && (
            <div className="table__kanban-toolbar-filter table__filter-wrap">
              <FilterPanel
                filterOptions={effectiveFilterOptions}
                onFilter={handleFilter}
                filters={filters}
                menuClassName="table-filter-dropdown"
              />
            </div>
          )}

          {selectedIds?.length > 0 && (onBulkEdit || onBulkDelete) && (
            <BulkActionButtons
              selectedIds={selectedIds}
              onBulkEdit={onBulkEdit ? handleBulkEdit : undefined}
              onBulkDelete={onBulkDelete ? handleBulkDelete : undefined}
            />
          )}
        </div>
      )}
      {!kanbanView && (
        <div className="flex justify-between flex-wrap gap-1">
          <TableHeader
            search={search}
            filter={effectiveFilterEnabled}
            searchPlaceholder={searchPlaceholder}
            filterOptions={effectiveFilterOptions}
            onSearch={handleSearch}
            onFilter={handleFilter}
            columns={orderedColumns}
            columnVisibility={columnVisibility}
            toggleVisibility={toggleVisibility}
            setOrderedColumns={setOrderedColumns}
            resetVisibility={resetTableLayout}
            showColumnVisibility={showColumnVisibility}
            bulkActions={selectedIds?.length > 0}
            selectedIds={selectedIds}
            onBulkEdit={onBulkEdit ? handleBulkEdit : undefined}
            onBulkDelete={onBulkDelete ? handleBulkDelete : undefined}
            filters={filters}
            layoutResetControl={layoutResetControl}
          />
          {activeTab === "permissions" ? (
            <div className="flex gap-2 cancel-save-buttons">
              <PrimaryButton
                buttonStyle="cancel"
                disabled={!permissionsDirty}
                onClick={() => permissionsDirty && onPermissionsCancel?.()}
                className="btn-width"
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                buttonStyle="submit"
                disabled={!permissionsDirty}
                onClick={() => permissionsDirty && onPermissionsSave?.()}
                className="btn-width"
              >
                Save
              </PrimaryButton>
            </div>
          ) : (
            (exportButton || importButton) && (
              <div className="flex gap-2">
                {exportButton && (
                  <PrimaryButton onClick={onExport} buttonStyle="export">
                    {exportButton}
                  </PrimaryButton>
                )}
                {importButton && (
                  <PrimaryButton onClick={onImport} buttonStyle="import">
                    {importButton}
                  </PrimaryButton>
                )}
              </div>
            )
          )}
        </div>
      )}

      <TableTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {kanbanView && displayMode === "kanban" && kanbanColumns ? (
        <Kanban columns={kanbanColumns as KanbanColumn[]} />
      ) : (
        <>
          {/* If a tabRenderer exists for the current active tab render it here instead of the main table */}
          {tabRenderers && tabRenderers[activeTab] ? (
            <div className="table__tab-content">
              {typeof tabRenderers[activeTab] === "function"
                ? (
                    tabRenderers[activeTab] as (props?: { searchQuery?: string }) => React.ReactNode
                  )({
                    searchQuery: tableLogic.globalFilter ?? "",
                  })
                : tabRenderers[activeTab]}
            </div>
          ) : (
            <>
              <TableMain
                table={tableLogic.table}
                orderedColumns={orderedColumns}
                setOrderedColumns={setOrderedColumns}
                onRowClick={onRowClick}
                loading={effectiveLoading}
              />
              <TablePagination
                table={tableLogic.table}
                totalItems={data.length}
                externalPagination={paginationProps}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
