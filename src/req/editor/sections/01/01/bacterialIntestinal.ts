import {ICDSection,CompletionItemKind, ICDItem} from "./../../../icdToken";

import {$1A00} from "./1A00";
import {$1A01} from "./1A01";
import {$1A02} from "./1A02";

export class BacterialIntestinal extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Bacterial intestinal infections)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Bacterial intestinal infections",
            kind : CompletionItemKind.Function,
            documentation : "Any condition of the intestines, caused by an infection with a bacterial source.",
            insertText : `Bacterial intestinal infections Start${"\n"}    ${"\n"}End`
        }

        this.childItems = new Array<ICDItem>();

        this.childItems.push(new $1A00(this));
        this.childItems.push(new $1A01(this));
        this.childItems.push(new $1A02(this));
    }
}