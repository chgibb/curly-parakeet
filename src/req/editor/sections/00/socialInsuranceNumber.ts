import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $SocialInsuranceNumber extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Social Insurance Number:)/;
        this.tokenType = "icd11.item";
        this.completionItem = {
            label : "Social Insurance Number",
            kind : CompletionItemKind.Function,
            documentation : "The social insurance nmber of the patient",
            insertText : "- Social Insurance Number: "
        };
    }
}