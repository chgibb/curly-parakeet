/// <reference types="ts-jest" />

import {trimStartBlockDeclaration} from "./../../src/req/icdToken";

it(`should remove trailing start block declaration`,() => {
    let res = trimStartBlockDeclaration("01 Certain Infectious or Parasitic Diseases Start");

    expect(res).toBe("01 Certain Infectious or Parasitic Diseases");
});

it(`should remove trailing start block declaration`,() => {
    let res = trimStartBlockDeclaration("   Gastroenteritis and Colitis of Infectious Origin Start");

    expect(res).toBe("Gastroenteritis and Colitis of Infectious Origin");
});

it(`should remove trailing start block declaration`,() => {
    let res = trimStartBlockDeclaration("      Bacterial Foodborne Intoxications Start          \n");

    expect(res).toBe("Bacterial Foodborne Intoxications");
});

it(`should trim nothing`,() => {
    let res = trimStartBlockDeclaration("   Start   ");

    expect(res).toBe("Start");
});

it(`should trim nothing`,() => {
    let res = trimStartBlockDeclaration("Start");

    expect(res).toBe("Start");
});