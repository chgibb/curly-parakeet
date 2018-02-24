let token = "";

export function getCurrentToken() : string
{
    return token;
}

export function setCurrentToken(newToken : string) : void
{
    console.log("set to");
    console.log(newToken);
    token = newToken;
}