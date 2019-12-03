import React, { Component } from "react";

const CountHandler = (props) => {
  const { countQuantity, quantity, onDecrement, onIncrement } = props;
  return (
    <div>
      <button onClick={() => onDecrement(quantity)}>-</button> {countQuantity}{" "}
      <button onClick={() => onIncrement(quantity)}>+</button>
    </div>
  );
};

export default CountHandler;
