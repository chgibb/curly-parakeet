import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/editor/validate";

it(`should be all good 1`,() => {
    let doc = [
        "01 ICD Coding Start",
        "   01 Certain Infectious or Parasitic Diseases Start",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.Valid);
});

it(`should be all good 2`,() => {
    let doc = [
        "01 ICD Coding Start",
        "   01 Certain Infectious or Parasitic Diseases Start",
        "       Gastroenteritis and Colitis of Infectious Origin Start",
        "       End",
        "   End",
        "End"
    ].join("\n");

    let res : DocumentStatus = validate(doc);

    expect(res.code).toBe(DocumentStatusCode.Valid);
});