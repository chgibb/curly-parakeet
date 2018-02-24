import {makeHash} from "./makeHash";

export interface CreateUserRequest
{
    userName : string;
    password : string;
}
    export function makeCreateUserRequest(params : CreateUserRequest) : Promise<void>
    {
        return new Promise<void>((resolve,reject) => {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            xhr.open("POST", "/createUser");

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function(this : XMLHttpRequest,ev : Event){
                if(xhr.status != 201)
                    return reject();
                else
                    return resolve();
            } as any;

            xhr.send(JSON.stringify(<CreateUserRequest>{
                userName : params.userName,
                password : makeHash(params.password)
            }));
        });
    }