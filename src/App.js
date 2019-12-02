import React, { Component } from "react";
import ReactDOM from "react-dom";

import NavBar from "./components/navbar";
import Login from "./components/login/login";
import AdminDashboard from "./components/admin";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddProducts from "./components/admin/addproducts";
import ViewProducts from "./components/admin/viewproducts";
import EachProduct from "./components/admin/eachproduct";
import Shop from "./components/shop";
import SelectUser from "./components/login";
import Register from "./components/login/register";
import Cart from "./components/cart";
import Home from "./components/home";
import NotFound from "./components/notfound";
import LogOut from "./components/login/logout";
import ProductDetail from "./components/admin/productdetail";

import {
  AdminPrivateRoute,
  UserPrivateRoute
} from "./components/helpers/privateRoutes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userRole: "",
      cartCount:0
    };
  }

  updateLoginStatus = () => {
    // console.log("Togglong login status");
    if (this.state.userRole === "user") {
      if (localStorage.getItem("userSession")) {
        this.setState((prevState, props) => {
          return { isLoggedIn: !prevState.isLoggedIn };
        });
      }
    } else {
      if (localStorage.getItem("adminSession")) {
        this.setState((prevState, props) => {
          return { isLoggedIn: !prevState.isLoggedIn };
        });
      }
    }
  };

  getUserRole = (userRole) => {
    // console.log("userRole:", userRole);
    this.setState({ userRole: userRole });
  };


  handleCartCount=(count)=>{
    console.log("cartCount:",count);
    this.setState({cartCount:count});
    console.log("cartCount:",count);

  }

  

  //................................................................................
  render() {
    // console.log("In App:", this.state.isLoggedIn);
    const { isLoggedIn, userRole,cartCount } = this.state;
    return (
      <Router>
        <NavBar isLoggedIn={isLoggedIn} cartCount={cartCount}></NavBar>
        <Switch>
          <Route path="/" exact component={Home} />

          <AdminPrivateRoute
            path="/admin"
            component={AdminDashboard}
          ></AdminPrivateRoute>
          <AdminPrivateRoute path="/addProducts" component={AddProducts} />
          <AdminPrivateRoute path="/viewProducts" component={ViewProducts} />

          <AdminPrivateRoute
            path="/product/:id"
            component={ProductDetail}
          ></AdminPrivateRoute>

          <Route path="/shop"><Shop calculateCartCount={this.handleCartCount}></Shop></Route>

          <Route path="/login">
            <SelectUser
              getUserRole={this.getUserRole}
              loginStatus={this.updateLoginStatus}
              isLoggedIn={isLoggedIn}
            />
          </Route>

          {this.state.isLoggedIn && (
            <Route path="/logout">
              <LogOut
                loginStatus={this.updateLoginStatus}
                userRole={userRole}
              />
            </Route>
          )}

          <Route path="/register" component={Register} />
          <UserPrivateRoute path="/cart" component={Cart} />
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
