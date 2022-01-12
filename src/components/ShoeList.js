import React from "react";
import { Icon } from "@iconify/react";
import { useShoppingCart } from "./ShoppingCartContext";

const ShoeList = ({ shoeData }) => {
  const shoeList = shoeData;
  const { dispatch } = useShoppingCart();
  const addToCart = id => {
    const shoe = shoeList.filter(shoe => {
      return shoe.id === id;
    });
    const shoeArrItem = shoe[0];
    dispatch({
      type: "add Shoe",
      payload: { shoe: shoeArrItem, total: shoeArrItem.retailPrice }
    });
  };

  return shoeList.map(shoe =>
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

export default ShoeList;
