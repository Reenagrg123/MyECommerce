import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Login from "./login";
import "./style.scss";

class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichUser: "",
      isClickedNext: false
    };
  }

  handleChange = (event) => {
    this.setState({ whichUser: event.target.value });
  };
  handleSubmit = (event) => {
    console.log(this.state.whichUser);
    this.setState({ isClickedNext: true });
  };
  render() {
    // console.log("hfjhfj",this.props.location);
    console.log("Selectuser", this.props.isLoggedIn);
    return (
      <div>
        {this.state.isClickedNext ? (
          <Login
            userRole={this.state.whichUser}
            isLoggedIn={this.props.isLoggedIn}
            loginStatus={this.props.loginStatus}
            calculateCartCount={this.props.calculateCartCount}
          />
        ) : (
          <form className="form" onSubmit={this.handleSubmit}>
            <center>
              <img src={require("../../assets/Images/user1.jpg")}></img>
            </center>
            <br></br>
            <br></br>
            <label>
              <h4>
                <b>Select User Role:</b>
              </h4>
            </label>
            <br></br>
            <br></br>
            <select
              className="textbox"
              name="user"
              onChange={this.handleChange}
            >
              <option> --Select your role--</option>
              <option name="user" value="user">
                User
              </option>
              <option name="admin" value="admin">
                Admin
              </option>
            </select>
            <br></br>
            <br></br>
            <br></br>
            <input
              type="submit"
              className="button"
              value="Next"
              onClick={() => this.props.getUserRole(this.state.whichUser)}
            ></input>
          </form>
        )}
      </div>
    );
  }
}

export default SelectUser;
