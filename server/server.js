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

    socket.emit("newMessage",{          //single connection & possible for multiple tabs
        from : "Admin",
        text : "Welcome to chat app",
        createdAt : new Date().getTime()
    });
    socket.broadcast.emit("newMessage",{
        from : "Admin",
        text : "New user joined",
        createdAt : new Date().getTime()
    })
    socket.on("createMessage",(createdMessage)=>{
        console.log("Created Message:",createdMessage);
        io.emit("newMessage",{          //Multiple connections. Emits to itself also.
            to : createdMessage.to,
            text : createdMessage.text,
            createdAt : new Date().getTime()
        });
        // socket.broadcast.emit("newMessage",{             //Sends to all others except to itself
        //     to : createdMessage.to,
        //     text : createdMessage.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    });
});
server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});