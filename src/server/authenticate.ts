const uuidv4 : () => string = require("uuid/v4");

import {Hash} from "./../req/makeHash";
import {find,write} from "./store/store";

interface User
{
    userName : string;
    password : Hash;
    email : string;
    id : string;
}

interface AuthToken
{
    userID : string;
    token : string;
}

let authTokens : Array<AuthToken> = new Array<AuthToken>();

export function getIDFromToken(token : string) : string
{
    for(let i = 0; i != authTokens.length; ++i)
    {
        if(authTokens[i].token == token)
            return authTokens[i].userID;
    }
    
    return "";
}

let usersDB = "db/users.json";

export function authenticate(user : string,password : Hash) : Promise<string>
{
    return new Promise<string>(async (resolve,reject) => {
        let res = await find<User>(usersDB,function(item : User){
            if(item.userName == user && item.password == password)
                return true;
            return false;
        });

        if(res)
        {
            let token = uuidv4();
            authTokens.push({
                userID : res.item.id,
                token : token
            });
            return resolve(token);
        }

        return resolve("");
    });
}

export function newUser(user : string,password : Hash) : Promise<boolean>
{
    return new Promise<boolean>(async (resolve,reject) => {
        let res = await find<User>(usersDB,function(item : User){
            if(item.userName == user)
                return true;
            return false;
        });
 
        if(res)
        {
            return resolve(false);
        }

        else
        {
            return write<User>(usersDB,{
                userName : user,
                password : password,
                email : "",
                id : uuidv4()
            });
        }
    });
}