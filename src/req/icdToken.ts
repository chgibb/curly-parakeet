/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />

import {ICDTokenID} from "./icdTokenID";

export class ICDGenericToken
{
    public regExp : RegExp;
    public tokenType : ICDTokenID;
}

class ICDAttributes extends ICDGenericToken
{
    public description : string;
    public completionItem : monaco.languages.CompletionItem;
}

export class ICDSection extends ICDAttributes
{
    public childSections : Array<ICDSection>;
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