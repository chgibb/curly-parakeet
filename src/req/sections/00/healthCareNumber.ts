import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $HealthCareNumber extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Health Care Number:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Health Care Number",
            kind : CompletionItemKind.Function,
            documentation : "The health care nmber of the patient",
            insertText : "- Health Care Number: "
        };
    }
}