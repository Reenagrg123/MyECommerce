import React, { Component } from "react";
import ViewProducts from "./viewproducts";
import ProductDetail from "./productdetail";
import { Redirect } from "react-router";

class EachProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedView: false,
    };
  }

  //.....................................................................................................
  handleView = () => {
    console.log("handle view");
    this.setState({ isClickedView: true });
  };

  //..................................................................................................
  render() {
    const { product, onDelete, onView,currentPage } = this.props;
    console.log("current page",this.props.currentPage);
    const {
      category,
      productName,
      quantity,
      price,
      productId
    } = this.props.product;
    const { isClickedView } = this.state;

    return (
      <tr>
        {isClickedView && <Redirect to={`/product/${productName}`} />}

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
              this.handleView();
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
