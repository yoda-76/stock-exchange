const User = require("../Models/UserModel");
const ApiError  = require("../util/api_error.js")
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.
userVerification = (req, res, next) => {
  const token = req.cookies.token
  // console.log(token)
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      throw new ApiError(401, "Unauthorized Request", "Middleware/AuthMiddleware: userVerification");
    } else {
      const user = await User.findById(data.id)
      if (user) next()
      else throw new ApiError(500, "couldn't fetch user", "Middleware/AuthMiddleware: userVerification");
    }
  })
}