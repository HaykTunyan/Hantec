import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (pageNumber: number) => void;
}

const PaginationNews = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  /**
   * @description Pagination component with validation
   */
  
  if (!Number.isInteger(totalPages) || totalPages <= 0) return null;

  return (
    <div className="flex gap-1">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1; 

        return (
            <div
          key={pageNumber}
          className={`
            inline-flex items-center rounded-l-md px-4 py-1 cursor-pointer
            ${
              currentPage === pageNumber // Compare with 1-based pageNumber
                ? "text-default"
                : "text-grey-tertiary"
            }
          `}
          onClick={() => onPageChange?.(pageNumber)} // Pass 1-based pageNumber to onPageChange
        >
            <span
              className={` font-medium text-xs  leading-3  cursor-pointer`}
            >
              {pageNumber}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PaginationNews;
