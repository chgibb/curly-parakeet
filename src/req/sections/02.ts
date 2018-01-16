import {ICDSection,CompletionItemKind} from "./../icdToken";

export class $02 extends ICDSection
{
    public constructor()
    {
        super(undefined);
        this.regExp = /(02 Neoplasms)/;
        this.tokenType = "icd11.SectionTopHeader";
        this.completionItem = {
            label : "02 Neoplasms",
            kind : CompletionItemKind.Function,
            documentation : "",
            insertText : `02 Neoplasms Start${"\n"}   ${"\n"}End`
        };
        
    }
}