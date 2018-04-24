var moment = require("moment");

//var date = moment();
// Go through this : http://momentjs.com/docs/#/displaying/format/ 

//console.log(date.format("MMM-Do YYYY"));

//console.log(date.format("H:mm a"));
var someTimeStamp = new Date().getTime();
console.log(someTimeStamp);

var someTimeStamp1 = moment().valueOf();
console.log(someTimeStamp1);

var createdAt = 1234;
var date = moment(someTimeStamp);
console.log(date.format("h:mm a"));