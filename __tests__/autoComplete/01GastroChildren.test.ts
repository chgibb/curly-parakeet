/// <reference types="ts-jest" />

import {autoComplete} from "./../../src/req/autoComplete";
import {Gastro} from "./../../src/req/sections/01/gastro";

let gastro = new Gastro();

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