import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
const uuidv4 : () => string = require("uuid/v4");

import {write, find} from "./server/store/store";

import {LoginRequest, LoginResponse} from "./req/loginRequest";
import {authenticate,newUser,getIDFromToken} from "./server/authenticate";
import {CreateUserRequest} from "./req/createUserRequest";
import {NewPatientRequest} from "./req/newPatient";
import {PatientRecord} from "./req/patientRecord";
import {GetPatientsRequest,GetPatientsResponse} from "./req/getPatients";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static("./"));

app.post("/login",async function(req : any,res : any){
    res.type("json");
    console.log(req.body);

    let body = (<LoginRequest>req.body);

    let authResult = await authenticate(body.userName,body.password);

    console.log(authResult);

    if(!authResult)
    {
      res.sendStatus(401);
      return;
    }

    else
    {
      res.status(200);
      res.json(<LoginResponse>{token : authResult});
      return;
    }
});

app.post("/createUser",async function(req : any,res : any){
  console.log(req.body);

  let body = (<CreateUserRequest>req.body);

  let result = await newUser(body.userName,body.password);

  if(result)
    res.status(201);

  res.send();
});

app.post("/newPatient",async function(req : any,res : any){

  console.log(req.body);

  let body = (<NewPatientRequest>req.body);

  let id = getIDFromToken(body.token);

  if(!id)
  {
    res.sendStatus(401);
    return;
  }

  else
  {
    let patient = <PatientRecord>{
      userID : id,
      id : uuidv4(),
      doc : [
        "00 Patient Information Start",
        "    - First Name: John",
        "    - Last Name: Smith",
        "End"
      ].join("\n")
    };

    write<PatientRecord>("db/patients.json",patient);

  }

  res.sendStatus(201);
  
});

app.post("/getPatients",async function(req : any,res : any){
  res.type("json");
  console.log(req.body);

  let body = (<GetPatientsRequest>req.body);

  let id = getIDFromToken(body.token);

  if(!id)
  {
    res.sendStatus(401);
    return;
  }

  let patients = new Array<PatientRecord>();

  await find<PatientRecord>("db/patients.json",function(item : PatientRecord){
    if(item.userID == id)
      patients.push(item);
    return false;
  });

  res.status(201);

  res.send(<GetPatientsResponse>{
    patients : patients
  });

});

app.use(function(req : any,res : any,next : any){
    let err = new Error('File Not Found');
    (<any>err).status = 404;
    next(err);
} as any);

app.use(function(err : any, req : any, res : any, next : any){
    res.status = (err.status || 500);
    res.send(err.message);
  } as any);

app.listen(8888,function(){

});
