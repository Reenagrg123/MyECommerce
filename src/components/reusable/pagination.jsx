import React, { Component } from "react";
import "./pagination.scss";

const Pagination = (props) => {
  const { productsPerPage, totalProducts, onPageClick } = props;
  const pageNumbers = [];
  {
    console.log(window.location);
  }
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  //console.log()
  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
