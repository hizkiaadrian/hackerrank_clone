import React, {useState, useRef} from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python'
import 'brace/theme/monokai'
import '../styles/Editor.css'
import EditorParameters from '../interfaces/EditorParameters.interface'
import Modal from 'react-modal';

const foldMainFunction = (editor: any) => {
  const lines: string[] = editor.session.doc.getAllLines();
  const startLine: number = lines.findIndex((x: string) => x==="if __name__ == \"__main__\":");
  editor.getSession().foldAll(startLine, lines.length);
}

const modalStyles = {
  content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)',
      minWidth              : '500px'
  },
  overlay: {zIndex: 10}
};
Modal.setAppElement('#root')

function Editor({defaultValue}: EditorParameters) {
  const [modalIsOpen,setIsOpen] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const codeEditor = useRef(null);

  const runCode = (event: React.MouseEvent) => {
    event.preventDefault();

    setButtonsDisabled(true);
    const code = (codeEditor.current as any)?.editor.getValue();
    fetch('http://localhost:8080/run_code', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code: code})
    })
    .then(async response => console.log(await response.json()))
    .then(() => setButtonsDisabled(false));
  }

  const submitCode = (event: React.MouseEvent) => {
    event.preventDefault();
  
    setButtonsDisabled(true);
    const code = (codeEditor.current as any)?.editor.getValue();
    console.log(code);
  
    setTimeout(() => setButtonsDisabled(false), 1000);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyles}
      >
        <h2>List of libraries supported</h2>
        <div>os, sys, glob, time, numpy, pandas, cv2</div>
        <div className="right-aligned-row">
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Modal>
      <div className="editor">
        <div className="right-aligned-row">
          <button className="help-button" onClick={() => setIsOpen(true)}>?</button>
        </div>
        <div className="editor-wrapper">
        <AceEditor 
            ref={codeEditor}
            mode="python"
            theme="monokai" 
            defaultValue={defaultValue}
            onLoad={foldMainFunction}
        />
        </div>
        <div className="right-aligned-row">
          <button onClick={submitCode} disabled={buttonsDisabled}>Submit</button>
          <span className="spacer"></span>
          <button onClick={runCode} disabled={buttonsDisabled}>Run Code</button>
        </div>
      </div>
    </>
  )
}

export default Editor;
