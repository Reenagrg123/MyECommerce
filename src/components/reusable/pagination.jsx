import React, { Component } from "react";
import "./pagination.scss";
import classNames from 'classnames';


const Pagination = (props) => {
  const { productsPerPage, totalProducts, onPageClick } = props;
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  
    return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageClick(pageNumber)} className={classNames({'active':pageNumber.active})}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
