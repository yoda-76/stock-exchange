const { getBrokrage, getFunds, exitAll, cancelAll, exitPosition, cancelOrder, stoploss, placeOrder } = require('../Controllers/tradingConsole')

const { userVerification}=require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post("/get-brokrage",getBrokrage)
router.post("/place-order",placeOrder)
router.post("/stoploss",stoploss)
router.post("/cancel-order",cancelOrder)
router.post("/exit-position",exitPosition)
router.post("/cancel-all",cancelAll)
router.post("/exit-all",exitAll)
router.post("/get-funds",getFunds)



module.exports = router