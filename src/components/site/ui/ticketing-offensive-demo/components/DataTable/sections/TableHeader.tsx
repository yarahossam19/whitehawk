import React from "react";

import FilterPanel from "../../Filter/Filter";
import SearchBar from "../../Searchbar/Searchbar";
import { BulkActionButtons } from "../components/BulkActionButtons";
import { ColumnVisibilityMenu } from "../components/ColumnVisibilityMenu";

export const TableHeader = ({
  search,
  filter,
  searchPlaceholder,
  filterOptions,
  onSearch,
  onFilter,
  columns,
  columnVisibility,
  toggleVisibility,
  setOrderedColumns,
  resetVisibility,
  showColumnVisibility = true,
  bulkActions = false,
  selectedIds = [],
  onBulkEdit,
  onBulkDelete,
  filters,
  layoutResetControl,
}: any) => (
  <div className="table__header">
    {search && (
      <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} className="table__search" />
    )}
    {filter && (
      <div className="table__filter-wrap">
        <FilterPanel
          filterOptions={filterOptions}
          onFilter={onFilter}
          filters={filters}
          menuClassName="table-filter-dropdown"
        />
      </div>
    )}
    {bulkActions && (
      <BulkActionButtons
        selectedIds={selectedIds}
        onBulkEdit={onBulkEdit}
        onBulkDelete={onBulkDelete}
      />
    )}
    {layoutResetControl && <div className="table__layout-reset-wrap">{layoutResetControl}</div>}
    {showColumnVisibility && (
      <div className="table__column-visibility-wrap">
        <ColumnVisibilityMenu
          columns={columns}
          visibleColumns={columnVisibility}
          onToggle={toggleVisibility}
          onReorder={setOrderedColumns}
          onReset={resetVisibility}
          // Always open right-to-left, except when filter exists and viewport <= 580px.
          openDirection={filter ? "filterResponsive" : "rtl"}
        />
      </div>
    )}
  </div>
);
