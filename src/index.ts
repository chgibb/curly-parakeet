/// <reference path="./../node_modules/monaco-editor/monaco.d.ts" />

import {MonacoLoader} from "./req/monacoLoader";

(async function(){
    let loader : MonacoLoader = new MonacoLoader();
    await loader.loadMonaco();

    monaco.languages.register({
        id : "icd11Language"
    });
    monaco.languages.setMonarchTokensProvider('icd11Language', <monaco.languages.IMonarchLanguage>{
        tokenizer: {
            root: [
                [/(01 Certain Infectious or Parasitic Diseases)/,"icd11.one"]
            ],
        },
        tokenPostfix : "."
    });

    monaco.languages.registerCompletionItemProvider("icd11Language",{
        provideCompletionItems : function(model : monaco.editor.IReadOnlyModel,position){
            var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
            let match = textUntilPosition.match(/\s/);
            if(match)
            {
                return [];
            }
            return [
                {
                    label : "Certain Infectious or Parasitic Diseases",
                    kind : monaco.languages.CompletionItemKind.Function,
                    documentation : "This chapter includes certain conditions caused by a pathogenic organism or microorganism, such as a bacterium, virus, parasite, or fungus.",
                    insertText : "01 Certain Infectious or Parasitic Diseases"
                }
            ];
        }
    });

    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme('icd11Theme',{
        base: 'vs',
        inherit: false,
        rules: [
            { token: "icd11.one", foreground: "008800"}
        ],
        colors : {}
    });
    
    var editor = monaco.editor.create(document.getElementById('container')!, {
        theme: 'icd11Theme',
        value: "",
        language: 'icd11Language'
    });
})().catch((err) => {
    throw err;
});
