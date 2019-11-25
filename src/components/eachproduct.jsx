import React, { Component } from "react";
import ViewProducts from "./viewproducts";
import "./eachproduct.css";
import ProductDetail from "./productdetail";

class EachProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      isClickedView:false
  };
}

  render() {
    const {product,onDelete,onView}=this.props;
    const { category, productName, quantity, price } = this.props.product;
   return (
      <tr>
        {this.props.children}
        <td>{category}</td>
        <td> {productName}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>
          <input type="button" name="view" class="greybtn" value="View" onClick={()=>{onView(product)}}></input>
        </td>
        <td>
          <input type="button" name="delete" class="redbtn" value="Delete" onClick={()=>{onDelete(product.productId)}}></input>
        </td>
      </tr>
    );
    
  
}
}

export default EachProduct;
