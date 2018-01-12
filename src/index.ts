/// <reference path="./../node_modules/monaco-editor/monaco.d.ts" />

import {MonacoLoader} from "./req/monacoLoader";

import {validate} from "./req/validate";
import {autoComplete} from "./req/autoComplete";
import {getICDTokenColouring} from "./req/icdTokenColouring";
import {getTokenLayout,buildMonarchTokens} from "./req/treeLayout"

(async function(){
    let loader : MonacoLoader = new MonacoLoader();
    await loader.loadMonaco();

    monaco.languages.register({
        id : "icd11Language"
    });

    monaco.languages.setMonarchTokensProvider('icd11Language', <monaco.languages.IMonarchLanguage>{
        tokenizer : {
            root : buildMonarchTokens(getTokenLayout())
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

    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme('icd11Theme',{
        base: 'vs',
        inherit: false,
        rules: getICDTokenColouring(),
        colors : {}
    });
    
    let editor : monaco.editor.IStandaloneCodeEditor = monaco.editor.create(document.getElementById('container')!, {
        theme: 'icd11Theme',
        value: "",
        language: 'icd11Language',
        autoIndent : true
    });

    setInterval(function(){
        let status = validate(editor.getValue());
        document.getElementById("documentStatus")!.innerHTML = `${status.code ? `Error ${status.code}: ` : ""} ${status.more}`;
    },1000);

})().catch((err) => {
    throw err;
});
