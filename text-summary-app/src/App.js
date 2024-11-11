import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TextSummarizer from './TextSummarizer';
import AboutPage from './AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <h1>GVTEXTSUMMARY</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>

        {/* Route Configuration */}
        <Switch>
          <Route exact path="/" component={TextSummarizer} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;