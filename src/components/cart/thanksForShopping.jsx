import React, { Component } from "react";
import {Modal,Button} from 'react-bootstrap';

const ThanksShopping = () => {
  return (
    <Modal>
      <Modal.header>
        <Modal.Title>Thanks for Shopping!!</Modal.Title>
      </Modal.header>
      <Modal.Body>Your order will be deilevered in next 2-3 days.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"></Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ThanksShopping;
