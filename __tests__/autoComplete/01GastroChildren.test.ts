/// <reference types="ts-jest" />

import {autoComplete} from "./../../src/req/autoComplete";
import {Gastro} from "./../../src/req/sections/01/gastro";
import {FoodBorne} from "./../../src/req/sections/01/foodBorne";

let gastro = new Gastro();
let foodBorne = new FoodBorne();

it(`should auto complete gastro subsections`,() => {
    let document = 
    `
    01 Certain Infectious or Parasitic Diseases Start
   Gastroenteritis and Colitis of Infectious Origin Start
       
    `;
    let res : void | monaco.languages.CompletionItem[] = autoComplete(document);

    expect((<monaco.languages.CompletionItem[]>res).length).toBeGreaterThan(0);

    expect((<monaco.languages.CompletionItem[]>res).length).toBe(gastro.childSections.length);

    for(let i = 0; i != (<monaco.languages.CompletionItem[]>res).length; ++i)
    {
        expect((<monaco.languages.CompletionItem[]>res)[i].label).toBe(gastro.childSections[i].completionItem.label);
    }
    
});

it(`should auto complete Bacterial Foodborne Intoxications`,() => {
    let document = 
    `01 Certain Infectious or Parasitic Diseases Start
    Gastroenteritis and Colitis of Infectious Origin Start
       foodborne
    `;
    let res : void | monaco.languages.CompletionItem[] = autoComplete(document);

    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(foodBorne.completionItem.label);
    
});