import React, { Component } from "react";
import CountHandler from "../../components/reusable/countHandler";

class Product extends Component {
  constructor(props) {
    super(props);
    this.quantityFlag = "";
    this.state = {
      total: this.props.product.price,
      countQuantity: 1
    };
  }

  componentDidMount() {
    const { total } = this.state;
    const { price } = this.props.product;
    const priceInt = parseInt(price);

    this.props.handleTotalPayable(0, total);
  }

  componentDidUpdate(prevProps, prevState) {
    const { total, countQuantity } = this.state;
    if (countQuantity != prevState.countQuantity) {
      this.handleTotal();

      // this.props.updateOrderQuantity(countQuantity);
    }
    if (this.state.total != prevState.total) {
      this.props.handleTotalPayable(prevState.total, total);
    }
  }
  //........................................................................................

  handleIncrement = (quantity) => {
    const { countQuantity } = this.state;
    if (countQuantity < quantity) {
      this.setState((prevState, props) => {
        return { countQuantity: prevState.countQuantity + 1 };
      });
    }
  };

  handleDecrement = (quantity) => {
    const { countQuantity } = this.state;

    if (countQuantity >= 2) {
      this.setState((prevState, props) => {
        return { countQuantity: prevState.countQuantity - 1 };
      });
    }
  };

  handleTotal = () => {
    const { price } = this.props.product;
    const { countQuantity } = this.state;
    const priceInt = parseInt(price);
    // console.log(typeof price);
    const total = countQuantity * priceInt;
    console.log("Total:", total);
    this.setState({ total: total });

    console.log("price", priceInt);
  };

  //.....................................................................................
  render() {
    const {
      category,
      productName,
      quantity,
      price,
      selectedFile,
      orderId
    } = this.props.product;

    const { total, countQuantity } = this.state;
    const { onDelete } = this.props;

    return (
      <tr>
        <td>
          <img
            src={require(`../../assets/Images/ProductItems/${category}/${selectedFile}`)}
          ></img>
        </td>
        <td>{category}</td>
        <td> {productName}</td>
        <td>
          {
            <CountHandler
              quantity={quantity}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              countQuantity={countQuantity}
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
