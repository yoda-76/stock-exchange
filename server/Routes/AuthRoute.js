const { Signup, Login } = require('../Controllers/AuthController')
const { GetAccessToken } = require('../Controllers/Autherisation')
const { userVerification}=require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/',userVerification)
router.post('/signup', Signup)
router.post('/login', Login)
router.get("/auth",GetAccessToken, (req, res) => {
    res.status(201).json({
      message: "Access token saved successfully",
      success: true,
      user: req.user
    });
  })

module.exports = router