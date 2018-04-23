const expect = require("expect");
var {generateMessage} = require("./message");

describe("Generate Message",()=>{
    it("should generate correct message object",(done)=>{
        var from = "Admin";
        var text = "Welcome to Chat-Application";
        var message = generateMessage(from,text);
        expect(message.from).toBe("Admin");
        expect(message).toMatchObject({from,text});
        done();
    });
});