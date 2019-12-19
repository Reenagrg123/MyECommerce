import React, { Component } from "react";
import Login from "./login";
import "./style.scss";

import { withRouter } from "react-router-dom";

class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichUser: "",
      isClickedNext: false
    };
  }

  //....................................................................................
  handleChange = (event) => {
    this.setState({ whichUser: event.target.value });
  };
  handleSubmit = (event) => {
    console.log(this.state.whichUser);
    this.setState({ isClickedNext: true });
  };
  componentDidMount() {
    if (this.props.location.state) {
      var userRole = this.props.location.state.userRole;
      this.setState({ whichUser: userRole });
    }
  }

  //.......................................................................................
  render() {
    const { whichUser, isClickedNext } = this.state;
    // console.log("location:",this.props.location.state.userRole);

    const {
      isLoggedIn,
      loginStatus,
      calculateCartCount,
      getUserRole
    } = this.props;
    return (
      <div>
        {isClickedNext || whichUser ? (
          <Login
            userRole={whichUser}
            isLoggedIn={isLoggedIn}
            loginStatus={loginStatus}
            calculateCartCount={calculateCartCount}
          />
        ) : (
          <div className="container">
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
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SelectUser);
