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
    ICDItem
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
        }
    }

    return res;
}

function copyToken(token : ICDItem) : ICDItem
{
    let res = Object.assign<{},ICDItem>({},token);
    return res;
}

function copyAndStripChildren(token : ICDSection) : ICDSection
{
    let res = Object.assign<{},ICDSection>({},token);
    res.childItems = new Array<ICDItem>();
    res.childSections = new Array<ICDSection>();
    return res;
}