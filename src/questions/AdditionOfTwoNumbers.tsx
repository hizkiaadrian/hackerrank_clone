import React from 'react';
import {useLatex as latexify} from '../components/Question';

const AdditionOfTwoNumbers = {
  question: {
    title: "Addition of Two Numbers",
    objective: "Complete the function solveMeFirst to compute the sum of two integers.",
    example: <div>{latexify("a = 7")}<br/>{latexify("b = 3")}<br/>Returns {latexify("10")}.</div>,
    functionDescription:
      <div>
        solveMeFirst has the following parameters: 
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
# For a complete list of available libraries, click on the '?' button above.

def solveMeFirst():
    pass

if __name__ == "__main__":
    a = int(input())
    b = int(input())
    print(solveMeFirst(a, b))
`
}

export default AdditionOfTwoNumbers;