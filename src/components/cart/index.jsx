import React, { Component } from "react";
import Product from "./product";
import "./style.css";
import { Redirect } from "react-router-dom";
import ThanksShopping from "./thanksForShopping";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.tempPayable=0
    this.state = {
      order: null,
    
      total: 0,
      modalShow: false,
      totalPayable:0
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

      this.setState({ order: currentUserData.products });
    }
    // else{
    //     <h1>Card is Empty</h1>
    // }
  };
  //................................................................

  handleDelete = (orderId) => {
    var orders = JSON.parse(localStorage.getItem("orders"));
    var updatedOrders = orders[0].products.filter(
      (product) => product.orderId != orderId
    );
    this.setState({ order: updatedOrders });
    orders[0].products = updatedOrders;
    localStorage.setItem("orders", JSON.stringify(orders));
    var totalProducts = orders[0].products.length;

    this.props.calculateCartCount(totalProducts);
    // console.log(totalProducts);
  };

  handleModalShow = (flag) => {
    console.log("flag:", flag);
    this.setState({ modalShow: flag });
  };


  handleTotalPayable=(prevTotal,total)=>{
  var {tempPayable}=this;
  console.log("Total:",total);

  var newTotal=parseInt(total)+(tempPayable-prevTotal);
  console.log("new total:",newTotal);
  this.tempPayable=newTotal;
  console.log("Temp payable:",this.tempPayable);

  this.setState({totalPayable:this.tempPayable});
}

  //....................................................................
  render() {
    // console.log("cart props:", this.props);
    const { order, totalPayable, modalShow } = this.state;
    // console.log(order);

    if (order != null) {
      // console.log(order);
      // console.log(this.state.modalShow);
      return (
        <div>
          {modalShow && (
            <ThanksShopping
              onPlaceOrder={this.handleModalShow}
              show={modalShow}
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
    } else return null;
  }
}

export default Cart;
