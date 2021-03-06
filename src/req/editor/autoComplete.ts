import {
    Start,
    End,
    ICDSection,
    ICDGenericToken,
    ICDCompletionItem,
    findToken,
    ICDItem,
    findParentSectionFromLinePosition,
    Now,
    Today
} from "./icdToken";
import {getTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";

let startToken : Start;
let endToken : End;
let nowToken : Now;
let todaytoken : Today;

/**
 * Returns an array of auto completion items for the given text snippet.
 * text does not have to be a fully completed and validated document
 * 
 * @export
 * @param {string} text 
 * @returns {(Array<ICDCompletionItem> | void)} 
 */
export function autoComplete(text : string): Array<ICDCompletionItem> | void
{
    //console.log(`input string: "${text}"`);
    let res : Array<ICDCompletionItem> = new Array<ICDCompletionItem>();
    
    if(!startToken)
        startToken = new Start();
    if(!endToken)
        endToken = new End();
    if(!nowToken)
        nowToken = new Now();
    if(!todaytoken)
        todaytoken = new Today();

    let layout : Array<ICDGenericToken | ICDSection> = getTokenLayout();

    let lines = text.split(/\r\n|\n\r|\n|\r/g);

    //insert helpers
    if(nowToken.regExp.test(lines[lines.length-1]))
    {
        res.push(nowToken.completionItem);
    }

    if(todaytoken.regExp.test(lines[lines.length-1]))
    {
        res.push(todaytoken.completionItem);
    }

    if(res.length != 0)
        return res;

    let starts = 0;
    let ends = 0;
    for(let i = 0; i != lines.length; ++i) 
    {
        if (startToken.regExp.test(lines[i]))
            starts++;
        else if (endToken.regExp.test(lines[i]))
            ends++;
    }

    

    //autocomplete top headers
    if(starts == 0 && ends == 0 || starts == ends) 
    {
        for(let i = 0; i != layout.length; ++i)
        {
            if(layout[i].tokenType == "icd11.SectionTopHeader")
            {
                res.push((<ICDSection>layout[i]).completionItem);
            }
        }
        return res;
    }

    else
    {
        let closestHeader = findParentSectionFromLinePosition(lines,lines.length-1,getTokenLayout());
        if(closestHeader)
        {
            for(let k = 0; k != (<ICDSection>closestHeader).childSections.length; ++k)
            {
                res.push((<ICDSection>closestHeader).childSections[k].completionItem);
            }
            if((<ICDSection>closestHeader).childItems)
            {
                for(let k = 0; k != (<ICDSection>closestHeader).childItems.length; ++k)
                {
                    res.push((<ICDSection>closestHeader).childItems[k].completionItem);
                }
            }
        }
    }
    return res;
}

