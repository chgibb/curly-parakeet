import {ICDSection,CompletionItemKind, ICDItem} from "./../../icdToken";
import {$Type} from "./type";
import {$To} from "./to";
import {$Ordered} from "./ordered";
import {$Completed} from "./completed";

export class Referral extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /\bReferral\b/;
        this.tokenType = "icd11.SectionHeader";
        this.allowDuplicates = true;
        this.completionItem = {
            label : "Referral",
            kind : CompletionItemKind.Function,
            documentation : "Section describing a patient referral",
            insertText : `Referral Start${"\n"}    ${"\n"}End`
        };
        this.childItems = new Array<ICDItem>();
        this.childItems.push(new $Type(this));
        this.childItems.push(new $To(this));
        this.childItems.push(new $Ordered(this));
        this.childItems.push(new $Completed(this));
    }
}