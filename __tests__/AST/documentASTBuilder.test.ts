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

});