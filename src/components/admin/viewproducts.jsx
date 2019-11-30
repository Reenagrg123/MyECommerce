import React, { Component } from "react";
import EachProduct from "./eachproduct";
import ProductDetail from "./productdetail";
import Pagination from "../reusable/pagination";

class ViewProducts extends Component {
  productsPerPage = 5;

  

  constructor(props) {
    super(props);
    this.state = {
      productsData: null,

      isClickedView: false,
      product: null,
      currentPage:1,
      currentProducts: null
    };
  }

  componentDidMount() {
    var productsData = this.getProductsData();
    console.log("Data:", this.state.productsData);
    this.setState({ productsData: productsData });
  }

  getProductsData = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));
    return productsData;
  };

  getCurrentProducts = () => {};

  handleView = (product) => {
    console.log("hgfhfd");
    this.setState({ isClickedView: true });
    this.setState({ product: product });
  };

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

  handleBack = () => {
    this.setState({ isClickedView: false });
  };

  getCurrentPage=(pageNumber)=>{
    this.setState({currentPage:pageNumber});
  }

  render() {
    const {productsData,isClickedView,currentPage,product}=this.state;
    console.log("current page:",currentPage);
    if (productsData != null && isClickedView != true) {

      const indexOfLastProduct = currentPage * this.productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - this.productsPerPage;
      var currentProducts = productsData.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      console.log("currentProducts:", currentProducts);

      return (
        <div>
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
              {currentProducts.map((product) => (
                <EachProduct
                  key={product.productId}
                  product={product}
                  onDelete={this.handleDelete}
                  onView={this.handleView}
                >
                  <td>P{product.productId}</td>
                </EachProduct>
              ))}
            </tbody>
          </table>
          <Pagination
            productsPerPage={this.productsPerPage}
            totalProducts={productsData.length}
            getCurrentPage={this.getCurrentPage}

          ></Pagination>
        </div>
      );
    } else if (isClickedView) {
      return (
        <ProductDetail product={product} onBack={this.handleBack} />
      );
    } else {
      return null;
    }
  }
}

export default ViewProducts;
