import {ICDSection,CompletionItemKind, ICDItem} from "./../../icdToken";

import {$1A20} from "./1A20";
import { $1A12 } from "./1A12";

export class ViralIntestinal extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Viral intestinal infections)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Viral intestinal infections",
            kind : CompletionItemKind.Function,
            documentation : "Any condition of the intestines, caused by an infection with a viral source.",
            insertText : `Viral intestinal infections Start${"\n"}    ${"\n"}End`
        }
        this.childItems = new Array<ICDItem>();

        this.childItems.push(new $1A20(this));
        this.childItems.push(new $1A12(this));
    }
}