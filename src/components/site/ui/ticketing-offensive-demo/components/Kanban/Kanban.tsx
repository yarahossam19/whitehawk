"use client";

import React from "react";

import "./kanban.scss";

import KanbanCard from "./components/KanbanCard";
import { KanbanColumnIcon } from "./KanbanColumnIcon";
import {
  colorWithOpacity,
  opaqueRgbColor,
  resolveKanbanColumnColor,
  themedCountPillBackground,
} from "./columnHeaderColor";
import type { KanbanColumn } from "./kanbanTypes";

interface KanbanProps {
  columns?: KanbanColumn[];
}
export default function Kanban(props: KanbanProps) {
  return (
    // Focusable scroll region — the board pans horizontally on anything
    // narrower than a desktop, and that has to be reachable by keyboard.
    <div className="kanban" role="region" aria-label="Ticket board" tabIndex={0}>
      {props.columns?.map((column) => {
        const headerBg = resolveKanbanColumnColor(column);
        const headerClass = headerBg
          ? "column-header column-header--themed"
          : `column-header column-header__${column.id}`;
        const headerStyle = headerBg
          ? ({
              backgroundColor: colorWithOpacity(headerBg, 0.3) ?? headerBg,
              color: opaqueRgbColor(headerBg) ?? headerBg,
              ["--kanban-count-bg" as string]:
                themedCountPillBackground(headerBg) ?? "rgba(0, 0, 0, 0.12)",
            } as React.CSSProperties)
          : undefined;

        return (
        <div key={column.id} className="kanban-column">
          <div className={headerClass} style={headerStyle}>
            <div className="flex gap-1 items-center min-w-0">
              <KanbanColumnIcon className="column-header__icon shrink-0" />
              <h2 className="column-title truncate">{column.title}</h2>
            </div>
            <div className="count">
              <span className="task-count">{column.tasks?.length || 0}</span>
            </div>
          </div>

          <div className="kanban-column__body">
            {column.tasks?.map((task) => (
              <KanbanCard key={task.ticket_id} task={task} />
            ))}
          </div>
        </div>
        );
      })}
    </div>
  );
}
