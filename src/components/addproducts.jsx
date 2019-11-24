import React, { Component } from "react";
import "./addproducts.css";
import "./inputs.css";
// import ViewProduct from "./viewproducts";

class AddProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId:"",
      category: "",
      productName: "",
      quantity: "",
      price: "",
      selectedFile:""
    };
  }


  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleChangeFile=(event)=>{
    var file=event.target.files[0]['name'];
    // console.log(file);
    this.setState({selectedFile:file});
  }

  handleSubmit = event => {
    // console.log("event:",event.target.value);
    event.preventDefault();
    var productsData = JSON.parse(localStorage.getItem("products"));
    console.log("Storage data: ", productsData);

    var formData = this.state;

    console.log("Form data: ", formData);

    var tempData = [];

    if (productsData == null) {
      console.log("first item");
      localStorage.setItem("products", JSON.stringify(formData));
    } else {
      console.log("After first item");

      for (let i = 0; i < productsData.length; i++) {
        tempData.push(productsData[i]);
      }
      tempData.push(formData);
      console.log(tempData);
      localStorage.setItem("products", JSON.stringify(tempData));
    }

    this.setState({ isItemAdded: true });
    alert("Product added successfully");

    
  };

  render() {
    return (
      <React.Fragment>
        <h2>
          <center>
            <b>
              <u>Add Items</u>
            </b>
          </center>
        </h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <b>Category</b>
          </label>
          <select class="textbox" name="category" onChange={this.handleChange}>
            <option value="Men">Men</option>
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
            class="textbox"
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
            class="textbox"
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
            class="textbox"
            name="price"
            placeholder="Enter price"
            onChange={this.handleChange}
          ></input>
          <br></br><br></br>
          <label><b>Select the product image:</b></label>
          <br></br>
           <input type="file" name="file" onChange={this.handleChangeFile}></input>
           <br></br><br></br>
          <button type="Add Item" class="button">
            Add Item
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddProducts;
