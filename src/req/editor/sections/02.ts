import {ICDSection,CompletionItemKind} from "./../icdToken";

export class $02 extends ICDSection
{
    public constructor()
    {
        super(undefined);
        this.regExp = /(02 Tests)/;
        this.tokenType = "icd11.SectionTopHeader";
        this.completionItem = {
            label : "02 Tests",
            kind : CompletionItemKind.Function,
            documentation : "Tests ordered and completed.",
            insertText : `02 Tests Start${"\n"}   ${"\n"}End`
        };
    }
}