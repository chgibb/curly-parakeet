import {
    Start,
    End,
    ICDSection,
    ICDGenericToken,
    ICDCompletionItem,
    findToken,
    ICDItem
} from "./icdToken";
import {getTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";

let startToken : Start;
let endToken : End;

export function autoComplete(text : string): Array<ICDCompletionItem> | void
{
    //console.log(`input string: "${text}"`);
    let res : Array<ICDCompletionItem> = new Array<ICDCompletionItem>();
    if(!startToken)
        startToken = new Start();
    if(!endToken)
        endToken = new End();

    let layout : Array<ICDGenericToken | ICDSection> = getTokenLayout();

    let lines = text.split(/\r\n|\n\r|\n|\r/g);
    //console.log(lines);
    let starts = 0;
    let ends = 0;
    for(let i = 0; i != lines.length; ++i) 
    {
        if (startToken.regExp.test(lines[i]))
            starts++;
        else if (endToken.regExp.test(lines[i]))
            ends++;
    }
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
        lines = lines.reverse();
        let topHeader : ICDSection;
        for(let i = 0; i != lines.length; ++i)
        {
            for(let k = 0; k != layout.length; ++k)
            {
                if(layout[k].tokenType == "icd11.SectionTopHeader")
                {
                    if(layout[k].regExp.test(lines[i]))
                    {
                        topHeader = layout[k] as ICDSection;
                        //console.log(`inside ${topHeader.completionItem.label}`);
                        break;
                    }
                }
            }
            if(topHeader!)
                break;
        }
        if(!topHeader)
            return;
        else
        {
            //console.log(`topHeader is not null`);
            let endBlocksEncountered = 0;
            let closestHeader : ICDSection | ICDItem | undefined = undefined;
            for(let i = 0; i != lines.length; ++i)
            {
                //console.log(`inspecting "${lines[i]}"`);
                if(endToken.regExp.test(lines[i]))
                {
                    endBlocksEncountered++;
                    if(endBlocksEncountered > starts)
                    {
                        return;
                    }
                    i++;
                    while(i != lines.length)
                    {
                        if(startToken.regExp.test(lines[i]))
                        {
                            endBlocksEncountered--;
                            if(endBlocksEncountered == 0)
                            {
                                //console.log(`ended at ${lines[i]}`);
                                closestHeader = undefined;
                                break;
                            }
                        }
                        if(endToken.regExp.test(lines[i]))
                            endBlocksEncountered++;
                        i++;
                    }
                    //console.log(`walked up to ${lines[i]}`);
                    continue;
                }
                if(closestHeader)
                {
                    break;
                }
                else
                {
                    closestHeader = findToken(topHeader,lines[i]);
                    //console.log(`method returned`);
                    //console.log(closestHeader);
                    if(closestHeader)
                        break;
                }
            }
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
        
    }
    return res;
}

