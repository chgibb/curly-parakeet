/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />


import {ICDTokenID} from "./icdTokenID";

/**
 * Adds properties to monaco's token themeing rules
 * 
 * @export
 * @interface ICDTokenThemeRule
 * @extends {monaco.editor.ITokenThemeRule}
 */
export interface ICDTokenThemeRule extends monaco.editor.ITokenThemeRule
{
    token : ICDTokenID;
}  

/**
 * Returns all themeing rules used 
 * 
 * @export
 * @returns {Array<ICDTokenThemeRule>} 
 */
export function getICDTokenColouring() : Array<ICDTokenThemeRule>
{
    let res : Array<ICDTokenThemeRule> = new Array<ICDTokenThemeRule>();

    res.push(<ICDTokenThemeRule>{
        token : "icd11.SectionTopHeader",
        foreground : "4542f4"
    });

    res.push(<ICDTokenThemeRule>{
        token : "icd11.SectionHeader",
        foreground : "16f7b0"
    });

    res.push(<ICDTokenThemeRule>{
        token : "icd11.Start",
        foreground : "ac41f4"
    });

    res.push(<ICDTokenThemeRule>{
        token : "icd11.End",
        foreground : "ac41f4"
    });

    res.push(<ICDTokenThemeRule>{
        token : "icd11.item",
        foreground : "9877f9"
    });

    return res;
}