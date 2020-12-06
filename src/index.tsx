import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MathJax from 'react-mathjax';

ReactDOM.render(
  <React.StrictMode>
    <MathJax.Provider>
      <App />
    </MathJax.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
