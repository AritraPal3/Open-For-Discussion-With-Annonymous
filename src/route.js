const express = require("express");
const { auth } = require('express-openid-connect');
const path=require("path")
const router = express.Router();
// const {loginDetails,newSignup}=require("./controllers/auth")

router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname,"/public")));
router.get('/home', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
router.get("/", homeP);
// router.get("/login", loginDetails)
// router.get("/signup",newSignup)
router.post("/chat", nameInit);

const outside= path.resolve(__dirname,"..");

function homeP(req, res, next) {
    
    res.sendFile(path.join(outside, "/public/form.html"));
}

function nameInit(req, res, next) {
  let name = req.body.name;
  res.render("chat", { name: name });
}

module.exports=router