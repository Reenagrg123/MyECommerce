import React, { Component } from "react";

class CountHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      maxQuantity: this.props.quantity
    };
  }

  handleIncrement = () => {
    const { quantity, maxQuantity } = this.state;
    if (quantity < maxQuantity) {
      this.setState((prevState, props) => {
        return { quantity: prevState.quantity + 1 };
      });
    }
  };

  handleDecrement = () => {
    const { quantity, maxQuantity } = this.state;

    if (this.state.quantity >= 2) {
      this.setState((prevState, props) => {
        return { quantity: prevState.quantity - 1 };
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.quantity != prevState.quantity) {
      this.props.calculateTotal(this.state.quantity);
    }
  }

  render() {
    const { quantity } = this.state;
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button> {quantity}{" "}
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default CountHandler;
