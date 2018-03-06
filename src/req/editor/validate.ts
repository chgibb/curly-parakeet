import {
    Start,
    End,
    ICDSection,
    ICDGenericToken,
    ICDCompletionItem,
    trimStartBlockDeclaration,
    findToken,
    findTokenFromUnknownStart,
    findParentSectionFromLinePosition,
    ICDItem,
    getUserValueOnItem
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
    UnKnownToken = 3,
    UnExpectedToken = 4,
    DuplicateToken = 5
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

            let section = findTokenFromUnknownStart(layout,lines[i]);

            //token does not exist anywhere in the expected AST layout
            if(!section)
            {
                return {
                    code : DocumentStatusCode.UnKnownToken,
                    more : `Unknown token "${trimStartBlockDeclaration(lines[i])}" at line ${i+1}`
                };
            }

            else if(section.tokenType != "icd11.Start" && section.tokenType != "icd11.End")
            {
                let parent = findParentSectionFromLinePosition(lines,i,layout);

                //chapter start nested inappropriately
                if(section.tokenType == "icd11.SectionTopHeader" && parent)
                {
                    return {
                        code : DocumentStatusCode.UnExpectedToken,
                        more : `at line ${i+1}: "${trimStartBlockDeclaration(lines[i])}" is the start of a chapter and cannot appear within another section`
                    }
                }

                if(parent && parent.completionItem.label != section.parent!.completionItem.label)
                {
                    return {
                        code : DocumentStatusCode.UnExpectedToken,
                        more : `Unexpected token "${trimStartBlockDeclaration(lines[i])}" at line ${i+1} in section "${section.completionItem.label}"`
                    }
                }
                else if(section.tokenType != "icd11.SectionTopHeader" && section.parent && !parent)
                {
                    return {
                        code : DocumentStatusCode.UnExpectedToken,
                        more : `at line ${i+1}: "${trimStartBlockDeclaration(lines[i])}" is not a chapter`
                    }
                }
                {
                    let found = 0;
                    for(let k = 0; k != lines.length; ++k)
                    {
                        if(section.regExp.test(lines[k].trim()))
                        {
                            found++;
                        }
                        if(found > 1)
                        {
                            return {
                                code : DocumentStatusCode.DuplicateToken,
                                more : `Duplicate token "${trimStartBlockDeclaration(lines[i])}" at line ${i+1}`
                            }
                        }
                    }
                }
            }
        }
    }

    return {
        code : DocumentStatusCode.Valid,
        more : "All good"
    };
}