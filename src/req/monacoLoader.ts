/*
    This module is adapted from answer by ProTip on 11 Sep 2017
    https://github.com/Microsoft/monaco-editor/issues/18#issuecomment-324592395
    https://github.com/ProTip
*/

/// <reference types="node" />

declare const global: any
const anySelf : any = self;

const nodeRequire : NodeRequire = (<any>global).require;
let amdLoader : any;

export class MonacoLoader
{
    private loaded = false;
    private loadPromise : Promise<void>;
    
    public loadMonaco() : Promise<void>
    {
        if(this.loadPromise)
        {
            return this.loadPromise;
        }
        this.loadPromise = new Promise<void>((resolve) => {
            if(typeof((<any>window).monaco) === "object")
            {
                return resolve();
            }

            let onGotAMDLoader = () => {
                amdLoader = (<any>global).require;
                (<any>global).require = nodeRequire;

                anySelf.module = undefined;

                amdLoader(["vs/editor/editor.main"],() => {
                    this.loaded = true;
                    return resolve();
                });
            };
            let loaderScript = document.createElement("script");
            loaderScript.type = "text/javascript";
            loaderScript.src = "vs/loader.js";
            loaderScript.addEventListener("load",onGotAMDLoader);
            document.body.appendChild(loaderScript);
        });
        return this.loadPromise;
    }
}