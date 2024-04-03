const express = require("express");
const http = require("http");
const path = require("path");
const bp = require("body-parser");
const { Server } = require("socket.io");
const router = require("./src/route");
require("./config/config")
const mongoose=require("mongoose")
const {users} = require("./models/users");
require("dotenv").config();
const cors = require("cors")

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", router);

async function newUser(name, ip) {
  let entry = new user_model({
    name: name,
    _id: ip,
    ip: ip,
  });
  entry
    .save()
    .then(() => {
      console.log("New User Added\n");
    })
    .catch((err) => {
      console.log("Error during saving\n");
    });
}

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("chatMessage", (messg) => {
    socket.broadcast.emit("reply", messg);
  });
  socket.once("details", (user) => {
    console.log(user);
    try {
      newUser(user, socket.handshake.address);
    } catch (err) {
      console.log("User could not be added");
    }
    socket.broadcast.emit("reply", user + " has joined the room");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
