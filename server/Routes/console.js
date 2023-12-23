const { getBrokrage } = require('../Controllers/console')

const { userVerification}=require('../Middlewares/AuthMiddleware')
const router = require('express').Router()



router.post("/get-brokrage",getBrokrage)

module.exports = router