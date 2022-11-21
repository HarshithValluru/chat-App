// check related server2.js file

const io = require("socket.io-client");
const socket = io("http://localhost:3002");

socket.on("Helloo", (args) => {
    console.log("hello world");
});

socket.emit("howdy", "stranger232");
