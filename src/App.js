import React, { Component } from "react";
import ReactDOM from "react-dom";

import NavBar from "./components/navbar";
import Login from "./components/login/login";
import AdminDashboard from "./components/admin";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddProducts from "./components/admin/addproducts";
import ViewProducts from "./components/admin/viewproducts";
// import Test from "./components/test";
import EachProduct from "./components/admin/eachproduct";
import Shop from "./components/shop";
import SelectUser from "./components/login";
import Register from "./components/login/register";
import Cart from "./components/cart";
import Home from "./components/home";
import NotFound from "./components/notfound";
import LogOut from "./components/login/logout";

import {
  AdminPrivateRoute,
  UserPrivateRoute
} from "./components/helpers/privateRoutes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userRole:""
      };
  }

  updateLoginStatus = () => {
    console.log("Togglong login status");
    if(this.state.userRole==="user"){
    if (localStorage.getItem("userSession")) {
      this.setState((prevState, props) => {
        return { isLoggedIn: !prevState.isLoggedIn };
      });
    }
  }
  else{
    if (localStorage.getItem("adminSession")) {
      this.setState((prevState, props) => {
        return { isLoggedIn: !prevState.isLoggedIn };
      });
    }
  }
  };

  getUserRole=(userRole)=>{
    console.log("userRole:",userRole);
    this.setState({userRole:userRole});

  }

  render() {
    console.log("In App:", this.state.isLoggedIn);
    return (
      <Router>
        <NavBar isLoggedIn={this.state.isLoggedIn}></NavBar>
        <Switch>
          <Route path="/" exact component={Home} />

          <AdminPrivateRoute
            path="/admin"
            component={AdminDashboard}
          ></AdminPrivateRoute>
          <Route path="/addProducts" component={AddProducts} />
          <Route path="/viewProducts" component={ViewProducts} />
          <Route path="/eachproduct" component={EachProduct} />

          <Route path="/shop" component={Shop} />

          <Route path="/login">
            <SelectUser
              getUserRole={this.getUserRole}
              loginStatus={this.updateLoginStatus}
              isLoggedIn={this.state.isLoggedIn}
            />
          </Route>

          {this.state.isLoggedIn &&
          <Route path="/logout">
            <LogOut loginStatus={this.updateLoginStatus} />
          </Route>
          }

          <Route path="/register" component={Register} />
          <UserPrivateRoute path="/cart" component={Cart} />
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
