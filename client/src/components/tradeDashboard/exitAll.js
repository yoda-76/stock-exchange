import React from 'react'

const exitAll = () => {
        fetch(`${API_URL}/exitAll`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("closed all positions");
            updatePositions();
          });
}

export default exitAll