import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $FirstName extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(First Name:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "First Name",
            kind : CompletionItemKind.Function,
            documentation : "The name of the patient.",
            insertText : "- First Name: "
        };
    }
}