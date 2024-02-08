import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import data from '../../../server/token_data/instrument_data.json'
import Dropdown from "./basic components/Dropdown";
import WatchList from "./watchList";
import Orderbook from "./tradeDashboard/Orderbook";
import Tradebook from "./tradeDashboard/Tradebook";
import Positions from "./tradeDashboard/Positions";
import placeOrder from "./tradeDashboard/placeOrder";
import exit from "./tradeDashboard/exit";
import exitAll from "./tradeDashboard/exitAll";
import formater from "./tradeDashboard/formatter";
import Funds from "./tradeDashboard/Funds";
import maindata from "../instrument.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, SOCKET_API_URL } from "../dynamicRoutes";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { SlEqualizer } from "react-icons/sl";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import "../App.css";
const TradeDashboard = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [callInstrumentKey, setCallInstrumentKey] = useState();
  const [putInstrumentKey, setPutInstrumentKey] = useState();
  // const instrumentTokenRef = useRef(instrumentToken);
  const [ticksData, setTicksData] = useState();
  // const [tickData, setTickData] = useState();
  const [instrumentName, setInstrumentName] = useState("NIFTY");
  const option = ["option1", "option2", "option3", "option4"];
  const products = ["MIS", "Normal"];
  const optionList = option.map((value) => ({ value, text: value }));
  const productList = products.map((value) => ({ value, text: value }));
  const [pnl, setPnl] = useState("0");
  // const [margin, setMargin] = useState();
  const [selectedInstrument, setSelectedInstrument] = useState();
  // const [selectedOption2, setSelectedOption2] = useState();
  // const [atm, setAtm] = useState();
  // const [sellltp, setSellltp] = useState();
  const [expiryList, setExpiryList] = useState();
  const [strikeList, setStrikeList] = useState();
  const [expiry, setExpiry] = useState();
  const [callStrike, setCallStrike] = useState(optionList[0]);
  const [putStrike, setPutStrike] = useState(optionList[0]);
  const [qty, setQty] = useState(0);
  const [product, setProduct] = useState();
  const [positions, setPositions] = useState(false);
  const [funds, setFunds] = useState(false);
  // const [toggle, setToggle] = useState(false);
  const [orderBookFlag, setOrderBookFlag] = useState(false);
  const [TradeBook, setTradeBook] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [orderbook, setOrderbook] = useState();
  const [qtyValue, setQtyValue] = useState(0);
  const [tradebook, setTradebook] = useState();
  const [fetchedPositions, setFetchedPositions] = useState();
  const [TotalStopLossFlag, setTotalStopLossFlag] = useState(false);
  const [TotalStopLoss, setTotalStopLoss] = useState({
    boolean: TotalStopLossFlag,
    mtm: "",
    stopLoss: "",
  });
  const [switchQty, setSwitchQty] = useState(false);
  const [enableClick, setEnableClick] = useState(false);
  const [callSymbol, setCallSymbol] = useState();
  const callSymbolRef = useRef(callSymbol);
  const [callLTP, setCallLTP] = useState();
  const [putSymbol, setPutSymbol] = useState();
  const putSymbolRef = useRef(putSymbol);
  const [putLTP, setPutLTP] = useState();
  const [putToken, setPutToken] = useState();
  const [callToken, setCallToken] = useState();
  const putTokenRef = useRef(putLTP);
  const callTokenRef = useRef(callLTP);
  useEffect(() => {
    callSymbolRef.current = callSymbol;
    putSymbolRef.current = putSymbol;
    maindata.map((item) => {
      // console.log(item.tradingsymbol,callSymbol,"item")
      if(item.tradingsymbol.includes("FEB")){
        console.log(item.tradingsymbol)
      }
      if (String(item.tradingsymbol) === String(callSymbol)) {
        setCallToken(item.instrument_token);
        console.log(item.instrument_token,"token");
      }
      if (String(item.tradingsymbol) === String(putSymbol)) {
        setPutToken(item.instrument_token);
      }
    });
  }, [callSymbol, putSymbol]);
  useEffect(() => {
    callTokenRef.current = callLTP;
    putTokenRef.current = putLTP;
    console.log(callLTP,"callLtp")
    console.log(callTokenRef.current,"callTokenRef.current");
  }, [callLTP, putLTP,callStrike,putStrike]);
  const Email =  window.localStorage.getItem("email");
  const orderbookRef = useRef(orderbook);
  const tradebookRef = useRef(tradebook);
  const fetchedPositionsRef = useRef(fetchedPositions);
  useEffect(() => {
    orderbookRef.current = orderBookFlag;
    tradebookRef.current = tradebook;
    fetchedPositionsRef.current = fetchedPositions;
  }, [orderBookFlag, tradebook, fetchedPositions]);
  const [customBuyCallKey, setCustomBuyCallKey] = useState(
    localStorage.getItem("customBuyCallKey") || ""
  );
  const [customSellCallKey, setCustomSellCallKey] = useState(
    localStorage.getItem("customSellCallKey") || ""
  );
  const [customBuyPutKey, setCustomBuyPutKey] = useState(
    localStorage.getItem("customBuyPutKey") || ""
  );
  const [customSellPutKey, setCustomSellPutKey] = useState(
    localStorage.getItem("customSellPutKey") || ""
  );
  const [positionButtonClicked, setPositionButtonClicked] = useState(false);
  const [orderBookButtonClicked, setOrderBookButtonClicked] = useState(false);
  const [tradeBookButtonClicked, setTradeBookButtonClicked] = useState(false);
  const [FundsButtonClicked, setFundsButtonClicked] = useState(false);
  const [lotSize, setLotSize] = useState(50);
  const [stopLoss, setStopLoss] = useState({
    "": "",
  });
  const [trailingStopLoss, setTrailingStopLoss] = useState({
    "": "",
  });
  const trailingStopLossRef = useRef(trailingStopLoss);
  useEffect(() => {
    trailingStopLossRef.current = trailingStopLoss;
  }, [trailingStopLoss]);
  const stopLossRef = useRef(stopLoss);
  useEffect(() => {
    stopLossRef.current = stopLoss;
  }, [stopLoss]);
  const [stopLossTSL, setStopLossTSL] = useState({
    "": "",
  });
  const stopLossTSLRef = useRef(stopLossTSL);
  useEffect(() => {
    stopLossTSLRef.current = stopLossTSL;
  }, [stopLossTSL]);
  // useEffect(() => {
  //   instrumentTokenRef.current = instrumentToken;
  // }, [instrumentToken]);
  useEffect(() => {
    for (let i = 0; i < maindata.length; i++) {
      const instrument = maindata[i];
      if (String(instrument.name) === String(selectedInstrument)) {
        setLotSize(instrument.lot_size);
        console.log(selectedInstrument, "hello");
        break;
      }
    }
  }, [selectedInstrument]);

  const [arrayOfTokens, setArrayOfToken] = useState([
    { token: 8963586, ltp: 0, pnl: 0, name: "BANKNIFTY" },
    { token: 8963842, ltp: 0, pnl: 0, name: "NIFTY" },
    { token: 10227202, ltp: 0, pnl: 0, name: "FINNIFTY" },
  ]);
  const changeArrayOfToken = (newArray) => {
    setArrayOfToken(newArray);
    console.log(arrayOfTokens);
    console.log(newArray);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log(typeof parseInt(inputValue));
    setQty(parseInt(inputValue));

    if (switchQty === true && inputValue !== "") {
      const intValue = parseInt(inputValue);
      const isMultiple = intValue % lotSize === 0;
      const isInRange = intValue >= lotSize && intValue <= lotSize * 36;

      if (!(isMultiple && isInRange)) {
        setErrorMessage("Please provide a valid quantity.");
      } else {
        setErrorMessage("");
      }
    } else if (inputValue !== "") {
      const intValue = parseInt(inputValue);
      const isInRange = intValue >= 0 && intValue <= 36;

      if (!isInRange) {
        setErrorMessage("Please provide a valid quantity.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  const updatePositions = () => {
    fetch(`${API_URL}/console/get-funds `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token":window.localStorage.getItem("token") ,
        "credentials": 'include',
      },
      body: JSON.stringify({
        email:Email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"positions");
      });
  };


  const handleClick = (selected) => {
    console.log("selected", selected);
    setSelectedInstrument(selected.name || selected);
    console.log(selectedInstrument);
  
    const filteredData = data.filter(item => 
      item.tradingsymbol && 
      (item.tradingsymbol.startsWith(`${selected}`) || item.tradingsymbol.includes(`_${selected}`))
    );
    console.log(filteredData,"filteredData");
    console.log(data)
  // const temp = data.map(item=>console.log(item.tradingsymbol))
  // console.log(temp){ value, text: value }));
  // const productList = products.map((value) => ({ value, text: value }));
  const expiryList = [...new Set(filteredData.map(item => {if(item.last_price)return item.expiry}))].map(expiry => ({ value: expiry, text: expiry }));
  console.log(expiryList,"expiryList");
  setExpiryList(expiryList);
  
  // const strikeList = [...new Set(filteredData.map(item => item.strike))];
  // const strikeList = [...new Set(filteredData.map(item => item.strike))].map(strike => ({ value: strike, text: strike }));
  const strikeList = [...new Set(filteredData.map(item => {if(item.last_price)return item.strike}))]
  .map(strike => ({
    value: strike,
    text: String(strike)
  }));

  console.log(strikeList)
  setStrikeList(strikeList);
    
    // const strikeList = filteredData.map(item => item.strike);
    // setStrikeList(strikeList);
  };
  
  useEffect(() => {
    handleClick("NIFTY");
    updatePositions()
  }, []);
  useEffect(() => {
console.log(strikeList)
console.log(data)
  }, [strikeList]);
  useEffect(() => {
console.log(selectedInstrument)
console.log(callStrike)
console.log(expiryList)
console.log(expiry)
console.log(putStrike)
    setCallSymbol(formater(selectedInstrument || "", callStrike, expiryList || [{}], expiry ? expiry : "", "CE"));
    setPutSymbol(formater(selectedInstrument || "", putStrike, expiryList || [{}], expiry ? expiry : "", "PE"));
    console.log(callSymbol);
    console.log(putSymbol);
  }, [selectedInstrument, callStrike, putStrike, expiry]);
  useEffect(() => {
    const serverUrl =`${API_URL}?email=${Email}`;
    const socket = io(serverUrl);
    socket.on('connect',() => {
      console.log("WebSocket connected test");
      console.log("array of token", arrayOfTokens);
      const initialData = {
        token: window.localStorage.getItem("token"),
        instrumentToken: arrayOfTokens,
      };
      console.log(initialData, "initialdata");
      // socket.send(JSON.stringify(initialData));
    });
    socket.on('message',(message) => {
      // console.log(message)
      const ticker = JSON.parse(message);
      const ticks = Object.entries (ticker.feeds)
      // console.log(ticks, "ticks");
      ticks.forEach((tick) => {
        // console.log(tick[1].ff.marketFF.ltpc.ltp)
        // console.log(tick)
        const insToken = tick[0].split('|')[1]
        // console.log(insToken,callStrike,"values")

        // if(string(tick)=== string())
        // console.log(callStrike,data,"strike chec")
        const expiryFilterdData = data.filter(item => item.expiry && item.expiry.includes(`${expiry}`));
        const callInstrumentData = expiryFilterdData.filter(item => 
          item.strike && item.strike.includes(`${callStrike}`) &&
          item.tradingsymbol && item.tradingsymbol.includes(`CE`)
        );
        // console.log((callInstrumentData[0].instrument_key),tick,"callInstrumentData")
        const putInstrumentData = expiryFilterdData.filter(item => 
          item.strike && item.strike.includes(`${putStrike}`) &&
          item.tradingsymbol && item.tradingsymbol.includes(`PE`)
        );
        // console.log(putInstrumentData,"putInstrumentData")
        // console.log(instrumentData,"found instrument")
        if (String(tick[0]) === String(callInstrumentData[0].instrument_key)) {
          setCallLTP(tick[1].ff.marketFF.ltpc.ltp);
          setCallInstrumentKey(tick[0])
        }
        if (String(tick[0]) === String(putInstrumentData[0] && putInstrumentData[0].instrument_key)) {
          setPutLTP(tick[1].ff.marketFF.ltpc.ltp);
          setPutInstrumentKey(tick[0])
          console.log((tick[1].ff.marketFF.ltpc.ltp))
        }
        // if (String(insToken) === String(putTokenRef.current)) {
        //   setPutLTP(tick[1].ff.marketFF.ltpc.ltp);
        // }
      });
      
      setArrayOfToken((prevArrayOfTokens) => {
        const watchList = [...prevArrayOfTokens];
        ticks.forEach((tick) => {
        const insToken = tick[0].split('|')[1]
        console.log(insToken)
// console.log(tick,"tick")
// console.log(insToken,callTokenRef.current,"tokens")
console.log(watchList,"watchlist")
          watchList.forEach((item, index) => {
            // console.log(item,"item")
            console.log(tick,item.token,"watchlist token check")
            if (String(tick) === String(item.token)) {
              console.log(tick[1].ff.marketFF.ltpc.ltp,"watchlist ticks")
              watchList[index].ltp = tick[1].ff.marketFF.ltpc.ltp;
              watchList[index].pnl = (
                ((tick.last_price - tick.ohlc.close) / tick.ohlc.close) *
                100
              ).toFixed(1);
            }
            // if (String(tick.instrument_token) === String("8963842")) {
            //   setSelectedOption2(tick.last_price);
            //   setTickData(ticks);
            //   console.log(tick.last_price, "tick");
            // }
          });
        });
        setTicksData(ticks);
        ticks.map((tick) => {
          let buy = 0,
            sell = 0,
            temp = 0;

          tradebookRef.current &&
            tradebookRef.current.map((trade) => {
              if (trade.transaction_type === "BUY") {
                buy += trade.average_price * trade.quantity;
              } else {
                sell += trade.average_price * trade.quantity;
              }
            });
          fetchedPositionsRef.current &&
            fetchedPositionsRef.current["day"].map((p) => {
              if (
                String(p.instrument_token) === String(tick.instrument_token)
              ) {
                temp += tick.last_price * p.quantity;
                setPnl(sell - buy + temp);
              }
            });
        });
        return watchList;
      });
    });

    socket.on('disconnect',() => {
      console.log("WebSocket disconnected");
    });

    return () => {
      console.log("useEffect has been deprecated");
      socket.close();
    };
  }, [callStrike,putStrike,selectedInstrument]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (enableClick) {
        if (event.key === (customSellCallKey || "ArrowLeft")) {
          placeOrder("BUY", "CE",lotSize,callSymbol,qty,product,switchQty );
        }
        if (event.key === (customBuyCallKey || "ArrowUp")) {
          console.log("Buy call");
          placeOrder("SELL", "CE",lotSize,callSymbol,qty,product,switchQty);
        }
        if (event.key === (customBuyPutKey || "ArrowDown")) {
          console.log("buy put");
          placeOrder("BUY", "PE",lotSize,callSymbol,qty,product,switchQty);
        }
        if (event.key === (customSellPutKey || "ArrowRight")) {
          console.log("sell put");
          placeOrder("SELL", "PE",lotSize,callSymbol,qty,product,switchQty);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enableClick]);

  const handleCustomizeClick = () => {
    setCustomize(true);
  };

  const handleCustomizeClickSave = () => {
    localStorage.setItem("customBuyCallKey", customBuyCallKey);
    localStorage.setItem("customSellCallKey", customSellCallKey);
    localStorage.setItem("customBuyPutKey", customBuyPutKey);
    localStorage.setItem("customSellPutKey", customSellPutKey);
    setCustomize(false);
  };

  useEffect(() => {
    const customBuyCallKeyFromStorage =localStorage.getItem("customBuyCallKey");
    const customSellCallKeyFromStorage =localStorage.getItem("customSellCallKey");
    const customBuyPutKeyFromStorage = localStorage.getItem("customBuyPutKey");
    const customSellPutKeyFromStorage =localStorage.getItem("customSellPutKey");

    if (customBuyCallKeyFromStorage) {
      setCustomBuyCallKey(customBuyCallKeyFromStorage);
    }
    if (customSellCallKeyFromStorage) {
      setCustomSellCallKey(customSellCallKeyFromStorage);
    }
    if (customBuyPutKeyFromStorage) {
      setCustomBuyPutKey(customBuyPutKeyFromStorage);
    }
    if (customSellPutKeyFromStorage) {
      setCustomSellPutKey(customSellPutKeyFromStorage);
    }
  }, []);
  const handleQtyClick = () => {
    setSwitchQty(true);
  };
  const handleLotClick = () => {
    setSwitchQty(false);
  };
  const handlePositionClick = () => {
    setPositionButtonClicked(true);
    setOrderBookButtonClicked(false);
    setTradeBookButtonClicked(false);
    setFundsButtonClicked(false);
    setPositions(true);
    setOrderBookFlag(false);
    setTradeBook(false);
    setFunds(false);
  };

  const handleOrderBookClick = () => {
    setOrderBookButtonClicked(true);
    setTradeBookButtonClicked(false);
    setPositionButtonClicked(false);
    setFundsButtonClicked(false);
    setOrderBookFlag(true);
    setTradeBook(false);
    setPositions(false);
    setFunds(false);
  };

  const handleTradeBookClick = () => {
    setTradeBookButtonClicked(true);
    setOrderBookButtonClicked(false);
    setPositionButtonClicked(false);
    setFundsButtonClicked(false);
    setTradeBook(true);
    setOrderBookFlag(false);
    setPositions(false);
    setFunds(false);
  };
  const handleFundsClick = () => {
    setTradeBookButtonClicked(false);
    setOrderBookButtonClicked(false);
    setPositionButtonClicked(false);
    setFundsButtonClicked(true);
    setTradeBook(false);
    setOrderBookFlag(false);
    setPositions(false);
    setFunds(true);
  };
  useEffect(() => {
    window.addEventListener("beforeunload", refresh);
    return () => {
      window.removeEventListener("beforeunload", refresh);
    };
  }, []);
  useEffect(() => {
    console.log(TotalStopLoss);
  }, [TotalStopLoss]);
  useEffect(() => {
    setTotalStopLoss({ ...TotalStopLoss, boolean: TotalStopLossFlag });
  }, [TotalStopLossFlag]);
  const refresh = (e) => {
    fetch(`${API_URL}/test`, {
      "token":window.localStorage.getItem("token"),
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  // const handleToggle = () => {setToggle(!toggle);};
  return (
    <div className="trade bg-[url('./assets/tradebg.jpg')] h-full w-full flex flex-col">
      <div className="h-24 w-full flex ">
        <div className="flex w-full justify-center">
          <div
            // onClick={() => (handleClick("FINNIFTY"), setInstrumentName("FINNIFTY")),setCallLTP(0)}
            onClick={() => {
              handleClick("FINNIFTY");
              setInstrumentName("FINNIFTY");
              setCallLTP(0);
              setPutLTP(0)
            }}
            
            className={`p-2 h-20 m-4 ${instrumentName == "FINNIFTY" ? "bg-[#37203E]" : "bg-[#1C1C1C]"} rounded-lg w-1/6 text-white`}>
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">F</div>
                <h4 className="pl-2 font-medium text-lg">FINNIFTY</h4>
              </div>
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
          <div
            // onClick={() => (handleClick("NIFTY"), setInstrumentName("NIFTY")),setCallLTP(null)}
            onClick={() => {
              handleClick("NIFTY");
              setInstrumentName("NIFTY");
              setCallLTP(0);
              setPutLTP(0)
            }}
            className={`p-2 h-20 m-4 ${instrumentName == "NIFTY" ? "bg-[#37203E]" : "bg-[#1C1C1C]"} rounded-lg w-1/6 text-white`}>
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">N</div>
                <h4 className="pl-2 font-medium text-lg">NIFTY</h4>
              </div>
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
          <div
            // onClick={() => (handleClick("BANKNIFTY"), setInstrumentName("BANKNIFTY")), setCallLTP(null)}
            onClick={() => {
              handleClick("BANKNIFTY");
              setInstrumentName("BANKNIFTY");
              setCallLTP(0);
              setPutLTP(0)
            }}
            className={`p-2 h-20 m-4 ${instrumentName == "BANKNIFTY" ? "bg-[#37203E]" : "bg-[#1C1C1C]"} rounded-lg w-1/6 text-white`}>
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">B</div>
                <h4 className="pl-2 font-medium text-lg">BANKNIFTY</h4>
              </div>
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>     
            </div>
          </div>
          <div
            onClick={() => setInstrumentName("SENSEX")}
            className={`p-2 h-20 m-4 ${instrumentName == "SENSEX" ? "bg-[#37203E]" : "bg-[#1C1C1C]"} rounded-lg w-1/6 text-white`}>
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center"> S  </div>
                <h4 className="pl-2 font-medium text-lg">SENSEX</h4>
              </div>
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex flex-row p-2 gap-8 ">
        <div className="h-screen mt-6 w-1/4 ">
          <WatchList
            tokens={arrayOfTokens}
            add={changeArrayOfToken}
            ticks={ticksData}/>
        </div>
        <div className="h-screen w-5/6 m-6">
          <div className="w-full flex">
            <div className=" w-10/12 bg-[#1c1c1c] h-2/4 shadow-inner rounded-lg">
              <div className=" w-full">
                <div className="flex p-8 justify-around">
                  <Toggle
                    id="cheese-status"
                    defaultChecked={TotalStopLossFlag}
                    icons={false}
                    onChange={() => setTotalStopLossFlag(!TotalStopLossFlag)}/>
                  <h1 className="text-xl text-white">Trailing Stop Loss</h1>
                  <input
                    className="border-2 w-1/6 p-2 rounded-3xl text-green-600 font-medium flex justify-center bg-green-800 bg-opacity-25"
                    placeholder="stopLoss"
                    type="text"
                    value={TotalStopLoss.stopLoss}
                    onChange={(e) =>setTotalStopLoss({...TotalStopLoss,stopLoss: e.target.value,})}/>
                  <h1 className="text-xl text-white"> Target MTM</h1>
                  <input
                    className="border-2 w-1/6 p-2 rounded-3xl text-red-600 font-medium flex justify-center bg-red-800 bg-opacity-20"
                    placeholder="mtm"
                    type="text"
                    value={TotalStopLoss.mtm}
                    onChange={(e) =>setTotalStopLoss({...TotalStopLoss,mtm: e.target.value,})}/>
                </div>
                <div className=" w-full flex justify-center pr-20">
                  <div className="flex">
                    <Dropdown
                      heading="select expiry"
                      uparrow={"true"}
                      itemList={expiryList}
                      value={expiry}
                      onSelect={setExpiry}/>
                  </div>
                  <div className="pl-20 flex">
                    <Dropdown
                      heading="Product"
                      uparrow={"true"}
                      itemList={productList}
                      value={product}
                      onSelect={setProduct}/>
                  </div>
                </div>
                <div className=" w-full flex justify-between px-4 pt-6 pr-10">
                  <div className="flex">
                    <span className="font-medium text-lg text-white p-1">Call Price :</span>
                    <Dropdown
                      heading="Call strike"
                      downarrow={"true"}
                      itemList={strikeList}
                      value={callStrike}
                      onSelect={setCallStrike}/>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-lg text-white p-1">Put Price :</span>
                    <Dropdown
                      heading="Put Strike"
                      downarrow={"true"}
                      itemList={strikeList}
                      value={putStrike}
                      onSelect={setPutStrike}/>
                  </div>
                </div>
                <div className=" w-full flex justify-between px-4 pt-6">
                  <div>
                    <div className="font-medium text-lg text-white p-1">
                      {callSymbol&&expiry&&callStrike ? `Strike: ${callSymbol}` : "Strike : "}
                    </div>
                    <div className="font-medium text-lg text-white p-1">
                      {callLTP ? `LTP : ${callLTP}` : "LTP : "}
                      {/* {callLTP ? `LTP : ${callTokenRef.current}` : "LTP : "} */}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-lg text-white p-1">
                      {putSymbol&&expiry&&putStrike ? `Strike : ${putSymbol}` : "Strike : "}
                    </div>
                    <div className="font-medium text-lg text-white p-1">
                      {putLTP ? `LTP : ${putLTP}` : "LTP : "}
                      {/* {putLTP ? `LTP : ${putTokenRef.current}` : "LTP : "} */}
                    </div>
                  </div>
                </div>
                {customize && (
                  <div>
                    <input
                      type="text"
                      value={customBuyCallKey}
                      onChange={(e) => setCustomBuyCallKey(e.target.value)}
                      className="m-2 p-2 border-2 rounded border-black"
                      placeholder="customize key for Buy call"/>
                    <input
                      type="text"
                      value={customSellCallKey}
                      onChange={(e) => setCustomSellCallKey(e.target.value)}
                      className="m-2 p-2 border-2 rounded border-black"
                      placeholder="customize key for sell call"/>
                    <input
                      type="text"
                      value={customBuyPutKey}
                      onChange={(e) => setCustomBuyPutKey(e.target.value)}
                      className="m-2 p-2 border-2 rounded border-black"
                      placeholder="customize key for Buy put"/>
                    <input
                      type="text"
                      value={customSellPutKey}
                      onChange={(e) => setCustomSellPutKey(e.target.value)}
                      className="m-2 p-2 border-2 rounded border-black"
                      placeholder="customize key for sell put"/>
                    <button
                      className="ml-4 bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 rounded"
                      onClick={handleCustomizeClickSave}>
                      Save
                    </button>
                  </div>)}
                <div className="flex justify-between p-4 pt-0">
                  <div className="flex justify-between w-1/3 mt-4">
                    <div className="">
                      <button
                        className="new2 m-4 p-8 pt-2 pb-2  border border-green-400 text-green-400 rounded-lg font-semibold antialiased"
                        onClick={() => {placeOrder("BUY",lotSize,qty,callInstrumentKey)}}>
                        <div className="flex ">
                          <AiOutlineArrowLeft className=" mt-1.5 mr-2" /> Buy
                          call
                        </div>
                      </button>
                    </div>
                    <div>
                        <button
                          className="new1 m-4 p-8 pt-2 pb-2 border border-red-400 text-red-400 rounded-lg font-semibold antialiased"
                          onClick={() => {placeOrder("SELL",lotSize,qty,callInstrumentKey)}}>
                          <div className="flex">
                            <AiOutlineArrowUp className="mt-1.5 mr-2" />
                            Sell call
                          </div>
                        </button>
                    </div>
                  </div>
                  <div className="pt-2 ">
                    <h2 className="text-white">Quantity</h2>
                      <input
                        type="number"
                        placeholder={`       Quantity`}
                        className="h-10 w-32 bg-transparent flex justify-center text-white border rounded-lg border-white px-2 focus:outline-none focus:border-blue-500"
                        value={qty}
                        onChange={handleInputChange}/>
                      {errorMessage && errorMessage}
                  </div>
                  <div className="flex justify-between w-1/3 mt-4 ">
                    <button
                      className=" new1 m-4 p-8 pt-2 pb-2  border border-green-500 text-green-400 rounded-lg font-semibold antialiased"
                      onClick={() => {placeOrder("BUY",lotSize,qty,putInstrumentKey);}}>
                      <div className="flex">
                        Buy Put <AiOutlineArrowDown className="mt-1.5 ml-2" />
                      </div>
                    </button>
                    <button
                      className="new1 m-4 p-8 pt-2 pb-2  border border-red-400 text-red-400 rounded-lg font-semibold antialiased"
                      onClick={() => {placeOrder("SELL",lotSize,qty,putInstrumentKey)}}>
                      <div className="flex">
                        Sell Put <AiOutlineArrowRight className="mt-1.5 ml-2" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white ml-16 pt-6">
              <div className="p-6 bg-[#1c1c1c] rounded-lg mb-4"><SlEqualizer /></div>
              <div className="p-6 bg-[#1c1c1c] rounded-lg mb-4"><SlEqualizer /></div>
              <div className="p-6 bg-[#1c1c1c] rounded-lg"><SlEqualizer /></div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={exitAll}
              className="m-6 p-2 w-1/4 bg-gradient-to-b from-[#683FEA] to-[#A587E2] rounded-3xl text-white border"
            >Close all Positions
            </button>
            <div className="m-6 p-2 w-1/4 inline-flex justify-center items-center rounded-lg text-red-500 border bg-gradient-to-r from-red-900 from-1% via-red-900 bg-opacity-50 via-50% to-red-900 t0-20%">
              <span>PNL: {pnl}</span>
            </div>

            <button className="m-6 p-2 w-1/4 rounded-3xl text-[#7D7D7D] bg-white border">Cancel all orders</button>
          </div>
          <div className="h-1/3 ">
            <div className="flex bg-[#1c1c1c] rounded-lg p-4 pb-2 justify-contain w-full ">
              <div className="w-full">
                <div className="flex w-full ">
                  <button
                    className={`font-medium w-1/4 h-12 font-barlow-condensed font-sans border-0 text-white border-white rounded-3xl ${positionButtonClicked? "bg-gradient-to-t from-black ": ""} button-animation`}
                    onClick={handlePositionClick}
                  >Positions
                  </button>
                  <button
                    className={`font-medium w-1/4 h-12 font-barlow-condensed font-sans border-0  text-white rounded-3xl ${orderBookButtonClicked? "bg-gradient-to-t from-black": ""} button-animation`}
                    onClick={handleOrderBookClick}
                  >Order Book
                  </button>
                  <button
                    className={`font-medium w-1/4 h-12 font-barlow-condensed font-sans border-0 rounded-3xl text-white ${tradeBookButtonClicked? "bg-gradient-to-t from-black": ""} button-animation`}
                    onClick={handleTradeBookClick}
                  >Trade Book
                  </button>
                  <button
                    className={`font-medium w-1/4 h-12 text-white font-barlow-condensed font-sans border-0 rounded-3xl ${FundsButtonClicked ? "bg-gradient-to-t from-black" : ""} button-animation`}
                    onClick={handleFundsClick}
                  >Funds
                  </button>
                </div>

                {orderBookFlag && <Orderbook orderbook={orderbook} />}
                {TradeBook && <Tradebook tradebook={tradebook} />}
                {positions && (
                  <Positions
                    exit={handleClick}
                    setStopLossTSL={setStopLossTSL}
                    Positions={fetchedPositions && fetchedPositions}
                    stopLossValue={stopLoss}
                    setStopLossValue={setStopLoss}
                    trailingStopLoss={trailingStopLoss}
                    setTrailingStopLoss={setTrailingStopLoss}
                  />
                )}
                {funds && <Funds data={margin} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDashboard;
