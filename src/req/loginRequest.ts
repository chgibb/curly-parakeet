import {makeHash} from "./makeHash";

export interface LoginRequest
{
    userName : string;
    password : string;
}

export function makeLoginRequest(params : LoginRequest) : Promise<string>
{
    return new Promise<string>((resolve,reject) => {
        let xhr : XMLHttpRequest = new XMLHttpRequest();

        xhr.open("POST", "/login");

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange(function(this : XMLHttpRequest,ev : Event){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
            {
                let res;
            }
        } as any);

        xhr.send(JSON.stringify(<LoginRequest>{
            userName : params.userName,
            password : makeHash(params.password)
        }));
    });
}