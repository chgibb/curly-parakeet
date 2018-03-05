import {autoComplete} from "./../../src/req/editor/autoComplete";
import {Now,ICDCompletionItem} from "./../../src/req/editor/icdToken";

let nowToken = new Now();

it(`should autocomplete now 1`,() => {
    let doc = [
        "00 Parent Information Start",
        "   - Address: ",
    ].join("\n");

    let res : void | ICDCompletionItem[] = autoComplete(doc);

    expect((<ICDCompletionItem[]>res!).length).toBe(1);

    expect((<ICDCompletionItem[]>res!)[0].label).toBe(nowToken.completionItem.label);

});