import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
const connectMongo = require("connect-mongo");
const mongoose = require("mongoose");

const mongoStore = connectMongo(session);

const app = express();

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log("connected to db");
});

app.use(session({
    secret : "curly",
    resave : true,
    saveUninitialized : false,
    store : new mongoStore({
        mongooseConnection : db
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static("./"));

app.post("/login",function(req : any,res : any){
    console.log(req.body);
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


  