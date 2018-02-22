import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";

import {userModel,AuthenticateUser} from "./server/user";
import {LoginRequest} from "./req/loginRequest";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static("./"));

app.post("/login",async function(req : any,res : any){
    let body = (<LoginRequest>req.body);
    console.log(body);
    console.log(await (<AuthenticateUser>userModel.authenticate)(body.userName,body.password));
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


  