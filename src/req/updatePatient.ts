import {PatientRecord} from "./patientRecord";

export interface UpdatePatientRequest
{
    record : PatientRecord;
    token : string;
}

export function makeUpdatePatientRequest(params : UpdatePatientRequest) : Promise<void>
{
    return new Promise<void>((resolve,reject) => {
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        xhr.open("POST", "/updatePatient");

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";

        xhr.onreadystatechange = function(this : XMLHttpRequest,ev : Event){
            console.log(xhr);
            console.log(ev);

            if(xhr.status == 401)
                return reject();
            
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201)
            {
                return resolve();
            }
        } as any;

        xhr.send(JSON.stringify(params));
    });
}