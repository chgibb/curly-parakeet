import {find,write, writeRecord} from "./../../src/server/store/store";
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

let user : User = <User>{
    userName : "test",
    password : makeHash("password")
};

it(`should be undefined`,async () => {
    
    let user = await find<User>("rwTest/users.json",function(item : User){
        if(item.userName == "test")
            return true;
        return false;
    });
    expect(user).toBeUndefined();
});

it(`should be true`,() => {

    expect(write("rwTest/users.json",user)).toBe(true);
    
});

it(`should be able to find user`,async () => {
    let user = await find<User>("rwTest/users.json",function(item : User){
        if(item.userName == "test")
            return true;
        return false;
    });

    expect(user!.item.userName).toBe("test");
});

for(let i = 0; i != 150; ++i)
{
    it(`should be able to bulk read and write ${i}`,async () => {
        let bulkUser : User = <User>{
            userName : `test${i}`,
            password : makeHash("password")
        };

        expect(write("rwTest/users.json",bulkUser)).toBe(true);

        let res = await find<User>("rwTest/users.json",function(item : User){
            if(item.userName == `test${i}`)
                return true;
            return false;
        });

        expect(res!.item.userName).toBe(`test${i}`);
    });
}

for(let i = 0; i != 150; ++i)
{
    it(`should be able to bulk update ${i}`,async () => {
        let res = await find<User>("rwTest/users.json",function(item : User){
            if(item.userName == `test${i}`)
                return true;
            return false;
        });

        expect(res!.item.userName).toBe(`test${i}`);
        expect(res!.item.password).toBe(makeHash("password"));

        res!.item.password = makeHash("newpassword");

        expect(writeRecord("rwTest/users.json",res!)).toBe(true);

        res = await find<User>("rwTest/users.json",function(item : User){
            if(item.userName == `test${i}`)
                return true;
            return false;
        });

        expect(res!.item.userName).toBe(`test${i}`);
        expect(res!.item.password).toBe(makeHash("newpassword"));

    });
}