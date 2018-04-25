const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname,"./../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

    //io.emit() --  Emits to itself and to all other opened multiple connetions also
    //A socket is assigned to each opened connection by io.on("connection")
    //socket.emit()   --  single connection. Emits to itself to which socket is assigned.
    //When two tabs are opened. Then here, it means that for one connection, 2 sockets are opened. Then
        //both sockets listen to the same server.
    //socket.broadcast.emit()   --  Sends to all other connected sockets except to itself
    //socket.join(params.room)  --  Lets us join to the specific room;
    //socket.leave(params.room) --  Lets us to leave the room. ie: we wont get anymore messages
    //io.to("Node room").emit() --  Will send to all people connected to that specific room
    //socket.broadcast.to("Node room").emit()  --  Will send to all people connected to that specific 
        //room except to itself

app.use(express.static(publicPath));
io.on("connection",(socket)=>{
    console.log("New user connected");

    socket.on("join",(params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and Room are required");
        }
        socket.join(params.room);
        // Just to remove any user having a socketId stopping to join another room, we first remove him forcefully and then add to the new room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUsersList(params.room));

        socket.emit("newMessage",generateMessage("Admin","Welcome to Chat-App"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin",`${params.name} has joined`));
        callback();
    });
    socket.on("createMessage",(createdMessage, callback)=>{
        console.log("Created Message:",createdMessage);
        io.emit("newMessage",generateMessage(createdMessage.from,createdMessage.text));
        callback();
    });
    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("disconnect",()=>{
        var user = users.removeUser(socket.id);

        io.emit("updateUserList", users.getUsersList(user.room));
        io.emit("newMessage", generateMessage("Admin", `${user.name} has left`));
        console.log("User disconnected");
    });
});
server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
