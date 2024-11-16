// PaginationHomeListing.tsx
import React from "react";

interface PaginationHomeListingProps {
  pagination: { page: number; totalPages: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; totalPages: number }>
  >;
}

const PaginationHomeListing: React.FC<PaginationHomeListingProps> = ({
  pagination,
  setPagination,
}) => {
  const { page, totalPages } = pagination;

  return (
    <div className="pagination flex justify-center space-x-4">
      <button
        onClick={() =>
          setPagination((prev) => ({
            ...prev,
            page: Math.max(1, prev.page - 1),
          }))
        }
        disabled={page === 1}
      >
        Previous
      </button>
      <span>{`Page ${page} of ${totalPages}`}</span>
      <button
        onClick={() =>
          setPagination((prev) => ({
            ...prev,
            page: Math.min(totalPages, prev.page + 1),
          }))
        }
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationHomeListing;
