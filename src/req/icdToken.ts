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
/**
 * Base token class
 * 
 * @export
 * @class ICDGenericToken
 */
export class ICDGenericToken
{
    public regExp : RegExp;
    public tokenType : ICDTokenID;
}
/**
 * Base token attributes
 * 
 * @export
 * @class ICDAttributes
 * @extends {ICDGenericToken}
 */
export class ICDAttributes extends ICDGenericToken
{
    public description : string;
    public completionItem : ICDCompletionItem;
    public parent : ICDAttributes | undefined;
}

/**
 * Represents the beginning of an ICD section
 * 
 * @export
 * @class ICDSection
 * @extends {ICDAttributes}
 */
export class ICDSection extends ICDAttributes
{
    public childSections : Array<ICDSection>;
    public childItems : Array<ICDItem>;
    public items : Array<ICDItem>;

    public constructor(parent : ICDAttributes | undefined)
    {
        super();
        this.parent = parent;
        this.childSections = new Array<ICDSection>();
    }
}

/**
 * Represents an individual ICD code, contained within a section
 * 
 * @export
 * @class ICDItem
 * @extends {ICDAttributes}
 */
export class ICDItem extends ICDAttributes
{
    public rawCode : string;
    
    public constructor(parent : ICDAttributes | undefined)
    {
        super();
        this.parent = parent;
    }
}

/**
 * Start block declaration for beginning ICD sections
 * 
 * @export
 * @class Start
 * @extends {ICDGenericToken}
 */
export class Start extends ICDGenericToken
{
    public constructor()
    {
        super();
        this.regExp = /(Start)/;
        this.tokenType = "icd11.Start";
    }
}

/**
 * End block declaration for ending ICD sections
 * 
 * @export
 * @class End
 * @extends {ICDGenericToken}
 */
export class End extends ICDGenericToken
{
    public constructor()
    {
        super();
        this.regExp = /(End)/;
        this.tokenType = "icd11.End";
    }
}

/**
 * Trim off the Start block declaration from the given line
 * 
 * @export
 * @param {string} line 
 * @returns {string} 
 */
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

/**
 * Determine if the token in line exists in the AST layout given by rootLayout
 * 
 * @export
 * @param {(Array<ICDGenericToken | ICDSection>)} rootLayout 
 * @param {string} line 
 * @returns {(ICDSection | ICDItem | undefined)} 
 */
export function findTokenFromUnknownStart(
    rootLayout : Array<ICDGenericToken | ICDSection>,
    line : string
) : ICDSection | ICDItem | undefined {
    line = trimStartBlockDeclaration(line);
    for(let i = 0; i != rootLayout.length; ++i)
    {
        let res = findToken((<ICDSection>rootLayout[i]),line);

        if(res)
            return res;
    }
    return undefined;
}
/**
 * Determine if the token in line exists in the section start
 * 
 * @export
 * @param {ICDSection} start 
 * @param {string} line 
 * @returns {(ICDSection | ICDItem |undefined)} 
 */
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

/**
 * Find the parent section of the given line given by startLine in the document doc, using 
 * layout to validate possibilities
 * 
 * @export
 * @param {Array<string>} doc 
 * @param {number} startLine 
 * @param {(Array<ICDSection | ICDGenericToken>)} layout 
 * @returns {(ICDSection | undefined)} 
 */
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

            if(endBlocksEncountered == 0 && i != startLine)
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
