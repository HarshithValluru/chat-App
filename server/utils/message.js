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
module.exports = {generateMessage, generateLocationMessage}