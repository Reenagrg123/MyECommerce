import React, { Component } from "react";
import Card from "./card";

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

  //get All products from localstorage
  getAllProducts = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));
    //  productsData.map(product=>delete product.quantity);

    //console.log("cbbd", productsData);
    this.setState({ productsData: productsData }, () => {
      this.getCategory();
      //console.log("hello");
    });
  };

  //Filtering the data based on Category
  getCategory = () => {
    const { productsData } = this.state;
    // console.log(productsData);
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

  handleCartClick = (product) => {
    //getting the adding to cart product
    // console.log(product);
    if (!this.props.isLoggedIn) {
      this.setState({ isAllowedToAddCart: true });
      return;
    }
    // product.quantity=1;

    //setting orderId
    var orderId = JSON.parse(localStorage.getItem("orderId"));
    product["orderId"] = ++orderId;
    localStorage.setItem("orderId", JSON.stringify(orderId));

    //finding userId of loggedIn user
    var userSession = JSON.parse(localStorage.getItem("userSession"));
    if(userSession){

    
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
    if (orders === null) {
      var order = { userId: null, products: [] };
      order.userId = currentUserId;
      order.products.push(product);
      temp.push(order);
      // console.log("hdh", temp);
      localStorage.setItem("orders", JSON.stringify(temp));
    } else {
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId === currentUserId) {
          if (
            !orders[i].products.find(
              (Product) => Product.productId === product.productId
            )
          ) {
            // console.log("Found");
            orders[i].products.push(product);
            console.log(orders[i]);

            // temp.push(orders);
            orders.map((order) => temp.push(order));
            console.log("hdh", temp);
            localStorage.setItem("orders", JSON.stringify(temp));
            var totalProducts = orders[i].products.length;

            
            // console.log(totalProducts);
            console.log("products:", orders[i].products);
            this.setState({ addedToCart: true });
            this.props.calculateCartCount(totalProducts);
            alert("Added to cart");

            return;
          } else {
            alert("Already added to cart");

            return;
          }
        }
      }
      console.log("temp:", temp);
      orders.map((order) => temp.push(order));
      console.log("temp:", temp);
      var order = { userId: null, products: [] };
      order.userId = currentUserId;
      order.products.push(product);
      temp.push(order);
      console.log("temp:", temp);
      localStorage.setItem("orders", JSON.stringify(temp));
      console.log(totalProducts);
      this.props.calculateCartCount(1);
      

      // console.log("products:", orders[0].products);
      // var totalProducts = orders[orders.length-1].products.length;

      // this.props.calculateCartCount(totalProducts);
      // console.log(totalProducts);
      alert("Added to cart");
    }
  }
  else{
    alert("Please register to continue with shopping..");
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
    if (
      electronicsData != null &&
      footwearsData != null &&
      menData != null &&
      womenData != null
    ) {
      return (
        <React.Fragment>
          {isAllowedToAddCart && <Redirect to="/login" />}
          <hr></hr>
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

export default Shop;
