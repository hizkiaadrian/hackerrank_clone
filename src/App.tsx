import React from 'react';
import './App.css';
import Question, {useLatex} from './components/Question';
import Editor from './components/Editor';

const defaultEditorValue: string =
`# You can import relevant libraries here.
# e.g. import numpy
# For a complete list of available libraries, click on the '?' button above.

def solveMeFirst():
    pass

if __name__ == "__main__":
    a = int(input())
    b = int(input())
    print(solveMeFirst(a, b))
`

function App() {
  return (
    <>
      <div className='top-nav'>
        <h3 style={{margin:'0', padding:'0'}}>
          OSGD Assessment Platform
        </h3>
      </div>
      <div className="App">
        <div className="grid">
          <Question 
            title="Addition of Two Numbers" 
            objective="Complete the function solveMeFirst to compute the sum of two integers."
            example={<div>{useLatex("a = 7")}<br/>{useLatex("b = 3")}<br/>Returns {useLatex("10")}.</div>}
            functionDescription={
              <div>
                solveMeFirst has the following parameters: 
                <ul>
                  <li>int a: the first value</li>
                  <li>int b: the second value</li>
                </ul>
                Returns<br/>
                - int: the sum of {useLatex("a")} and {useLatex("b")}
              </div>}
            constraints={<div>{useLatex("1 \\leq a,b\\leq 1000")}</div>}
            sampleInput={<div className="codeblock"><code>a = 2<br/>
              b = 3<br/></code></div>}
            sampleOutput={<div className="codeblock"><code>5</code></div>}
            explanation={<div>{useLatex("2 + 3 = 5")}</div>}
          />
          <Editor defaultValue={defaultEditorValue}/>
        </div>
      </div>
      <div className="footer">OSGD</div>
    </>
  );
}

export default App;
