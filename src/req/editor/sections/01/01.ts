import {ICDSection,CompletionItemKind} from "./../../icdToken";
import {Gastro} from "./01/gastro";

export class $01 extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(01 Certain Infectious or Parasitic Diseases)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "01 Certain Infectious or Parasitic Diseases",
            kind : CompletionItemKind.Function,
            documentation : "This chapter includes certain conditions caused by a pathogenic organism or microorganism, such as a bacterium, virus, parasite, or fungus.",
            insertText : `01 Certain Infectious or Parasitic Diseases Start${"\n"}   ${"\n"}End`
        };
        this.childSections.push(new Gastro(this));
    }
}