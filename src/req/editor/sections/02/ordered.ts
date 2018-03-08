import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $Ordered extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Ordered:)/;
        this.tokenType = "icd11.item",
        this.allowDuplicates = true;
        this.completionItem = {
            label : "Ordered",
            kind : CompletionItemKind.Function,
            documentation : "Date the referral was ordered",
            insertText : "- Ordered: "
        }
    }
}