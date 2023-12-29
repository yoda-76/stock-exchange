const { GetAccessToken } = require('../Controllers/Autherisation')
const { userVerification}=require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

// router.post('/',userVerification)

router.get("/auth",GetAccessToken, (req, res) => {
    res.status(201).json({
      message: "Access token saved successfully",
      success: true,
      user: req.user
    });
  })

module.exports = router
