const expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message");

describe("Generate Message",()=>{
    it("should generate correct message object",()=>{
        var from = "Admin";
        var text = "Welcome to Chat-Application";
        var message = generateMessage(from,text);
        expect(message.from).toBe("Admin");
        expect(message).toMatchObject({from,text});
        //done();
    });
});

describe("Generate Location Message",()=>{
    it("should generate current location object",()=>{
        var from = "User";
        var latitude = "1";
        var longitude = "1";
        var url = "https://www.google.com/maps/?q=1,1";
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.from).toBe("User");
        expect(message).toMatchObject({from,url});
    });
});