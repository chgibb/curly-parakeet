/// <reference types="ts-jest" />

import {autoComplete} from "./../../src/req/autoComplete";
import {$01} from "./../../src/req/sections/01";

let zeroOne = new $01();

it(`should auto complete chapter 1 top header`,() => {
    let res : void | monaco.languages.CompletionItem[] = autoComplete("c");
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(zeroOne.completionItem.label);
});

it(`should auto complete chapter 1 top header`,() => {
    let res : void | monaco.languages.CompletionItem[] = autoComplete("01");
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(zeroOne.completionItem.label);
});