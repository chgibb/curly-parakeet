import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";

import {LoginRequest} from "./req/loginRequest";
import {authenticate,newUser} from "./server/authenticate";
import {CreateUserRequest} from "./req/createUserRequest";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static("./"));

app.post("/login",async function(req : any,res : any){
    console.log(req.body);

    let body = (<LoginRequest>req.body);

    let authResult = await authenticate(body.userName,body.password);

    console.log(authResult);

    if(!authResult)
      res.status(401);

    else
      res.status(200);

    res.send();
});

app.post("/createUser",async function(req : any,res : any){
  console.log(req.body);

  let body = (<CreateUserRequest>req.body);

  let result = await newUser(body.userName,body.password);

  if(result)
    res.status(201);

  res.send();
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
