/// <reference types="ts-jest" />

import {validate,DocumentStatus} from "./../../src/req/validate";

it(`should be empty`,() => {
    let doc = "";

    let res : DocumentStatus = validate(doc);

    expect(res).toBe(DocumentStatus.NoInput);
});