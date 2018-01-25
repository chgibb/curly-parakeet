import {ICDSection,CompletionItemKind} from "./../../icdToken";

import {OfBrain} from "./ofBrain";

export class BrainOrCentralNervousSystem extends ICDSection
{
    public constructor(parent : ICDSection | undefined)
    {
        super(parent);
        this.regExp = /(Neoplasms of brain or central nervous system)/;
        this.tokenType = "icd11.SectionHeader";
        this.completionItem = {
            label : "Neoplasms of brain or central nervous system",
            kind : CompletionItemKind.Function,
            documentation : "A benign or malignant, primary or metastatic neoplasm that affects the brain, meninges, or spinal cord. Representative examples of primary neoplasms include astrocytoma, oligodendroglioma, ependymoma, and meningioma. Representative examples of metastatic neoplasms include carcinoma and leukemia.",
            insertText : `Neoplasms of brain or central nervous system Start${"\n"}    ${"\n"}End`
        };
        this.childSections.push(new OfBrain(this));
    }
}