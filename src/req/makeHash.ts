const sha256 = require("sha256");

export type Hash = string;

export function makeHash(input : any) : Hash
{
    return (<Hash>sha256(input));
}