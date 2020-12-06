import React from 'react';
import './App.css';
import Question from './components/Question';
import Editor from './components/Editor';


function App() {
  return (
    <>
    <div className='top-nav'><h3 style={{margin:'0', padding:'0'}}>OSGD Assessment Platform</h3></div>
    <div className="App">
      <div className="grid">
        <Question 
          title="Addition of Two Numbers" 
          objective="Complete the function solveMeFirst to compute the sum of two integers."
          example={<div>a = 7<br/>b = 3<br/>Return 10.</div>}
          functionDescription={
            <div>
              solveMeFirst has the following parameters: 
              <ul>
                <li>int a: the first value</li>
                <li>int b: the second value</li>
              </ul>
              Returns<br/>
              - int: the sum of a and b
            </div>}
          constraints={<div>1 &le; a,b &le; 1000</div>}
          sampleInput={<div>a = 2<br/>
            b = 3<br/></div>}
          sampleOutput={<div>5</div>}
          explanation={<div>2 + 3 = 5</div>}
        />
        <Editor/>
      </div>
    </div>
    <div className="footer">OSGD</div>
    </>
  );
}

export default App;
