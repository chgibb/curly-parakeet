import {ICDSection,ICDItem,CompletionItemKind} from "./../../../icdToken";

export class $1A21 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A21 Gastroenteritis due to astrovirus)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A21";
        this.completionItem = {
            label : "1A21 Gastroenteritis due to astrovirus",
            kind : CompletionItemKind.Function,
            documentation : "Human astrovirus (HAstV) is a common cause of childhood diarrhea, especially in those less than 2 years old.",
            insertText : `- 1A21 Gastroenteritis due to astrovirus`
        }
    }
}