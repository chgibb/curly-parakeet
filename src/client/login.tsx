import * as React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect} from "react-router";

const style = {
  margin: 12,
};

export class Login extends React.Component
{
    public state = {
        redirectToReferrer : false
    };

    public login = () => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/login");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
        /*this.setState(() => ({
            redirectToReferrer : true
        }));*/
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
                <TextField hintText="User Name" />
                <br />
                <TextField hintText="Password" />

                <RaisedButton label="Login" style={style} onClick={this.login} />
            </div>
        );
    }
}