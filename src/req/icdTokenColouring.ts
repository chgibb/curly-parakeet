/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />


import {ICDTokenID} from "./icdTokenID";

export interface ICDTokenThemeRule extends monaco.editor.ITokenThemeRule
{
    token : ICDTokenID;
}  

export function getICDTokenColouring() : Array<ICDTokenThemeRule>
{
    let res : Array<ICDTokenThemeRule> = new Array<ICDTokenThemeRule>();

    res.push(<ICDTokenThemeRule>{
        token : "icd11.SectionTopHeader",
        foreground : "4542f4"
    });

    res.push(<ICDTokenThemeRule>{
        token : "icd11.Start",
        foreground : "ac41f4"
    });

    res.push(<ICDTokenThemeRule>{
        token : "icd11.End",
        foreground : "ac41f4"
    });

    return res;
}