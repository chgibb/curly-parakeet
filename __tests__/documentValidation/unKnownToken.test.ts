/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/validate";

it(`should be unknowntoken`,() => {
    let doc = [
        "01 Certain Infectios or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.UnKnownToken);
    expect(res.more).toBe(`01 Certain Infectios or Parasitic Diseases Start at line 0`)

});