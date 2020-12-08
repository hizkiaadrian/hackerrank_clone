import React, {useState, useRef, MouseEvent} from 'react';
import {useHistory} from 'react-router-dom';

import {TestCase, TestCaseResult} from '../shared.interface';
import TestCasesPanel from '../TestCasesPanel';
import Links from '../../../configs/api-links.json';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';

const foldMainFunction = (editor: any) => {
	const lines: string[] = editor.session.doc.getAllLines();
	const startLine: number = lines.findIndex((x: string) => x==="if __name__ == \"__main__\":");
	editor.getSession().foldAll(startLine, lines.length);
};

function Editor({defaultValue, testCases}: {defaultValue: string, testCases: TestCase[]}) {
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);

	const codeEditor = useRef(null);

	const history = useHistory();

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
			});
	};

	const submitCode = (event: MouseEvent) => {
		event.preventDefault();
	
		setButtonsDisabled(true);
		const code = (codeEditor.current as any)?.editor.getValue();
		fetch(Links.submit, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({code: code, userId: sessionStorage.getItem('uuid')})
		})
			.then(async response => {
				const res = await response.json();
				if (res.success) {
					history.push("/thank-you");
				} else {
					setButtonsDisabled(false);
					return false;
				}
			});
	};

	return (
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
			{testCaseResults.length > 0 && 
			<TestCasesPanel 
				testCaseResults={testCaseResults}
				testCases={testCases}
			/>
			}
		</div>
	);
};

export default Editor;
