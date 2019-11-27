import React, { Component } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import App from "../../App";
import AdminDashboard from "../admin/admindashboard";
import "../inputs.css";
import LoginForm from "../loginform";
import "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.username = "";
    this.password = "";
    this.users = null;

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      errorMsg: "",
      userRole: "",
      isClickedRegister: false,
      isClickedLogin: false,
      isAuth: false
    };
  }

  componentDidMount() {
    this.setState({
      userRole: this.props.userRole
    });
  }
  // ..................................
  handleRegister = () => {
    this.setState({
      isClickedRegister: true
    });
  };
  //.............................
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };
  //..................................
  handleLogin = (event) => {
    const { username, password, isAuthenticated, userRole } = this.state;
    event.preventDefault();

    if (userRole == "admin") {
      this.getAdminCredentials();
      this.isAuthenticated();
    } else {
      this.getUserCredentials();
    }
    this.setLoginStatus();
  };

  //..........................................
  getAdminCredentials = () => {
    var credentials = "";
    if (this.state.userRole === "admin") {
      credentials = JSON.parse(localStorage.getItem("Admin"));
    }
    this.username = credentials.username;
    this.password = credentials.password;
  };

  //.............................................
  getUserCredentials = () => {
    this.users = JSON.parse(localStorage.getItem("Users"));
    //console.log(this.users.find(this.iterateUsers));
    // var currentUser = this.users.find(this.iterateUsers);
    if (this.users.find(this.iterateUsers)) {
      console.log("find");
      return true;
    }
  };

  //...........................................
  iterateUsers = (user) => {
    console.log("user:", user);
    this.username = user.username;
    this.password = user.password;
    console.log("username:", this.username);
    console.log("password:", this.password);

    if (this.isAuthenticated()) {
      console.log("isauth");
      return true;
    }
  };

  //............................................
  isAuthenticated = () => {
    const { username, password } = this.state;

    // console.log("username***:", this.username);
    // console.log("password***:", this.password);

    if (username == this.username && password == this.password) {
      this.setState({ isAuth: true }, () => {
        console.log("jdj", this.state.isAuth);
        return true;
      });
      // console.log("equal");
    }
  };

  setLoginStatus = () => {
    console.log(this.state.isAuth);
    if (this.state.isAuth) {
      console.log("**equal");
      this.setState({ isLoggedIn: true });
    } else {
      // console.log("not found");
      var errorMsg = "Please enter valid email and password";
      this.setState({ errorMsg: errorMsg });
    }
  };
  //..............................................
  render() {
    const {
      username,
      password,
      errorMsg,
      isLoggedIn,
      userRole,
      isClickedRegister
    } = this.state;

    return (
      <React.Fragment>
        {isClickedRegister && <Redirect to="/register" />}
        {isLoggedIn ? (
          <div>
            {userRole == "admin" ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/home" />
            )}
          </div>
        ) : (
          <div>
            (
            <form className="form" onSubmit={this.handleLogin}>
              <div className="container">
                <h5>
                  <b>
                    {userRole == "admin" && <center>Admin Login</center>}
                    {userRole == "user" && <center>User Login</center>}
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
                {userRole == "user" && (
                  <center>
                    <p>Already registered?</p>
                  </center>
                )}
                <button
                  type="submit"
                  id="loginBtn"
                  className="button"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </div>
              {userRole == "user" && (
                <div>
                  <center>
                    <p>Don't have an account?</p>
                  </center>
                  <button
                    id="registerBtn"
                    class="button"
                    onClick={this.handleRegister}
                  >
                    Register
                  </button>
                </div>
              )}
            </form>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Login;
