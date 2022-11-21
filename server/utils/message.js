// import moment from "moment";
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
}
var capitalizeRoomName = function(roomName) {
    var splitRoomWordsArr = roomName.toLowerCase().split(" ");
    for(var i=0;i<splitRoomWordsArr.length;i++) 
    splitRoomWordsArr[i] = splitRoomWordsArr[i].charAt(0).toUpperCase() + splitRoomWordsArr[i].substr(1);
    return splitRoomWordsArr.join(" ");
}

// export default {generateMessage, generateLocationMessage, capitalizeRoomName}
module.exports = {generateMessage, generateLocationMessage, capitalizeRoomName}