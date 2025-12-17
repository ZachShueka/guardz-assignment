import { useState, useMemo, useCallback } from 'react';

type UsePaginationProps = {
  totalItems: number;
  itemsPerPage: number;
}

export const usePagination = ({ totalItems, itemsPerPage }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(()=>Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    return { startIndex: (currentPage - 1) * itemsPerPage, endIndex: currentPage * itemsPerPage };
  }, [currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const pageNumbers = useMemo<(number | string)[]>(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }


    if (currentPage <= 2) {
      return [1, 2, 3, '...', totalPages];
    }


    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }


    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    pageNumbers,
  };
};

