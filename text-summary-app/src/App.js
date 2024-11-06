import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TextSummarizer from './App'; // Import TextSummarizer from App.js
import reportWebVitals from './reportWebVitals';

// Initialize root and render the TextSummarizer component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TextSummarizer />
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();