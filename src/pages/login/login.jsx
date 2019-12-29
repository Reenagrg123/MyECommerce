import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AdminDashboard from "../admin";
import "../../components/reusable/common.scss";
import "react-router-dom";
import { getCurrentUserOrder } from "../helpers/getCurrentUserOrder";
import {withRouter} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.username = "";
    this.password = "";
    this.users = null;
    this.isAuth = false;

    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      userRole:"",
      isClickedRegister: false,
      isClickedLogin: false
    };
  }

  componentDidMount() {
    this.setState({
      userRole: this.props.userRole
    });
  }
  // ...................................................................................................
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleRegister = () => {
    this.setState({
      isClickedRegister: true
    });
  };

  handleLogin = (event) => {
    const { username, password, isAuthenticated, userRole } = this.state;
    event.preventDefault();

    if (userRole == "admin") {
      this.getAdminCredentials();
      this.isAuth = this.isAuthenticated();
    } else {
      this.isAuth = this.getUserCredentials();
    }
    this.setLoginStatus(this.isAuth);
  };

  //......................................................................................
  getAdminCredentials = () => {
    var credentials = "";
    if (this.state.userRole === "admin") {
      credentials = JSON.parse(localStorage.getItem("Admin"));
    }
    this.username = credentials.username;
    this.password = credentials.password;
  };

  getUserCredentials = () => {
    this.users = JSON.parse(localStorage.getItem("Users"));

    if (this.users) {
      if (this.users.find(this.iterateUsers)) {
        return true;
      }
    }
  };

  iterateUsers = (user) => {
    this.username = user.username;
    this.password = user.password;

    if (this.isAuthenticated()) {
      return true;
    }
  };

  //..........................................................................
  isAuthenticated = () => {
    const { username, password } = this.state;
    if (username == this.username && password == this.password) {
      return true;
    }
  };

  setLoginStatus = (isAuth) => {
    if (this.isAuth) {
      this.setSession();
      this.props.loginStatus();
      alert("Logged in successfully");
    } else {
      var errorMsg = "Please enter valid email and password";
      this.setState({ errorMsg: errorMsg });
    }
  };

  setSession = () => {
    const currentUser = {};
    const { userRole } = this.state;

    currentUser.username = this.state.username;
    currentUser.password = this.state.password;
    console.log("currentUser: ", currentUser);

    localStorage.setItem("session", JSON.stringify(currentUser));
    localStorage.setItem("currentUserRole", JSON.stringify(userRole));
    setTimeout(() => this.updateCount(), 50);
  };

  //update the cart count whenever a user logged in
  updateCount = () => {
    var orders = JSON.parse(localStorage.getItem("orders"));
    if(orders){
    var orderIndex = getCurrentUserOrder();
    var currentUserData = orders[orderIndex];
    if (currentUserData) {
      this.setState({ order: currentUserData.products });
      this.props.calculateCartCount(currentUserData.products.length);
    }
  }
  };
  updateUrl() {
    const searchParams = new URLSearchParams();
    const url = searchParams.set("query");
    console.log(url);
    this.props.history.push(`?${url}`);
  }

  //........................................................................................
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
        {this.props.isLoggedIn ? (
          <div>
            {userRole === "admin" ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/" />
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
                <p className="errorMsg">{errorMsg}</p>
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
                <button type="submit" id="loginBtn" className="button">
                  Login
                </button>
              </div>
              {userRole == "user" && (
                <div>
                  <center>
                    <p>Don't have an account?</p>
                  </center>
                  <button
                    id="loginBtn"
                    className="button"
                    onClick={this.handleRegister}
                  >
                    Register
                  </button>
                </div>
              )}
              <br></br>
            <center><a href="">Back to select user</a></center>

            </form>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
