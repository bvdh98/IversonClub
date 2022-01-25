import React, {useState} from "react";
import { useShoppingCart } from "./ShoppingCartContext";
import { useAuth } from "./contexts/AuthContext";
import PopUpModal from "./PopUpModal";

const ShoeList = ({ shoeData }) => {
  const {currentUser} = useAuth();
  const shoeList = shoeData;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { dispatch } = useShoppingCart();
  const title = "Shoe added to your shopping cart";
  const description = "You can find your shopping cart by clicking the link under the drop down menu"

  const addToCart = id => {
    const shoe = shoeList.filter(shoe => {
      return shoe.id === id;
    });
    const shoeArrItem = shoe[0];
    dispatch({
      type: "add Shoe",
      payload: { shoes: shoe, total: shoeArrItem.retailPrice, userId: currentUser.uid }
    });
    setShow(true);
  };

  return (
    <>
      <PopUpModal show={show} handleClose={handleClose} title={title} description={description}/>
      {shoeList.map((shoe) => (
        <div key={shoe.id} className="card" id={`shoe_card_${shoe.id}`}>
          <h5 className="card-title">{shoe.title}</h5>
          <img
            className="card-img-top"
            src={shoe.media.imageUrl}
            alt="image of iverson shoe"
          />
          <div className="card-body" />
          <p>retail price: {shoe.retailPrice}</p>
          <p>colorway: {shoe.colorway}</p>
          <p>brand: {shoe.brand}</p>
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
      ))}
    </>
  );
};

export default ShoeList;
