import React, { useRef, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useShoppingCart } from "./ShoppingCartContext";
const Paypal = ({ setShow, setOrderFulfilled }) => {
  const paypal = useRef();
  const { state, dispatch } = useShoppingCart();
  const { total } = state;
  const { currentUser } = useAuth();

  useEffect(() => {
    window.paypal
      .Buttons({
        //sets up detail of transaction
        createOrder: (data, actions, err) => {
          return actions.order.create({
            //immediately capture money from buyers
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Iverson basketball shoes",
                amount: {
                  currency_code: "CAD",
                  value: total
                }
              }
            ]
          });
        },
        //Captures the funds from the transaction and shows a message to the buyer to let them know the transaction is successful.
        //The method is called after the buyer approves the transaction on paypal.com.
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setShow(true);
          setOrderFulfilled(true);
          dispatch({
            type: "empty cart",
            payload: {
              userId: currentUser.uid
            }
          });
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal} />
    </div>
  );
};

export default Paypal;
