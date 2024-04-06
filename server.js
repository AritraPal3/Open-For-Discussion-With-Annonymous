const express = require("express");

const path = require("path");
const bp = require("body-parser");

const router = require("./src/route");
require("./src/config/config")

require("dotenv").config();
const cors = require("cors")
const { auth } = require('express-openid-connect');

const app = express();

app.use(express.static(path.join(__dirname + "/public")));
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
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
