import React, { Component } from "react";
import Card from "./card";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: null,
      electronicsData: null,
      footwearsData: null,
      mensData: null,
      womensData: null,
      searchData: ""
    };
  }

  handleChange = (event) => {
    this.setState({ searchData: event.target.value });
  };
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
  componentDidMount() {
    this.getAllProducts();
  }
  getAllProducts = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));
    this.setState({ productsData: productsData }, () => {
      this.getCategory();
      console.log("hello");
    });
  };
 

  getCategory = () => {
    const { productsData } = this.state;
    console.log(productsData);
    var electronicsData = productsData.filter(
      (data) => data.category == "Electronics"
    );
    // this.setState({ electronicsData: electronicsData });

    var footwearsData = productsData.filter(
      (data) => data.category == "Footwear"
    );
    // this.setState({ footwearsData: footwearsData });

    var mensData = productsData.filter((data) => data.category == "Men");
    // this.setState({ mensData: mensData });

    var womensData = productsData.filter((data) => data.category == "Women");
    this.setState({
      electronicsData: electronicsData,
      footwearsData: footwearsData,
      mensData: mensData,
      womensData: womensData
    });
  };

  handleSearch() {}
  render() {
    if (
      this.state.electronicsData != null &&
      this.state.footwearsData != null &&
      this.state.mensData != null &&
      this.state.womensData != null
    ) {
      return (
        <React.Fragment>
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
          <h1 className="categoryHeading">
            <center>----Electronics----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {this.state.electronicsData.map((product) => (
              <Card product={product} 
              key={product.productId}/>
            ))}
          </div>
          <hr></hr>
          <h1 className="categoryHeading">
            <center>----Footwears----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {this.state.footwearsData.map((product) => (
              <Card product={product}
              key={product.productId} />
            ))}
          </div>
          <hr></hr>
          <h1 className="categoryHeading">
            <center>----Men's----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {this.state.mensData.map((product) => (
              <Card product={product}
              key={product.productId} />
            ))}
          </div>
          <hr></hr>
          <h1 className="categoryHeading">
            <center>----Women's----</center>
          </h1>
          <br></br>
          <br></br>
          <div className="row">
            {this.state.womensData.map((product) => (
              <Card product={product} 
              key={product.productId}/>
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
