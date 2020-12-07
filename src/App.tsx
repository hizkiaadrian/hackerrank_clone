import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Assessment from './components/Assessment';

const PageNotFound = () => (
  <div className="page-not-found">
    <h2>404 Page Not Found</h2>
    <Link to="/">Home</Link>
  </div>
)

function App() {
  return (
    <>
      <div className='top-nav'>
        <h3>
          OSGD Assessment Platform
        </h3>
      </div>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/assessment" component={Assessment} />
            <Route render={PageNotFound} />
          </Switch>
        </Router>
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
