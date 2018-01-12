/// <reference types="ts-jest" />

import {autoComplete} from "./../../src/req/autoComplete";
import {Gastro} from "./../../src/req/sections/01/gastro";
import {FoodBorne} from "./../../src/req/sections/01/foodBorne";

let gastro = new Gastro(undefined);
let foodBorne = new FoodBorne(undefined);

it(`should auto complete gastro foodborne items`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "      Bacterial Foodborne Intoxications Start",
        "            "
    ].join("\n");

    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);

    expect((<monaco.languages.CompletionItem[]>res).length).toBe(foodBorne.childItems.length);

    for(let i = 0; i != (<monaco.languages.CompletionItem[]>res).length; ++i)
    {
        expect((<monaco.languages.CompletionItem[]>res)[i].label).toBe(foodBorne.childItems[i].completionItem.label);
    }
});