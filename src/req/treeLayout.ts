/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDTokenID} from "./icdTokenID";
import {ICDItem, ICDGenericToken, Start, End, ICDSection} from "./icdToken"
import {ZeroOne} from "./sections/01";

export function buildTokenLayout() : Array<ICDGenericToken | ICDSection>
{
    let res : Array<ICDGenericToken | ICDSection> = new Array<ICDGenericToken | ICDSection>();

        res.push(new Start());
        res.push(new End());
        res.push(new ZeroOne());

    return res;
}

export function buildMonarchRootTokens(
    layout : Array<ICDGenericToken | ICDSection>
) : Array<{[name:number]:RegExp|string}> {
    let res = new Array<{[name:number]:RegExp|string}>();
    
    for(let i = 0; i != layout.length; ++i)
    {
        res.push([layout[i].regExp,layout[i].tokenType]);
    }

    return res;
}