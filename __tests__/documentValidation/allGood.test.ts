/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/validate";

it(`should be all good`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.Valid);
});

it(`should be all good`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.Valid);
});