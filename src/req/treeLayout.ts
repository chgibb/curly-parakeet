import {ICDTokenID} from "./icdTokenID";
import {ICDItem,ICDGenericToken,Start,End,ICDSection} from "./icdToken"
import {ZeroOne} from "./sections/01";
import {$02} from "./sections/02";

let tokenLayout : Array<ICDGenericToken | ICDSection>;

/**
 * Returns the valid AST layout for any given document
 * 
 * @export
 * @returns {(Array<ICDGenericToken | ICDSection>)} 
 */
export function getTokenLayout() : Array<ICDGenericToken | ICDSection>
{
    if(!tokenLayout)
    {
        tokenLayout = new Array<ICDGenericToken | ICDSection>();
        tokenLayout.push(new ZeroOne());
        tokenLayout.push(new $02());
        tokenLayout.push(new Start());
        tokenLayout.push(new End());
    }
    return tokenLayout;
}

/**
 * Flatten the given AST layout into tokens consumable by Monarch's themeing engine.
 * extended determines wether or not to extend the returned tokens with additional, 
 * non standard (and Monarch incompatible) indices
 * 
 * @export
 * @param {(Array<ICDGenericToken | ICDSection>)} layout 
 * @param {boolean} extended 
 * @returns {(Array<{[name : number] : RegExp | string}>)} 
 */
export function buildMonarchTokens(
    layout : Array<ICDGenericToken | ICDSection>,
    extended : boolean
) : Array<{[name : number] : RegExp | string}> {
    let res = new Array<{[name : number] : RegExp | string}>();
    
    for(let i = 0; i != layout.length; ++i)
    {
        getNestedMonarchTokens(layout[i],res,extended);
    }
    return res;
}

function getNestedMonarchTokens(
    start : ICDGenericToken | ICDSection,
    res : Array<{[name : number] : RegExp | string}>,
    extended : boolean
) : void {
    res.push([
        start.regExp,
        start.tokenType,
        extended ? ((<ICDSection>start).completionItem ?  (<ICDSection>start).completionItem.label : "") : ""
    ]);

    if((<ICDSection>start).childItems)
    {
        for(let i = 0; i != (<ICDSection>start).childItems.length; ++i)
        {
            res.push([
                (<ICDSection>start).childItems[i].regExp,
                (<ICDSection>start).childItems[i].tokenType,
                extended ? ((<ICDSection>start).completionItem ?  (<ICDSection>start).completionItem.label : "") : ""
            ]);
        }
    }

    if((<ICDSection>start).childSections)
    {
        for(let i = 0; i != (<ICDSection>start).childSections.length; ++i)
        {
            getNestedMonarchTokens((<ICDSection>start).childSections[i],res,extended);
        }
    }
}