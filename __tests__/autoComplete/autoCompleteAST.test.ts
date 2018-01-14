/// <reference types="ts-jest" />

import {findTokenFromUnknownStart,findToken, ICDSection, ICDItem,ICDAttributes, ICDCompletionItem} from "./../../src/req/icdToken";
import {getTokenLayout,buildMonarchTokens} from "./../../src/req/treeLayout";
import {autoComplete} from "./../../src/req/autoComplete";
import {ICDTokenID} from "../../src/req/icdTokenID";

let tokens = buildMonarchTokens(getTokenLayout());
for(let i = 0; i != tokens.length; ++i)
{
    //ensure every token in the AST layout is actually reachable
    it(`should be able to autocomplete "${tokens[i][2]}" and its siblings`,() => {
        if((<string>tokens[i][2]))
        {
            let res : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[i][2]));
            let current : ICDAttributes = res!;
            let doc : Array<string> = new Array<string>();
            
            //assemble a document consisting of all of the parent sections leading to token[i]
            doc.push(" ");
            if(current.parent)
            {
                while(current.parent)
                {
                    doc.push(current.parent.completionItem.label+" Start");
                    current = current.parent;
                }
            }
            //flip upside down, into the right order
            doc = doc.reverse();
            
            //autocompleted result
            let completed : void | Array<ICDCompletionItem> = autoComplete(doc.join("\n"));

            //expected autocomplete result
            let siblings : Array<ICDCompletionItem> = new Array<ICDCompletionItem>();

            //not at the top of the tree
            //should autcomplete all siblings at the current level we're at
            if(res!.parent)
            {
                if((<ICDSection>res!.parent).childSections)
                {
                    for(let i = 0; i != (<ICDSection>res!.parent).childSections.length; ++i)
                    {
                        siblings.push((<ICDSection>res!.parent).childSections[i].completionItem);
                    }
                }

                if((<ICDSection>res!.parent).childItems)
                {
                    for(let i = 0; i != (<ICDSection>res!.parent).childItems.length; ++i)
                    {
                        siblings.push((<ICDSection>res!.parent).childItems[i].completionItem);
                    }
                }
            }

            //at the top of the tree
            //should only autocomplete for the topmost chapter headers
            else
            {
                for(let k = 0; k != tokens.length; ++k)
                {
                    if(tokens[k][1] == <ICDTokenID>"icd11.SectionTopHeader")
                    {
                        let fullToken : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[k][2]));
                        siblings.push(fullToken!.completionItem);
                    }
                }
            }
            expect(completed).toEqual(siblings);
        }
    });
}
