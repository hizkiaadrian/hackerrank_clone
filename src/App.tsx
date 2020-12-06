import React from 'react';
import './App.css';
import Question from './components/Question';
import Editor from './components/Editor';
import AdditionOfTwoNumbers from './questions/AdditionOfTwoNumbers';

function App() {
  return (
    <>
      <div className='top-nav'>
        <h3>
          OSGD Assessment Platform
        </h3>
      </div>
      <div className="App">
        <div className="grid">
          <Question question={AdditionOfTwoNumbers.question} />
          <Editor defaultValue={AdditionOfTwoNumbers.defaultEditorValue}/>
        </div>
      </div>
      <div className="footer">
        OSGD
        <span className="spacer"></span>
        <a href="mailto:hizkiaadrians@gmail.com">Technical problems?</a>
      </div>
    </>
  );
}

export default App;
