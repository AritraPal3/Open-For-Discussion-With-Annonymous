const express = require("express");
const bp = require("body-parser");
const router = require("./src/routes/route");
require("./src/config/config")
require("dotenv").config();
const cors = require("cors")
const { auth } = require('express-openid-connect');
const app = express();

app.use(cors({origin:true}));
app.use(express.static("public"));
app.use(bp.urlencoded({ extended: true }));
app.use('views','views');
app.set("view engine", "ejs");


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use("/", router);
// req.isAuthenticated is provided from the auth router

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
