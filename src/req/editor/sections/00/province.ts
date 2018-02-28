import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $Province extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Province:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Province",
            kind : CompletionItemKind.Function,
            documentation : "The province the patient lives in.",
            insertText : "- Province: "
        };
    }
}