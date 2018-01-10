/// <reference types="ts-jest" />
/// <reference path="./../node_modules/monaco-editor/monaco.d.ts" />


import {autoComplete} from "./../src/req/autoComplete";
import {ZeroOne} from "./../src/req/sections/01";

let zerOne = new ZeroOne();

it(`should auto complete chapter 1 top header`,() => {
    let res : void | monaco.languages.CompletionItem[] = autoComplete("c");
    expect((<monaco.languages.CompletionItem[]>res)[0].label).toBe(zerOne.completionItem.label);
});