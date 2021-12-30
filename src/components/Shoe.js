import React from "react";
import { Icon } from "@iconify/react";
import { useShoppingCart } from "./contexts/ShoppingCartContext";
import { useState } from "react";

const Shoe = ({ shoeData }) => {
  const shoeList = shoeData.results;
  const { dispatch } = useShoppingCart();
  //shoe list without shoe with missing image
  const cleanShoeList = shoeList.filter(function(shoe) {
    return shoe.media.imageUrl != null;
  });
  const addToCart = id => {
    const shoe = cleanShoeList.filter(shoe => {
      return shoe.id === id;
    });
    const shoeArrItem = shoe[0];
    dispatch({
      type: "add Shoe",
      payload: { shoe: shoeArrItem, total: shoeArrItem.retailPrice }
    });
  };

  return cleanShoeList.map(shoe =>
    <div key={shoe.id} className="card" id={`shoe_card_${shoe.id}`}>
      <h5 className="card-title">
        {shoe.title}
      </h5>
      <img
        className="card-img-top"
        src={shoe.media.imageUrl}
        alt="image of iverson shoe"
      />
      <div className="card-body" />
      <p>
        retail price: {shoe.retailPrice}
      </p>
      <p>
        colorway: {shoe.colorway}
      </p>
      <p>
        brand: {shoe.brand}
      </p>
      <button
        type="button"
        className="add_to_cart_bttn"
        onClick={() => {
          addToCart(shoe.id);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Shoe;
