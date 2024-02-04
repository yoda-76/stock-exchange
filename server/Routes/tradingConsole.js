/**
 * this file contain all the routes realted to the trading console
 */
const {getOrderbook, getTradebook, getPositions, getBrokrage, getFunds, exitAll, cancelAll, exitPosition, cancelOrder, stoploss, placeOrder } = require('../Controllers/tradingConsole')
const router = require('express').Router()

// router.post("/get-brokrage",async(req,res,next)=>{
//     const { instrumentToken, quantity, product, transactionType, price}=req.body
//     const {user}=req
//     try{
//         res.status(200).json(
//             await getBrokrage(user, instrumentToken, quantity, product, transactionType, price)
//             )

//     }catch(err){
//         console.log(err)
//         res.status(500).json(err)
//     }
// })

router.post("/get-funds",async(req,res,next)=>{
    const {user}=req
    try{
        res.status(200).json(
            await getFunds(user)
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/get-positions",async(req,res,next)=>{
    const user=req.user
    try{
        res.status(200).json(
            await getPositions(user)
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/get-tradebook",async(req,res,next)=>{
    const user=req.user
    try{
        res.status(200).json(
            await getTradebook(user)
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/get-orderbook",async(req,res,next)=>{
    const user=req.user
    try{
        res.status(200).json(
            await getOrderbook(user)
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


router.post("/place-order",async(req,res,next)=>{
    const {quantity, instrument_token,transaction_type}=req.body
    const user=req.user

    try{
        res.status(200).json(
            await placeOrder(user,quantity, instrument_token,transaction_type)
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.post("/cancel-order",async(req,res,next)=>{
    const {order_id}=req.body
    const user=req.user
    try{
        res.status(200).json(
            {data:await cancelOrder(user,order_id)}
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.post("/cancel-all",async(req,res,next)=>{
    const user=req.user
    try{
        res.status(200).json(
            {data:{cancelOrder:await cancelAll(user)}}
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.post("/stoploss",async(req,res,next)=>{
    const {quantity, instrument_token,transaction_type}=req.body
    const user=req.user
    try{
        res.status(200).json(
            await stoploss(user, instrument_token,)
            )
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
router.post("/exit-position",exitPosition)
router.post("/exit-all",exitAll)

//also add get profile method


module.exports = router