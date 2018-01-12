import {ICDSection,CompletionItemKind} from "./../../icdToken";
import {Bacterial} from "./bacterial";
import {FoodBorne} from "./foodBorne";

export class Gastro extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Gastroenteritis and Colitis of Infectious Origin)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Gastroenteritis and Colitis of Infectious Origin",
            kind : CompletionItemKind.Function,
            documentation : "Any condition of the intestines, caused by an infection with a bacterial source.",
            insertText : `Gastroenteritis and Colitis of Infectious Origin Start${"\n"}    ${"\n"}End`
        };
        this.childSections.push(new Bacterial(this));
        this.childSections.push(new FoodBorne(this));
    }
}