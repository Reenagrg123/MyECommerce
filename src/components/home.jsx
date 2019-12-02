import React, { Component, Fragment } from "react";
import "./home.css";

const Home = (props) => {
  return (
    <Fragment>
      <div className="home"></div>
      <hr></hr>
      <center>
        <h1>--Categories--</h1>
      </center>
      <div className="row">
        <div className="column">
          <img
            src={require("./Images/ProductItems/Electronics/laptop.jpg")}
          ></img>
        </div>
        <div className="column">
          <img
            src={require("./Images/ProductItems/Footwear/redgirl.jpg")}
          ></img>
        </div>
        <div className="column">
          <img
            src={require("./Images/ProductItems/Men/woolenmen.jpg")}
          ></img>
        </div>
        <div className="column">
          <img
            src={require("./Images/ProductItems/Women/image2.jpg")}
          ></img>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
