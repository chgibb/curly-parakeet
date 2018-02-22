import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $DateofBirth extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Date of Birth:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Date of Birth",
            kind : CompletionItemKind.Function,
            documentation : "The date of birth of the patient.",
            insertText : "- Date of Birth: "
        };
    }
}