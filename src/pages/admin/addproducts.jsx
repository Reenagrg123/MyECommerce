import React, { Component } from "react";
import "../../components/reusable/common.scss";
import nextId from "react-id-generator";
import { withRouter, Redirect } from "react-router-dom";
// import ViewProduct from "./viewproducts";

class AddProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      productName: "",
      quantity: "",
      price: "",
      selectedFile: "",
      isItemAdded: false,
      isClickedBack: false
    };
  }

  //....................................................................................
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //handler for Image only
  handleChangeFile = (event) => {
    var file = event.target.files[0]["name"];
    this.setState({ selectedFile: file });
  };

  //submitting the form
  handleSubmit = (event) => {
    event.preventDefault();
    var productId = localStorage.getItem("productId");
    localStorage.setItem("productId", ++productId);

    //cloning the state data(form data) for to store into localstorage
    var myProduct = {
      ...this.state
    };

    //setting the productId manually with the help of localstorage
    myProduct["productId"] = productId;

    var productsData = JSON.parse(localStorage.getItem("products"));
    var tempData = [];

    if (productsData === null) {
      tempData.push(myProduct);
      localStorage.setItem("products", JSON.stringify(tempData));
    } else {
      productsData.map((product) => tempData.push(product));
      tempData.push(myProduct);
      localStorage.setItem("products", JSON.stringify(tempData));
    }

    alert("Product added successfully");
    this.setState({ isItemAdded: true });
  };

  //Back to dashboard
  handleBack = (event) => {
    this.setState({ isClickedBack: true });
  };

  //........................................................................................
  render() {
    const { isItemAdded, isClickedBack } = this.state;
    return (
      <React.Fragment>
        {isClickedBack && this.props.history.push("/admin")}
        {isItemAdded ? (
          <Redirect to="/admin"></Redirect>
        ) : (
          <div>
            <br></br>
            <h2>
              <center>
                <b>
                  <u>Add Product</u>
                </b>
              </center>
            </h2>
            <form className="form" onSubmit={this.handleSubmit}>
              <label>
                <b>Category</b>
              </label>
              <select
                className="textbox"
                name="category"
                onChange={this.handleChange}
                required
              >
                <option>--Select category--</option>
                <option value="Men" defaultValue="Men">
                  Men
                </option>
                <option value="Women">Women </option>
                <option value="Footwear">Footwear</option>
                <option value="Electronics">Electronics</option>
              </select>
              <br></br>
              <label>
                <b>Product name</b>
              </label>
              <input
                type="text"
                className="textbox"
                name="productName"
                placeholder="Enter product name"
                onChange={this.handleChange}
                required
              ></input>
              <br></br>
              <label>
                <b>Quantity</b>
              </label>
              <input
                type="number"
                className="textbox"
                name="quantity"
                placeholder="Enter quantity"
                onChange={this.handleChange}
                min="1"
                required
              ></input>
              <br></br>
              <label>
                <b>Price(Rs)</b>
              </label>
              <input
                type="text"
                className="textbox"
                name="price"
                placeholder="Enter price"
                onChange={this.handleChange}
                required
              ></input>
              <br></br>

              <label>
                <b>Select the product image:</b>
              </label>
              <br></br>
              <br></br>
              <input
                type="file"
                name="file"
                onChange={this.handleChangeFile}
              ></input>
              <br></br>
              <br></br>
              <input type="submit" className="button" value="Add Item"></input>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AddProducts;
