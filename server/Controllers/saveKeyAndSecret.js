const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.saveKeyAndSecret = async (email, key, secret) => {
    const user = await User.findOneAndUpdate({ email }, { $set: { key, secret } });
    if (user) {
      return user
    } else {
        throw new ApiError(500,"couldn't save key and secret", ".Controllers/saveKeyAndSecret: saveKeyAndSecret")
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

