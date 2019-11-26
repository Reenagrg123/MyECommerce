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

          <button type="button" name="view" class="greybtn" onClick={()=>{onView(product)}}><i class="fa fa-eye"></i></button>
        </td>
        <td>
        <button type="button" name="delete" class="redbtn" onClick={()=>{onDelete(product.productId)}}><i class="fa fa-remove"></i></button>

        </td>
      </tr>
    );
    
  
}
}

export default EachProduct;
