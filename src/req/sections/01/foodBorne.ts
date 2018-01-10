/// <reference path="./../../../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDSection} from "./../../icdToken";

export class FoodBorne extends ICDSection
{
    public constructor()
    {
        super();
        this.regExp = /(Bacterial Foodborne Intoxications)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Bacterial Foodborne Intoxications",
            kind : monaco.languages.CompletionItemKind.Function,
            documentation : "Any condition caused by an infection with a bacterial source. Transmission is by ingestion of contaminated food.",
            insertText : `Bacterial Foodborne Intoxications Start${"\n"}    ${"\n"}End`
        };
    }
}