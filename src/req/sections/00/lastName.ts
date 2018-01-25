import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $LastName extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Last Name:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Last Name",
            kind : CompletionItemKind.Function,
            documentation : "The last name of the patient.",
            insertText : "- Last Name: "
        };
    }
}