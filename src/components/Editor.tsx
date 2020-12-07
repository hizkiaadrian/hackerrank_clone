import React, {useState, useRef, MouseEvent} from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import '../styles/Editor.css';
import EditorParameters from '../interfaces/EditorParameters.interface'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Links from '../api-links.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const foldMainFunction = (editor: any) => {
  const lines: string[] = editor.session.doc.getAllLines();
  const startLine: number = lines.findIndex((x: string) => x==="if __name__ == \"__main__\":");
  editor.getSession().foldAll(startLine, lines.length);
}

function Editor({defaultValue, testCases}: EditorParameters) {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [testCaseResults, setTestCaseResults] = useState<any[]>([]);

  const codeEditor = useRef(null);
  const testCasePanel = useRef(null);

  const runCode = (event: MouseEvent) => {
    event.preventDefault();

    setButtonsDisabled(true);
    const code = (codeEditor.current as any)?.editor.getValue();
    fetch(Links.run_code, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code: code, testCases: testCases})
    })
    .then(async response => {
      setTestCaseResults((await response.json()).testCaseResults);
      setButtonsDisabled(false);
      const tC : any = testCasePanel.current;
      tC.style.display = 'flex';
    });
  }

  const submitCode = (event: MouseEvent) => {
    event.preventDefault();
  
    setButtonsDisabled(true);
    const code = (codeEditor.current as any)?.editor.getValue();
    fetch(Links.submit, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code: code})
    })
    .then(async response => {
      console.log(await response.json());
      setButtonsDisabled(false);
    });
  }

  return (
    <>
      <div className="editor">
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
        <div className="test-cases" ref={testCasePanel}>
          {testCaseResults && testCaseResults.every(result => result && result.success && result.stdout.trim() === result.expected.trim()) && 
            <h3>Congratulations! You passed all test cases. Press "Submit" to submit your code</h3>
          }
          <Tabs className="full-width">
          {testCases &&
            <TabList className="tab-list">
              {testCases.map((_, index) => {
                let result = testCaseResults[index];
                const testCasePassed = result && result.success && result.stdout.trim() === result.expected.trim();

                return(
                  <Tab key={index}>
                    <FontAwesomeIcon icon={testCasePassed ? faCheckCircle : faTimesCircle}/> Test Case {index}
                  </Tab>
                );
              })}
            </TabList>
          }
          {testCaseResults && testCaseResults.map((value: any, index) => {
            let testCasePassed = value.success && (value.stdout.trim() === value.expected.trim());
            return (
              <TabPanel className='tab-panel' key={index}>
                <div className="tab-panel-content">
                  <h2 className={testCasePassed ? "success": "error"}>
                    <FontAwesomeIcon icon={testCasePassed ? faCheckCircle : faTimesCircle}/>
                    <span className="spacer"/>
                    Test case {testCasePassed ? "passed" : "failed"}
                  </h2>
                  <div>Input (stdin): 
                    <div className="codeblock multi-line output">
                      {value.stdin}
                    </div>
                  </div>
                  <div>Your output (stdout):
                    <div className={"codeblock multi-line output " + (value.success ? "" : "error")}>
                      {value.stdout}
                    </div>
                  </div>
                  <div>Expected output
                    <div className="codeblock multi-line output">
                      {value.expected}
                    </div>
                  </div>
                </div>
              </TabPanel>
            )
          })
          }
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Editor;
