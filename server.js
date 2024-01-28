const express=require("express")
const http=require("http")
const path=require("path")
const bp=require("body-parser")
const { Server } = require("socket.io");

const app=express();
const server=http.createServer(app);

app.use(express.static(path.join(__dirname+"/public")));
app.use(bp.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/public/form.html");
});

app.post("/chat", (req, res) => {
  let name = req.body.name;
  res.render('index', { name: name }); 
});

const io = new Server(server);
io.on("connection", (socket) => {
  //console.log(socket.handshake.address)
  socket.on("chatMessage",(messg)=>{
    socket.broadcast.emit("reply",messg);
    //io.once("reply","admin-server - Hope you all are getting this");
  });
  socket.once("details", (user) => {
    console.log(user);
    socket.broadcast.emit("reply",user);
  });
});

server.listen(8000,()=>{
  console.log("Server listening on port 8000");
})
