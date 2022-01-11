import React, { useRef, useEffect } from "react";
import { useShoppingCart } from "./ShoppingCartContext";
const Paypal = ({setShow}) => {
  const paypal = useRef();
  const { state } = useShoppingCart();
  const { total } = state;

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
          console.log(order);
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
