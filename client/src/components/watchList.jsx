import React, { useState, useEffect } from 'react';
// import maindata from '../instrument.json';
import mainData from '../../../server/token_data/instrument_data.json'
import tradingsymbols from '../instrumentTradingSymbol.json';
import instruments from '../instrument.json';
import CustomCombobox from './basic components/AutoCompleteInput';
// import React, { useState, useEffect } from "react";
// import maindata from "../../backend/routes/data/instrument.json";
// import tradingsymbols from "../../backend/routes/data/instrumentTradingSymbol.json";
// import instruments from "../../backend/routes/data/instrument.json";
// import CustomCombobox from "./basic components/AutoCompleteInput";
import { AiFillDelete } from "react-icons/ai";
import "./watchlist.css";

const WatchList = (props) => {
  const [data, setData] = useState([]);
  const [tokendata, setTokendata] = useState();
  const [name, setName] = useState();
  const [hoveredCEIndex, setHoveredCEIndex] = useState(null);
  const [hoveredPEIndex, setHoveredPEIndex] = useState(null);
 const tradingSymbols = []
 console.log(data,"watchlist data")
  mainData.map((item, index) =>{
    tradingSymbols.push({ name: item.tradingsymbol, id: index });
  })
  console.log(tradingSymbols,"trading symbol")
  console.log(mainData,"trading symbol")
  console.log(props.ticksData);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("watchlistData"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    if (tokendata !== undefined && name !== undefined) {
      const updatedData = [
        ...data,
        { token: tokendata, ltp: 0, pnl: 0, name: name },
      ];
      setData(updatedData);
      localStorage.setItem("watchlistData", JSON.stringify(updatedData));
      props.add(updatedData);
    }
  }, [tokendata, name]);

  const token = (selected) => {
    mainData.forEach((item) => {
      if (item.tradingsymbol === selected) {
        setTokendata(item.instrument_key);
        return;
      }
    });
  };

  const handleClick = (selected) => {
    if (!data.some((item) => item.name === selected.name)) {
      if (
        selected.name.includes("CE") ||
        selected.name.includes("PE") ||
        selected.name.includes("FUT")
      ) {
        setName(selected.name);
        token(selected.name);
      }
    }
  };

  const handleDelete = (index, type) => {
    const updatedData = [...data];
    if (type === "CE") {
      const ceItem = ceData[index];
      const ceIndex = updatedData.indexOf(ceItem);
      if (ceIndex !== -1) {
        updatedData.splice(ceIndex, 1);
        setData(updatedData);
        localStorage.setItem("watchlistData", JSON.stringify(updatedData));
        setHoveredCEIndex(null);
      }
    } else if (type === "PE") {
      const peItem = peData[index];
      const peIndex = updatedData.indexOf(peItem);
      if (peIndex !== -1) {
        updatedData.splice(peIndex, 1);
        setData(updatedData);
        localStorage.setItem("watchlistData", JSON.stringify(updatedData));
        setHoveredPEIndex(null);
      }
    }
  };

  const ceData = data.filter((value) => value.name && !value.name.includes("PE"));
  const peData = data.filter((value) => value.name && value.name.includes("PE"));
  

  return (
    <div className="w-full h-full bg-[#1C1C1C] bg-opacity-60 rounded-lg">
      <div>
        <CustomCombobox
          options={tradingSymbols}
          atm={props.atm}
          onChange={handleClick}
        />
      </div>
      <div className=" overflow-y-scroll h-1/3">
        {ceData.map((value, index) => (
          <div
            key={index}
            className={`flex w-full justify-between h-12 ${
              hoveredCEIndex === index ? "hovered" : ""
            } ${value.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
            onMouseEnter={() => setHoveredCEIndex(index)}
            onMouseLeave={() => setHoveredCEIndex(null)}
          >
            <div className="w-3/6 flex items-center justify-center">
              {value.name}
            </div>
            <div className="w-1/6 flex justify-center pt-2 font-semibold">
              {value.ltp}
            </div>
            <div className="w-1/6 flex justify-center pt-2 font-semibold">
              {`${value.pnl}%`}
            </div>
            {hoveredCEIndex === index && (
              <div className="w-1/6 flex justify-center">
                <button onClick={() => handleDelete(index, "CE")}>
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="m-16"></div>

      <div className="overflow-y-scroll h-1/3">
        {peData.map((value, index) => (
          <div
            key={index}
            className={`flex delete-button ${
              hoveredPEIndex === index ? "hovered" : ""
            } w-full justify-between h-12  ${
              value.pnl >= 0 ? "text-green-400" : "text-red-400"
            }`}
            onMouseEnter={() => setHoveredPEIndex(index)}
            onMouseLeave={() => setHoveredPEIndex(null)}
          >
            <div className="w-3/6 flex items-center justify-center">
              {value.name}
            </div>
            <div className="w-1/6 pt-2 flex justify-center font-semibold">
              {value.ltp}
            </div>
            <div className="w-1/6 pt-2 flex justify-center  font-semibold">
              {`${value.pnl}%`}
            </div>
            <div className="w-1/6 h-full flex justify-center">
              <button
                onClick={() => handleDelete(index, "PE")}
                className="delete-icon"
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;