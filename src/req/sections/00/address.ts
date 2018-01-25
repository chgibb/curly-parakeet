import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $Address extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Address:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Address",
            kind : CompletionItemKind.Function,
            documentation : "The address of the patient.",
            insertText : "- Address: "
        };
    }
}