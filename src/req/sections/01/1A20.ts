import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $1A20 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A20 Adenoviral enteritis)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A20";
        this.completionItem = {
            label : "1A20 Adenoviral enteritis",
            kind : CompletionItemKind.Function,
            documentation : "A disease of the intestinal tract, caused by an infection with adenovirus. This disease is characterized by a fever, diarrhoea, or vomiting. Transmission is by the faecal-oral route.",
            insertText : `- 1A20 Adenoviral enteritis`
        }
    }
}