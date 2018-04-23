const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname,"./../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on("connection",(socket)=>{
    console.log("New user connected");

    socket.emit("newEmail",{
        from : "ram@gmail.com",
        text : "Sample Text Message..",
        createdAt : new Date()
    });
    socket.emit("newMessage",{
        from : "Harshith",
        text : "Hiee Banda..",
        createdAt : new Date()
    });

    socket.on("createEmail",(createdEmail)=>{
        console.log("Created Email:",createdEmail);
    });
    socket.on("createMessage",(createdMessage)=>{
        console.log("Created Message:",createdMessage);
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    });
});
server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});