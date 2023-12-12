const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const passport= require("passport")
const OAuth2Strategy=require("passport-oauth2")
const key="bcc797ea-e9be-42f9-9f59-773126ab3652"
const secret="kab47d1kfj"
const code="zZFWsH"
passport.use(new OAuth2Strategy({
    authorizationURL: `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${key}&redirect_uri=http://localhost:4000/auth`,
    
    clientID: key,
    clientSecret: secret,
    tokenURL: `706566`,
    callbackURL: "http://localhost:4000/auth"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Access Token => ", accessToken)
  }
));

app.get('/auth/example',
  passport.authenticate('oauth2'));

app.get('/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });




app.listen(4000, () => {
    console.log(`Server is listening on port ${4000}`);
  });
  
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
//   app.use(cookieParser());
  
  app.use(express.json());
  

