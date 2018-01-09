/// <reference path="./../../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDSection} from "./../icdToken";

export class ZeroOne extends ICDSection
{
    public constructor()
    {
        super();
        this.regExp = /(01 Certain Infectious or Parasitic Diseases)/;
        this.tokenType = "icd11.SectionTopHeader";
        this.completionItem = {
            label : "Start 01 Certain Infectious or Parasitic Diseases",
            kind : monaco.languages.CompletionItemKind.Function,
            documentation : "This chapter includes certain conditions caused by a pathogenic organism or microorganism, such as a bacterium, virus, parasite, or fungus.",
            insertText : `Start 01 Certain Infectious or Parasitic Diseases${"\n"}   ${"\n"}End`
        };
    }
}