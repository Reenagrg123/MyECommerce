import React, { Component } from 'react';
import './login.css';
import { Redirect } from 'react-router-dom';
import App from '../../App';
import AdminDashboard from '../admin/admindashboard';
import '../inputs.css';
import LoginForm from '../loginform';
import 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.password = '';

    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
      // isLoggedIn: false,
      errorMsg: '',
      userRole: '',
      isClickedRegister: false,
      isClickedLogin: false,
    };
  }
  handleRegister = () => {
    this.setState({
      isClickedRegister: true,
    });
  };
  componentDidMount() {
    this.setState({
      userRole: this.props.userRole,
    });
  }

  getAdminCredentials = () => {
    var credentials = '';
    if (this.state.userRole === 'admin') {
      credentials = JSON.parse(localStorage.getItem('Admin'));
    }
    this.username = credentials.username;
    this.password = credentials.password;
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
  };

  getUserCredentials = () => {
    var users = JSON.parse(localStorage.getItem('Users'));
    users.map(user => this.setCredentials(user));
  };
  setCredentials = user => {
    this.username = user.username;
    this.password = user.password;
    console.log('username:', this.username);
    console.log('password:', this.password);

    this.validate();
  };

  handleSubmit = event => {
    const { username, password, isAuthenticated, userRole } = this.state;
    event.preventDefault();

    if (userRole == 'admin') {
      this.getAdminCredentials();
    } else {
      this.getUserCredentials();
    }
    this.validate();
  };

  validate = () => {
    var error_msg = '';
    var authFlag = false;
    const { username, password, isAuthenticated, userRole } = this.state;

    console.log('username***:', this.username);
    console.log('password***:', this.password);
    if (username == this.username && password == this.password) {
      authFlag = true;
      alert('Login successfully');
      error_msg = '';
    } else if (username != this.username || password != this.password) {
      error_msg = 'Your username or password is incorrect';
    }
    this.setState({
      errorMsg: error_msg,
    });
    error_msg = 'Your username or password is incorrect';
    if (authFlag) {
      this.setState({
        isAuthenticated: true,
      });
    }
    console.log('hello');
  };

  render() {
    const {
      username,
      password,
      errorMsg,
      isAuthenticated,
      userRole,
      isClickedRegister,
    } = this.state;

    return (
      <React.Fragment>
        {isClickedRegister && <Redirect to="/register" />}
        {isAuthenticated ? (
          <div>
            {userRole == 'admin' ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/home" />
            )}
          </div>
        ) : (
          <div>
            {(userRole == 'admin' || userRole == 'user') && (
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="container">
                  <h5>
                    <b>
                      {userRole == 'admin' && <center>Admin Login</center>}
                      {userRole == 'user' && <center>User Login</center>}
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
                  {userRole == 'user' && (
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
                {userRole == 'user' && (
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
