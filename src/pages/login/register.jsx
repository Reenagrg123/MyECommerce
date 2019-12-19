import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      isRegister: false
    };
  }
  //................................................................................
  handleChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({ [name]: value });
    console.log(name, value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var users = JSON.parse(localStorage.getItem("Users"));

    //cloning the state data(from data) to new object so that we can add userId manually to that object
    var newUser = { ...this.state };
    var userId = JSON.parse(localStorage.getItem("userId"));

    newUser["userId"] = ++userId;
    localStorage.setItem("userId", userId);

    var temp = [];

    if (users === null) {
      temp.push(newUser);
      localStorage.setItem("Users", JSON.stringify(temp));
    } else {
      users.map((user) => temp.push(user));
      temp.push(newUser);
      localStorage.setItem("Users", JSON.stringify(temp));
    }
    this.setState({ isRegister: true });
    alert(
      "You are registered successfully.Now you can login to continue with shopping!!"
    );
  };

  //..........................................................................................

  render() {
    const { isRegister } = this.state;
    return (
      <div>
        {isRegister && <Redirect
              to={{
                pathname: "/login",
                state: { userRole: "user" }
              }}/>}
        <form className="form" onSubmit={this.handleSubmit}>
          <br></br>
          <h2>
            <b>
              <center>Register</center>
            </b>
          </h2>
          <br></br>
          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            className="textbox"
            name="username"
            placeholder="Enter username"
            onChange={this.handleChange}
            required
          ></input>
          <br></br>
          <label>
            <b>Email</b>
          </label>
          <input
            type="email"
            className="textbox"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChange}
            required
          ></input>
          <br></br>
          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            className="textbox"
            name="password"
            placeholder="Enter password"
            onChange={this.handleChange}
            required
          ></input>
          <br></br>
          <br></br>
          <br></br>
          <input
            type="submit"
            className="button"
            id="registerBtn"
            value="Register"
          ></input>
        </form>
      </div>
    );
  }
}

export default Register;
