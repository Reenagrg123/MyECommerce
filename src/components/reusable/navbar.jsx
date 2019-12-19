import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./common.scss";
import Logout from "../../pages/login/logout";

class NavBar extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <ul className="navigation">
        <li>
          <NavLink to="/" activeClassName=" activeClass">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" activeClassName=" activeClass">
            Shop
          </NavLink>
        </li>
        <li>
          {!isLoggedIn ? (
            <NavLink to="/login" activeClassName=" activeClass">
              Login
            </NavLink>
          ) : (
            <NavLink to="/logout" activeClassName=" activeClass">
              Logout
            </NavLink>
          )}
        </li>

        {JSON.parse(localStorage.getItem("currentUserRole")) === "user" && (
          <li>
            <NavLink to="/cart" activeClassName=" activeClass">
              <i className="fa badge" value={this.props.cartCount}>
                &#xf07a;
              </i>{" "}
              Cart
            </NavLink>
          </li>
        )}
        {JSON.parse(localStorage.getItem("currentUserRole")) === "admin" && (
          <li>
            <NavLink to="/admin" activeClassName=" activeClass">
              Admin
            </NavLink>
          </li>
        )}
        {localStorage.getItem("session") && (
          <li class="welcomeMsg">
            Welcome, {JSON.parse(localStorage.getItem("session")).username}{" "}
            <i class="fa fa-user" aria-hidden="true"></i>
          </li>
        )}
      </ul>
    );
  }
}

export default NavBar;
