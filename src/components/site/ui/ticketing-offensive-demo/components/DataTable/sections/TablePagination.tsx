import { Pagination } from "../components/Pagination";

interface ExternalPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

interface TablePaginationProps {
  table: unknown; // underlying react-table instance
  totalItems: number;
  externalPagination?: ExternalPaginationProps;
}

export const TablePagination = ({
  table,
  totalItems,
  externalPagination,
}: TablePaginationProps) => {
  type RT = {
    getState: () => { pagination: { pageIndex: number; pageSize: number } };
    getPageCount: () => number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
  };
  const t = table as RT;
  const useExternal = !!externalPagination;
  const currentPage = useExternal
    ? externalPagination.currentPage
    : t.getState().pagination.pageIndex + 1;
  const totalPages = useExternal ? externalPagination.totalPages : t.getPageCount();
  const pageSize = useExternal ? externalPagination.pageSize : t.getState().pagination.pageSize;
  const total = useExternal ? (externalPagination.totalItems ?? totalItems) : totalItems;
  const onPageChange = useExternal
    ? (page: number) => externalPagination.onPageChange?.(page)
    : (page: number) => t.setPageIndex(page - 1);
  const onPageSizeChange = useExternal
    ? (size: number) => externalPagination.onPageSizeChange?.(size)
    : (size: number) => {
        t.setPageSize(size);
        t.setPageIndex(0);
      };
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      totalItems={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
};
