// check related public/client.js file

const server = require("http").createServer(require("express")());
var io = require("socket.io")(server);
server.listen(3002, ()=>{
    console.log(`Server is up on port 3002`);
});

io.on("connection", (socket) => {
    console.log("connection started");
    socket.emit("Helloo", "world");

    socket.on("howdy", (args) => {
        console.log("args received:", args);
    });
});