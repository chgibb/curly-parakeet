import {Start,End,ICDSection,ICDGenericToken,ICDCompletionItem} from "./icdToken";
import {buildTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";

let startToken : Start;
let endToken : End;
let layout : Array<ICDGenericToken | ICDSection>;
export function autoComplete(text : string): Array<ICDCompletionItem> | void
{
    let res : Array<ICDCompletionItem> = new Array<ICDCompletionItem>();
    if(!startToken)
        startToken = new Start();
    if(!endToken)
        endToken = new End();
    if(!layout)
        layout  = buildTokenLayout();
    let lines = text.split(/\n/);
    console.log(lines);
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
                        console.log(`inside ${topHeader.completionItem.label}`);
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
            console.log(`topHeader is not null`);
            let closestHeader : ICDSection | undefined = undefined;
            for(let i = 0; i != lines.length; ++i)
            {
                console.log(`inspecting ${lines[i]}`);
                if(endToken.regExp.test(lines[i]))
                {
                    while(i != lines.length)
                    {
                        if(startToken.regExp.test(lines[i]))
                        {
                            console.log(`ended at ${lines[i]}`);
                            closestHeader = undefined;
                            break;
                        }
                        i++;
                    }
                    console.log(`walked up to ${lines[i]}`);
                    continue;
                }
                if(closestHeader)
                {
                    break;
                }
                else
                {
                    closestHeader = findHeader(topHeader,lines[i]);
                    console.log(`method returned`);
                    console.log(closestHeader);
                    if(closestHeader)
                        break;
                }
            }
            if(closestHeader)
            {
                for(let k = 0; k != closestHeader.childSections.length; ++k)
                {
                    res.push(closestHeader.childSections[k].completionItem);
                }
                if(closestHeader.childItems)
                {
                    for(let k = 0; k != closestHeader.childItems.length; ++k)
                    {
                        res.push(closestHeader.childItems[k].completionItem);
                    }
                }
            }
        }
        
    }
    return res;
}

function findHeader(start : ICDSection,line : string) : ICDSection | undefined
{
    let res : ICDSection | undefined;
    if(start.regExp.test(line))
        return start;
    if(start.childSections)
    {
        for(let i = 0; i != start.childSections.length; ++i)
        {
            res = findHeader(start.childSections[i],line);
            if(res)
                return res;
            
        }
    }
    return res;
}