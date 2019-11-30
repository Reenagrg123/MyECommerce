import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import App from "../../App";
import AdminDashboard from "../admin";
import "../inputs.css";
import "react-router-dom";

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
      userRole: "",
      isClickedRegister: false,
      isClickedLogin: false
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
      this.isAuth = this.isAuthenticated();
      //console.log("gdhgdhg", this.isAuth);
    } else {
      this.isAuth = this.getUserCredentials();
    }
    //console.log("ghgdgh", this.isAuth);
    this.setLoginStatus(this.isAuth);
  };

  //..........................................
  getAdminCredentials = () => {
    var credentials = "";
    if (this.state.userRole === "admin") {
      credentials = JSON.parse(localStorage.getItem("Admin"));
    }console.log(credentials);
    this.username = credentials.username;
    this.password = credentials.password;
  };

  //.............................................
  getUserCredentials = () => {
    this.users = JSON.parse(localStorage.getItem("Users"));
    //console.log(this.users.find(this.iterateUsers));
    // var currentUser = this.users.find(this.iterateUsers);
    if(this.users){
    if (this.users.find(this.iterateUsers)) {
      return true;
    }
  }
  };

  //...........................................
  iterateUsers = (user) => {
    //console.log("user:", user);
    this.username = user.username;
    this.password = user.password;
    //console.log("username:", this.username);
    //console.log("password:", this.password);

    if (this.isAuthenticated()) {
      return true;
    }
  };

  //............................................
  isAuthenticated = () => {
    const { username, password } = this.state;
    if (username == this.username && password == this.password) {
     // console.log("equal");
      return true;
    }
  };

  setLoginStatus = (isAuth) => {
    //console.log("IsAuth: ", this.isAuth);
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

    currentUser.username = this.state.username;
    currentUser.password = this.state.password;
    console.log("currentUser: ", currentUser);

    if (this.state.userRole === "admin")
      localStorage.setItem("adminSession", JSON.stringify(currentUser));
    else {
      localStorage.setItem("userSession", JSON.stringify(currentUser));
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
    console.log("In login",this.props.isLoggedIn);
    
    return (
      <React.Fragment>
        {isClickedRegister && <Redirect to="/register" />}
        {this.props.isLoggedIn ? (
          <div>
            {userRole == "admin" ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/"/>
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
                    className="button"
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
