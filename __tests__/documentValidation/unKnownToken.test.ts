/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/editor/validate";

it(`should be unknowntoken`,() => {
    let doc = [
        "01 Certain Infectios or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis of Infectious Origin Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.UnKnownToken);
    expect(res.more).toBe("Unknown token \"01 Certain Infectios or Parasitic Diseases\" at line 1");

});

it(`should be unknowntoken`,() => {
    let doc = [
        "01 Certain Infectious or Parasitic Diseases Start",
        "   Gastroenteritis and Colitis oF Infectious Origin Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.UnKnownToken);
    expect(res.more).toBe("Unknown token \"Gastroenteritis and Colitis oF Infectious Origin\" at line 2");

});
