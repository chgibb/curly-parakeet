/// <reference types="ts-jest" />

import {ICDSection,ICDGenericToken, findTokenFromUnknownStart, ICDItem, ICDAttributes} from "./../../src/req/editor/icdToken";
import {buildDocumentAST,copyAndStripChildren,copyToken} from "./../../src/req/editor/documentAST";
import {validate, DocumentStatusCode} from "./../../src/req/editor/validate";
import {getTokenLayout,buildMonarchTokens} from "./../../src/req/editor/treeLayout";

it(`should build correct AST for document 1`,() => {
    let doc = [
        "01 ICD Coding Start",
        "   01 Certain Infectious or Parasitic Diseases Start",
        "       Gastroenteritis and Colitis of Infectious Origin Start",
        "           Bacterial Foodborne Intoxications Start",
        "           End",
        "       End",
        "   End",
        "End"
    ];

    let res = buildDocumentAST(doc.join("\n"));

    expect((<ICDSection>res[0]).childSections.length).toEqual(1);
    expect((<ICDSection>res[0]).childSections[0].childSections.length).toEqual(1);

});

it(`should build correct AST for document 2`,() => {
    let doc = [
        "00 Patient Information Start",
        "   - Address: ",
        "   - Date of Birth: ",
        "   - First Name: ",
        "   - Last Name: ",
        "   - Health Care Number: ",
        "   - Social Insurance Number: ",
        "End",
        " ",
        "01 ICD Coding Start",
        "   01 Certain Infectious or Parasitic Diseases Start",
        "       Gastroenteritis and Colitis of Infectious Origin Start",
        "           Bacterial Foodborne Intoxications Start",
        "               - 1A13 Foodborne Bacillus cereus intoxication",
        "               - 1A10 Foodborne Staphylococcal Intoxication",
        "               - 1A12 Foodborne Clostridium perfringens intoxication",
        "           End",
        "           Bacterial intestinal infections Start",
        "               - 1A01 Intestinal infection due to other Vibrio",
        "               - 1A02 Intestinal infections due to Shigella",
        "           End",
        "           Viral intestinal infections Start",
        "               - 1A20 Adenoviral enteritis ",
        "           End ",
        "       End",
        "   End",
        "   02 Neoplasms Start",
        "   End",
        "End",
        " ",
    ];

    let res = buildDocumentAST(doc.join("\n"));

    expect(res.length).toEqual(2);
    //00 Patient Information
    expect((<ICDSection>res[0]).childItems.length).toEqual(6);
    expect((<ICDSection>res[0]).childSections.length).toEqual(0);

    //01 ICD Coding
    expect((<ICDSection>res[1]).childSections.length).toEqual(2);

    //01 Certain Infectious or Parasitic Diseases
    expect((<ICDSection>res[1]).childSections[0].childSections.length).toEqual(1);

    //Gastroenteritis and Colitis of Infectious Origin
    expect((<ICDSection>res[1]).childSections[0].childSections[0].childSections.length).toEqual(3);
    
    //Bacterial Foodborne Intoxications
    expect((<ICDSection>res[1]).childSections[0].childSections[0].childSections[0].childItems.length).toEqual(3);
    
    //Bacterial intestinal infections
    expect((<ICDSection>res[1]).childSections[0].childSections[0].childSections[1].childItems.length).toEqual(2);
    
    //Viral intestinal infections
    expect((<ICDSection>res[1]).childSections[0].childSections[0].childSections[2].childItems.length).toEqual(1);
    
    //02 Neoplasms
    expect((<ICDSection>res[1]).childSections[1].childSections.length).toEqual(0);
    expect((<ICDSection>res[1]).childSections[1].childItems.length).toEqual(0);
});

it(`should allow duplicates 1`,() => {
    let doc = [
        "02 Referrals Start",
        "   Referral Start",
        "      - To: Dr. Mago",
        "      - Type: Computing",
        "   End",
        "   Referral Start",
        "       - To: Dr. Benson",
        "       - Type: Computing",
        "   End",
        "End"
    ];

    expect(validate(doc.join("\n")).code).toBe(DocumentStatusCode.Valid);

    let res = buildDocumentAST(doc.join("\n"));

    expect(res.length).toEqual(1);

    expect((<ICDSection>res[0]).childSections[0].childItems.length).toEqual(2);
    expect((<ICDSection>res[0]).childSections[1].childItems.length).toEqual(2);
    expect((<ICDSection>res[0]).childSections[0].childItems[0].userValue).toEqual("Dr. Mago");
    expect((<ICDSection>res[0]).childSections[1].childItems[0].userValue).toEqual("Dr. Benson");
});

it(`should allow duplicates 2`,() => {
    let doc = [
        "02 Referrals Start",
        "   Referral Start",
        "      - To: Dr. Mago",
        "      - Type: Computing",
        "   End",
        "   Referral Start",
        "       - To: Dr. Benson",
        "       - Type: Computing",
        "   End",
        "End"
    ];

    expect(validate(doc.join("\n")).code).toBe(DocumentStatusCode.Valid);

    let res = buildDocumentAST(doc.join("\n"));

    expect(res.length).toEqual(1);

    expect((<ICDSection>res[0]).childSections[0].childItems.length).toEqual(2);
    expect((<ICDSection>res[0]).childSections[1].childItems.length).toEqual(2);
    expect((<ICDSection>res[0]).childSections[0].childItems[0].userValue).toEqual("Dr. Mago");
    expect((<ICDSection>res[0]).childSections[1].childItems[0].userValue).toEqual("Dr. Benson");
});

let tokens = buildMonarchTokens(getTokenLayout(),true);
for(let i = 0; i != tokens.length; ++i)
{
    it(`should be able to traverse reference AST the same as AST built from document for "${tokens[i][2]}"`,() => {
        if((<string>tokens[i][2]))
        {
            let current = (<ICDSection | ICDItem>findTokenFromUnknownStart(
                getTokenLayout(),
                (<string>tokens[i][2])
            ));

            let doc : Array<string> = new Array<string>();

            doc.push(" ");
            if(current.tokenType == "icd11.SectionTopHeader" || current.tokenType == "icd11.SectionHeader")
            {
                doc.push(current.completionItem.label+" Start");
            }

            if(current.tokenType == "icd11.item")
                doc.push(current.completionItem.label);

            if(current.parent)
            {
                while(current!.parent)
                {
                    doc.push(current.parent!.completionItem.label+" Start");
                    current = (<ICDSection | ICDItem>current!.parent);
                }
            }
            //flip upside down, into the right order
            doc = doc.reverse();

            let docAST = buildDocumentAST(doc.join("\n"));

            expect(findTokenFromUnknownStart(docAST,(<string>tokens[i][2]))).toBeDefined();

            let referenceToken = (<ICDSection | ICDItem>findTokenFromUnknownStart(
                getTokenLayout(),
                (<string>tokens[i][2])
            ));

            let docToken = (<ICDSection | ICDItem>findTokenFromUnknownStart(
                docAST,
                (<string>tokens[i][2])
            ));

            if(referenceToken.parent && docToken.parent)
            {
                while(referenceToken.parent && docToken.parent)
                {
                    expect(docToken.completionItem.label).toEqual(referenceToken.completionItem.label);
                    docToken = (<ICDSection | ICDItem>docToken.parent);
                    referenceToken = (<ICDSection | ICDItem>referenceToken.parent);
                }
            }

        }
    });
}