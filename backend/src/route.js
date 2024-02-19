const express = require("express");
const path=require("path")
const router = express.Router();
const bp=require('body-parser');

router.use(bp.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname,"/public")));
router.get("/", homeP);
router.post("/chat", nameInit);

const outside= path.resolve(__dirname,"..");

function homeP(req, res, next) {
    
    res.sendFile(path.join(outside, "/public/form.html"));
}

function nameInit(req, res, next) {
  let name = req.body.name;
  console.log(name);
  res.render("chat", { name: name });
}

module.exports=router