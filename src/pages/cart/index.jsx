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
      noItem: false
    };
  }

  componentDidMount() {
    var orders = JSON.parse(localStorage.getItem("orders"));
    var orderIndex = getCurrentUserOrder();
    var currentUserData = orders[orderIndex];
    // console.log("current user data:", currentUserData);
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

    // console.log(totalProducts);
  };

  handleModalShow = (flag) => {
    console.log("flag:", flag);
    var orders = JSON.parse(localStorage.getItem("orders"));
    var orderIndex = getCurrentUserOrder();
    console.log("Orders:", orders);
    if (flag) {
      if (orders[orderIndex].products.length === 0) {
        this.setState({ noItem: true });
      }
      this.setState({ modalShow: flag });
    }
     else {
      this.setState({ modalShow: flag });
      this.setState({ order: null });

      orders.splice(orderIndex, 1);
      console.log("updated orders:", orders);

      console.log("Placed order:", this.state.order);

      //removing placedorder from localstorage
      console.log("orders:", orders);
      var temp = [];
      orders.map((order) => temp.push(order));
      localStorage.setItem("orders",JSON.stringify(temp));
      this.props.calculateCartCount(0);
    }

    // const { order } = this.state;
    // var products = JSON.parse(localStorage.getItem("products"));

    //  for(let i=0;i<order.length;i++){
    //    for(let j=0;j<products.length;j++){
    //      if(order[i].productId===products[j].productId){

    //      }
    //    }
    //  }

    //this.setState({ order: null });
  };

  // updateOrderQuantity=(countQuantity)=>{

  // }

  // handlePlaceOrder=()=>{

  // }

  handleTotalPayable = (prevTotal, total) => {
    var { tempPayable } = this;
    //console.log("Total:", total);

    var newTotal = parseInt(total) + (tempPayable - prevTotal);
   // console.log("new total:", newTotal);
    this.tempPayable = newTotal;
    //console.log("Temp payable:", this.tempPayable);

    this.setState({ totalPayable: this.tempPayable });
  };

  //....................................................................
  render() {
    const { order, totalPayable, modalShow, noItem } = this.state;

    if (order != null) {
      var orderIndex = getCurrentUserOrder();
      console.log(this.props.userRole);
      console.log("Modal show:", modalShow);
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
          <h2>Cart is empty.</h2>
        </div>
      );
  }
}

export default Cart;
