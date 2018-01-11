/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDTokenID} from "./icdTokenID";

export interface CompletionItem extends monaco.languages.CompletionItem
{

}

export enum CompletionItemKind 
{
    Text = 0,
    Method = 1,
    Function = 2,
    Constructor = 3,
    Field = 4,
    Variable = 5,
    Class = 6
}

export class ICDGenericToken
{
    public regExp : RegExp;
    public tokenType : ICDTokenID;
}

class ICDAttributes extends ICDGenericToken
{
    public description : string;
    public completionItem : CompletionItem;
}

export class ICDSection extends ICDAttributes
{
    public childSections : Array<ICDSection>;
    public childItems : Array<ICDItem>;
    public items : Array<ICDItem>;

    public constructor()
    {
        super();
        this.childSections = new Array<ICDSection>();
    }
}

export class ICDItem extends ICDAttributes
{
    public rawCode : string;
    
    public constructor()
    {
        super();
    }
}

export class Start extends ICDGenericToken
{
    public constructor()
    {
        super();
        this.regExp = /(Start)/;
        this.tokenType = "icd11.Start";
    }
}

export class End extends ICDGenericToken
{
    public constructor()
    {
        super();
        this.regExp = /(End)/;
        this.tokenType = "icd11.End";
    }
}