const { Server } = require("socket.io");
const { users } = require("../models/users"); // Assuming users is a Mongoose model
const io = new Server();

// Function to handle chat functionality
async function handleChat(socket) {
  try {
    socket.on("chatMessage", (message) => {
      //to Broadcast the message to all connected clients
      //console.log(message);
      socket.broadcast.emit("chatMessage", message);
    });

    socket.once("details", async (user) => {
      //console.log(user);
      try {
        // Create a new user in the database
        //await users.create(user);
        // to Notify all clients that a new user has joined
        socket.broadcast.emit("chatMessage", `${user} has joined the room`);
      } catch (err) {
        console.error("Error adding user:", err);
      }
    });
  } catch (err) {
    console.error("Socket error:", err);
  }
}

//to Attach the event handler to the connection event
io.on("connection", handleChat);

module.exports = {io};
