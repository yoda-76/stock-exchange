import React from 'react'
import { API_URL } from '../../dynamicRoutes';
const Email= localStorage.getItem('email');
const cancelOrder=(id)=>{
  fetch(`${API_URL}/console/cancel-order `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token":window.localStorage.getItem("token") ,
      "credentials": 'include',
    },
    body: JSON.stringify({
      email:Email,
      order_id:id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
console.log(data,"canceled order")
    });
}
const Orderbook = (props) => {
  console.log(props.orderbook,"orderbook")
 
  return (
    <div className="flex flex-col gap-4 bg-transparent text-white w-full h-full">
    {/* header - nifty time  */}

    <h2 className="font-bold text-2xl"></h2>

    {/* main area displays cards */}
    <div className="overflow-x-auto">
      <table className="table w-full text-white">
        {/* head */}
        <thead className="bg[#0A0A0C]">
          <tr className=" text-[#BABABA] text-lg">
            <th className=" font-normal text-gray-400">Symbol</th>
            {/* <th className="font-normal">LTP</th> */}
            <th className="font-normal">Time Stamp</th>
            <th className="font-normal">Qty</th>
            <th className="font-normal">Order Type</th>
            <th className="font-normal">Transaction Type</th>

            <th className="font-normal">Status</th>
            <th className="font-normal">Cancel</th>
            {/* <th className="font-normal">Sell</th> */}
          </tr>
        </thead>
        <tbody className="">
          {/* use map here  */}
          {props.orderbook.data&&props.orderbook.data.map((item,index)=>{
            return (
              <tr  className="w-screen   p-4  border-b-2  border-gray-500 " >
                <div className='flex items-center w-full h-12 border border-white justify-center m-8 p-4 bg-black rounded-xl'>
              <th className="">{item.tradingsymbol}</th>
              </div>
             
           
              <td className='pl-24'>{item.order_timestamp.split('T')[0]}</td>
              
              <td className='mr-10 p-10'>{item.quantity}</td>
              <td className='mr-10 p-10'>{item.order_type}</td>
              <td className='mr-10 p-10'>{item.transaction_type}</td>
              <div className='border p-4 border-green-300  rounded-lg w-fit pr-8'>
              <td className='mr-8 p'>{item.status}</td>
              </div>
              <td className='mr-8 p'>
              {item.status != "cancelled after market order" ? (
        <button className='pl-10' onClick={() => cancelOrder(item.order_id)}>Cancel Order</button>
      ) : null}
              </td>
            </tr>        
            )
          })}
        </tbody>
      </table>
      
    </div>
  </div>
  )
}

export default Orderbook