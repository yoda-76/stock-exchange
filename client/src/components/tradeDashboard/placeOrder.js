import React from 'react'
import { API_URL } from '../../dynamicRoutes';
const placeOrder = (orderType,lotSize,qty,instrument_key) => {
        try {
          fetch(`${API_URL}/console/place-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: qty*lotSize,
              instrument_token: instrument_key,
              transaction_type: orderType,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.status == true) {
                console.log("order placed");
                toast.success("Order Placed", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              } else {
                toast.error(data.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
              updatePositions();
            });
        } catch (err) {
          console.log("request error: " + err);
        }
}

export default placeOrder