import {findTokenFromUnknownStart, ICDItem} from "./../req/editor/icdToken";
import {buildDocumentAST} from "./../req/editor/documentAST";
import {$FirstName} from "./../req/editor/sections/00/firstName";
import {$LastName} from "./../req/editor/sections/00/lastName";

export function updatePatientSummary(div : HTMLElement | null,doc : string) : void
{
    let firsNameToken = new $FirstName(undefined);
    let lastNameToken = new $LastName(undefined);

    let docsAST = buildDocumentAST(doc);

    let res = "";

    res += "<p>";
    res += (findTokenFromUnknownStart(
        docsAST,
        (firsNameToken.completionItem.insertText! as string).trim()
    ) as ICDItem).userValue;
    res += " ";
    res += (findTokenFromUnknownStart(
        docsAST,
        (lastNameToken.completionItem.insertText! as string).trim()
    ) as ICDItem).userValue;
    res += "</p>";

    div!.innerHTML = res;
}