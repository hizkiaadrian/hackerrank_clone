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
        <Question/>
        <Editor/>
      </div>
    </div>
    <div className="footer">OSGD</div>
    </>
  );
}

export default App;
