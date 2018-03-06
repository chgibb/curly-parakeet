import {ICDSection,CompletionItemKind} from "./../icdToken";
import {Referral} from "./02/referral";
export class $02 extends ICDSection
{
    public constructor()
    {
        super(undefined);
        this.regExp = /(02 Referrals)/;
        this.tokenType = "icd11.SectionTopHeader";
        this.completionItem = {
            label : "02 Referrals",
            kind : CompletionItemKind.Function,
            documentation : "Referrals ordered and completed.",
            insertText : `02 Referrals Start${"\n"}   ${"\n"}End`
        };
        this.childSections.push(new Referral(this));
    }
}
