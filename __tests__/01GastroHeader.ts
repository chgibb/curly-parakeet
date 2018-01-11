/// <reference types="ts-jest" />

import {autoComplete} from "./../src/req/autoComplete";
import {Gastro} from "./../src/req/sections/01/gastro";

let gastro = new Gastro();

it(`should auto complete gastro section header`,() => {
    let document = 
    `
    01 Certain Infectious or Parasitic Diseases Start
   
    `;

    let res : void | monaco.languages.CompletionItem[] = autoComplete(document);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});

it(`should auto complete gastro section header`,() => {
    let document = 
    `
    01 Certain Infectious or Parasitic Diseases Start
   g
    `;

    let res : void | monaco.languages.CompletionItem[] = autoComplete(document);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});

it(`should auto complete gastro section header`,() => {
    let document = 
    `
    01 Certain Infectious or Parasitic Diseases Start
   c
    `;

    let res : void | monaco.languages.CompletionItem[] = autoComplete(document);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});

it(`should auto complete gastro section header`,() => {
    let document = 
    `
    01 Certain Infectious or Parasitic Diseases Start
   colitis
    `;

    let res : void | monaco.languages.CompletionItem[] = autoComplete(document);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});