const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (email, password, username, createdAt) => {
    console.log("first")
    const existingUser = await User.findOne({ email });
    console.log("first")

    if (existingUser) {
    console.log("existingUser",existingUser)
      return ;
    }
    const user = await User.create({ email, password, username, createdAt });
    // console.log("new user",user)

    const token = createSecretToken(user._id);
    // console.log("token", token)
    return token
};

module.exports.Login = async (email, password) => {
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return  
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return 
      }
       const token = createSecretToken(user._id);
       return token
  }

  module.exports.changePassword = async (req, res, next) => {
    try {
      //code for changing password
      // next()
    } catch (error) {
      console.error(error);
    }
  }