const express = require("express");
const http = require("http");
const path = require("path");
const bp = require("body-parser");
const { Server } = require("socket.io");
const router = require("./src/route");
require("./src/config/config")
const mongoose=require("mongoose")
const {users} = require("./src/models/users");
require("dotenv").config();
const cors = require("cors")
const { auth } = require('express-openid-connect');

const app = express();
const server = http.createServer(app);

app.use(cors());
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




const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("chatMessage", (messg) => {
    socket.broadcast.emit("reply", messg);
  });
  socket.once("details", (user) => {
    console.log(user);
    try {
      //users.create(user,)
      //newUser(user, socket.handshake.address); //add new user here
    } catch (err) {
      console.log("User could not be added");
    }
    socket.broadcast.emit("reply", user + " has joined the room");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
