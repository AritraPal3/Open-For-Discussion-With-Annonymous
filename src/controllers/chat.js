const http = require("http");
const { Server } = require("socket.io");
const mongoose=require("mongoose")
const {users} = require("./src/models/users");
const server = http.createServer(app);
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