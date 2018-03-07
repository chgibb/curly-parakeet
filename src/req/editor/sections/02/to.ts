import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $To extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(To:)/;
        this.tokenType = "icd11.item";
        this.allowDuplicates = true;
        this.completionItem = {
            label : "To",
            kind : CompletionItemKind.Function,
            insertText : "- To: "
        };
    }
}