import React, { Component } from 'react';

class ProductDetail extends Component {
    render() { 
        const {
            category,
            productName,
            quantity,
            price,
            selectedFile
          } = this.props.product;
    
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
    }
    }

 
export default ProductDetail;