import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: currentPage === 1 ? "#555" : "#fff",
        }}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            background: currentPage === page ? "#333" : "none",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            margin: "0 5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: currentPage === totalPages ? "#555" : "#fff",
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
