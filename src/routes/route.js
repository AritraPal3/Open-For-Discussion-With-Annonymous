const express = require("express");
const path=require("path")
const router = express.Router();
const {requiresAuth}=require("express-openid-connect")

// router.use(express.urlencoded({ extended: true }));
// router.use(express.static(path.join(__dirname,"/public")));

router.get("/", homeP);
router.post("/chat", requiresAuth(),nameInit);

function homeP(req, res, next) {
    res.sendFile("");
}

function nameInit(req, res, next) {
  let name = req.oidc.name;
  console.log(name);
  res.render("chat", { name: req.oidc.user });
}

module.exports=router