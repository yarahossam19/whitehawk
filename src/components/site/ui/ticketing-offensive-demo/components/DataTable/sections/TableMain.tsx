import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { flexRender } from "@tanstack/react-table";
import Image from "next/image";

import dragIcon from "../../../assets/icons/table/Drag.svg";
import { Skeleton } from "../../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tiptap-tooltip";
import { DraggableHeader } from "./DraggableHeader";

export const TableMain = ({
  table,
  orderedColumns,
  setOrderedColumns,
  onRowClick,
  loading,
}: any) => (
  // Focusable scroll region: the table carries a min-width well past a phone's
  // viewport, so keyboard users need to be able to reach and pan it.
  <div className="table__main" role="region" aria-label="Tickets table" tabIndex={0}>
    <DndContext
      // Explicit, stable id — without one, dnd-kit falls back to an
      // auto-incrementing module-level counter for its screen-reader
      // description id ("DndDescribedBy-N"). That counter starts fresh at 0
      // on every SSR request but keeps climbing across client-side
      // navigations within the same session (e.g. Offensive → Defensive),
      // so the server-rendered N and the client's N can mismatch and trip a
      // hydration warning. A fixed id sidesteps the counter entirely.
      id="ticketing-table-dnd"
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex = orderedColumns.findIndex((c: any) => c.id === active.id);
        const newIndex = orderedColumns.findIndex((c: any) => c.id === over.id);
        setOrderedColumns(arrayMove(orderedColumns, oldIndex, newIndex));
      }}
    >
      <SortableContext
        items={orderedColumns
          .filter((c: any) => !(c?.meta?.draggable === false))
          .map((c: any) => c.id)
          .filter((id: any): id is string => !!id)}
        strategy={horizontalListSortingStrategy}
      >
        <table className="table__table">
          <thead className="table__thead">
            <tr>
              {table.getHeaderGroups()[0].headers.map((header: any) => {
                if (!header.column.getIsVisible()) return null;
                const meta = header.column.columnDef.meta || {};
                const isStickyRight = meta.fixed === "right";
                const isSelectColumn = header.column.id === "select";
                const classes = `header ${
                  !isSelectColumn && orderedColumns.find((c: any) => c.id !== "select")?.id === header.column.id
                    ? "header--first"
                    : ""
                }`;
                const headerLabel =
                  typeof header.column.columnDef.header === "string"
                    ? header.column.columnDef.header
                    : String(header.column.id ?? "");

                if (meta.draggable === false) {
                  if (isSelectColumn) {
                    return (
                      <th
                        key={header.id}
                        className={`table__th table__th--select`}
                        style={{ width: 48, minWidth: 48, maxWidth: 48, overflow: "visible" }}
                      >
                        <div className="table-selection-cell table-selection-cell--header">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </th>
                    );
                  }

                  return (
                    <th
                      key={header.id}
                      className={`table__th ${isStickyRight ? "table__th--sticky-right" : ""}`}
                      style={
                        isStickyRight
                          ? { width: 50, minWidth: 50, maxWidth: 50, overflow: "visible" }
                          : undefined
                      }
                    >
                      <Tooltip>
                        <TooltipTrigger className={classes} aria-label={headerLabel}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TooltipTrigger>
                        <TooltipContent>{headerLabel}</TooltipContent>
                      </Tooltip>
                    </th>
                  );
                }
                return (
                  <DraggableHeader key={header.id} id={header.column.id}>
                    <Tooltip>
                      <TooltipTrigger className={classes} aria-label={headerLabel}>
                        <>
                          <Image
                            src={dragIcon}
                            alt="drag"
                            width={16}
                            height={16}
                            className="drag-icon dark:invert"
                          />
                          <div className="table__th__title">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        </>
                      </TooltipTrigger>
                      <TooltipContent>{headerLabel}</TooltipContent>
                    </Tooltip>
                  </DraggableHeader>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__tbody">
            {loading
              ? // Show skeleton rows when loading
                [...Array(10)].map((_, idx) => (
                  <tr key={`skeleton-${idx}`} className="table__row">
                    {table.getHeaderGroups()[0].headers.map((header: any) => {
                      if (!header.column.getIsVisible()) return null;
                      const meta = header.column.columnDef.meta || {};
                      const isStickyRight = meta.fixed === "right";
                      const isSelectColumn = header.column.id === "select";
                      return (
                        <td
                          key={header.id}
                          className={`table__cell ${isStickyRight ? "table__cell--sticky-right" : ""} ${isSelectColumn ? "table__cell--select" : ""}`}
                          style={
                            isStickyRight
                              ? { width: 50, minWidth: 50, maxWidth: 50, overflow: "visible" }
                              : isSelectColumn
                                ? { width: 48, minWidth: 48, maxWidth: 48, overflow: "visible" }
                                : undefined
                          }
                        >
                          <div className="cell-content">
                            <Skeleton className="h-6 w-full rounded-md bg-muted" />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))
              : // Show actual data rows
                table.getRowModel().rows.map((row: any) => (
                  <tr
                    key={row.id}
                    className={`table__row ${onRowClick ? "cursor-pointer" : ""}`}
                    onClick={(e) => {
                      if (!onRowClick) return;
                      const target = e.target as HTMLElement;
                      // Ignore clicks on interactive elements
                      if (
                        target.closest(
                          'button, a, input, textarea, select, label, [role="button"], [data-stop-row-click]'
                        )
                      ) {
                        return;
                      }
                      onRowClick(row.original);
                    }}
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      const meta = cell.column.columnDef.meta || {};
                      const isStickyRight = meta.fixed === "right";
                      const isSelectColumn = cell.column.id === "select";
                      return (
                        <td
                          key={cell.id}
                          className={`table__cell ${isStickyRight ? "table__cell--sticky-right" : ""} ${isSelectColumn ? "table__cell--select" : ""}`}
                          style={
                            isStickyRight
                              ? { width: 50, minWidth: 50, maxWidth: 50, overflow: "visible" }
                              : isSelectColumn
                                ? { width: 48, minWidth: 48, maxWidth: 48, overflow: "visible" }
                                : undefined
                          }
                        >
                          <div
                            className={
                              isSelectColumn ? "table-selection-cell" : "cell-content"
                            }
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  </div>
);
