import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

const ThanksShopping = (props) => {
  console.log("modal");
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.noItem ? (
          <h4>Please add some items in the cart.</h4>
        ) : (
          <h4>
            Thanks for Shopping!!. Your order will be delievered in next 2-3
            days.
          </h4>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onPlaceOrder(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ThanksShopping;
