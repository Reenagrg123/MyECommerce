import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedCart: false
    };
  }

  //.........................................................................................
  render() {
    const { category, productName, price, selectedFile } = this.props.product;
    const { onCartClick, product } = this.props;

    return (
        <div className="card">
          <img
            className="productImg"
            src={require(`../../assets/Images/ProductItems/${category}/${selectedFile}`)}
          ></img>
          <div className="card_content">
            <h5>{productName}</h5>
            <h5>{price}/-</h5>
            <input
              type="button"
              className="button"
              value="Add to Cart"
              onClick={() => onCartClick(product)}
            ></input>
          </div>
        </div>
    );
  }
}

export default Card;
