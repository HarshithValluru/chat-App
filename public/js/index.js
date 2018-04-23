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

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage",{
        from : "Harshith",
        text : jQuery("[name=message]").val()
    }, function() {
        console.log("Got it from server..");
    });
});

var locButton = jQuery("#send-location");
locButton.on("click",function() {
    if(!navigator.geolocation)
        return alert("Geolocation is not supported by your browser..")
    navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    }, function() {
        alert("Unable to fetch location..");
    });
});