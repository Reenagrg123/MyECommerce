import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {AdminPrivateRoute,UserPrivateRoute} from "./components/reusable/privateRoutes";


import NavBar from "./components/reusable/navbar";
import Home from "./pages/home";

import SelectUser from "./pages/login";
import Login from "./pages/login";
import Register from "./pages/login/register";
import LogOut from "./pages/login/logout";


import AdminDashboard from "./pages/admin";
import AddProducts from "./pages/admin/addproducts";
import ViewProducts from "./pages/admin/viewproducts";
import EachProduct from "./pages/admin/eachproduct";
import ProductDetail from "./pages/admin/productdetail";


import Shop from "./pages/shop";
import Cart from "./pages/cart";
import NotFound from "./components/reusable/notfound";
import { getCurrentUserOrder } from "./pages/helpers/getCurrentUserOrder";
import ThanksShopping from "./pages/cart/thanksForShopping";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userRole: "",
      cartCount: 0,
      isLoggedIn: false
    };
  }
  componentDidMount() {
    //setting login  whenever app renders
    if (localStorage.getItem("userSession") && this.state.userRole === "user") {
      this.setState({ isLoggedIn: true });
      var orders = JSON.parse(localStorage.getItem("orders"));
      var orderIndex = getCurrentUserOrder();
      var currentUserData = orders[orderIndex];
      if (currentUserData) {
        this.handleCartCount(currentUserData.products.length);
      }
    } else {
      this.setState({ isLoggedIn: false });
    }

    // var orders = JSON.parse(localStorage.getItem("orders"));
    // var orderIndex = getCurrentUserOrder();
    // var currentUserData = orders[orderIndex];
    // // console.log("current user data:", currentUserData);
    // if (currentUserData) {
    //   this.setState({ cartCount: currentUserData.products.length }, () => {
    //     console.log(this.state.cartCount);
    //   });
    // }
    //this.updateLoginStatus();
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

  handleCartCount = (count) => {
    console.log("cartCount:", count);
    this.setState({ cartCount: count });
    // console.log("cartCount:", count);
  };

  //................................................................................
  render() {
    // console.log("In App:", this.state.isLoggedIn);
    const { isLoggedIn, userRole, cartCount } = this.state;
    console.log(isLoggedIn);
    return (
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          cartCount={cartCount}
          userRole={userRole}
        ></NavBar>
        <Switch>
          <Route path="/" exact component={Home} />

          <AdminPrivateRoute
            path="/admin"
            component={AdminDashboard}
          ></AdminPrivateRoute>
          <AdminPrivateRoute path="/addProducts" component={AddProducts} />
          <AdminPrivateRoute path="/viewProducts" component={ViewProducts} />

          <AdminPrivateRoute
            path="/product/:productName"
            component={ProductDetail}
          ></AdminPrivateRoute>

          <Route path="/shop">
            <Shop
              calculateCartCount={this.handleCartCount}
              isLoggedIn={isLoggedIn}
            ></Shop>
          </Route>

          <Route path="/login">
            <SelectUser
              getUserRole={this.getUserRole}
              loginStatus={this.updateLoginStatus}
              isLoggedIn={isLoggedIn}
              calculateCartCount={this.handleCartCount}
            />
          </Route>

          <Route path="/logout">
            <LogOut
              loginStatus={this.updateLoginStatus}
              userRole={userRole}
              calculateCartCount={this.handleCartCount}
            />
          </Route>

          <Route path="/register" component={Register} />

          <UserPrivateRoute
            path="/cart"
            component={() => (
              <Cart
                calculateCartCount={this.handleCartCount}
                userRole={userRole}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route path="/thanks" component={ThanksShopping}></Route>

          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
