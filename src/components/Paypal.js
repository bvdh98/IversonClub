import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        //sets up detail of transaction
        createOrder: (data, actions, err) => {
          return actions.order.create({
            //immeadetly capture money from buyers
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "CAD",
                  value: 650.0
                }
              }
            ]
          });
        },
        //Captures the funds from the transaction and shows a message to the buyer to let them know the transaction is successful. 
        //The method is called after the buyer approves the transaction on paypal.com.
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
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
}
