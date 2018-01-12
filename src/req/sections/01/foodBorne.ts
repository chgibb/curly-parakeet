import {ICDSection,ICDItem,CompletionItemKind} from "./../../icdToken";
import {$1A10} from "./1A10";

export class FoodBorne extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Bacterial Foodborne Intoxications)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Bacterial Foodborne Intoxications",
            kind : CompletionItemKind.Function,
            documentation : "Any condition caused by an infection with a bacterial source. Transmission is by ingestion of contaminated food.",
            insertText : `Bacterial Foodborne Intoxications Start${"\n"}    ${"\n"}End`
        };
        this.childItems = new Array<ICDItem>();
        this.childItems.push(new $1A10(this));
    }
}