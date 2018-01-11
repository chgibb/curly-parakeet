import {
    Start,
    End,
    ICDSection,
    ICDGenericToken,
    ICDCompletionItem,
    findSectionHeader
} from "./icdToken";
import {buildTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";
import { start } from "repl";

let startToken : Start;
let endToken : End;
let layout : Array<ICDGenericToken | ICDSection>;

export enum DocumentStatus
{
    Valid = "All good",
    NoInput = "Document Empty",
    UnBalanced = "Unbalanced Start and End declarations",
}

export function validate(text : string) : DocumentStatus
{
    if(!startToken)
        startToken = new Start();
    if(!endToken)
        endToken = new End();
    if(!layout)
        layout  = buildTokenLayout();
    
    let lines = text.split(/\r\n|\n\r|\n|\r/g);

    let starts = 0;
    let ends = 0;
    for(let i = 0; i != lines.length; ++i) 
    {
        if (startToken.regExp.test(lines[i]))
            starts++;
        else if (endToken.regExp.test(lines[i]))
            ends++;
    }

    if(starts != ends)
        return DocumentStatus.UnBalanced;
    
    if(text.trim().length == 0)
        return DocumentStatus.NoInput;
    
    else
    {

    }

    return DocumentStatus.Valid;
}