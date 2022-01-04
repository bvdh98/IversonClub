import React from "react";
import "./ShoppingCartList.css";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "./contexts/ShoppingCartContext";
import { useState } from "react";
import Paypal from "./Paypal";

const ShoppingCartList = () => {
  const {state} = useShoppingCart();
  const navigate = useNavigate();
  const { shoes, total } = state;
  const [checkout, setCheckout] = useState(false);

  const returnHome = () => {
    navigate("/");
  };
  if (shoes.length > 0) {
    return (
      <div className="cart_container">
        <h1>Shopping Cart</h1>
        {shoes.map(shoe =>
          <div key={shoe.id} className="shoe_container card col-sm-6">
            <h5 className="shoe_title">
              {shoe.title}
            </h5>
            <div className="img_container col-sm-4">
              <img src={shoe.media.imageUrl} />
            </div>
            <div className="quantity_and_price_container col-sm-6">
              <h5>quantity: </h5>
              <h5>
                price: ${shoe.retailPrice}
              </h5>
            </div>
          </div>
        )}
        {checkout
          ? <Paypal/>
          : <div className="total_container card col-sm-6">
              <h5>
                Total: $ {total}
              </h5>
              <button className="btn btn-primary col-sm-4" onClick={() =>setCheckout(true)}>Check out</button>
            </div>}
        <button
          className="btn btn-primary col-sm-2"
          id="back_button"
          onClick={returnHome}
        >
          Back
        </button>
      </div>
    );
  } else {
    return (
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
    );
  }
};

export default ShoppingCartList;
