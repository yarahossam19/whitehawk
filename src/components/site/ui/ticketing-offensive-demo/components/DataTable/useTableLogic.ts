import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

interface UseTableLogicProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;
  initialPageSize?: number;
  enableRowSelection?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
}

export function useTableLogic<TData>({
  data,
  columns,
  columnVisibility,
  setColumnVisibility,
  initialPageSize,
  enableRowSelection,
  onSelectionChange,
}: UseTableLogicProps<TData>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize ?? 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    state: { columnVisibility, pagination, globalFilter, columnFilters, rowSelection },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: !!enableRowSelection,
    getRowId: (row: any, index) => {
      const id = row?.ticket_id ?? row?.id;
      return id != null ? String(id) : index.toString();
    },
  });

  // Keep internal pagination pageSize in sync with prop changes
  useEffect(() => {
    if (typeof initialPageSize === "number" && initialPageSize > 0) {
      setPagination((prev) => ({ ...prev, pageSize: initialPageSize }));
    }
  }, [initialPageSize]);

  useEffect(() => {
    if (onSelectionChange && enableRowSelection) {
      const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, enableRowSelection, table]);

  return {
    table,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  };
}
