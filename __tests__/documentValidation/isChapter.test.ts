/// <reference types="ts-jest" />

import {validate,DocumentStatus,DocumentStatusCode} from "./../../src/req/validate";
import {buildMonarchTokens,getTokenLayout} from "../../src/req/treeLayout";
import {findTokenFromUnknownStart,ICDItem,ICDSection} from "../../src/req/icdToken";

let tokens = buildMonarchTokens(getTokenLayout(),true);
for(let i = 0; i != tokens.length; ++i)
{
    if((<string>tokens[i][2]))
    {
        let res : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[i][2]));
        if(res!.tokenType != "icd11.SectionTopHeader")
        {
            it(`should not validate "${tokens[i][2]}" as a chapter`,() => {
                if((<string>tokens[i][2]))
                {
            
                    let doc : Array<string> = new Array<string>();

                    doc.push(res!.completionItem.label);
                    let valRes : DocumentStatus = validate(doc.join("\n"));

                    expect(valRes.code).toBe(DocumentStatusCode.UnExpectedToken);
                }
        
            });
        }
    }
}

for(let i = 0; i != tokens.length; ++i)
{
    if((<string>tokens[i][2]))
    {
        let res : ICDSection | ICDItem | undefined = findTokenFromUnknownStart(getTokenLayout(),(<string>tokens[i][2]));
        if(res!.tokenType == "icd11.SectionTopHeader")
        {
            it(`should validate "${tokens[i][2]}" as a chapter`,() => {
                if((<string>tokens[i][2]))
                {
            
                    let doc : Array<string> = new Array<string>();

                    doc.push(res!.completionItem.label);
                    let valRes : DocumentStatus = validate(doc.join("\n"));

                    expect(valRes.code).toBe(DocumentStatusCode.Valid);
                }
        
            });
        }
    }
}