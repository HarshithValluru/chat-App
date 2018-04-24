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

    //io.emit() --  Emits to itself and to all other opened multiple connetions also
    //A socket is assigned to each opened connection by io.on("connection")
    //socket.emit()   --  single connection. Emits to itself to which socket is assigned.
    //When two tabs are opened. Then here, it means that for one connection, 2 sockets are opened. Then
        //both sockets listen to the same server.
    //socket.broadcast.emit()   --  Sends to all other connected sockets except to itself
    //socket.join() --  

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
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and Room are required");
        }
        //socket.join(params.room);
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
