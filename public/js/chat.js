//Since Arrow functions may not wrk properly in browsers other than Chrome i.e: Client side.
//They can be used at server side.
var socket = io();

function scrollToBottom() {
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");

    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight  >= scrollHeight)
        messages.scrollTop(scrollHeight);
};

socket.on("connect",function() {
    console.log("Connected to Server..");
    var params = jQuery.deparam(window.location.search);
    document.getElementById("loggedUser").innerHTML=params.name;
    if(params.availRooms === "None")
        params.room = params.newRoom;
    else
        params.room = params.availRooms;
    socket.emit("join", params, function(err) {
        if(err){
            alert(err)
            window.location.href = "/";
        }
    });
});

socket.on("updateUserList", function(users) {
    jQuery("#users").html("");
    users.forEach((user) => {
        var template = jQuery("#users_template").html();
        var html = Mustache.render(template, {
            user : user
        });
        jQuery("#users").append(html);
    });
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
    scrollToBottom();
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
    scrollToBottom();
});

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    var msgTxtBox = jQuery("[name=message]");
    socket.emit("createMessage",{
        //from : "Harshith",
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

socket.on("disconnect",function() {
    console.log("Disconnected from the Server..");
});
//$(function() {
  // Initializes and creates emoji set from sprite sheet
  window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: './../img/',
    popupButtonClasses: 'fa fa-smile-o'
  });
  // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
  // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
  // It can be called as many times as necessary; previously converted input fields will not be converted again
  window.emojiPicker.discover();
//});