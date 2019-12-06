import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const LogOut = (props) => {
  const { userRole } = props;
  props.loginStatus();

  if (userRole == "admin") {
    localStorage.removeItem("adminSession");
  } else {
    localStorage.removeItem("userSession");
  }
  props.calculateCartCount(0);
  alert("Logout successfully");

  return <Redirect to="/login" />;
};

export default LogOut;
