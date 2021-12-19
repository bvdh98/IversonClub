import React from "react";
import { Icon } from "@iconify/react";

const Shoe = ({ shoeData }) => {
  const shoeList = shoeData.results;
  //shoe list without shoe with missing image
  const cleanShoeList = shoeList.filter(function(shoe) {
    return shoe.media.imageUrl != null;
  });
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
      <button type="button" className="add_to_cart_bttn btn btn-primary">
        <Icon className="cart_icon" icon="mdi-light:cart" />
      </button>
    </div>
  );
};

export default Shoe;
