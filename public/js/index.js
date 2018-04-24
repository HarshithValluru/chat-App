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
    var formattedTime = moment(newMessage.createdAt).format("h:mm a");
    var template = jQuery("#message_template").html();
    var html = Mustache.render(template,{
        text : newMessage.text,
        from : newMessage.from,
        createdAt : formattedTime
    });
    jQuery("#messages").append(html);
});
socket.on("newLocationMessage",function(newLocationMessage) {
    var formattedTime = moment(newLocationMessage.createdAt).format("h:mm a");
    var template = jQuery("#location_message_template").html();
    var html = Mustache.render(template, {
        from : newLocationMessage.from,
        url : newLocationMessage.url,
        createdAt : formattedTime
    });
    jQuery("#messages").append(html);
    // var li = jQuery("<li></li>");
    // var a = jQuery("<a target='_blank'>My current location</a>");
    // li.text(`${newLocationMessage.from} ${formattedTime} : `);
    // a.attr("href",newLocationMessage.url);
    // li.append(a);
    // jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    var msgTxtBox = jQuery("[name=message]");
    socket.emit("createMessage",{
        from : "Harshith",
        text : msgTxtBox.val()
    }, function() {
        msgTxtBox.val("");
        console.log("Got it from server..");
    });
});

var locButton = jQuery("#send-location");
locButton.on("click",function() {
    if(!navigator.geolocation)
        return alert("Geolocation is not supported by your browser..")
    locButton.attr("disabled","disabled").text("Sending location..");
    navigator.geolocation.getCurrentPosition(function(position){
        locButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
        console.log(position);
    }, function() {
        locButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location..");
    });
});