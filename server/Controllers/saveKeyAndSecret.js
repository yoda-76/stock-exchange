const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.saveKeyAndSecret = async (req, res, next) => {
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

    // If you have further logic that should be executed after updating the user, you can place it here

    // res.status(201).json({
    //   message: "User data saved successfully",
    //   success: true,
    //   user,
    // });
  } catch (error) {
    console.log("error =>>", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};























// const User = require("../Models/UserModel");
// const { createSecretToken } = require("../util/SecretToken");
// // const bcrypt = require("bcryptjs");

// module.exports.saveKeyAndSecret = async (req, res, next) => {
//   try {
//     const { email, key, secret } = req.body;
//     const user=await User.findOneAndUpdate({email },  
//         {key,secret}); 
       
//           if (user){ 
//             console.log("Original Doc : ",user); 
//           } 
//           else{ 
//               console.log("error") 
//               res.status(501).json({message:"error in mongoose findOneAndUpdate"})
//           } 
//     // const user = await User.create({ email, password, username, createdAt });
    
//     return res
//       .status(201)
//       .json({ message: "User data saved successfully", success: true, user });
//   } catch (error) {
//     console.log("error =>>",error);
//   }
// };

