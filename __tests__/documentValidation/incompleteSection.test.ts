import {validate,DocumentStatusCode} from "./../../src/req/editor/validate";

it(`should not allow incomplete section 1`,() => {
    let doc = [
        "02 Referrals Start",
        "   Referral Start",
        "      - To: Dr. Mago",
        "   End",
        "   Referral Start",
        "       - To: Dr. Benson",
        "       - Type: Computing",
        "   End",
        "End"
    ];

    let res = validate(doc.join("\n"));

    expect(res.code).toBe(DocumentStatusCode.IncompleteSection);
});

it(`should not allow incomplete section 1`,() => {
    let doc = [
        "02 Referrals Start",
        "   Referral Start",
        "      - To: Dr. Mago",
        "       - Type: Computing",
        "   End",
        "   Referral Start",
        "       - To: Dr. Benson",
        "   End",
        "End"
    ];

    let res = validate(doc.join("\n"));

    expect(res.code).toBe(DocumentStatusCode.IncompleteSection);
});