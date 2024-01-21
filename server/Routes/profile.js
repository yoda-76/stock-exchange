const { Signup, Login, changePassword } = require('../Controllers/AuthController')
const { saveKeyAndSecret } = require('../Controllers/saveKeyAndSecret');
// const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

// router.post('/', userVerification);
router.post('/signup', async(req,res,next)=>{
  const {email, password, username, createdAt}=req.body
  console.log("first")

  try{
    const token=await Signup(email, password, username, createdAt)
    if(token){
      console.log(token)
      res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signup successfully" });
    }else{
      res.json({ message: "User already exists" })
    }
  }catch(err){
      console.log(err)
      res.status(500).send("Internal server error")
  }
})
//change these routes too
router.post('/login', async(req,res,next)=>{
  const {email, password}=req.body
  try{
    const token=await Login(email, password)
    if(token){
      console.log(token)
      res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signup successfully" });
    }else{
      return res.json({message:'Incorrect password or email' })
    }
  }catch(err){
      console.log(err)
      res.status(500).send("Internal server error")
  }
})


router.post("/saveKeyAndSecret", async(req,res,next)=>{
  const {email, key, secret}=req.body
  try{
    const user=await saveKeyAndSecret(email, key, secret)
    if(user){
      console.log(user)
    res
      .status(201)
      .json({ message: "changed" });
    }else{
      res.json({ message: "not changed" })
    }
  }catch(err){
      console.log(err)
      res.status(500).send("Internal server error")
  }
});
router.post('/change-password', changePassword)

module.exports = router;
