import * as express from "express";
import * as bodyParser from "body-parser";
//import * as mongoose from "mongoose";
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
