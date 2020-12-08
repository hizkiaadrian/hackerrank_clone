import React from 'react';
import {useLatex as latexify} from '../utils';

const AdditionOfTwoNumbers = {
	question: {
		title: "Addition of Two Numbers",
		objective: "Complete the function addTwoNumbers to compute the sum of two integers.",
		example: <div>{latexify("a = 7")}<br/>{latexify("b = 3")}<br/>Returns {latexify("10")}.</div>,
		functionDescription:
		<div>
			addTwoNumbers has the following parameters: 
			<ul>
			<li>int a: the first value</li>
			<li>int b: the second value</li>
			</ul>
			Returns<br/>
			- int: the sum of {latexify("a")} and {latexify("b")}
		</div>,
		constraints:<div>{latexify("1 \\leq a,b\\leq 1000")}</div>,
		sampleInput:<div className="codeblock"><code>a = 2<br/>
		b = 3<br/></code></div>,
		sampleOutput:<div className="codeblock"><code>5</code></div>,
		explanation:<div>{latexify("2 + 3 = 5")}</div>
	},
    defaultEditorValue:
`# You can import relevant libraries here.
# e.g. import os

def addTwoNumbers(a, b):
    pass

if __name__ == "__main__":
    a = int(input())
    b = int(input())
    print(addTwoNumbers(a, b))
`,
	testCases: [
		{input: "2\n3\n", expectedOutput:'5\n'},
		{input: "5\n6\n", expectedOutput:'11\n'},
		{input: "110\n1000\n", expectedOutput:'1110\n'},
		{input: "0\n1000\n", expectedOutput:'1000\n'},
		{input: "-1\n2\n", expectedOutput:'1\n'},
		{input: "0\n0\n", expectedOutput:'0\n'},
		{input: "10\n10\n", expectedOutput:'20\n'}
	]
};

export default AdditionOfTwoNumbers;