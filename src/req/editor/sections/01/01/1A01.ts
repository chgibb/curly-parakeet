import {ICDSection,ICDItem,CompletionItemKind} from "./../../../icdToken";

export class $1A01 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A01 Intestinal infection due to other Vibrio)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A01";
        this.completionItem = {
            label : "1A01 Intestinal infection due to other Vibrio",
            kind : CompletionItemKind.Function,
            documentation : "Intestinal infection due to other Vibrio",
            insertText : `- 1A01 Intestinal infection due to other Vibrio`
        }
    }
}