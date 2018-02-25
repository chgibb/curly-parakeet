import {PatientRecord} from "./../req/patientRecord";

import {findTokenFromUnknownStart, ICDItem} from "./../req/editor/icdToken";
import {buildDocumentAST} from "./../req/editor/documentAST";
import {$FirstName} from "./../req/editor/sections/00/firstName";
import {$LastName} from "./../req/editor/sections/00/lastName";

export function updatePatientList(patients : Array<PatientRecord>,listClick : (this : any) => void) : Promise<void>
{
    return new Promise<void>(async (resolve,reject) => {

        let div = document.getElementById("patientsListContainer")!;

        let firsNameToken = new $FirstName(undefined);
        let lastNameToken = new $LastName(undefined);

        let res = "<br /><br /><ul id='list_patients' data-role='listview'>";
        for(let i = 0; i != patients.length; ++i)
        {
            res += `<li class="activeHover" id="${patients[i].id}">`;
            let docAST = buildDocumentAST(patients[i].doc);
            res += (findTokenFromUnknownStart(
                docAST,
                (firsNameToken.completionItem.insertText! as string).trim()
            ) as ICDItem).userValue;
        
            res += " ";

            res += (findTokenFromUnknownStart(
                docAST,
                (lastNameToken.completionItem.insertText! as string).trim()
            ) as ICDItem).userValue;

            res += "</li>";
        }
        res += "</ul>";
        div.innerHTML = res;
        ($("#patientsListContainer") as any).trigger("create");
        ($("#list_patients") as any).listview("refresh").delegate("li","click",listClick);
    });
}