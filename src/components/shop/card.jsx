import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedCart: false,
    };
  }

  //.........................................................................................
  render() {
    const {
      category,
      productName,
      price,
      selectedFile
    } = this.props.product;
    const {onCartClick,product,addedToCart}=this.props;

    return (
      <div className="card">
        <img
          src={require(`../Images/ProductItems/${category}/${selectedFile}`)}
        ></img>
        <h5>{productName}</h5>
        <h5>{price}Rs.</h5>
        <input
          type="button"
          className="button"
          value="Add to Cart"
          onClick={()=>onCartClick(product)}
        ></input>
      </div>
    );
  }
}

export default Card;
