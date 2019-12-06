import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const LogOut = (props) => {
  const { loginStatus } = props;

  //updating the login status to false
  loginStatus();

  //removing the session info from localstorage
  localStorage.removeItem("session");
  localStorage.removeItem("currentUserRole");

  //setting the count to 0 on logout
  props.calculateCartCount(0);
  alert("Logout successfully");

  return <Redirect to="/login" />;
};

export default LogOut;
