const axios = require('axios');
const User = require("../Models/UserModel");

module.exports.getBrokrage = async (email, instrumentToken, quantity, product, transactionType, price) => {


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

    const response=await axios(config)
    const brokerageData=response.data
    return brokerageData;
};


    
module.exports.getFunds = async (email) => {
    
  const user=await User.findOne({email})
  const accessToken=user.data.access_token;
  console.log(accessToken)

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

  const response=await axios(config)
  const funds=response.data
  return funds;
};






module.exports.getPositions = async (email) => {
  
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
    const response=await axios(config)
    const positions=response.data
    return positions;
};


module.exports.getOrderbook=async(email)=>{
  const user=await User.findOne({email})
  const accessToken=user.data.access_token;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.upstox.com/v2/order/retrieve-all',
    headers: { 
      'Accept': 'application/json',
      'Api-Version': '2.0',
      'Authorization': `Bearer ${accessToken}`,
    }
  };
  const response=await axios(config)
  const positions=response.data
  let orderbook=positions//...get orderbook from positions
  return orderbook
}

module.exports.getTradebook=async(email)=>{
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
  const response=await axios(config)
  const positions=response.data
  let tradebook=positions//...get tradebook from positions
  return tradebook
}

module.exports.placeOrder = async (email,quantity, instrument_token) => {
  console.log(email)
    const user=await User.findOne({email})
    const accessToken=user.data.access_token;
    console.log(accessToken)
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/order/place',
      headers: { 
        'Accept': 'application/json',
        'Api-Version': '2.0',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data:{
        quantity,
        instrument_token,
        "product": "D",
        "validity": "DAY",
        "price":0,
        "order_type": "MARKET",
        "transaction_type": "BUY",
        "trigger_price": 0,
        "is_amo": true
      }
    };
    const response = await axios(config)
    if(response)return response.data
    return
};



module.exports.cancelOrder = async (email,order_id) => {
    const user=await User.findOne({email})
    const accessToken=user.data.access_token;
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/order/cancel',
      headers: { 
        'Accept': 'application/json',
        'Api-Version': '2.0',
        'Authorization': `Bearer ${accessToken}`,
      },
      params:{
        order_id
      }
    };
    const response = await axios(config)
    if(response)return response.data
    return
};


module.exports.cancelAll = async (email) => {
  const user=await User.findOne({email})
  const accessToken=user.data.access_token;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.upstox.com/v2/order/retrieve-all',
    headers: { 
      'Accept': 'application/json',
      'Api-Version': '2.0',
      'Authorization': `Bearer ${accessToken}`,
    }
  };
  const response = await axios(config)
  let canceledOrders=[]
  for(const order of response.data.data){
    if (order.status==="after market order req received"){
      let config2 = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://api.upstox.com/v2/order/cancel',
        headers: { 
          'Accept': 'application/json',
          'Api-Version': '2.0',
          'Authorization': `Bearer ${accessToken}`,
        },
        params:{
          "order_id":order.order_id
        }
      };
      const response2 = await axios(config2)
      console.log(response2.data.data.order_id)
      canceledOrders.push(response2.data.data.order_id)
    }
  }
  // response.data.data.map((async order=>{
    
  // }))
  return canceledOrders
};


module.exports.exitPosition = async (req, res, next) => {
  try {
    //exit a single given position
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





module.exports.stoploss = async (req, res, next) => {
  try {
    //place an opposit order on the givin sl price
    } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


//also add get profile method


