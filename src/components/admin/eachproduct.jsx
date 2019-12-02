import React, { Component } from "react";
import ViewProducts from "./viewproducts";
import ProductDetail from "./productdetail";

class EachProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedView: false
    };
  }

  render() {
    const { product, onDelete, onView } = this.props;
    const { category, productName, quantity, price } = this.props.product;
    return (
      <tr>
        {this.props.children}
        <td>{category}</td>
        <td> {productName}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>
          <button
            type="button"
            name="view"
            className="greybtn"
            onClick={() => {
              onView(product);
            }}
          >
            <i className="fa fa-eye"></i>
          </button>
        </td>
        <td>
          <button
            type="button"
            name="delete"
            className="redbtn"
            onClick={() => {
              onDelete(product.productId);
            }}
          >
            <i className="fa fa-remove"></i>
          </button>
        </td>
      </tr>
    );
  }
}

export default EachProduct;
