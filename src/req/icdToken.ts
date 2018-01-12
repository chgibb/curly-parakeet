/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDTokenID} from "./icdTokenID";

export interface ICDCompletionItem extends monaco.languages.CompletionItem
{

}

/**
 * This is copied directly from monaco's source to remove the explicit runtime dependency on the monaco API.
 * This will break if monaco changes it's equivalent enum
 * 
 * @export
 * @enum {number}
 */
export enum CompletionItemKind 
{
    Text = 0,
    Method = 1,
    Function = 2,
    Constructor = 3,
    Field = 4,
    Variable = 5,
    Class = 6
}

export class ICDGenericToken
{
    public regExp : RegExp;
    public tokenType : ICDTokenID;
}

class ICDAttributes extends ICDGenericToken
{
    public description : string;
    public completionItem : ICDCompletionItem;
}

export class ICDSection extends ICDAttributes
{
    public childSections : Array<ICDSection>;
    public childItems : Array<ICDItem>;
    public items : Array<ICDItem>;

    public constructor()
    {
        super();
        this.childSections = new Array<ICDSection>();
    }
}

export class ICDItem extends ICDAttributes
{
    public rawCode : string;
    
    public constructor()
    {
        super();
    }
}

export class Start extends ICDGenericToken
{
    public constructor()
    {
        super();
        this.regExp = /(Start)/;
        this.tokenType = "icd11.Start";
    }
}

export class End extends ICDGenericToken
{
    public constructor()
    {
        super();
        this.regExp = /(End)/;
        this.tokenType = "icd11.End";
    }
}

export function trimStartBlockDeclaration(line : string) : string
{
    line = line.trim();
    if(line == "Start")
        return line;
    if(
        line[line.length-1] == "t" && 
        line[line.length-2] == "r" &&
        line[line.length-3] == "a" &&
        line[line.length-4] == "t" &&
        line[line.length-5] == "S"
    )
        return line.substring(0,line.length-5).trim();
    return line;
}

export function findTokenFromUnknownStart(
    rootLayout : Array<ICDGenericToken | ICDSection>,
    line : string
) : ICDSection | ICDItem | undefined {
    line = trimStartBlockDeclaration(line);
    for(let i = 0; i != rootLayout.length; ++i)
    {
        //console.log(`passed`);
        //console.log(rootLayout[i]);
        //console.log(`got`);

        let res = findToken((<ICDSection>rootLayout[i]),line);
        //console.log(res)
        if(res)
            return res;
    }
    return undefined;
}

export function findToken(
    start : ICDSection,
    line : string
) : ICDSection | ICDItem |undefined
{
    let res : ICDSection | ICDItem | undefined = undefined;
    line = trimStartBlockDeclaration(line);
    if(start.regExp.test(line))
        return start;
    
    if(start.childItems)
    {
        for(let i = 0; i != start.childItems.length; ++i)
        {
            if(start.childItems[i].regExp.test(line))
                return start.childItems[i];
        }
    }

    if(start.childSections)
    {
        for(let i = 0; i != start.childSections.length; ++i)
        {
            res = findToken(start.childSections[i],line);
            if(res)
                return res;
            
        }
    }
    return res;
}

export function findParentSectionFromLinePosition(
    doc : Array<string>,
    startLine : number,
    layout : Array<ICDSection | ICDGenericToken>
) : ICDSection | undefined
{
    let startToken = new Start();
    let endToken = new End();

    let endBlocksEncountered = 0;
    try
    {
        for(let i = startLine; i > -1; --i)
        {
            if(endToken.regExp.test(doc[i]))
            {
                endBlocksEncountered++;
                continue;
            }

            if(startToken.regExp.test(doc[i]) && endBlocksEncountered > 0)
            {
                endBlocksEncountered--;
                if(endBlocksEncountered == 0)
                    continue;
            }

            if(endBlocksEncountered == 0)
            {
                let possible = findTokenFromUnknownStart(layout,doc[i]);
                if(possible)
                {
                    if(possible.tokenType == "icd11.SectionHeader" || possible.tokenType == "icd11.SectionTopHeader")
                    {
                        return (<ICDSection>possible);
                    }
                }
            }
        }
    }
    //we've probably walked off the top of the document
    catch(err){}
    return undefined;
}
