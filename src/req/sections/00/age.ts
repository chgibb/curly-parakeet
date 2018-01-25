import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $Age extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Age:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Age",
            kind : CompletionItemKind.Function,
            documentation : "The age of the patient.",
            insertText : "- Age: "
        };
    }
}