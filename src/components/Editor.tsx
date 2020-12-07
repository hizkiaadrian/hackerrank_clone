import React, {useState, useRef} from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import '../styles/Editor.css'
import EditorParameters from '../interfaces/EditorParameters.interface'
import Modal from 'react-modal';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Links from '../api-links.json';

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

function Editor({defaultValue, testCases}: EditorParameters) {
  const [modalIsOpen,setIsOpen] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");

  const codeEditor = useRef(null);
  const testCase = useRef(null);

  const runCode = (event: React.MouseEvent) => {
    event.preventDefault();

    setButtonsDisabled(true);
    const code = (codeEditor.current as any)?.editor.getValue();
    fetch(Links.run_code, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code: code})
    })
    .then(async response => {
      let res = await response.json();
      setStdin(res.stdin);
      setStdout(res.stdout);

      setButtonsDisabled(false);
      const tC : any = testCase.current;
      tC.style.display = 'flex';
    });
  }

  const submitCode = (event: React.MouseEvent) => {
    event.preventDefault();
  
    setButtonsDisabled(true);
    const code = (codeEditor.current as any)?.editor.getValue();
    fetch(Links.submit, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code: code})
    })
    .then(async response => console.log(await response.json()))
    .then(() => setButtonsDisabled(false));
  
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
        <div className="test-cases" ref={testCase}>
          <Tabs className="full-width">
            <TabList className="tab-list">
              {testCases.map((_, index) => <Tab>Test Case {index}</Tab>)}
            </TabList>

            <TabPanel className='tab-panel'>
              <div>Input (stdin): 
                <div className="codeblock multi-line output">
                  {stdin}
                </div>
              </div>
              <div>Your output (stdout):
                <div className="codeblock multi-line output">
                  {stdout}
                </div>
              </div>
              <div>Expected output
                <div className="codeblock multi-line output">
                  11
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Editor;
