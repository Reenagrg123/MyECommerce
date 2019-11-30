import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

const LogOut=(props)=>{

   
    props.loginStatus();
    localStorage.removeItem("userSession");
    alert("Logout successfully");
 
    return(
        <Redirect to="/login"/>
    );
}

export default LogOut;