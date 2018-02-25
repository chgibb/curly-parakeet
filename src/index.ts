import {changePage} from "./client/jqm";

import {setCurrentToken,getCurrentToken} from "./client/authToken";
import {makeLoginRequest} from "./req/loginRequest";
import {makeCreateUserRequest} from "./req/createUserRequest";
import {makeNewPatientRequest,NewPatientRequest} from "./req/newPatient";
import {PatientRecord} from "./req/patientRecord";
import {updatePatientList} from "./client/updatePatientList";
import {makeGetPatientsRequest,GetPatientsRequest} from "./req/getPatients";

import {loadICDEditor} from "./req/editor/loadICDEditor";

let patientListOnClick = async function(this : any){
    let id = $(this).attr("id");
    changePage("#page_editPatient");
    let editor = await loadICDEditor(
        document.getElementById("editor")!,
        document.getElementById("documentStatus")!
    );
    for(let i = 0; i != patients.length; ++i)
    {
        if(patients[i].id == id)
        {
            editor.setValue(patients[i].doc);
            return;
        }
    }
};

async function updatePatients()
{
    let response = await makeGetPatientsRequest(<GetPatientsRequest>{
        token : getCurrentToken()
    });

    patients = response.patients;
}

let patients : Array<PatientRecord>;

document.addEventListener(
    "DOMContentLoaded",async (e : Event) => {
        
        document.getElementById("button_login")!.onclick = async function(this : HTMLElement,ev : MouseEvent){
            try
            {
                let response = await makeLoginRequest({
                    userName : (document.getElementById("input_userName") as HTMLInputElement).value,
                    password : (document.getElementById("input_passWord") as HTMLInputElement).value,
                });
                if(response.token)
                {
                    setCurrentToken(response.token);
                    changePage("#page_patientList");
                }
            }
            catch(err)
            {
                alert("login failed");
            }
        };

        document.getElementById("button_createUser")!.onclick = async function(this : HTMLElement,ev : MouseEvent){
            try
            {
                let response = await makeCreateUserRequest({
                    userName : (document.getElementById("input_userName") as HTMLInputElement).value,
                    password : (document.getElementById("input_passWord") as HTMLInputElement).value,
                })
            }
            catch(err)
            {
                alert("creating a new user failed");
                return;
            }
            alert(`User ${(document.getElementById("input_userName") as HTMLInputElement).value} successfully created`);
        };

        document.getElementById("button_createNewPatient")!.onclick = async function(this : HTMLElement,ev : MouseEvent){
            try
            {
                await makeNewPatientRequest(<NewPatientRequest>{
                    token : getCurrentToken()
                });
            }
            catch(err)
            {
                alert("Creating new patient failed");
                return;
            }

            await updatePatients();
            await updatePatientList(patients,patientListOnClick);
            
        };

        document.getElementById("button_backToPatientList")!.onclick = async function(this : HTMLElement,ev : MouseEvent){
            changePage("#page_patientList");

            await updatePatients();
            await updatePatientList(patients,patientListOnClick);
        };

    }
);