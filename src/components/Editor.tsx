import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python'
import 'brace/theme/monokai'

const defaultValue: string = 
`# You can import relevant libraries here.
# For a complete list of available libraries, click on the '?' button above.

def solveMeFirst():
    pass

if __name__ == "__main__":
    a = int(input())
    b = int(input())
    print(solveMeFirst(a, b))
`

function Editor(props: any) {
    return (
      <>
        <div style={{margin: "0.5rem 2rem"}}>
            <div style={{display: "flex", flexDirection: "row-reverse", flex: "1 1 auto", marginBottom: "0.5rem"}}>
            <select id="language">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
            </select>
            </div>
            <AceEditor 
                style={{width:"100%", height:"90%"}}
                mode="python"
                theme="monokai" 
                defaultValue={props.defaultValue}
                onLoad={(editor) => editor.getSession().foldAll(6, 11)}
            />
            <button>Run Code</button>
            <button>Submit</button>
        </div>
      </>
    )
  }

export default Editor;