import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Assessment from './components/Assessment';
import ThankYou from './components/ThankYou';
import PageNotFound from './components/PageNotFound';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <TopNav/>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/assessment" component={Assessment} />
            <Route path="/thank-you" component={ThankYou} />
            <Route render={PageNotFound} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
