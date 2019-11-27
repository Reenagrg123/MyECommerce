import React, { Component } from "react";
import "./style.css";
import{Redirect} from 'react-router-dom';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedCart:false
    };
  }

  handleCartClick=(event)=>{
    this.setState({isClickedCart:true});
  }

  render() {
    const {
      category,
      productName,
      quantity,
      price,
      selectedFile
    } = this.props.product;
    console.log(this.state.path);

    return (
      <div class="card">
      {this.state.isClickedCart &&<Redirect to="/cart"/>}
      
      
        <img
          src={require(`../Images/ProductItems/${category}/${selectedFile}`)}
        ></img>
        <h5>{productName}</h5>
        <h5>{price}Rs.</h5>
        <input type="button" class="button" value="Add to Cart" onClick={this.handleCartClick}></input>
      </div>
    );
  }
}

export default Card;
