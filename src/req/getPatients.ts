import {PatientRecord} from "./patientRecord";

export interface GetPatientsRequest
{
    token : string;
}

export interface GetPatientsResponse
{
    patients : Array<PatientRecord>;
}

export function makeGetPatientsRequest(params : GetPatientsRequest) : Promise<GetPatientsResponse>
{
    return new Promise<GetPatientsResponse>((resolve,reject) => {
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        xhr.open("POST", "/getPatients");

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";

        xhr.onreadystatechange = function(this : XMLHttpRequest,ev : Event){
            console.log(xhr);
            console.log(ev);

            if(xhr.status == 401)
                return reject();
            
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201)
            {
                return resolve(xhr.response as GetPatientsResponse);
            }
        } as any;

        xhr.send(JSON.stringify(params));
    });
}