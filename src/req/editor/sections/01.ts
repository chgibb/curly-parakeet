import {ICDSection,CompletionItemKind} from "./../icdToken";
import {$01 as $ICD1} from "./01/01";
import {$02} from "./01/02";

export class $01 extends ICDSection
{
    public constructor()
    {
        super(undefined);
        this.regExp = /(01 ICD Coding)/;
        this.tokenType = "icd11.SectionTopHeader";
        this.completionItem = {
            label : "01 ICD Coding",
            kind : CompletionItemKind.Function,
            documentation : "ICD coding for patient ailments",
            insertText : `01 ICD Coding Start${"\n"}   ${"\n"}End`
        };
        this.childSections.push(new $ICD1(this));
        this.childSections.push(new $02(this));
    }
}