import {
    Start,
    End,
    ICDSection,
    ICDGenericToken,
    ICDCompletionItem,
    trimStartBlockDeclaration,
    findToken,
    findTokenFromUnknownStart
} from "./icdToken";
import {getTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";

let startToken : Start;
let endToken : End;

export enum DocumentStatusCode
{
    Valid = 0,
    NoInput = 1,
    UnBalanced = 2,
    UnKnownToken = 3
}

export interface DocumentStatus
{
    code : DocumentStatusCode;
    more : string;
}

export function validate(text : string) : DocumentStatus
{
    if(!startToken)
        startToken = new Start();
    if(!endToken)
        endToken = new End();
    let layout : Array<ICDGenericToken | ICDSection> = getTokenLayout();
    
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
        return {
            code : DocumentStatusCode.UnBalanced,
            more : "Unbalanced Start and End declarations"
        };
    
    if(text.trim().length == 0)
        return {
            code : DocumentStatusCode.NoInput,
            more : "Document Empty"
        };
    
    else
    {
        for(let i = 0; i != lines.length; ++i)
        {
            if(lines[i].trim().length == 0)
                continue;
            lines[i] = lines[i].trim();
            console.log(lines[i]);
            let section = findTokenFromUnknownStart(layout,lines[i])
            console.log(section);
            if(!section)
            {
                return {
                    code : DocumentStatusCode.UnKnownToken,
                    more : `Unknown token "${trimStartBlockDeclaration(lines[i])}" at line ${i+1}`
                };
            }
        }
    }

    return {
        code : DocumentStatusCode.Valid,
        more : "All good"
    };
}