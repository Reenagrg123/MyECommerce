import React, { Component } from "react";
import "./viewproducts.css";
import EachProduct from "./eachproduct";
import ProductDetail from "./productdetail";

class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: null,
      isClickedView: false,
      product: null,
      path: ""
    };
  }
  getProductsData = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));
    return productsData;
  };
  handleView = product => {
    console.log("hgfhfd");
    this.setState({ isClickedView: true });
    this.setState({ product: product });
  };

  componentDidMount() {
    // console.log("Data:", productsData);

    var productsData = this.getProductsData();
    this.setState({ productsData: productsData });
  }

  handleDelete = id => {
    var newData = null;
    var productsData = this.getProductsData();
    console.log(id);
    newData = productsData.filter(product => id != product.productId);
    console.log(newData);
    // this.setState(productsData:newData);
    localStorage.setItem("products", JSON.stringify(newData));
    this.setState({ productsData: newData });
    alert("Product deleted successfully");
  };

  handleBack = () => {
    this.setState({ isClickedView: false });
  };

  render() {
    if (this.state.productsData != null && this.state.isClickedView != true) {
      console.log(this.state.productsData);

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

          <table class="viewProducts">
            <tr>
              <th>Product ID</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price(Rs).</th>
              <th></th>
              <th></th>
            </tr>
            {this.state.productsData.map(product => (
              <EachProduct
                key={product.productId}
                product={product}
                onDelete={this.handleDelete}
                onView={this.handleView}
              >
                <td>P{product.productId}</td>
              </EachProduct>
            ))}
          </table>
        </div>
      );
    } else if (this.state.isClickedView) {
    return(
        <ProductDetail product={this.state.product} onBack={this.handleBack}/>
    );
    } else {
      return null;
    }
  }
}

export default ViewProducts;
