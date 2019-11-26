import React, { Component } from "react";
import "./addproducts.css";
import "../inputs.css";
import nextId from "react-id-generator";
import {withRouter,Redirect} from 'react-router-dom';
// import ViewProduct from "./viewproducts";

class AddProducts extends Component {
  constructor(props) {

    super(props);
    this.state = {
      productId: "",
      category: "",
      productName: "",
      quantity: "",
      price: "",
      selectedFile: "",
      isItemAdded:false
    };
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleChangeFile = event => {
    var file = event.target.files[0]["name"];
    // console.log(file);
    this.setState({ selectedFile: file });
  };

  handleSubmit = event => {
    event.preventDefault();
    var productId = localStorage.getItem("productId");
    localStorage.setItem("productId", ++productId);
    this.setState({ productId: productId });
    
    var productsData = JSON.parse(localStorage.getItem("products"));
    // console.log("Storage data: ", productsData);

    var tempData = [];

    if (productsData === null) {
      // console.log("first item");
      localStorage.setItem("products", JSON.stringify(this.state));
    } else {
      // console.log("After first item");

      // for (let i = 0; i < productsData.length; i++) {
      //   tempData.push(productsData[i]);
      productsData.map(product=>tempData.push(product));
      
      tempData.push(this.state);
      localStorage.setItem("products", JSON.stringify(tempData));
    }

    alert("Product added successfully");
    // this.props.history.push('/admin');
    this.setState({isItemAdded:true});
};

  render() {
    console.log("hdhhd");
    console.log(this.state.isItemAdded);
    if(this.state.isItemAdded){
    
      window.open('/admin/');
    }
    else{
      console.log("hdhhd");

    return (
      <React.Fragment>
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
          <select class="textbox" name="category" onChange={this.handleChange}>
          <option>--Select category--</option>
            <option value="Men" defaultValue="Men">Men</option>
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
          ></input>
          <br></br>
          
          <label>
            <b>Select the product image:</b>
          </label>
          <br></br><br></br>
          <input
            type="file"
            name="file"
            onChange={this.handleChangeFile}
          ></input>
          <br></br>
          <br></br>
          <input type="submit" className="button"
            value="Add Item"></input>
         
        </form>
      </React.Fragment>
    );
  }
}
}

export default AddProducts;
