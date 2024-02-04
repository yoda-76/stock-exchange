const updatePositions = () => {
    fetch(`${API_URL}/console/get-positions `, {
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
        console.log(data);
        // setOrderbook(data.orderbook);
        // setTradebook(data.tradebook);
        // setFetchedPositions(data.positions);
      });
  };