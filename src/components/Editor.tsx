import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python'
import 'brace/theme/monokai'
import '../styles/Editor.css'
import EditorParameters from '../interfaces/EditorParameters.interface'

const foldMainFunction = (editor: any) => {
  const lines: string[] = editor.session.doc.getAllLines();
  const startLine: number = lines.findIndex((x: string) => x==="if __name__ == \"__main__\":");
  editor.getSession().foldAll(startLine, lines.length);
}

function Editor({defaultValue}: EditorParameters) {
    return (
      <>
        <div className="editor">
          <div className="right-aligned-row">
            <button className="help-button">?</button>
          </div>
          <div className="editor-wrapper">
          <AceEditor 
              mode="python"
              theme="monokai" 
              defaultValue={defaultValue}
              onLoad={foldMainFunction}
          />
          </div>
          <div className="right-aligned-row">
            <button>Run Code</button>
            <span className="spacer"></span>
            <button>Submit</button>
          </div>
        </div>
      </>
    )
  }

export default Editor;