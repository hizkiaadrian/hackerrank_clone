import React from 'react';
import './App.css';
import Question from './components/Question';
import Editor from './components/Editor';


function App() {
  return (
    <>
    <div className='top-nav'>OSGD Assessment Platform</div>
    <div className="App">
      <div className="grid">
        <Question/>
        <Editor/>
      </div>
    </div>
    <div className="footer">OSGD</div>
    </>
  );
}

export default App;
