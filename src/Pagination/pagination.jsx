import React, { useState, useEffect } from "react";
import "./pagination.css";

const Pagination = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
//   const currentUsers = users.slice(startIndex, endIndex);
  const totalUsers = users.length;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div>
      {/* Items per page selector */}
      <div className="pagination-controls">
        <div className="items-per-page">
          <label>Show: </label>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span> entries</span>
        </div>

        <div className="pagination-info">
          Showing {startIndex + 1} to {endIndex} of {totalUsers} entries
        </div>
      </div>

      {/* Pagination Navigation */}
      {/* {totalPages > 1 && ( */}
        <div className="pagination-navigation">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          <div className="page-numbers">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="pagination-dots">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => goToPage(page)}
                  className={`pagination-btn ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      {/* )} */}
    </div>
  );
}

export default Pagination;