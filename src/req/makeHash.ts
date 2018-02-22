const sha256 = require("sha256");

export function makeHash(input : any) : string
{
    return (<string>sha256(input));
}