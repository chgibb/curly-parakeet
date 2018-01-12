/// <reference types="ts-jest" />

import {
    Start,
    End,
    ICDSection,
    findParentSectionFromLinePosition
} from "./../../src/req/icdToken";
import {ZeroOne} from "./../../src/req/sections/01";
import {getTokenLayout} from "./../../src//req/treeLayout";

let zeroOne = new ZeroOne();



it(`should find chapter 1 header`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        " "
    ];
    let res = findParentSectionFromLinePosition(doc,doc.length-1,getTokenLayout());
    expect((<ICDSection>res).completionItem.label).toBe(zeroOne.completionItem.label);

});