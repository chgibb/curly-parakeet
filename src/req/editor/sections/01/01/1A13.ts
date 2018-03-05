import {ICDSection,ICDItem,CompletionItemKind} from "./../../../icdToken";

export class $1A13 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A13 Foodborne Bacillus cereus intoxication)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A13";
        this.completionItem = {
            label : "1A13 Foodborne Bacillus cereus intoxication",
            kind : CompletionItemKind.Function,
            documentation : "A disease caused by an infection with the gram-positive bacteria Bacillus cereus. This disease is characterized by the sudden onset of nausea, vomiting, or diarrhoea that typically resolves after 6-24 hours. Transmission is by ingestion of contaminated food. Confirmation is by isolation of more than 100,000 B. cereus organisms per gram from the epidemiologically implicated food.",
            insertText : `- 1A13 Foodborne Bacillus cereus intoxication`
        }
    }
}