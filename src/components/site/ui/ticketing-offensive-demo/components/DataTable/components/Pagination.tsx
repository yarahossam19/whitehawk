import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`pagination__page ${currentPage === 1 ? "active" : ""}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="pagination__ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination__page ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="pagination__ellipsis">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`pagination__page ${currentPage === totalPages ? "active" : ""}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <div className="pagination__navigation">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="pagination__nav-btn pagination__nav-btn--edge"
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination__nav-btn"
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="pagination__pages">{renderPageNumbers()}</div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination__nav-btn"
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination__nav-btn pagination__nav-btn--edge"
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
      <div className="pagination__page-size">
        <label htmlFor="page-size-select" className="pagination__label">
          Rows per page:
        </label>
        <select
          id="page-size-select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="pagination__select"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
