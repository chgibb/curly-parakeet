/// <reference types="ts-jest" />

import {
    Start,
    End,
    ICDSection,
    findParentSectionFromLinePosition
} from "./../../src/req/icdToken";
import {getTokenLayout} from "./../../src//req/treeLayout";
import {ZeroOne} from "./../../src/req/sections/01";
import {Gastro} from "./../../src/req/sections/01/gastro";
import {FoodBorne} from "./../../src/req/sections/01/foodBorne";

let zerOne = new ZeroOne();

let gastro = new Gastro(undefined);
let foodBorne = new FoodBorne(undefined);

let zeroOne = new ZeroOne();



it(`1 should find chapter 1 header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        " "
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(zeroOne.completionItem.label);

});

it(`2 should find gastro header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "       "
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(gastro.completionItem.label);

});

it(`3 should find gastro header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "          ",
        "      End",
        "      "
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(gastro.completionItem.label);

});

it(`4 should find chapter 1 header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "          ",
        "      End",
        "      Bacterial Intestinal Infections Start",
        "          ",
        "      End ",
        "   End",
        "   "
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(zeroOne.completionItem.label);

});

it(`5 should find foodborne header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "       Bacterial Foodborne Intoxications Start",
        "           - 1A10 Foodborne Staphylococcal Intoxication"
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(foodBorne.completionItem.label);

});

it(`6 should not find anything`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "           - 1A10 Foodborne Staphylococcal Intoxication",
        "      End",
        "      Bacterial Intestinal Infections Start",
        "          ",
        "      End ",
        "   End",
        "End"
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res)).toBe(undefined);

});

it(`7 should not find anything`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "           - 1A10 Foodborne Staphylococcal Intoxication",
        "      End",
        "      Bacterial Intestinal Infections Start",
        "          ",
        "      End ",
        "   End",
        "End",
        ""
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res)).toBe(undefined);

});

it(`8 should autocomplete gastro section header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
            "Gastroenteritis and Colitis of Infectious Origin Start",
            "    ",    
            "End",
            "Gastroenteritis and Colitis of Infectious Origin Start",
            "    ",
            "End",
            "Bacterial Intestinal Infections Start",
            "   ",
            "End",
            "    "
    ];

    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(zeroOne.completionItem.label);
});