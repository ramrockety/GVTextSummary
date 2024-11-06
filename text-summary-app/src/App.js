import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TextSummarizer() {
  // State to store the user input and the summarized output
  const [inputText, setInputText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle the text input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/text_summarize', { prompt: inputText });
      // Update the summaryText state with the response from the API
      setSummaryText(response.data);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setSummaryText('Failed to summarize the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // This effect runs whenever summaryText changes
    console.log('summaryText updated:', summaryText);
  }, [summaryText]); 

  return (
    <div className="app">
      <nav className="navbar">
        <h1>GVTEXTSUMMARY</h1>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </div>
        <div className="lang-select">EN ▾</div>
      </nav>
      <div className="container">
        <div className="top-buttons">
          <button className="download-button">Download Audio</button>
          <button className="download-button">Download Text</button>
        </div>
        <div className="text-area-container">
          <div className="text-area">
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Type to summarize"
                onChange={handleInputChange}
                value={inputText}
                rows="5"
              ></textarea>
              <button type="submit" disabled={loading}>
                {loading ? 'Summarizing...' : 'Summarize Text'}
              </button>
            </form>
          </div>
          <div className="text-area">
            <h2>Summarized Text</h2>
            <textarea
              placeholder="The translated text will appear here..."
              value={summaryText}
              rows="5"
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextSummarizer; 