import React, {useState, useRef, MouseEvent} from 'react';
import {useHistory} from 'react-router-dom';

import {TestCase, TestCaseResult} from '../shared.interface';
import TestCasesPanel from '../TestCasesPanel';

import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import Loader from 'react-loader-spinner';
import { runCurrentCode, submitToServer } from '../../apiFunctions';

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

	const runCode = async (event: MouseEvent) => {
		event.preventDefault();

		setIsLoading(true);
		const code = (codeEditor.current as any)?.editor.getValue();

		await runCurrentCode(code, testCases, (results: TestCaseResult[]) => {
			setTestCaseResults(results);
			setIsLoading(false);
		})
	};

	const submitCode = async (event: MouseEvent) => {
		event.preventDefault();
	
		setIsLoading(true);
		const code = (codeEditor.current as any)?.editor.getValue();
		await submitToServer(
			code,
			localStorage.getItem('uuid') ?? "",
			() => history.push("/thank-you"),
			(error: string) => {
				setIsLoading(false);
				setErrorMsg(error);
				setTimeout(() => setErrorMsg(""), 2000);
				return false;
			}
		);
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
