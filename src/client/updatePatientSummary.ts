import {findTokenFromUnknownStart,ICDItem,ICDGenericToken,ICDSection,getAllChildItems} from "./../req/editor/icdToken";
import {buildDocumentAST} from "./../req/editor/documentAST";

import {$FirstName} from "./../req/editor/sections/00/firstName";
import {$LastName} from "./../req/editor/sections/00/lastName";

import {$Address} from "./../req/editor/sections/00/address";
import {$City} from "./../req/editor/sections/00/city";
import {$Province} from "./../req/editor/sections/00/province";

import {$SocialInsuranceNumber} from "./../req/editor/sections/00/socialInsuranceNumber";
import {$HealthCareNumber} from "./../req/editor/sections/00/healthCareNumber";

function getUserValueForToken(ast : Array<ICDGenericToken | ICDSection>,token : ICDItem) : string
{
    let tokenFromAST = (findTokenFromUnknownStart(
        ast,
        (token.completionItem.insertText! as string).trim()
    ) as ICDItem);

    if(tokenFromAST)
        return tokenFromAST.userValue;
    return "";
}

export function updatePatientSummary(div : HTMLElement | null,doc : string) : void
{
    let firsNameToken = new $FirstName(undefined);
    let lastNameToken = new $LastName(undefined);

    let addressToken = new $Address(undefined);
    let cityToken = new $City(undefined);
    let provinceToken = new $Province(undefined);

    let socialInsuranceNumberToken = new $SocialInsuranceNumber(undefined);
    let healthCareNumberToken = new $HealthCareNumber(undefined);

    let docsAST = buildDocumentAST(doc);

    let firstNameText = getUserValueForToken(docsAST,firsNameToken);
    let lastNameText = getUserValueForToken(docsAST,lastNameToken);

    let addressText = getUserValueForToken(docsAST,addressToken);
    let cityText = getUserValueForToken(docsAST,cityToken);
    let provinceText = getUserValueForToken(docsAST,provinceToken);

    let socialInsuranceNumberText = getUserValueForToken(docsAST,socialInsuranceNumberToken);
    let healthCareNumberText = getUserValueForToken(docsAST,healthCareNumberToken);

    let res = "";

    if(firstNameText || lastNameText)
    {
        res += "<p>";
        res += firstNameText;
        res += " ";
        res += lastNameText;
        res += "</p>";
        res += `<hr style="width:100%;" />`;
    }

    if(addressText && cityText && provinceText)
    {
        res += `<p>${addressText}, ${cityText}, ${provinceText}</p>`;
        res += `<hr style="width:100%;" />`;
    }

    else
    {
        if(addressText)
            res += `<p>${addressText}</p>`;
        if(cityText)
            res += `<p>${cityText}</p>`;
        if(provinceText)
            res += `<p>${provinceText}</p>`;
    }

    if(socialInsuranceNumberText)
        res += `<p>SIN: ${socialInsuranceNumberText}</p>`;
    if(healthCareNumberText)
        res += `<p>HCN: ${healthCareNumberText}</p>`;

    if(socialInsuranceNumberText && healthCareNumberText)
    {
        res += `<hr style="width:100%;" />`;
    }

    if(docsAST[1])
    {
        let allItems = getAllChildItems(docsAST[1] as ICDSection);
        for(let i = 0 ; i != allItems.length; ++i)
        {
            res += `<div title="${allItems[i].completionItem.documentation}"><p>${allItems[i].completionItem.label}</p></div>`;
        }
    }


    div!.innerHTML = res;
}