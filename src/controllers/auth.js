const path=require("path")
const {users} = require("../models/users");
function loginDetails(req,res,next)
{
  res.sendFile(__dirname+"./views/login.ejs")
}

function newSignup(req,res,next)
{
  res.sendFile(__dirname+"./views/signUp.ejs")
}

function saveCred(req, res, next) {
  const userObj={ username, email, password } = req.body;
  console.log(userObj);
  users.create(userObj);
}


module.exports={loginDetails,newSignup};