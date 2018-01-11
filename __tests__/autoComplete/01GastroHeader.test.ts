/// <reference types="ts-jest" />

import {autoComplete} from "./../../src/req/autoComplete";
import {Gastro} from "./../../src/req/sections/01/gastro";

let gastro = new Gastro();

it(`should auto complete gastro section header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        ""
    ].join("\n");

    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});

it(`should auto complete gastro section header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "g"
    ].join("\n");

    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});

it(`should auto complete gastro section header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "c"
    ].join("\n");

    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});

it(`should auto complete gastro section header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "colitis"
    ].join("\n");

    let res : void | monaco.languages.CompletionItem[] = autoComplete(doc);
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(gastro.completionItem.label);
});