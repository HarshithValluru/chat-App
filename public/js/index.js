var socket = io();

//Since Arrow functions may not wrk properly in browsers other than Chrome i.e: Client side.
//They can be used at server side.
socket.on("connect",function() {
    console.log("Connected to Server..");

    // socket.emit("createMessage",{
    //     to : "harshith",
    //     text : "Hello Buddi baabu !!"
    // });
});
socket.on("disconnect",function() {
    console.log("Disconnected from the Server..");
});
socket.on("newMessage",function(newMessage) {
    console.log("New Message..",newMessage);
});