import React, { Component } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import App from "../App";
import AdminDashboard from "./admindashboard";
import "./inputs.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.adminUsername = "Reenagarg";
    this.adminPassword = "Reenagarg";

    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      // isLoggedIn: false,
      errorMsg: ""
    };
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    var error_msg = "";
    var authFlag = false;
    const { username, password, isAuthenticated } = this.state;
    event.preventDefault();

    if (username == this.adminUsername && password == this.adminPassword) {
      authFlag = true;
      alert("Login successfully");
      error_msg = "";
    }
    else if ((username != this.adminUsername)||(password!=this.password)){
      error_msg = "Your username or password is incorrect";
  }
    this.setState({ errorMsg: error_msg });

    if (authFlag) {
      this.setState({ isAuthenticated: true });
      
    }
  };

  render() {
    const { username, password, errorMsg, isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to='/admin' />;
    } else {
      return (
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="container">
            <h5>
              <b>
                <center>Admin Login</center>
              </b>
            </h5>
            <br></br>
            <p class="errorMsg">{errorMsg}</p>
            <label>
              <b>Username </b>
            </label>
            <br></br>

            <input
              type="text"
              className="textbox"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            ></input>
            <br></br>
            <br></br>
            <label>
              <b>Password</b>
            </label>
            <br></br>
            <input
              type="password"
              className="textbox"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            ></input>
            <br></br>
            <br></br>
            <button type="submit" id="loginBtn" className="button ">
              Login
            </button>
          </div>
        </form>
      );
    }
  }
}

export default Login;
