import React, {useState, useRef, MouseEvent} from 'react';
import {useHistory} from 'react-router-dom';

import {TestCase, TestCaseResult} from '../shared.interface';
import TestCasesPanel from '../TestCasesPanel';
import Links from '../../../configs/api-links.json';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import Loader from 'react-loader-spinner';

const foldMainFunction = (editor: any) => {
	const lines: string[] = editor.session.doc.getAllLines();
	const startLine: number = lines.findIndex((x: string) => x==="if __name__ == \"__main__\":");
	editor.getSession().foldAll(startLine, lines.length);
};

function Editor({defaultValue, testCases, deadline}: {defaultValue: string, testCases: TestCase[], deadline: Date}) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);

	const codeEditor = useRef(null);

	const history = useHistory();
	
	const deadlineString = deadline.toLocaleString('en-GB', {day:"numeric", month:"long", year: "numeric", hour:"numeric", minute: "numeric"});

	const runCode = (event: MouseEvent) => {
		event.preventDefault();

		setIsLoading(true);
		const code = (codeEditor.current as any)?.editor.getValue();
		fetch(Links.run_code, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({code: code, testCases: testCases})
		})
			.then(async response => {
				setTestCaseResults((await response.json()).testCaseResults);
				setIsLoading(false);
			});
	};

	const submitCode = (event: MouseEvent) => {
		event.preventDefault();
	
		setIsLoading(true);
		const code = (codeEditor.current as any)?.editor.getValue();
		fetch(Links.submit, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({code: code, userId: localStorage.getItem('uuid')})
		})
			.then(async response => {
				const res = await response.json();
				if (res.success) {
					history.push("/thank-you");
				} else {
					setIsLoading(false);
					setErrorMsg(res.error);
					setTimeout(() => setErrorMsg(""), 2000);
					return false;
				}
			});
	};

	return (
		<div className="editor">
			<div className="right-aligned-row"><h2 style={{margin: 0, padding: 0}}>Deadline: {deadlineString}</h2></div>
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
				<button onClick={submitCode} disabled={isLoading}>Submit</button>
				<span className="spacer"></span>
				<button onClick={runCode} disabled={isLoading}>Run Code</button>
			</div>
			{errorMsg && <div>{errorMsg}</div>}
			{isLoading 
				? <div className="centered-page">
					<Loader
						type="Puff"
						color="#00BFFF"
						height={100}
						width={100}
					/>
				</div>
				: testCaseResults.length > 0 && 
					<TestCasesPanel 
						testCaseResults={testCaseResults}
						testCases={testCases}
					/>
			}
		</div>
	);
};

export default Editor;
