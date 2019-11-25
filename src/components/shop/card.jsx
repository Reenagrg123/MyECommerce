import React, { Component } from "react";
import "./style.css";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: ""
    };
  }

  render() {
    const {
      category,
      productName,
      quantity,
      price,
      selectedFile
    } = this.props.product;
    console.log(this.state.path);

    return (
      <div class="card">
        <img
          src={require(`../Images/ProductItems/${category}/${selectedFile}`)}
        ></img>
        <h5>{productName}</h5>
        <h5>{price}Rs.</h5>
        <input type="button" class="button" value="Add to Cart"></input>
      </div>
    );
  }
}

export default Card;
