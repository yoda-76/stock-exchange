import React from 'react'
import { API_URL } from '../../dynamicRoutes';
const placeOrder = (orderType, callType,lotSize,callSymbol,qty,product,swithcQty) => {
        try {
          fetch(`${API_URL}/placeOrder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lotSize,
              token: window.localStorage.getItem("token"),
              symbol:
                (callType == "CE" && callSymbol) || (callType == "PE" && putSymbol),
              qty: qty,
              transaction_type: orderType,
              product: product,
              variety: "regular",
              switchQty: swithcQty,
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