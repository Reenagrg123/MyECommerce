import React, { Component, Fragment } from "react";
import "./home.css";
import {HashLink as Link} from 'react-router-hash-link';

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
        <Link to="/shop#electronics">
          <img
            src={require("./Images/ProductItems/Electronics/laptop.jpg")}
          ></img>
          <button className="button">View more</button>
          </Link>
        </div>
        <div className="column">
        <Link to="/shop#footwears">

          <img
            src={require("./Images/ProductItems/Footwear/redgirl.jpg")}
          ></img>
          <button className="button">View more</button>
          </Link>
        </div>
        <div className="column">
        <Link to="/shop#men">

          <img
            src={require("./Images/ProductItems/Men/woolenmen.jpg")}
          ></img>
          <button className="button">View more</button>
          </Link>
        </div>
        <div className="column">
        <Link to="/shop#women">

          <img
            src={require("./Images/ProductItems/Women/image2.jpg")}
          ></img>
          <button className="button">View more</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
