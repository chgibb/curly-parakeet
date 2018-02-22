import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $1A02 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A02 Intestinal infections due to Shigella)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A02";
        this.completionItem = {
            label : "1A02 Intestinal infections due to Shigella",
            kind : CompletionItemKind.Function,
            documentation : "A disease caused by an infection with the gram-negative bacteria Shigella. This disease is characterized by an acute onset of small volume diarrhoea, accompanied by fever and nausea. This disease may also present with toxaemia, vomiting, cramps, and tenesmus. Transmission is by ingestion of contaminated food, or direct contact. Confirmation is by identification of Shigella in a faecal sample.",
            insertText : `- 1A02 Intestinal infections due to Shigella`
        }
    }
}