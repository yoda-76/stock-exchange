const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
const app = express();
require("dotenv").config();
// const cookieParser = require("cookie-parser"); 
// const authRoute = require("./Routes/AuthRoute");
const {  PORT } = process.env;

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());

app.use(express.json());

// app.use("/", authRoute);

const passport= require("passport")
const OAuth2Strategy=require("passport-oauth2")
const key="bcc797ea-e9be-42f9-9f59-773126ab3652"
const secret="kab47d1kfj"
// const code="zZFWsH"
passport.use(new OAuth2Strategy({
    authorizationURL: `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${key}&redirect_uri=http://localhost:4000/auth`,
    
    clientID: key,
    clientSecret: secret,
    tokenURL: `https://api.upstox.com/v2/login/authorization/token`,
    callbackURL: "http://localhost:4000/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Access Token => ", accessToken)
  }
));

app.get('/auth/',
  passport.authenticate('oauth2'));

app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: ()=>{console.log("first")} }),

  function(req, res) {
    // Successful authentication, redirect home.
    console.log("authenticated",req.body)
    res.redirect('/');
  });

// app.get("/auth",(req,res)=>{
//     const authCode = req.query.code;

//     // Make a POST request to obtain the authorization token
//     axios.post('https://api.upstox.com/v2/login/authorization/token', {
//       code: authCode,
//       client_id: key,
//       client_secret: secret,
//       redirect_uri: 'http://localhost:4000/auth',
//       grant_type: authCode
//     })
//     .then(response => {
//       // Handle the response from the token endpoint
//       console.log("data",response.data);
//       res.send(response.data); // You can customize the response as needed
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).send('Error obtaining authorization token');
//     });
//   });
