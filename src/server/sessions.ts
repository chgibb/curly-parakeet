const uuidv4 : () => string = require("uuid/v4");

export interface Session
{
    token : string;
    user : string;
}

let sessions : Array<Session> = new Array<Session>();

export function newSession(user : string) : string
{
    for(let i = 0; i != sessions.length; ++i)
    {
        if(sessions[i].user == user)
            return "";
    }

    let token = uuidv4();

    sessions.push({
        user : user,
        token : token
    });

    return token;
}

export function removeSession(token : string) : boolean
{
    for(let i = 0; i != sessions.length; ++i)
    {
        if(sessions[i].token == token)
        {
            sessions.splice(i,1);
            return true;
        }
    }

    return false;
}

export function getUserFromSession(token : string) : string
{
    for(let i = 0; i != sessions.length; ++i)
    {
        if(sessions[i].token == token)
        {
            return sessions[i].user;
        }
    }
    throw new Error("Session does not exist");
}