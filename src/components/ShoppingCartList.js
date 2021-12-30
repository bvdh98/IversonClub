import React from "react";
import "./ShoppingCartList.css";
import { useShoppingCart } from "./contexts/ShoppingCartContext";
import { useState } from "react";

const ShoppingCartList = () => {
  const saved = localStorage.getItem("cart");
  const cartData = JSON.parse(saved);
  console.log(cartData);
  const {shoes,total} = cartData;
  if (cartData.shoes !== undefined) {
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
        <div className="total_container card col-sm-6">
          <h5>Total: $ {total}</h5>
          <button className="btn btn-primary col-sm-4">Check out</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart_container">
        <h3>Your shopping cart is currently empty</h3>
      </div>
    );
  }
};

export default ShoppingCartList;
