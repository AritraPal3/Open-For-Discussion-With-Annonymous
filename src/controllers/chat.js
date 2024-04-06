const { Server } = require("socket.io");
const { users } = require("../models/users"); // Assuming users is a Mongoose model
const io = new Server();

// Function to handle chat functionality
async function handleChat(socket) {
  try {
    socket.on("chatMessage", (message) => {
      // Broadcast the message to all connected clients
      io.emit("chatMessage", message);
    });

    socket.once("details", async (user) => {
      console.log(user);
      try {
        // Create a new user in the database
        //await users.create(user);
        // Notify all clients that a new user has joined
        io.emit("reply", `${user.username} has joined the room`);
      } catch (err) {
        console.error("Error adding user:", err);
      }
    });
  } catch (err) {
    console.error("Socket error:", err);
  }
}

// Attach the event handler to the connection event
io.on("connection", handleChat);

module.exports = {io};
