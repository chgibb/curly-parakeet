/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/validate";

it(`should be unexpected token`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Bacterial Foodborne Intoxications Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);
    expect(res.code).toBe(DocumentStatusCode.UnExpectedToken);
});