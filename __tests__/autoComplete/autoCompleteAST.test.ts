/// <reference types="ts-jest" />

import {findTokenFromUnknownStart,findToken, ICDSection, ICDItem,ICDAttributes, ICDCompletionItem} from "./../../src/req/icdToken";
import {getTokenLayout,buildMonarchTokens} from "./../../src/req/treeLayout";
import {autoComplete} from "./../../src/req/autoComplete";

let tokens = buildMonarchTokens(getTokenLayout());
for(let i = 0; i != tokens.length; ++i)
{
    //ensure every token in the AST layout is actually reachable
    it(`should be able to autocomplete ${tokens[i][2]}`,() => {
        if((<string>tokens[i][2]))
        {
            let res : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[i][2]));
            let current : ICDAttributes = res!;
            let doc : Array<string> = new Array<string>();
            if(!current.parent)
            {
                doc.push(current.completionItem.label+" Start");
            }
            else
            {
                while(current.parent)
                {
                    doc.push(current.parent.completionItem.label+" Start");
                    current = current.parent;
                }
            }
            doc = doc.reverse();
            console.log(doc);
            let completed : void | Array<ICDCompletionItem> = autoComplete(doc.join("\n"));
            expect(completed).toBe([(<ICDSection>res!).completionItem]);
        }
    });
}
