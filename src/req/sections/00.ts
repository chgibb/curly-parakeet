import {ICDSection,CompletionItemKind,ICDItem} from "./../icdToken";
import {$FirstName} from "./00/firstName";
import {$LastName} from "./00/lastName";
import {$DateofBirth} from "./00/dateOfBirth";
import {$Age} from "./00/age";

export class $00 extends ICDSection
{
    public constructor()
    {
        super(undefined);
        this.regExp = /(00 Patient Information)/;
        this.tokenType = "icd11.SectionTopHeader";
        this.completionItem = {
            label : "00 Patient Information",
            kind : CompletionItemKind.Function,
            documentation : "Basic information describing a patient.",
            insertText : `00 Patient Information Start${"\n"}   ${"\n"}End`
        };
        this.childItems = new Array<ICDItem>();

        this.childItems.push(new $FirstName(this));
        this.childItems.push(new $LastName(this));
        this.childItems.push(new $DateofBirth(this));
        this.childItems.push(new $Age(this));
    }
}