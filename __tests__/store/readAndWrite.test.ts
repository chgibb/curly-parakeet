import {find,write} from "./../../src/server/store/store";
import {makeHash,Hash} from "./../../src/req/makeHash";

beforeAll(() => {

});

afterAll(() => {

});

interface User
{
    userName : string;
    password : Hash;
}

it(`should be undefined`,async () => {
    
    let user = await find<User>("db/users.json",function(item : User){
        if(item.userName == "test")
            return true;
        return false;
    });
    expect(user).toBeUndefined();
});

it(`should be true`,() => {
    let user : User = <User>{
        userName : "test",
        password : makeHash("password")
    };

    expect(write("db/users.json",user)).toBe(true);
    
});