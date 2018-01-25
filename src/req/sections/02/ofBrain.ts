import {ICDSection,CompletionItemKind} from "./../../icdToken";

export class OfBrain extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Neoplasms of brain)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Neoplasms of brain",
            kind : CompletionItemKind.Function,
            documentation : "A benign or malignant neoplasm that arises from or metastasizes to the brain.",
            insertText : `Neoplasms of brain Start${"\n"}    ${"\n"}End`
        };
    }
}