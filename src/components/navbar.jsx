import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./inputs.css";
import Logout from './login/logout';

class NavBar extends Component {
//   constructor(props){
//     super(props);
//     this.isLoggedIn=null;
//     this.state={
// }

  //}
  // componentDidMount(){
  //   if(JSON.parse(localStorage.getItem("userSession"))){
  //     this.isLoggedIn=true;
  //     console.log("IsAuth",this.isLoggedIn);
  //   }
  //   this.isLoggedIn="false";
  // }

  render() { 
    console.log("nav:",this.props.isLoggedIn);
    
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
        
          {!this.props.isLoggedIn ?
          <NavLink to="/login" activeClassName=" activeClass">Login
          </NavLink>:
          <NavLink to="/logout" activeClassName=" activeClass">Logout
          </NavLink>
          }
          
    
        </li>
        <li>
          <NavLink to="/cart" activeClassName=" activeClass">
            <i className="fa fa-shopping-cart"></i> Cart
          </NavLink>
        </li>
      </ul>
    );
  }
}
 
export default NavBar;
