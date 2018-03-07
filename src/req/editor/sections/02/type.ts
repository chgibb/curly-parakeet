import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $Type extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Type:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Type",
            kind : CompletionItemKind.Function,
            documentation : "The kind of referral being made",
            insertText : "- Type: "
        }

    }
}