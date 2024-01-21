import React from 'react'

const exit = (symbol) => {
        console.log(symbol);
        try {
          fetch(`${API_URL}/exit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: window.localStorage.getItem("token"),
              symbol,
            }),
          }).then((data) => {
            if (data.status) {
              toast.success("position squared off", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              updatePositions();
            } else {
              toast.error("error in closing the position", {
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
          });
        } catch (err) {
          console.log(err);
        }
}

export default exit