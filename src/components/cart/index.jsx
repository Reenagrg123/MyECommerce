import React, { Component } from "react";
import Product from "./product";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      totalPayable: 0
    };
  }
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    var orders = JSON.parse(localStorage.getItem("orders"));

    var userSession = JSON.parse(localStorage.getItem("userSession"));
    const username = userSession.username;
    const password = userSession.password;
    var users = JSON.parse(localStorage.getItem("Users"));
    if (users) {
      var currentUser = users.find(
        (user) =>
          user.username == userSession.username &&
          user.password == userSession.password
      );
      var currentUserId = currentUser.userId;
    }
    if (orders) {
      var currentUserData = orders.find(
        (order) => order.userId === currentUserId
      );

      // console.log("data", currentUserData.products);
      this.setState({ order: currentUserData.products });
    }
    // else{
    //     <h1>Card is Empty</h1>
    // }
  };

  handleDelete = (orderId) => {
    var orders = JSON.parse(localStorage.getItem("orders"));
    var updatedOrders = orders[0].products.filter(
      (product) => product.orderId != orderId
    );
    this.setState({ order: updatedOrders });
    orders[0].products = updatedOrders;
    localStorage.setItem("orders", JSON.stringify(orders));
    var totalProducts = orders[0].products.length;

    // this.props.calculateCartCount(totalProducts);
    // console.log(totalProducts);
  };

  handleTotalPayable = (total) => {
    var { totalPayable } = this.state;
    totalPayable = total + totalPayable;
    console.log("Total payable:", totalPayable);
  };

  render() {
    const { order } = this.state;
    console.log(order);

    if (order != null) {
      console.log(order);
      return (
        <div>
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
                  calculateTotalPayable={this.handleTotalPayable}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    } else return null;
  }
}

export default Cart;
