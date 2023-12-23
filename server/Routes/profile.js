const { saveKeyAndSecret } = require('../Controllers/saveKeyAndSecret');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/', userVerification);

router.post("/saveKeyAndSecret", saveKeyAndSecret, (req, res) => {
  res.status(201).json({
    message: "User data saved successfully",
    success: true,
    user: req.user
  });
});

module.exports = router;
