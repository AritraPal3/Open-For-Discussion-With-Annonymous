const express = require("express");
const path = require("path")
const router = express.Router();
const { requiresAuth } = require("express-openid-connect")

router.use(express.urlencoded({ extended: true }));

router.get("/", homePage);
router.post("/chat", requiresAuth(), nameInit);

function homePage(req, res, next) {
  res.render("form.ejs",{state:req.oidc.isAuthenticated()});
}

function nameInit(req, res, next) {
  let name = req.body.user;
  console.log(name);
  res.render("chat", { name: req.oidc.user });
}

module.exports = router;
