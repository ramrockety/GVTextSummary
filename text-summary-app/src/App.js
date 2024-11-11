import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
        <Routes>
          <Route exact path="/" element={<TextSummarizer />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;