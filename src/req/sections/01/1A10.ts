import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";

export class $1A10 extends ICDItem
{
    public constructor()
    {
        super();
        this.regExp = /(1A10 Foodborne Staphylococcal Intoxication)/;
        this.tokenType = "icd11.item";
        this.rawCode = "1A10";
        this.completionItem = {
            label : "1A10 Foodborne Staphylococcal Intoxication",
            kind : CompletionItemKind.Function,
            documentation : "Foodborne staphylococcal intoxication is a gastrointestinal illness caused by eating foods contaminated with Staphylococcal toxins produced by Staphylococcus aureus. The toxins are fast acting, sometimes causing illness in as little as 30 minutes but symptoms usually develop within one to six hours after eating contaminated food. The most common way for food to be contaminated with Staphylococcus is through contact with food workers who carry the bacteria or through contaminated milk and cheeses.",
            insertText : `- 1A10 Foodborne Staphylococcal Intoxication`
        }
    }
}