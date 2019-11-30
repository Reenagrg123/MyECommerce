import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedCart: false,
      isLoggedIn: false
    };
  }

  handleCartClick = (event) => {
    const newOrder = { ...this.props.product };
    console.log(newOrder.product);
    

    var orderId=JSON.parse(localStorage.getItem("orderId"));
    newOrder["orderId"]=++orderId;
    
    localStorage.setItem("orderId",JSON.stringify(orderId));
    var order={"userId":null,"products":[]};
    order.products.push(newOrder);

    var orders = JSON.parse(localStorage.getItem("orders"));
    var temp = [];
    if (orders === null) {
      temp.push(order);
      console.log("hdh", temp);
      localStorage.setItem("orders", JSON.stringify(temp));
    } else {
      temp = orders.slice(0);
      temp.push(order);
      localStorage.setItem("orders", JSON.stringify(temp));
    }
  };

  render() {
    const {
      category,
      productName,
      quantity,
      price,
      selectedFile
    } = this.props.product;

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
          onClick={this.handleCartClick}
        ></input>
      </div>
    );
  }
}

export default Card;
