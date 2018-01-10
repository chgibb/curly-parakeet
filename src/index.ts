/// <reference path="./../node_modules/monaco-editor/monaco.d.ts" />

import {MonacoLoader} from "./req/monacoLoader";

import {autoComplete} from "./req/autoComplete";
import {getICDTokenColouring} from "./req/icdTokenColouring";
import {buildTokenLayout,buildMonarchRootTokens} from "./req/treeLayout"

(async function(){
    let loader : MonacoLoader = new MonacoLoader();
    await loader.loadMonaco();

    monaco.languages.register({
        id : "icd11Language"
    });

    monaco.languages.setMonarchTokensProvider('icd11Language', <monaco.languages.IMonarchLanguage>{
        linedcls : [
            "Start"
        ],
        tokenizer : {
            root : buildMonarchRootTokens(buildTokenLayout())
        },
        tokenPostfix : "."
    });

    monaco.languages.registerCompletionItemProvider("icd11Language",{
        provideCompletionItems : function(model : monaco.editor.IReadOnlyModel,position){
            try
            {
                let textUntilPosition = model.getValueInRange({ startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });
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
    
    var editor = monaco.editor.create(document.getElementById('container')!, {
        theme: 'icd11Theme',
        value: "",
        language: 'icd11Language',
        autoIndent : true
    });
})().catch((err) => {
    throw err;
});
