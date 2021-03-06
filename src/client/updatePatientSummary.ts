import {findTokenFromUnknownStart,ICDItem,ICDGenericToken,ICDSection,getAllChildItems} from "./../req/editor/icdToken";
import {buildDocumentAST} from "./../req/editor/documentAST";

import {$01} from "./../req/editor/sections/01";
import {$02} from "./../req/editor/sections/02";

import {$FirstName} from "./../req/editor/sections/00/firstName";
import {$LastName} from "./../req/editor/sections/00/lastName";

import {$Address} from "./../req/editor/sections/00/address";
import {$City} from "./../req/editor/sections/00/city";
import {$Province} from "./../req/editor/sections/00/province";

import {$SocialInsuranceNumber} from "./../req/editor/sections/00/socialInsuranceNumber";
import {$HealthCareNumber} from "./../req/editor/sections/00/healthCareNumber";

import {$To} from "./../req/editor/sections/02/to";
import {$Type} from "./../req/editor/sections/02/type";
import {$Ordered} from "./../req/editor/sections/02/ordered";
import {$Completed} from "./../req/editor/sections/02/completed";

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
    let $01Section = new $01();
    let $02Section = new $02();

    let firsNameToken = new $FirstName(undefined);
    let lastNameToken = new $LastName(undefined);

    let addressToken = new $Address(undefined);
    let cityToken = new $City(undefined);
    let provinceToken = new $Province(undefined);

    let socialInsuranceNumberToken = new $SocialInsuranceNumber(undefined);
    let healthCareNumberToken = new $HealthCareNumber(undefined);

    let toToken = new $To(undefined);
    let typeToken = new $Type(undefined);
    let orderedToken = new $Ordered(undefined);
    let completedToken = new $Completed(undefined);

    let docAST = buildDocumentAST(doc);
    console.log(docAST);

    let firstNameText = getUserValueForToken(docAST,firsNameToken);
    let lastNameText = getUserValueForToken(docAST,lastNameToken);

    let addressText = getUserValueForToken(docAST,addressToken);
    let cityText = getUserValueForToken(docAST,cityToken);
    let provinceText = getUserValueForToken(docAST,provinceToken);

    let socialInsuranceNumberText = getUserValueForToken(docAST,socialInsuranceNumberToken);
    let healthCareNumberText = getUserValueForToken(docAST,healthCareNumberToken);

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

    for(let i = 0; i != docAST.length; ++i)
    {
        if((<ICDSection[]>docAST)[i].completionItem.label == $01Section.completionItem.label)
        {
            res += `<p>Individual Ailments</p>`;
            let allItems = getAllChildItems((<ICDSection[]>docAST)[i]);
            for(let i = 0 ; i != allItems.length; ++i)
            {
                res += `<div title="${allItems[i].completionItem.documentation}"><a class="tooltipText tooltipTextHover">${allItems[i].completionItem.label}</a></div>`;
            }
        }
    }

    for(let i = 0; i != docAST.length; ++i)
    {
        if((<ICDSection[]>docAST)[i].completionItem.label == $02Section.completionItem.label)
        {
            let referrals = (<ICDSection[]>docAST)[i];
            for(let k = 0; k != referrals.childSections.length; ++k)
            {
                for(let j = 0; j != referrals.childSections[k].childItems.length; ++j)
                {
                    if(referrals.childSections[k].childItems[j].completionItem.label == toToken.completionItem.label)
                    {
                        let toText = getUserValueForToken([referrals.childSections[k]],toToken);
                        let typeText = getUserValueForToken([referrals.childSections[k]],typeToken);
                        let orderedText = getUserValueForToken([referrals.childSections[k]],orderedToken);
                        let completedText = getUserValueForToken([referrals.childSections[k]],completedToken);

                        if(toText && typeText)
                        {
                            res += `<hr style="width:100%;" />`;
                            res += `<p>Referral to ${toText} for ${typeText}</p>`;
                            res += `<p>Ordered on ${orderedText}</p>`;
                            res += `<p>Completed on ${completedText}</p>`;
                            res += `<hr style="width:100%;" />`;
                        }
                    }
                }
            }
        }
    }


    div!.innerHTML = res;
}