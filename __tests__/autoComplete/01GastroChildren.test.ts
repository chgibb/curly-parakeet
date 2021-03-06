/// <reference types="ts-jest" />

import {autoComplete} from "./../../src/req/editor/autoComplete";
import {Gastro} from "./../../src/req/editor/sections/01/01/gastro";
import {FoodBorne} from "./../../src/req/editor/sections/01/01/foodBorne";

let gastro = new Gastro(undefined);
let foodBorne = new FoodBorne(undefined);

it(`should auto complete gastro subsections`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "       "
    ].join("\n");
    
    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);

    expect((<monaco.languages.CompletionItem[]>res).length).toBeGreaterThan(0);

    expect((<monaco.languages.CompletionItem[]>res).length).toBe(gastro.childSections.length);

    for(let i = 0; i != (<monaco.languages.CompletionItem[]>res).length; ++i)
    {
        expect((<monaco.languages.CompletionItem[]>res)[i].label).toBe(gastro.childSections[i].completionItem.label);
    }
    
});

it(`should auto complete gastro subsections`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "    Gastroenteritis and Colitis of Infectious Origin Start",
        "       food"
    ].join("\n");

    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);

    expect((<monaco.languages.CompletionItem[]>res).length).toBeGreaterThan(0);

    expect((<monaco.languages.CompletionItem[]>res).length).toBe(gastro.childSections.length);

    for(let i = 0; i != (<monaco.languages.CompletionItem[]>res).length; ++i)
    {
        expect((<monaco.languages.CompletionItem[]>res)[i].label).toBe(gastro.childSections[i].completionItem.label);
    }
});
