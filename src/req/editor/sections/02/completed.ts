import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $Completed extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Completed:)/;
        this.tokenType = "icd11.item";
        this.allowDuplicates = true;
        this.completionItem = {
            label : "Completed",
            kind : CompletionItemKind.Function,
            documentation : "Date the referral was completed",
            insertText : "- Completed: "
        }
    }
}