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
          {pageNumbers.map(number=>(
              <button key={number} onClick={()=>getCurrentPage(number)}>{number}</button>
          ))}

        </div>

        
    );
}

export default Pagination;