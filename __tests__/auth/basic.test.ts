import {authenticate,getIDFromToken,newUser,User} from "./../../src/server/authenticate";
import {find,write} from "./../../src/server/store/store";
import {makeHash,Hash} from "./../../src/req/makeHash";

it(`should create new user`,async() => {
    let res = await newUser("testUser","password");

    expect(res).toBe(true);
});

it(`should be able to find created user`,async () => {
    let record = await find<User>("db/users.json",function(item : User){
        if(item.userName == "testUser" && item.password == makeHash("password"))
            return true;
        return false;
    });

    expect(record).toBeDefined();
    expect(record!.item.userName).toBe("testUser");
    expect(record!.item.password).toBe(makeHash("password"));
});