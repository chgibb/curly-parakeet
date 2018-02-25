/// <reference path="./../../../node_modules/monaco-editor/monaco.d.ts" />

import {MonacoLoader} from "./monacoLoader";

import {validate} from "./validate";
import {autoComplete} from "./autoComplete";
import {getICDTokenColouring} from "./icdTokenColouring";
import {getTokenLayout,buildMonarchTokens} from "./treeLayout"
import {buildDocumentAST} from "./documentAST";

let errorMonitor : NodeJS.Timer;

export function stopErrorMonitor() : void
{
    clearTimeout(errorMonitor);
}

let onValidDocument : (doc : string) => void | undefined;
export function setOnValidDocument(cb : (doc : string) => void) : void
{
    onValidDocument = cb;
}

export function loadICDEditor(
    div : HTMLElement | null,
    errorOutput : HTMLElement | null
) : Promise<monaco.editor.IStandaloneCodeEditor> {
    if(!div)
        throw new Error("Editor container is null");
    if(!errorOutput)
        throw new Error("Error output container is null");

    return new Promise<monaco.editor.IStandaloneCodeEditor>(async (resolve) => {
        let loader : MonacoLoader = new MonacoLoader();
        await loader.loadMonaco();

        monaco.languages.register({
            id : "icd11Language"
        });

        monaco.languages.setMonarchTokensProvider('icd11Language', <monaco.languages.IMonarchLanguage>{
            tokenizer : {
                root : buildMonarchTokens(getTokenLayout(),false)
            },
            tokenPostfix : "."
        });

        monaco.languages.registerCompletionItemProvider("icd11Language",{
            provideCompletionItems : function(model : monaco.editor.IReadOnlyModel,position : monaco.Position){
                try
                {
                    let textUntilPosition = model.getValueInRange({ startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });
                    console.log("textUntilPosition");
                    console.log(textUntilPosition);
                    let item = autoComplete(textUntilPosition);
                    if(item)
                        return item;
                }
                catch(err){}
                return [];
            }
        });

        monaco.editor.defineTheme('icd11Theme',{
            base: 'vs',
            inherit: false,
            rules: getICDTokenColouring(),
            colors : {}
        });
    
        let editor : monaco.editor.IStandaloneCodeEditor = monaco.editor.create(div!, {
            theme: 'icd11Theme',
            value: "",
            language: 'icd11Language',
            autoIndent : true,
            folding : true,
        
        });

        let lastBroadcastDoc = "";
        errorMonitor = setInterval(function(){
            let status = validate(editor.getValue());
            errorOutput!.innerHTML = `${status.code ? `Error ${status.code}: ` : ""} ${status.more}`;
            if(status.code == 0)
            {
                errorOutput!.style.color = "green";
                if(lastBroadcastDoc != editor.getValue())
                {
                    lastBroadcastDoc = editor.getValue();
                    if(onValidDocument)
                        onValidDocument(lastBroadcastDoc);
                }
            }
            else
                errorOutput.style.color = "red";
        },1000);

        editor.onDidDispose(function(){
            console.log("called ondiddispose");
            clearInterval(errorMonitor);
        });

        resolve(editor);
    }); 
}