import {PatientRecord} from "./../req/patientRecord";
import {makeGetPatientsRequest,GetPatientsRequest} from "./../req/getPatients";
import {getCurrentToken} from "./authToken";

import {findTokenFromUnknownStart, ICDItem} from "./../req/editor/icdToken";
import {buildDocumentAST} from "./../req/editor/documentAST";
import {$FirstName} from "./../req/editor/sections/00/firstName";
import {$LastName} from "./../req/editor/sections/00/lastName";
import {changePage} from "./../client/jqm";

export function updatePatientList() : Promise<void>
{
    return new Promise<void>(async (resolve,reject) => {
        let response = await makeGetPatientsRequest(<GetPatientsRequest>{
            token : getCurrentToken()
        });

        if(response.patients.length == 0)
            return;
        

        let div = document.getElementById("patientsListContainer")!;

        let firsNameToken = new $FirstName(undefined);
        let lastNameToken = new $LastName(undefined);

        let res = "<br /><br /><ul id='list_patients' data-role='listview'>";
        for(let i = 0; i != response.patients.length; ++i)
        {
            res += `<li class="activeHover" id="${response.patients[i].id}">`;
            let docAST = buildDocumentAST(response.patients[i].doc);
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
        ($("#list_patients") as any).listview("refresh").delegate("li","click",function(this : any){
            console.log($(this).attr("id"));
            changePage("#page_editPatient");
        });

        
    });
}