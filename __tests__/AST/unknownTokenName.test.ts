/// <reference types="ts-jest" />

import {findToken,ICDGenericToken,ICDSection, findTokenFromUnknownStart} from "./../../src/req/icdToken";
import {getTokenLayout} from "./../../src/req/treeLayout";
import {ZeroOne} from "./../../src/req/sections/01";
import {Gastro} from "./../../src/req/sections/01/gastro";
import {$1A10} from "./../../src/req/sections/01/1A10"

let zeroOne = new ZeroOne();
let gastro = new Gastro(undefined);
let $1a10 = new $1A10(undefined);

it(`should find token in section`,() => {
    let res = findToken(zeroOne,gastro.completionItem.label);
    expect(res!.completionItem.label).toBe(gastro.completionItem.label);
});

it(`should find token in section`,() => {
    let res = findToken(zeroOne,$1a10.completionItem.label);
    expect(res!.completionItem.label).toBe($1a10.completionItem.label);
});

it(`should find token in ast layout`,() => {
    let res = findTokenFromUnknownStart(getTokenLayout(),zeroOne.completionItem.label);
    expect(res!.completionItem.label).toBe(zeroOne.completionItem.label);
});

it(`should find token in ast layout`,() => {
    let res = findTokenFromUnknownStart(getTokenLayout(),"01 Certain Infectious or Parasitic Diseases Start");
    expect(res!.completionItem.label).toBe(zeroOne.completionItem.label);
});

it(`should find token in ast layouts`,() => {
    let res = findToken(zeroOne,"- 1A10 Foodborne Staphylococcal Intoxication ");
    expect(res!.completionItem.label).toBe($1a10.completionItem.label);
});