var socket = io();

//Since Arrow functions may not wrk properly in browsers other than Chrome i.e: Client side.
//They can be used at server side.
socket.on("connect",function() {
    console.log("Connected to Server..");
});
socket.on("disconnect",function() {
    console.log("Disconnected from the Server..");
});
socket.on("newMessage",function(newMessage) {
    console.log("New Message..",newMessage);
    var li = jQuery("<li></li>");       //creates an li element
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery("#messages").append(li);
});

// socket.emit("createMessage",{
//     from : "Ram",
//     text : "Hello ALL.."
// }, function(data) {
//     console.log("Got it..",data);
// });

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage",{
        from : "Harshith",
        text : jQuery("[name=message]").val()
    }, function() {
        console.log("Got it from server..");
    });
});
