/// <reference types="ts-jest" />

import {findTokenFromUnknownStart,findToken, ICDSection, ICDItem} from "./../../src/req/icdToken";
import {getTokenLayout,buildMonarchTokens} from "./../../src/req/treeLayout";

let tokens = buildMonarchTokens(getTokenLayout());
for(let i = 0; i != tokens.length; ++i)
{
    //ensure every token in the AST layout is actually reachable
    it(`should be able to find token ${tokens[i][2]}`,() => {
        if((<string>tokens[i][2]))
        {
            let res : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[i][2]));
            expect((<ICDItem>res).completionItem.label).toBe((<string>tokens[i][2]));
        }
    });
}
