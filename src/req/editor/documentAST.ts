import {
    ICDSection,
    ICDGenericToken,
    findTokenFromUnknownStart,
    ICDItem,
    getUserValueOnItem
} from "./icdToken";
import {getTokenLayout} from "./treeLayout";
import {ICDTokenID} from "./icdTokenID";

export function buildDocumentAST(doc : string) : Array<ICDGenericToken | ICDSection>
{
    let res : Array<ICDGenericToken | ICDSection> = new Array<ICDGenericToken | ICDSection>();
    let layout : Array<ICDGenericToken | ICDSection> = getTokenLayout();

    let lines = doc.split(/\r\n|\n\r|\n|\r/g);
    for(let i = 0; i != lines.length; ++i)
    {
        if(lines[i].trim().length == 0)
            continue;
        lines[i] = lines[i].trim();

        let token = findTokenFromUnknownStart(layout,lines[i]);

        if(token!.tokenType == "icd11.SectionTopHeader")
            res.push(copyAndStripChildren((<ICDSection>token)));
        
        else if(token!.tokenType == "icd11.SectionHeader")
        {
            let parent = (<ICDSection>findTokenFromUnknownStart(res,token!.parent!.completionItem.label));
            parent.childSections.push(copyAndStripChildren((<ICDSection>token)));
        }

        else if(token!.tokenType == "icd11.item")
        {
            let parent = (<ICDSection>findTokenFromUnknownStart(res,token!.parent!.completionItem.label));
            parent.childItems.push(copyToken((<ICDItem>token)));
            getUserValueOnItem(lines[i],(<ICDItem>parent.childItems[parent.childItems.length-1]));
            let refParent = (<ICDSection>findTokenFromUnknownStart(layout,token!.parent!.completionItem.label));
            if(parent.allowDuplicates && !parent.sealed && refParent.childItems.length == parent.childItems.length)
                parent.sealed = true;
        }
    }

    return res;
}

export function copyToken(token : ICDItem) : ICDItem
{
    let res = Object.assign<{},ICDItem>({},token);
    return res;
}

export function copyAndStripChildren(token : ICDSection) : ICDSection
{
    let res = Object.assign<{},ICDSection>({},token);
    res.childItems = new Array<ICDItem>();
    res.childSections = new Array<ICDSection>();
    return res;
}