const { Signup, Login, changePassword } = require('../Controllers/AuthController')
const { saveKeyAndSecret } = require('../Controllers/saveKeyAndSecret');
// const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

// router.post('/', userVerification);
router.post('/signup', Signup)
router.post('/login', Login)
router.post('/change-password', changePassword)
router.post("/saveKeyAndSecret", saveKeyAndSecret, (req, res) => {
  res.status(201).json({
    message: "User data saved successfully",
    success: true,
    user: req.user
  });
});

module.exports = router;
