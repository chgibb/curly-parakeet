/// <reference types="ts-jest" />

import {
    Start,
    End,
    ICDSection,
    ICDItem,
    ICDAttributes,
    findParentSectionFromLinePosition,
    findTokenFromUnknownStart
} from "./../../src/req/editor/icdToken";
import {getTokenLayout, buildMonarchTokens} from "./../../src/req/editor/treeLayout";
import {$01} from "./../../src/req/editor/sections/01/01";
import {Gastro} from "./../../src/req/editor/sections/01/01/gastro";
import {FoodBorne} from "./../../src/req/editor/sections/01/01/foodBorne";

let gastro = new Gastro(undefined);
let foodBorne = new FoodBorne(undefined);

let zeroOne = new $01(undefined);

it(`1 should find chapter 1 header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        " "
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(zeroOne.completionItem.label);

});

it(`should find chapter 1 header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res)).toBe(undefined);

});

it(`1 should find chapter 1 header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
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

it(`8 should find gastro section header`,() => {
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

let tokens = buildMonarchTokens(getTokenLayout(),true);
for(let i = 0; i != tokens.length; ++i)
{
    it(`should find the immediate parent for "${tokens[i][2]}"`,() => {
        if((<string>tokens[i][2]))
        {
            let res : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[i][2]));
            let current : ICDAttributes = res!;
            let doc : Array<string> = new Array<string>();
            
            //assemble a document consisting of all of the parent sections leading to token[i]
            doc.push(" ");
            if(current.parent)
            {
                while(current.parent)
                {
                    doc.push(current.parent.completionItem.label+" Start");
                    current = current.parent;
                }
            }
            //flip upside down, into the right order
            doc = doc.reverse();

            //should walk up the document and find the parent of tokens[i]
            let foundParent = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
            expect(foundParent).toEqual(res!.parent);
        }
    });
}