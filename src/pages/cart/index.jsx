import React, { Component } from "react";
import Product from "./product";
import "./style.scss";
import { Redirect } from "react-router-dom";
import ThanksShopping from "./thanksForShopping";
import { getCurrentUserOrder } from "../helpers/getCurrentUserOrder";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.tempPayable = 0;

    this.state = {
      order: null,
      total: 0,
      modalShow: false,
      totalPayable: 0,
      noItem: false,
      isOrderPlaced: false
    };
  }

  componentDidMount() {
    var orders = JSON.parse(localStorage.getItem("orders"));
    var orderIndex = getCurrentUserOrder();
    var currentUserData = orders[orderIndex];
    if (currentUserData) {
      this.setState({ order: currentUserData.products }, () => {
        // this.props.calculateCartCount(this.state.order.length);
      });
    }
  }

  //................................................................

  handleDelete = (orderId) => {
    var orders = JSON.parse(localStorage.getItem("orders"));

    var orderIndex = getCurrentUserOrder();

    var updatedOrders = orders[orderIndex].products.filter(
      (product) => product.orderId != orderId
    );

    this.setState({ order: updatedOrders });
    orders[orderIndex].products = updatedOrders;
    localStorage.setItem("orders", JSON.stringify(orders));
    var totalProducts = orders[orderIndex].products.length;
    this.props.calculateCartCount(totalProducts);
  };

  //handling on Place Order
  handleModalShow = (flag) => {
    var orders = JSON.parse(localStorage.getItem("orders"));
    var orderIndex = getCurrentUserOrder();
    if (flag) {
      if (orders[orderIndex].products.length === 0) {
        this.setState({ noItem: true });
      }
      this.setState({ modalShow: flag });
    } else {
      this.setState({ modalShow: flag, order: null });
      //removing placedorder from localstorage
      orders.splice(orderIndex, 1);
      var temp = [];
      orders.map((order) => temp.push(order));
      localStorage.setItem("orders", JSON.stringify(temp));
      this.setState({ isOrderPlaced: !this.state.isOrderPlaced }, () =>
        this.props.calculateCartCount(0)
      );
    }
  };

  //handling total price of all ordered products
  handleTotalPayable = (prevTotal, total) => {
    var { tempPayable } = this;
    var newTotal = parseInt(total) + (tempPayable - prevTotal);
    this.tempPayable = newTotal;

    this.setState({ totalPayable: this.tempPayable });
  };

  //....................................................................
  render() {
    const {
      order,
      totalPayable,
      modalShow,
      noItem,
      isOrderPlaced
    } = this.state;
    if (isOrderPlaced) {
      return (
        <div>
          <Redirect to="/"></Redirect>
        </div>
      );
    }
    if (order != null) {
      return (
        <div>
          {modalShow && (
            <ThanksShopping
              onPlaceOrder={this.handleModalShow}
              show={modalShow}
              noItem={noItem}
              order={order}
            />
          )}
          <table className="viewProducts">
            <tbody>
              <tr>
                <th></th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price(Rs).</th>
                <th>Total</th>
                <th></th>
              </tr>

              {order.map((product) => (
                <Product
                  key={product.orderId}
                  product={product}
                  onDelete={this.handleDelete}
                  handleTotalPayable={this.handleTotalPayable}
                  updateOrderQuantity={this.updateOrderQuantity}
                />
              ))}
            </tbody>
          </table>
          <hr></hr>
          <h4 className="totalPay">Total Payable: {totalPayable}</h4>
          <br></br>
          <br></br>
          <button
            className="placeOrder"
            onClick={() => this.handleModalShow(true)}
          >
            Place Order
          </button>
        </div>
      );
    } else
      return (
        <div className="jumbotron">
            <center><img className="emptyCart" src={require("../../assets/Images/empty_cart.png")}></img></center>
        </div>
      );
  }
}

export default Cart;
