import {ICDSection,ICDItem,CompletionItemKind} from "./../../../icdToken";

export class $1A12 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A12 Foodborne Clostridium perfringens intoxication)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A12";
        this.completionItem = {
            label : "1A12 Foodborne Clostridium perfringens intoxication",
            kind : CompletionItemKind.Function,
            documentation : "A condition caused by an infection with the gram-positive bacteria Clostridium perfringens. This condition is characterized by a sudden onset of colic, followed by diarrhoea or abdominal cramps. Transmission is by ingestion of contaminated food. Confirmation is by isolation of 1 000 000 spores of Clostridium perfringens per gram faeces.",
            insertText : `- 1A12 Foodborne Clostridium perfringens intoxication`
        }
    }
}