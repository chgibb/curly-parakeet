/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/editor/validate";
import {buildDocumentAST} from "./../../src/req/editor/documentAST";
import {$Address} from "./../../src/req/editor/sections/00/address";
import { findTokenFromUnknownStart, ICDItem,ICDGenericToken, ICDSection } from "../../src/req/editor/icdToken";

let address = new $Address(undefined);

it(`should parse out the user value`,() => {
    let doc = [
        "00 Patient Information Start",
        "   - Address: 123 Street",
        "End"
    ].join("\n");

    let res = validate(doc);
    let docAST = buildDocumentAST(doc);

    expect(res.code).toBe(DocumentStatusCode.Valid);

    let item = findTokenFromUnknownStart(docAST,(<string>address.completionItem.insertText!).trim());

    expect((<ICDItem>item).userValue).toEqual("123 Street");
});

it(`should parse out nothing`,() => {
    let doc = [
        "00 Patient Information Start",
        "   - Address:",
        "End"
    ].join("\n");

    let res = validate(doc);
    let docAST = buildDocumentAST(doc);

    expect(res.code).toBe(DocumentStatusCode.Valid);

    let item = findTokenFromUnknownStart(docAST,(<string>address.completionItem.insertText!).trim());

    expect((<ICDItem>item).userValue).toEqual("");
});