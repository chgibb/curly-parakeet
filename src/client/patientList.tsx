import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from "react-router";

import {getCurrentToken} from "./authToken";
import {makeNewPatientRequest} from "./../req/newPatient";
import {makeGetPatientsRequest} from "./../req/getPatients";
import {PatientRecord} from "./../req/patientRecord";

export class PatientList extends React.Component
{
    public state = {
        patients : [] as PatientRecord[]
    };

    public newPatient = async () => {
        try
        {
            await makeNewPatientRequest({
                token : getCurrentToken()
            });

            let res = await makeGetPatientsRequest({
                token : getCurrentToken()
            });
            this.setState(() => ({
                patients : res.patients
            }));
        }

        catch(err)
        {
            alert("failed to create new patient");
        }
    }

    public render() : JSX.Element
    {
        console.log(this.state.patients);
        if(this.state.patients.length == 0)
        {
            console.log('called');
            return(
                <div>
                    <RaisedButton label="New Patient" onClick={this.newPatient} />
                    <br />
                    <h1>No patients</h1>
                </div>
            );
        }
        return (
            <div>
                <RaisedButton label="New Patient" onClick={this.newPatient} />
                {
                    this.state.patients.map((value : PatientRecord,index : number) => {
                        return <p>name</p>
                    })
                }
            </div>
        );
    }
}