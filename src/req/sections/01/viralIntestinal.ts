import {ICDSection,CompletionItemKind} from "./../../icdToken";

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
    }
}