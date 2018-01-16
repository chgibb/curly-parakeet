import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $1A22 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A22 Gastroenteritis due to Rotavirus)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A22";
        this.completionItem = {
            label : "1A22 Gastroenteritis due to Rotavirus",
            kind : CompletionItemKind.Function,
            documentation : "A disease of the gastrointestinal tract, caused by an infection with rotavirus. This disease is characterized by acute onset of vomiting, non-haemorhagic diarrhoea, and abdominal pain. Transmission is by ingestion of contaminated food or water, direct contact, or through fomites. Confirmation is by identification of rotavirus.",
            insertText : `- 1A22 Gastroenteritis due to Rotavirus`
        }
    }
}