import {ICDSection,CompletionItemKind} from "./../../icdToken";
import {ViralIntestinal} from "./viralIntestinal";
import {FoodBorne} from "./foodBorne";
import {BacterialIntestinal} from "./bacterialIntestinal";

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
        this.childSections.push(new ViralIntestinal(this));
        this.childSections.push(new FoodBorne(this));
        this.childSections.push(new BacterialIntestinal(this));
    }
}