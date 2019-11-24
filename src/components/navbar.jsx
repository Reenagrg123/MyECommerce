import React, { Component } from 'react';
import './navbar.css';
class Navbar extends Component {
    state = {  }
    render() { 
        return (
                <ul class="navigation">
                    <li><a href="/home">Home</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="#">Cart</a></li>
                </ul>
            );
    }
}
 
export default Navbar;