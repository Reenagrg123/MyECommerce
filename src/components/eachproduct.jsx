import React, { Component } from "react";
import ViewProducts from "./viewproducts";
import "./eachproduct.css";

class EachProduct extends Component {
  state = {};
  render() {
    const { category, productName, Quantity, price } = this.props.product;
    return (
      <tr>
        <td></td>
        <td>{category}</td>
        <td> {productName}</td>
        <td>{Quantity}</td>
        <td>{price}</td>
        <td>
          <input type="button" class="greybtn" value="View"></input>
        </td>
        <td>
          <input type="button" class="redbtn" value="Delete"></input>
        </td>
      </tr>
    );
  }
}

export default EachProduct;
