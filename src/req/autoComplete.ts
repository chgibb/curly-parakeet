/// <reference path="./../../node_modules/monaco-editor/monaco.d.ts" />


export function autoComplete(
    model : monaco.editor.IReadOnlyModel,
    position : monaco.Position
) : Array<monaco.languages.CompletionItem> {
    try
            {
                var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
                let matchStart = /(Start)/;
                let matchEnd = /(End)/;
                let lines = textUntilPosition.split(/\n/);
                console.log(lines);
                let starts = 0;
                let ends = 0;
                for(let i = 0; i != lines.length; ++i)
                {
                    if(matchStart.test(lines[i]))
                        starts++;
                    else if(matchEnd.test(lines[i]))
                        ends++;
                }
                if(starts == ends || starts == 0 && ends == 0)
                {
                    return [
                        {
                            label : "Start 01 Certain Infectious or Parasitic Diseases",
                            kind : monaco.languages.CompletionItemKind.Function,
                            documentation : "This chapter includes certain conditions caused by a pathogenic organism or microorganism, such as a bacterium, virus, parasite, or fungus.",
                            insertText : `Start 01 Certain Infectious or Parasitic Diseases${"\n"}   ${"\n"}End`
                        }
                    ];
                }
            }
            catch(err){}
            return [
                {
                    label : "Invalid",
                    kind : monaco.languages.CompletionItemKind.Function,
                    documentation: " ",
                    insertText : " "
                }
            ];
}