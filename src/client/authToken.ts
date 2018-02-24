let token = "";

export function getCurrentToken() : string
{
    return token;
}

export function setCurrentToken(newToken : string) : void
{
    token = newToken;
}