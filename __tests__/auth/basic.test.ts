import {authenticate,getIDFromToken,newUser,User} from "./../../src/server/authenticate";
import {find,write} from "./../../src/server/store/store";
import {makeHash,Hash} from "./../../src/req/makeHash";

it(`should create new user`,async() => {
    let res = await newUser(`testUser`,makeHash("password"));

    expect(res).toBe(true);
});

it(`should be able to find created user`,async () => {
    let record = await find<User>("db/users.json",function(item : User){
        if(item.userName == `testUser` && item.password == makeHash("password"))
            return true;
        return false;
    });

    expect(record).toBeDefined();
    expect(record!.item.userName).toBe(`testUser`);
    expect(record!.item.password).toBe(makeHash("password"));
});

it(`should be able to auth user`,async () => {
    let res = await authenticate(`testUser`,makeHash("password"));

    expect(res).toBeTruthy();

    let record = await find<User>("db/users.json",function(item : User){
        if(item.userName == `testUser` && item.password == makeHash("password"))
            return true;
        return false;
    });

    let id = getIDFromToken(res);

    expect(id).toEqual(record!.item.id);
});

for(let i = 0; i != 150; ++i)
{
    it(`should create new user ${i}`,async() => {
        let res = await newUser(`testUser${i}`,makeHash("password"));
    
        expect(res).toBe(true);
    });
    
    it(`should be able to find created user ${i}`,async () => {
        let record = await find<User>("db/users.json",function(item : User){
            if(item.userName == `testUser${i}` && item.password == makeHash("password"))
                return true;
            return false;
        });
    
        expect(record).toBeDefined();
        expect(record!.item.userName).toBe(`testUser${i}`);
        expect(record!.item.password).toBe(makeHash("password"));
    });
    
    it(`should be able to auth user ${i}`,async () => {
        let res = await authenticate(`testUser${i}`,makeHash("password"));
    
        expect(res).toBeTruthy();
    
        let record = await find<User>("db/users.json",function(item : User){
            if(item.userName == `testUser${i}` && item.password == makeHash("password"))
                return true;
            return false;
        });
    
        let id = getIDFromToken(res);
    
        expect(id).toEqual(record!.item.id);
    });
}