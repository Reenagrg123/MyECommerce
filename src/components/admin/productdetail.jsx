import React, { Component } from "react";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredProduct: null
    };
  }
  componentDidMount() {
    const paramId = this.props.match.params.id;
    console.log(paramId);
    if (paramId) {
      this.fetchData(paramId);
    }
    else{
      console.log(this.props.location);
    }
  }
  fetchData = (paramId) => {
    var products = JSON.parse(localStorage.getItem("products"));
    var requiredProduct = products.filter(
      (product) => product.productId == paramId
    );
    console.log(requiredProduct);
    this.setState({ requiredProduct: requiredProduct[0] });
  };

  render() {
    const { requiredProduct } = this.state;

    if (requiredProduct != null ) {
      console.log("in");
      const {
        category,
        productName,
        quantity,
        price,
        selectedFile
      } = requiredProduct;
      console.log(category);
      return (
        <div class="jumbotron">
          <img
            class="productImage"
            src={require(`../Images/ProductItems/${category}/${selectedFile}`)}
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
            class="button"
            value="Back to All Products"
            onClick={this.props.onBack}
          ></input>
        </div>
      );
    } else return null;
  }
}

export default ProductDetail;
