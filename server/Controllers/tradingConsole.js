const axios = require('axios');
const User = require("../Models/UserModel");

module.exports.getBrokrage = async (req, res, next) => {
  try {
    const {email, instrumentToken, quantity, product, transactionType, price}=req.body

    const user=await User.findOne({email})
    const accessToken=user.data.access_token;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/charges/brokerage',
      headers: { 
        'Accept': 'application/json',
        'Api-Version': '2.0',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params:{
        "instrument_token":instrumentToken,
        "price":price,
        "transaction_type":transactionType,
        "product":"I",
        "quantity":quantity
      }
    };

    axios(config)
      .then((response) => {
        const brokerageData=response.data
        console.log(JSON.stringify(brokerageData));
        res.status(200).json(brokerageData)

      })
      .catch((error) => {
        console.log(error);
      });


    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


    
module.exports.getFunds = async (req, res, next) => {
  try {
    //get funds data and send it back to client
    const {email}=req.body
    const user=await User.findOne({email})
    const accessToken=user.data.access_token;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/user/get-funds-and-margin',
      headers: { 
        'Accept': 'application/json',
        'Api-Version': '2.0',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json(response.data)

    })
    .catch((error) => {
      console.log(error);
    });
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};






module.exports.getPositions = async (req, res, next) => {
  try {
    //get funds data and send it back to client
    const {email}=req.body
    const user=await User.findOne({email})
    const accessToken=user.data.access_token;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/portfolio/short-term-positions',
      headers: { 
        'Accept': 'application/json',
        'Api-Version': '2.0',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports.placeOrder = async (req, res, next) => {
  try {
    //place order and send back orderid or confirmation
    const {email, quantity, price, tag, instrument_token, order_type, transaction_type, disclosed_quantity, trigger_price}=req.body
    const user=await User.findOne({email})
    const accessToken=user.data.access_token;
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/order/place',
      headers: { 
        'Accept': 'application/json',
        'Api-Version': '2.0',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:{
        "quantity": 1,
        "product": "D",
        "validity": "DAY",
        "price": 0,
        "instrument_token": "NSE_EQ|INE848E01016",
        "order_type": "MARKET",
        "transaction_type": "BUY",
        "disclosed_quantity": 0,
        "is_amo": false
      }
    };
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json({msg:"order placed",data:response.data})
    })
    .catch((error) => {
      console.log(error);
    });
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};







module.exports.exitPosition = async (req, res, next) => {
  try {
    //exit a single given position
  } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.cancelOrder = async (req, res, next) => {
  try {
    //cancel a single given pending order
  } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




module.exports.exitAll = async (req, res, next) => {
  try {
    //fetch all positions and exit all of them 
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.cancelAll = async (req, res, next) => {
  try {
    //cancel all pending orders
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




module.exports.stoploss = async (req, res, next) => {
  try {
    //place an opposit order on the givin sl price
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



