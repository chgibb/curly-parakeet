import {
    Start,
    End,
    ICDSection,
    ICDGenericToken,
    ICDCompletionItem,
    findToken,
    findTokenFromUnknownStart
} from "./icdToken";
import {buildTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";

let startToken : Start;
let endToken : End;
let layout : Array<ICDGenericToken | ICDSection>;

export enum DocumentStatusCode
{
    Valid = "All good",
    NoInput = "Document Empty",
    UnBalanced = "Unbalanced Start and End declarations",
    UnKnownToken = "Unknown token"
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
        return {
            code : DocumentStatusCode.UnBalanced,
            more : ""
        };
    
    if(text.trim().length == 0)
        return {
            code : DocumentStatusCode.NoInput,
            more : ""
        };
    
    else
    {
        for(let i = 0; i != lines.length; ++i)
        {
            let section = findTokenFromUnknownStart(layout,lines[i])
            console.log(section);
            if(!section)
            {
                return {
                    code : DocumentStatusCode.UnKnownToken,
                    more : `${lines[i]} at line ${i}`
                };
            }
        }
    }

    return {
        code : DocumentStatusCode.Valid,
        more : ""
    };
}