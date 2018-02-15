/// <reference types="ts-jest" />

import {ICDSection,ICDGenericToken} from "./../../src/req/icdToken";
import {buildDocumentAST,copyAndStripChildren,copyToken} from "./../../src/req/documentAST";
import {$01} from "./../../src/req/sections/01";
import {Gastro} from "./../../src/req/sections/01/gastro";
import {FoodBorne} from "./../../src/req/sections/01/foodBorne";

it(`should build correct AST for document 1`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "      End",
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
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "          - 1A13 Foodborne Bacillus cereus intoxication",
        "          - 1A10 Foodborne Staphylococcal Intoxication",
        "          - 1A12 Foodborne Clostridium perfringens intoxication",
        "      End",
        "      Bacterial intestinal infections Start",
        "          - 1A01 Intestinal infection due to other Vibrio",
        "          - 1A02 Intestinal infections due to Shigella",
        "      End",
        "      Viral intestinal infections Start",
        "         - 1A20 Adenoviral enteritis ",
        "      End ",
        "   End",
        "End",
        " ",
        "02 Neoplasms Start",
        " ",
        "End"
    ];

    let res = buildDocumentAST(doc.join("\n"));

    expect(res.length).toEqual(3);
    //00 Patient Information
    expect((<ICDSection>res[0]).childItems.length).toEqual(6);
    expect((<ICDSection>res[0]).childSections.length).toEqual(0);
    //01 Certain Infectious or Parasitic Diseases
    expect((<ICDSection>res[1]).childSections.length).toEqual(1);
    expect((<ICDSection>res[1]).childItems.length).toEqual(0);
    //Gastroenteritis and Colitis of Infectious Origin
    expect((<ICDSection>res[1]).childSections[0].childSections.length).toEqual(3);
    //Bacterial Foodborne Intoxications
    expect((<ICDSection>res[1]).childSections[0].childSections[0].childItems.length).toEqual(3);
    //Bacterial intestinal infections
    expect((<ICDSection>res[1]).childSections[0].childSections[1].childItems.length).toEqual(2);
    //Viral intestinal infections
    expect((<ICDSection>res[1]).childSections[0].childSections[2].childItems.length).toEqual(1);
    //02 Neoplasms
    expect((<ICDSection>res[2]).childSections.length).toEqual(0);
    expect((<ICDSection>res[2]).childItems.length).toEqual(0);
});