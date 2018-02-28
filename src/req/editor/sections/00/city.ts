import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $City extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(City:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "City",
            kind : CompletionItemKind.Function,
            documentation : "The city the patient lives in.",
            insertText : "- City: "
        };
    }
}