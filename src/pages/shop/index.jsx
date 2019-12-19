import React, { Component } from "react";
import Card from "./card";
import { withRouter } from "react-router-dom";
import "./style.scss";

import { Redirect } from "react-router";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: null,
      electronicsData: null,
      footwearsData: null,
      menData: null,
      womenData: null,
      searchData: "",
      isAllowedToAddCart: false,
      addedToCart: false
    };
  }

  //loading the data initially
  componentDidMount() {
    this.getAllProducts();
  }
  //................................................................................................
  //get All products from localstorage
  getAllProducts = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));

    this.setState({ productsData: productsData }, () => {
      this.getCategory();
    });
  };

  //Filtering the data based on Category
  getCategory = () => {
    const { productsData } = this.state;
    var electronicsData = productsData.filter(
      (data) => data.category === "Electronics"
    );

    var footwearsData = productsData.filter(
      (data) => data.category === "Footwear"
    );

    var menData = productsData.filter((data) => data.category === "Men");

    var womenData = productsData.filter((data) => data.category === "Women");
    this.setState({
      electronicsData: electronicsData,
      footwearsData: footwearsData,
      menData: menData,
      womenData: womenData
    });
  };

  // ...................................................................................
  //getting the searching value
  handleChange = (event) => {
    this.setState({ searchData: event.target.value });
  };

  //getting the searhing data
  handleSearch = (event) => {
    const { productName } = this.state.productsData;
    const { searchData, productsData } = this.state;

    if (searchData != "") {
      var searchedData = productsData.filter(
        (data) => data.productName === searchData
      );
      this.setState({ productsData: searchedData }, () => {
        this.getCategory();
      });
    } else {
      this.getAllProducts();
      this.getCategory();
    }
  };

  //Handling add to cart
  handleCartClick = (product) => {
    //getting the adding to cart product
    if (!this.props.isLoggedIn) {
      this.setState({ isAllowedToAddCart: true });
      return;
    }

    //setting orderId
    var orderId = JSON.parse(localStorage.getItem("orderId"));
    product["orderId"] = ++orderId;
    localStorage.setItem("orderId", JSON.stringify(orderId));

    //If the current loggedIn user is a registered user,then only he/she can add to cart otherwise he/she has to register first
    //finding userId of loggedIn user

    if (JSON.parse(localStorage.getItem("currentUserRole")) === "user") {
      var userSession = JSON.parse(localStorage.getItem("session"));

      const username = userSession.username;
      const password = userSession.password;
      var users = JSON.parse(localStorage.getItem("Users"));
      var currentUser = users.find(
        (user) =>
          user.username == userSession.username &&
          user.password == userSession.password
      );
      const currentUserId = currentUser.userId;

      var orders = JSON.parse(localStorage.getItem("orders"));
      console.log("orders:", orders);

      var temp = [];

      //If this is the first order
      if (orders === null) {
        var order = { userId: null, products: [] };
        order.userId = currentUserId;
        order.products.push(product);
        temp.push(order);
        localStorage.setItem("orders", JSON.stringify(temp));
      }
      //else find that userId in the orders and then add his/her products at that userid
      else {
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].userId === currentUserId) {
            if (
              !orders[i].products.find(
                (Product) => Product.productId === product.productId
              )
            ) {
              orders[i].products.push(product);
              console.log(orders[i]);

              orders.map((order) => temp.push(order));
              console.log("hdh", temp);
              localStorage.setItem("orders", JSON.stringify(temp));
              var totalProducts = orders[i].products.length;

              console.log("products:", orders[i].products);
              this.setState({ addedToCart: true });
              this.props.calculateCartCount(totalProducts);
              alert("Added to cart");

              return;
            } //if that product is already added to cart then don't add again,simply give an alert and return
            else {
              alert("Already added to cart");

              return;
            }
          }
        }
        orders.map((order) => temp.push(order));
        var order = { userId: null, products: [] };
        order.userId = currentUserId;
        order.products.push(product);
        temp.push(order);
        localStorage.setItem("orders", JSON.stringify(temp));
        //when user add 1st product to cart then set cartcount to 1
        this.props.calculateCartCount(1);

        alert("Added to cart");
      }
    }
    //If the loggedIn user is admin
    else {
      alert("Please register/login to continue with shopping..");
    }
  };

  //................................................................................................
  render() {
    const {
      electronicsData,
      footwearsData,
      menData,
      womenData,
      isAllowedToAddCart,
      addedToCart
    } = this.state;
    // console.log("location:", this.props.location);

    if (
      electronicsData != null &&
      footwearsData != null &&
      menData != null &&
      womenData != null
    ) {
      return (
        <React.Fragment>
          {isAllowedToAddCart && (
            <Redirect
              to={{
                pathname: "/login",
                state: { userRole: "user" }
              }}
            />
          )}
          <center>
            <input
              type="text"
              className="search"
              placeholder="Search.."
              onChange={this.handleChange}
            ></input>
            <button
              type="search"
              className="searchIcon"
              onClick={this.handleSearch}
            >
              <i className="fa fa-search"></i>
            </button>
          </center>
          <br></br>
          <hr></hr>
          <h1 className="categoryHeading" id="footwears">
            <center>----Footwears----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {footwearsData.map((product) => (
              <Card
                product={product}
                key={product.productId}
                onCartClick={this.handleCartClick}
                addedToCart={addedToCart}
              />
            ))}
          </div>
          <hr></hr>
          <br></br>
          <h1 className="categoryHeading" id="electronics">
            <center>----Electronics----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {electronicsData.map((product) => (
              <Card
                product={product}
                key={product.productId}
                onCartClick={this.handleCartClick}
                addedToCart={addedToCart}
              />
            ))}
          </div>
          <hr></hr>
          <h1 className="categoryHeading" id="men">
            <center>----Men's----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {menData.map((product) => (
              <Card
                product={product}
                key={product.productId}
                onCartClick={this.handleCartClick}
                addedToCart={addedToCart}
              />
            ))}
          </div>
          <hr></hr>
          <h1 className="categoryHeading" id="women">
            <center>----Women's----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {womenData.map((product) => (
              <Card
                product={product}
                key={product.productId}
                onCartClick={this.handleCartClick}
                addedToCart={addedToCart}
              />
            ))}
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Shop);
