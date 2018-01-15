/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/validate";

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