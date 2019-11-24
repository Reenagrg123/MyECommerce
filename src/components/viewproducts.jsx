import React, { Component } from "react";
import "./viewproducts.css";
import EachProduct from "./eachproduct";

class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: null
    };
  }

  componentDidMount() {
    var productsData = JSON.parse(localStorage.getItem("products"));
    console.log("Data:", productsData);
    this.setState({ productsData: productsData });

    // for (var i = 0; i < productsData.length; i++) {
    //   console.log(productsData[i]);
    // }
  }
  componentWillUnmount() {
    console.log(this.state.productData);
  }
  render() {
    if (this.state.productsData != null) {
      return (
        <div>
          <h1>
            <center>
              <b>
                <u>Products List</u>
                <br></br><br></br>
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
            </tr>
            {this.state.productsData.map(product => (
              <EachProduct 
              product={product}/>
            ))}
  
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ViewProducts;
