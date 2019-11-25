import React, { Component } from "react";
import "./viewproducts.css";
import EachProduct from "./eachproduct";



class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: null,
      isClickedView:false,
      product:null,
      path:""
    };
  }
  getProductsData = () => {
    var productsData = JSON.parse(localStorage.getItem("products"));
    return productsData;
  };
  handleView=(product)=>{
    console.log("hgfhfd");
    this.setState({isClickedView:true});
    this.setState({product:product});
   
  }

  componentDidMount() {
    // console.log("Data:", productsData);
  
    var productsData = this.getProductsData();
    this.setState({ productsData: productsData });

    
  }

  handleDelete = id => {
    var newData=null;
    var productsData = this.getProductsData();
    console.log(id);
    newData=productsData.filter(product => (id != product.productId));
    console.log(newData);
    // this.setState(productsData:newData);
    localStorage.setItem("products", JSON.stringify(newData));
    this.setState({productsData:newData});

    const {category,selectedFile}=this.state.product;
    var path="../Images/ProductItems/";
    path=path+category+"/"+selectedFile;
    console.log(path);
    this.setState({path:path});
    alert("Record deleted successfully");
  };

  handleBack=()=>{
    this.setState({isClickedView:false});
  }
 
  render() {
    if (this.state.productsData != null &&this.state.isClickedView!=true) {
      

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
              <EachProduct key={product.productId} product={product}
              onDelete={this.handleDelete}
              onView={this.handleView}>
                <td>P{product.productId}</td>
              </EachProduct>
            ))}
          </table>
        </div>
      );
    } 
    else if(this.state.isClickedView){
   
      const { category, productName, quantity, price,selectedFile } = this.state.product;
     
      return( 
        <div class="jumbotron">
        <img
            src={require(`./Images/ProductItems/${category}/${selectedFile}`)}
        ></img>
        <h5>{productName}</h5>
        <h5>{price}Rs.</h5>
        <input type="button" class="button" value="Back to All Products" onClick={this.handleBack}></input>
        
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default ViewProducts;
