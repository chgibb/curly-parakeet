/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/validate";

it(`should be empty`,() => {
    let doc = "";

    let res : DocumentStatus = validate(doc);

    expect(res).toBe(DocumentStatusCode.NoInput);
});

it(`should be unbalanced`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res).toBe(DocumentStatusCode.UnBalanced);
});

it(`should be unbalanced`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "   End",
        "End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res).toBe(DocumentStatusCode.UnBalanced);
})