import React, { Component } from "react";
import { Redirect } from "react-router";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredProduct: null,
      isClickedBack: false
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    if (productId) {
      this.fetchData(productId);
    }
  }
  //...................................................................................
  fetchData = (productId) => {
    var products = JSON.parse(localStorage.getItem("products"));
    var requiredProduct = products.filter(
      (product) => product.productId == productId
    );
    this.setState({ requiredProduct: requiredProduct[0] });
  };


  //Back to all products
  handleBack = () => {
    this.setState({ isClickedBack: true });
  };

  //....................................................................
  render() {
    const { requiredProduct,isClickedBack } = this.state;

    if (requiredProduct != null) {
      const {
        category,
        productName,
        quantity,
        price,
        selectedFile
      } = requiredProduct;
      return (
        <div className="jumbotron">
          {isClickedBack && <Redirect to="/viewproducts" />}
          <img
            className="productImage"
            src={require(`../../assets/Images/ProductItems/${category}/${selectedFile}`)}
          ></img>
          <h2>
            <b>Category: </b>
            {category}
          </h2>
          <br></br>
          <h5>
            <b>Product Name: </b>
            {productName}
          </h5>
          <h5>
            <b>Quantity: </b>
            {quantity}
          </h5>
          <h5>
            <b>Price: </b>
            {price}
          </h5>
          <br></br>
          <input
            type="button"
            className="button"
            value="Back to All Products"
            onClick={this.handleBack}
          ></input>
        </div>
      );
    } else return null;
  }
}

export default ProductDetail;
