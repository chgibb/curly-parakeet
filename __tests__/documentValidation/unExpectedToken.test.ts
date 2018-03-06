/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/editor/validate";

it(`should be unexpected token 1`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Bacterial Foodborne Intoxications Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);
    expect(res.code).toBe(DocumentStatusCode.UnExpectedToken);
});

it(`should be unexpected token 2`,() => {
    let doc = [
        "00 Patient Information Start",
        "   - First Name: John",
        "   - Last Name: Smith",
        "   01 ICD Coding Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);
    expect(res.code).toBe(DocumentStatusCode.UnExpectedToken);
});