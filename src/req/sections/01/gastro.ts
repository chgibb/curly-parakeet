/// <reference path="./../../../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDSection} from "./../../icdToken";

export class Gastro extends ICDSection
{
    public constructor()
    {
        super();
        this.regExp = /(Gastroenteritis and Colitis of Infectious Origin)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Gastroenteritis and Colitis of Infectious Origin",
            kind : monaco.languages.CompletionItemKind.Function,
            documentation : "Any condition of the intestines, caused by an infection with a bacterial source.",
            insertText : `Gastroenteritis and Colitis of Infectious Origin Start${"\n"}    ${"\n"}End`
        };
    }
}