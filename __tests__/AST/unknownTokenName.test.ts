/// <reference types="ts-jest" />

import {findToken} from "./../../src/req/icdToken";
import {buildTokenLayout} from "./../../src/req/treeLayout";
import {ZeroOne} from "./../../src/req/sections/01";
import {Gastro} from "./../../src/req/sections/01/gastro";
import {$1A10} from "./../../src/req/sections/01/1A10"

let zeroOne = new ZeroOne();
let gastro = new Gastro();
let $1a10 = new $1A10();


it(`should find token in section`,() => {
    let res = findToken(zeroOne,gastro.completionItem.label);
    expect(res!.completionItem.label).toBe(gastro.completionItem.label);
});

it(`should find token in section`,() => {
    let res = findToken(zeroOne,$1a10.completionItem.label);
    expect(res!.completionItem.label).toBe($1a10.completionItem.label);
});