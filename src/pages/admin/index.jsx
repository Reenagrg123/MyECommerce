import React, { Component, Fragment } from "react";
import "./style.scss";
import AddProducts from "./addproducts";
import ViewProducts from "./viewproducts";
import { Redirect } from "react-router-dom";
import "../../components/reusable/common.scss";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedAddProducts: false,
      isClickedViewProducts: false
    };
  }
  //.................................................................................................

  handleClick = (event) => {
    if (event.target.name == "addProducts") {
      this.setState({ isClickedAddProducts: true });
    } else if (event.target.name == "viewProducts") {
      this.setState({ isClickedViewProducts: true });
    }
  };
  //................................................................................................

  render() {
    const { isClickedAddProducts, isClickedViewProducts } = this.state;
    return (
      <div>
        {isClickedAddProducts && this.props.history.push("/addProducts")}
        {isClickedViewProducts && this.props.history.push("/viewProducts")}

        <Fragment>
          <h2>
            <u>
              <center>Admin Dashboard</center>
            </u>
          </h2>
          <br></br>
          <br></br>
          <div className="jumbotron">
            <div className="flex-container">
              <img
                className="adminImage"
                src={require("../../assets/Images/admin.png")}
              ></img>
              <input
                type="button"
                className="button"
                name="addProducts"
                value="Add Products"
                onClick={this.handleClick}
              ></input>
              <input
                type="button"
                className="button"
                value="View Products"
                name="viewProducts"
                onClick={this.handleClick}
              ></input>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}
export default AdminDashboard;
