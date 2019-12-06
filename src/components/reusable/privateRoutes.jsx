import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("session") &&
        JSON.parse(localStorage.getItem("currentUserRole")) === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const UserPrivateRoute = ({ component: Component }) => {
  // console.log(Component);
  return (
    <Route
      render={(props) =>
        localStorage.getItem("session") &&
        JSON.parse(localStorage.getItem("currentUserRole")) === "user" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export { AdminPrivateRoute, UserPrivateRoute };
