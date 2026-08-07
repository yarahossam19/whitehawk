"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface BulkActionButtonsProps {
  selectedIds?: Array<string | number>;
  onBulkEdit?: (ids: Array<string | number>) => void;
  onBulkDelete?: (ids: Array<string | number>) => void;
  className?: string;
}

export function BulkActionButtons({
  selectedIds = [],
  onBulkEdit,
  onBulkDelete,
  className = "",
}: BulkActionButtonsProps) {
  return (
    <div className={`table__bulk-actions ${className}`.trim()}>
      {onBulkEdit && (
        <button
          type="button"
          className="table-bulk-action-btn table-bulk-action-btn--edit"
          onClick={() => onBulkEdit(selectedIds)}
        >
          <Pencil size={16} strokeWidth={2.25} aria-hidden />
          <span>Edit</span>
        </button>
      )}
      {onBulkDelete && (
        <button
          type="button"
          className="table-bulk-action-btn table-bulk-action-btn--delete"
          onClick={() => onBulkDelete(selectedIds)}
        >
          <Trash2 size={16} strokeWidth={2.25} aria-hidden />
          <span>Delete</span>
        </button>
      )}
    </div>
  );
}
