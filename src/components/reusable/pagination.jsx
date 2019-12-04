import React, { Component } from 'react';
import './pagination.css';

const Pagination=(props)=>{
    const {productsPerPage,totalProducts,getCurrentPage}=props;
    const pageNumbers=[];

    for(let i=1;i<=Math.ceil(totalProducts/productsPerPage);i++){
        pageNumbers.push(i);
    }
    return(
        <div className="pagination">
          {pageNumbers.map(pageNumber=>(
              <button key={pageNumber} onClick={()=>getCurrentPage(pageNumber)}>{pageNumber}</button>
          ))}

        </div>

        
    );
}

export default Pagination;