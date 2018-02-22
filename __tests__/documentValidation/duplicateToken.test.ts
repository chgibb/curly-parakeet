/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/editor/validate";

it(`should not allow duplicate tokens`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "End",
        "01 Certain Infectious or Parasitic Diseases Start",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.DuplicateToken);
});

it(`should not allow duplicate tokens`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "   End",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.DuplicateToken);
});

it(`should not allow duplicate tokens`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "       Bacterial Foodborne Intoxications Start",
        "           - 1A10 Foodborne Staphylococcal Intoxication",
        "           - 1A10 Foodborne Staphylococcal Intoxication",
        "       End",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.DuplicateToken);
});