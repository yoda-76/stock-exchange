import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../../dynamicRoutes';
const placeOrder = (orderType,lotSize,qty,instrument_key) => {
  console.log(qty*lotSize,instrument_key,orderType,"placeorder")
        try {
          fetch(`${API_URL}/console/place-order`, {
            method: "POST",
            headers: {
              "token":window.localStorage.getItem("token"),
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
                toast.error(data, {
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
              // updatePositions();
            });
        } catch (err) {
          console.log("request error: " + err);
        }
}

export default placeOrder