import * as React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from "react-router";

import {LoginRequest,makeLoginRequest} from "./../req/loginRequest";
import {makeCreateUserRequest} from "./../req/createUserRequest";

const style = {
  margin: 12,
};

export class Login extends React.Component
{
    public state = {
        redirectToReferrer : false
    };

    public login = async() => {
        try
        {
            await makeLoginRequest({
                userName : (document.getElementById("userField") as HTMLInputElement).value,
                password : (document.getElementById("passwordField") as HTMLInputElement).value
            });
        }
        catch(err)
        {
            alert("Login failed");
        }
        /*this.setState(() => ({
            redirectToReferrer : true
        }));*/
    }

    public createUser = async () => {
        try
        {
            await makeCreateUserRequest({
                userName : (document.getElementById("userField") as HTMLInputElement).value,
                password : (document.getElementById("passwordField") as HTMLInputElement).value
            })
        }
        catch(err)
        {
            alert("Failed to create user");
        }
    }

    public render() : JSX.Element
    {
        if(this.state.redirectToReferrer == true)
        {
            console.log("redirect is true");
            return (
                <Redirect to="/patientList" />
            );
        }
        return (
            <div>
                <TextField id="userField" hintText="User Name" />
                <br />
                <TextField id="passwordField" type="password" hintText="Password" />
                <br />
                <br />
                <RaisedButton label="Create User" style={style} onClick={this.createUser} />
                <RaisedButton label="Login" style={style} onClick={this.login} />
            </div>
        );
    }
}