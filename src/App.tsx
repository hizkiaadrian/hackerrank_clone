import React from 'react';
import './App.css';

function App() {
  return (
    <>
    <div className='top-nav'>Hello</div>
    <div className="App">
      <div style={{backgroundColor: 'white', width: '50%'}}>
        <h1>Question</h1>
      </div>
      <div style={{backgroundColor: 'grey', width:'50%'}}>
        <h1>Editor</h1>
      </div>
    </div>
    <div className="footer">OSGD</div>
    </>
  );
}

export default App;
