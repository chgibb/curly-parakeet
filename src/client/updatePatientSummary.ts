import {findTokenFromUnknownStart,ICDItem,ICDGenericToken,ICDSection} from "./../req/editor/icdToken";
import {buildDocumentAST} from "./../req/editor/documentAST";
import {$FirstName} from "./../req/editor/sections/00/firstName";
import {$LastName} from "./../req/editor/sections/00/lastName";
import {$Address} from "./../req/editor/sections/00/address";

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

    let docsAST = buildDocumentAST(doc);

    let firstNameText = getUserValueForToken(docsAST,firsNameToken);
    let lastNameText = getUserValueForToken(docsAST,lastNameToken);

    let addressText = getUserValueForToken(docsAST,addressToken);

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

    

    if(addressText)
        res += `<p>${addressText}</p>`;

    div!.innerHTML = res;
}