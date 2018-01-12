import {ICDTokenID} from "./icdTokenID";
import {ICDItem,ICDGenericToken,Start,End,ICDSection} from "./icdToken"
import {ZeroOne} from "./sections/01";

let tokenLayout : Array<ICDGenericToken | ICDSection>;

export function getTokenLayout() : Array<ICDGenericToken | ICDSection>
{
    if(!tokenLayout)
    {
        tokenLayout = new Array<ICDGenericToken | ICDSection>();
        tokenLayout.push(new ZeroOne());
        tokenLayout.push(new Start());
        tokenLayout.push(new End());
    }
    return tokenLayout;
}

export function buildMonarchTokens(
    layout : Array<ICDGenericToken | ICDSection>
) : Array<{[name : number] : RegExp | string}> {
    let res = new Array<{[name : number] : RegExp | string}>();
    
    for(let i = 0; i != layout.length; ++i)
    {
        getNestedMonarchTokens(layout[i],res);
    }
    return res;
}

function getNestedMonarchTokens(
    start : ICDGenericToken | ICDSection,
    res : Array<{[name : number] : RegExp | string}>
) : void {
    res.push([start.regExp,start.tokenType]);

    if((<ICDSection>start).childItems)
    {
        for(let i = 0; i != (<ICDSection>start).childItems.length; ++i)
        {
            res.push([(<ICDSection>start).childItems[i].regExp,(<ICDSection>start).childItems[i].tokenType]);
        }
    }

    if((<ICDSection>start).childSections)
    {
        for(let i = 0; i != (<ICDSection>start).childSections.length; ++i)
        {
            getNestedMonarchTokens((<ICDSection>start).childSections[i],res);
        }
    }
}