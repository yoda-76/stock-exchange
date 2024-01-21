/**
 * this file contain all the routes realted to the trading console
 */
const {getOrderbook, getTradebook, getPositions, getBrokrage, getFunds, exitAll, cancelAll, exitPosition, cancelOrder, stoploss, placeOrder } = require('../Controllers/tradingConsole')
const router = require('express').Router()

router.post("/get-brokrage",async(req,res,next)=>{
    const {email, instrumentToken, quantity, product, transactionType, price}=req.body
    try{
        res.status(200).json(
            await getBrokrage(email, instrumentToken, quantity, product, transactionType, price)
            )

    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

router.post("/get-funds",async(req,res,next)=>{
    const {email}=req.body
    try{
        res.status(200).json(
            await getFunds(email)
            )
    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

router.post("/get-positions",async(req,res,next)=>{
    const {email}=req.body
    try{
        res.status(200).json(
            await getPositions(email)
            )
    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

router.post("/get-tradebook",async(req,res,next)=>{
    const {email}=req.body
    try{
        res.status(200).json(
            await getTradebook(email)
            )
    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

router.post("/get-orderbook",async(req,res,next)=>{
    const {email}=req.body
    try{
        res.status(200).json(
            await getOrderbook(email)
            )
    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


router.post("/place-order",placeOrder)
router.post("/stoploss",stoploss)
router.post("/cancel-order",cancelOrder)
router.post("/exit-position",exitPosition)
router.post("/cancel-all",cancelAll)
router.post("/exit-all",exitAll)

//also add get profile method


module.exports = router