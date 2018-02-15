import * as React from "react";
import {Route,HashRouter} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Login} from "./login";
import {PatientList} from "./patientList";

export class Main extends React.Component
{
    public render() : JSX.Element
    {
        return (
            <div>
            <   MuiThemeProvider>
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Login} />
                            <Route path="/patientList" component={PatientList} />
                        </div>
                    </HashRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}