const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const publicPath = path.join(__dirname,"./../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

    //socket.emit()   --  single connection & possible for multiple tabs
    //socket.broadcast.emit()   --  Sends to all others except to itself
    //io.emit() --  Multiple connections. Emits to itself also.

app.use(express.static(publicPath));
io.on("connection",(socket)=>{
    console.log("New user connected");
    socket.emit("newMessage",generateMessage("Admin","Welcome to Chat-App"));    
    socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined"));
    socket.on("createMessage",(createdMessage, callback)=>{
        console.log("Created Message:",createdMessage);
        io.emit("newMessage",generateMessage(createdMessage.from,createdMessage.text));
        callback();
    });
    socket.on("join",(params, callback)=>{
        console.log(!isRealString(params.name));
        console.log(!isRealString(params.room));
        if(!isRealString(params.name) || !isRealString(params.room)) {
            console.log("Invalid");
            callback("Name and Room are required");
        }
        console.log("Valid");
        callback();
    })
    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("disconnect",()=>{
        console.log("User disconnected");
    });
});
server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
