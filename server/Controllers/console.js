const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.getBrokrage = async (req, res, next) => {
  try {
    const { email, key, secret } = req.body;
    const user = await User.findOneAndUpdate({ email }, { $set: { key, secret } });


    if (user) {
      console.log("Original Doc: ", user);
      req.user = user; // Store the user in the request object for the next middleware
      next(); // Pass control to the next middleware
    } else {
      console.log("error");
      return res.status(501).json({ message: "error in mongoose findOneAndUpdate" });
    }

      } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


    