const mongoose = require("mongoose");

import {newSession,getUserFromSession} from "./sessions";

let userSchema = mongoose.Schema({
    userName : String,
    password : String,
    id : String
});

export interface UserAuthResult
{
    err : any;
    token : string;
}

userSchema.methods.authenticate = function(
    userName : string,
    password : string
) : Promise<UserAuthResult> {
    return new Promise<UserAuthResult>((resolve,reject) => {
        let res : UserAuthResult = {err : undefined,token : undefined};
        userModel.findOne({
            userName : userName
        }).exec(function(err : Error,user : any){
            if(err)
            {
                res.err = err;
                return resolve(res);
            }
            else if(!user)
            {
                let err = new Error("user not found");
                (<any>err).status = 401;
                res.err = err;
                return resolve(res);
            }
            if(password == user.password)
            {
                let token = newSession(user.id);
                if(token)
                    res.token = token;
                res.success = true;
                return resolve(res);
            }
        });
    });
}

export let userModel = mongoose.model("userModel",userSchema);