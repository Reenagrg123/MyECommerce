import React, { Component, Fragment } from "react";
import "./admindashboard.css";
import AddProducts from "./addproducts";
import "../inputs.css";
import ViewProducts from "./viewproducts";


class AdminDashboard extends Component {
  state = {
    isClickedAddItems: false,
    isClickedViewItems: false
  };

  handleClick = event => {
    console.log(event.target.name);
    if (event.target.name == "addProducts") {
      this.setState({ isClickedAddItems: true });
    } else if (event.target.name == "viewProducts") {
      this.setState({ isClickedViewItems: true });
    }
  };

  render() {
    if (this.state.isClickedAddItems) {
      return <AddProducts />;
    } else if (this.state.isClickedViewItems) {
      return <ViewProducts />;
    } else {
      return (
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
            <img className="adminImage" src={require('../Images/admin.png')}></img>
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
      );
    }
  }
}
export default AdminDashboard;
