import * as fs from "fs";
import * as path from "path";

const mkdirp = require("mkdirp");

import {makeHash} from "./../../req/makeHash";

interface Record<T>
{
    id : string;
    item : T;
}

export function find<T>(storePath : string,comp : (item : T) => boolean) : Promise<Record<T> | undefined>
{
    return new Promise<Record<T> | undefined>((resolve,reject) => {
        if(!fs.existsSync(storePath))
            return resolve(undefined);

        try
        {
            let store : Array<Record<T>> = JSON.parse(fs.readFileSync(storePath).toString());

            for(let i = 0 ; i != store.length; ++i)
            {
                let res = comp(store[i].item);
                if(res)
                    resolve(store[i]);
            }

        }
        catch(err)
        {
            resolve(undefined);
        }

        resolve(undefined);
    });
}

export function writeRecord<T>(storePath : string,record : Record<T>) : boolean
{
    let components : path.ParsedPath = path.parse(storePath);

    if(!fs.existsSync(storePath))
    {
        try
        {
            mkdirp.sync(components.dir);
            let store : Array<Record<T>> = new Array<Record<T>>();
            store.push(<Record<T>>{
                id : makeHash(JSON.stringify(record.item)),
                item : record.item
            });

            fs.writeFileSync(storePath,JSON.stringify(store));

        }
        catch(err)
        {
            return false;
        }

        return true;
    }

    let updatedRecord = false;
    try
    {
        let store : Array<Record<T>> = JSON.parse(fs.readFileSync(storePath).toString());

        for(let i = 0; i != store.length; ++i)
        {
            if(store[i].id == record.id)
            {
                store[i].id = makeHash(JSON.stringify(record.item));
                store[i].item = record.item;
                updatedRecord = true;
                break;
            }
        }
        fs.writeFileSync(storePath,JSON.stringify(store));
    }
    catch(err)
    {
        return false;
    }

    return updatedRecord;
}

export function write<T>(storePath : string,item : T) : boolean
{
    let components : path.ParsedPath = path.parse(storePath);

    if(!fs.existsSync(storePath))
    {
        try
        {
            mkdirp.sync(components.dir);
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