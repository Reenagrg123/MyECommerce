import React, { Component } from "react";
import EachProduct from "./eachproduct";
import ProductDetail from "./productdetail";
import Pagination from "../../components/reusable/pagination";
import { Redirect } from "react-router-dom";

class ViewProducts extends Component {
  constructor(props) {
    //console.log("constructor called");
    super(props);
    this.productsPerPage = 5;
    this.currentProducts = null;
    this.state = {
      productsData: null,
      product: null,
      currentPage: 1,
      currentProducts: null
    };
  }

  componentDidMount() {
    var productsData = this.getProductsData();
    console.log("Data:", this.state.productsData);
    this.setState({ productsData: productsData });
  }
  //...............................................................................................

  getProductsData = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));
    return productsData;
  };

  handlePageClick = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  getCurrentProducts = () => {
    const { productsData, isClickedView, currentPage, product } = this.state;
    const indexOfLastProduct = currentPage * this.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.productsPerPage;
    var currentProducts = productsData.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    console.log("currentProducts:", currentProducts);
    this.currentProducts = currentProducts;
  };
  //..............................................................................................

  handleDelete = (id) => {
    var newData = null;
    var productsData = this.getProductsData();
    console.log(id);
    newData = productsData.filter((product) => id != product.productId);
    console.log(newData);
    // this.setState(productsData:newData);
    localStorage.setItem("products", JSON.stringify(newData));
    this.setState({ productsData: newData });
    alert("Product deleted successfully");
  };

  //....................................................................................................
  render() {
    const { productsData, isClickedView, currentPage, product } = this.state;
    console.log("current page:", currentPage);
    if (productsData != null) {
      this.getCurrentProducts();

      return (
        <div>
          <h3 className="productCount">Total {productsData.length} products</h3>
          <h1>
            <center>
              <b>
                <u>Products List</u>
                <br></br>
                <br></br>
              </b>
            </center>
          </h1>

          <table className="viewProducts">
            <tbody>
              <tr>
                <th>Product ID</th>
                <th>Category</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price(Rs).</th>
                <th></th>
                <th></th>
              </tr>
              {this.currentProducts.map((product) => (
                <EachProduct
                  key={product.productId}
                  product={product}
                  onDelete={this.handleDelete}
                  onView={this.handleView}
                  onPageClick={this.handlePageClick}
                  currentPage={this.currentPage}
                >
                  <td>P{product.productId}</td>
                </EachProduct>
              ))}
            </tbody>
          </table>
          <Pagination
            productsPerPage={this.productsPerPage}
            totalProducts={productsData.length}
            onPageClick={this.handlePageClick}
          ></Pagination>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ViewProducts;
