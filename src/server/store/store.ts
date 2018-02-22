import * as fs from "fs";
import * as path from "path";

const mkdirp = require("mkdirp");

import {makeHash} from "./../../req/makeHash";

interface Record<T>
{
    id : string;
    item : T;
}

export function find<T>(storePath : string,comp : (item : T) => boolean) : Promise<T | undefined>
{
    return new Promise<T | undefined>((resolve,reject) => {
        if(!fs.existsSync(storePath))
            return resolve(undefined);
    });
}

export function write<T>(storePath : string,item : T) : boolean
{
    let components : path.ParsedPath = path.parse(storePath);
    mkdirp.sync(components.dir);

    if(!fs.existsSync(storePath))
    {
        try
        {
            let store : Array<Record<T>> = new Array<Record<T>>();
            store.push(<Record<T>>{
                id : makeHash(JSON.stringify(item)),
                item : item
            });

            fs.writeFileSync(storePath,JSON.stringify(store));

        }
        catch(err)
        {
            return false;
        }

        return true;
    }

    try
    {
        let store : Array<Record<T>> = JSON.parse(fs.readFileSync(storePath).toString());

        let itemID = makeHash(JSON.stringify(item));

        for(let i = 0; i != store.length; ++i)
        {
            if(store[i].id == itemID)
            {
                store[i].item = item;
                break;
            }
        }

        fs.writeFileSync(storePath,JSON.stringify(store));
    }
    catch(err)
    {
        return false;
    }

    return true;
}