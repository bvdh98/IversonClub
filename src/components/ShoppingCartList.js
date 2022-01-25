import React from "react";
import "./ShoppingCartList.css";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Paypal from "./Paypal";

const ShoppingCartList = () => {
  const { state } = useShoppingCart();
  const navigate = useNavigate();
  const { shoes, total} = state;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [orderFulfilled, setOrderFulfilled] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const returnHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="cart_container">
        {shoes.length > 0 && (
          <>
            <h1>Shopping Cart</h1>
            {shoes.map((shoe) => (
              <div key={shoe.id} className="shoe_container card col-sm-6">
                <h5 className="shoe_title">{shoe.title}</h5>
                <div className="img_container col-sm-4">
                  <img src={shoe.media.imageUrl} />
                </div>
                <div className="quantity_and_price_container col-sm-6">
                  <h5>quantity: {shoe.duplicates + 1}</h5>
                  <h5>price: ${shoe.retailPrice}</h5>
                </div>
              </div>
            ))}
            {checkout ? (
              <Paypal setShow={setShow} setOrderFulfilled={setOrderFulfilled} />
            ) : (
              <div className="total_container card col-sm-6">
                <h5>Total: $ {total}</h5>
                <button
                  className="btn btn-primary col-sm-4"
                  onClick={() => setCheckout(true)}
                >
                  Check out
                </button>
              </div>
            )}
            <button
              className="btn btn-primary col-sm-2"
              id="back_button"
              onClick={returnHome}
            >
              Back
            </button>
          </>
        )}
        {shoes.length === 0 && (
          <div className="cart_container">
            <h3>Your shopping cart is currently empty</h3>
            <button
              className="btn btn-primary col-sm-2"
              id="back_button"
              onClick={returnHome}
            >
              Back
            </button>
          </div>
        )}
        {orderFulfilled && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Purchase Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thank you for shopping with Iverson Club.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );  
};

export default ShoppingCartList;
