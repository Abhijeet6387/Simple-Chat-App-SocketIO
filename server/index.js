const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
//the cors middleware
app.use(cors());
// creating server
const server = http.createServer(app);
// creating a socket
const io = new Server(server, {
  // to resolve cors errors
  cors: {
    // origin: "*",
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// socket io connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // event
  socket.on("Join_Room", (room, name) => {
    socket.join(room);
    console.log(
      `User ID: ${socket.id}, Name: ${name} joined the room: ${room}`
    );
  });
  //event emiti from backend, listen in frontend
  socket.on("Send_Msg", (msg) => {
    socket.to(msg.room).emit("Receive_Message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server Connected");
});
