import {ICDSection,ICDItem,CompletionItemKind} from "./../../../icdToken";

export class $1A00 extends ICDItem
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(1A00 Cholera)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A00";
        this.completionItem = {
            label : "1A00 Cholera",
            kind : CompletionItemKind.Function,
            documentation : "A disease of the small intestine, caused by an infection with the gram-negative bacteria Vibrio cholerae. This disease is characterized by profuse watery diarrhoea and vomiting, resulting in rapid loss of body fluids leading to dehydration and death if untreated within hours. Transmission is by ingestion of contaminated food, water, or direct contact. Confirmation is by identification of Vibrio cholerae in a faecal sample.",
            insertText : `- 1A00 Cholera`
        }
    }
}