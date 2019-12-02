import React, { Component } from "react";
import CountHandler from "../reusable/countHandler";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.product.price
    };
  }

  handleTotal = (quantity) => {
    // console.log(quantity);
    const price = parseInt(this.props.product.price);
    console.log(typeof price);
    const total = quantity * price;
    console.log("Total:", total);
    this.setState({ total: total });
    this.props.calculateTotalPayable(total);
  };

  render() {
    const {
      category,
      productName,
      quantity,
      price,
      selectedFile,
      orderId
    } = this.props.product;

    const { total } = this.state;
    const { onDelete } = this.props;

    return (
      <tr>
        <td>
          <img
            src={require(`../Images/ProductItems/${category}/${selectedFile}`)}
          ></img>
        </td>
        <td>{category}</td>
        <td> {productName}</td>
        <td>
          {
            <CountHandler
              quantity={quantity}
              calculateTotal={this.handleTotal}
            />
          }
        </td>
        <td>{price}</td>
        <td>{total}</td>
        <td>
          <button
            type="button"
            name="delete"
            className="redbtn"
            onClick={() => {
              onDelete(orderId);
            }}
          >
            <i className="fa fa-remove"></i>
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
