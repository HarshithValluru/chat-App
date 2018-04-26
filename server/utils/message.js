const moment = require("moment");

var generateMessage = function(from, text) {
    return {
        from : from,
        text,
        createdAt : moment().valueOf()              //same as new Date().getTime()
    }
}
var generateLocationMessage = function(from, latitude, longitude){
    return {
        from,
        url : `https://www.google.com/maps/?q=${latitude},${longitude}`,
        createdAt : moment().valueOf()
    }
};
var capitalizeRoomName = function(roomName) {
    var splitRoomWords = roomName.toLowerCase().split(" ");
    for(var i=0;i<splitRoomWords.length;i++) 
        splitRoomWords[i] = splitRoomWords[i].charAt(0).toUpperCase() + splitRoomWords[i].substr(1);
    splitRoomWords = splitRoomWords.join(" ")
    return splitRoomWords;
};
module.exports = {generateMessage, generateLocationMessage, capitalizeRoomName}