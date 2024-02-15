const express = require("express");
const http = require("http");
const path = require("path");
const bp = require("body-parser");
const { Server } = require("socket.io");
const router = require("./src/route");
const mongoose = require("mongoose");
const user_model = require("./db_models/users");
const dotenv = require("dotenv");

const username=process.env.username;
const password=process.env.password;

dotenv.config();
const app = express();
const server = http.createServer(app);
const dbUrl = "mongodb://localhost:27017/Chat-App";

async function DBconn() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connectioon Successful");
    })
    .catch((err) => {
      console.log(err);
    });
}
try {
  DBconn();
} catch (err) {
  console.log(err);
}
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
