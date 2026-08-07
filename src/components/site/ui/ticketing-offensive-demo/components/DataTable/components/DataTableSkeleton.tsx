"use client";

import React from "react";

import { Skeleton } from "../../ui/skeleton";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export function TableSkeleton({ columns = 6, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="data-table-skeleton space-y-3 border border-border rounded-lg p-4 bg-card shadow-sm">
      {/* Table Header Placeholder */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      {/* Table Body Placeholder */}
      <div className="space-y-2 mt-3">
        {[...Array(rows)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="flex items-center gap-3 border-b border-border pb-3 pt-2 last:border-none w-full"
          >
            {[...Array(columns)].map((_, colIdx) => (
              <Skeleton
                key={colIdx}
                className={`h-6 ${colIdx === 0 ? "w-28" : "flex-1"} rounded-md bg-muted`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
