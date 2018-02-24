import {makeHash} from "./makeHash";

export interface LoginRequest
{
    userName : string;
    password : string;
}

export interface LoginResponse
{
    token : string;
}

export function makeLoginRequest(params : LoginRequest) : Promise<LoginResponse>
{
    return new Promise<LoginResponse>((resolve,reject) => {
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        xhr.open("POST", "/login");

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";

        xhr.onreadystatechange = function(this : XMLHttpRequest,ev : Event){
            console.log(xhr);
            console.log(ev);
            
            if(xhr.status == 401)
                return reject();
            
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
            {
                return resolve(xhr.response as LoginResponse);
            }
        } as any;

        xhr.send(JSON.stringify(<LoginRequest>{
            userName : params.userName,
            password : makeHash(params.password)
        }));
    });
}