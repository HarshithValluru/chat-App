const expect = require("expect");
const {Users} = require("./users");

describe("Users",()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id : 1,
            name : "Ram",
            room : "Node Course"
        },{
            id : 2,
            name : "Harshith",
            room : "Jsp Course"
        },{
            id : 3,
            name : "Valluru",
            room : "Node Course"
        }]
    });

    it("Should add a new user",()=>{
        var users = new Users();
        var res = users.addUser(12,"Ram","Node");
        expect(users.users).toEqual([res]);
    });

    it("Should remove a user",()=>{
        var user = users.removeUser(1);
        expect(user.id).toBe(1);
        expect(users.users.length).toBe(2);
    });
    it("Should not remove a user",()=>{
        var user = users.removeUser(5);
        expect(user).not.toBeTruthy();
        expect(users.users.length).toBe(3);
    });

    it("Should find user",()=>{
        var user = users.getUser(1);
        expect(user.id).toBe(1);
    });
    it("Should not find user",()=>{
        var user = users.getUser(4);
        expect(user).not.toBeTruthy();
    });

    it("Should return names for NODE COURSE",()=>{
        var userList = users.getUsersList("Node Course");
        expect(userList).toEqual(["Ram","Valluru"]);
    });

    it("Should return names for JSP COURSE",()=>{
        var userList = users.getUsersList("Jsp Course");
        expect(userList).toEqual(["Harshith"]);
    });

});