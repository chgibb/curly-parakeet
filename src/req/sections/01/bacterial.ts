/// <reference path="./../../../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDSection} from "./../../icdToken";

export class Bacterial extends ICDSection
{
    public constructor()
    {
        super();
        this.regExp = /(Bacterial Intestinal Infections)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Bacterial Intestinal Infections",
            kind : monaco.languages.CompletionItemKind.Function,
            documentation : "Any condition of the intestines, caused by an infection with a bacterial source.",
            insertText : `Bacterial Intestinal Infections Start${"\n"}    ${"\n"}End`
        }
    }
}