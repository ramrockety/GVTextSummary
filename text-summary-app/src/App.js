import React, { useState } from "react";
import './App.css';

function App() {
  const [summary, setSummary] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleFileUpload = (e) => {
    // Implement file handling logic here
    const file = e.target.files[0];
    console.log("File uploaded:", file);
    // You can add file reading and processing logic here
  };

  const handleSummarize = () => {
    // Implement summarization logic here
    setSummary("This is the summarized text.");
  };

  const handleTranslate = () => {
    // Implement translation logic here
    setTranslatedText("This is the translated text.");
  };

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
          <button className="translate-button" onClick={handleTranslate}>Translate text (26 languages)</button>
          <div className="text-area">
            <textarea
              placeholder="Type to summarize"
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
            ></textarea>
          </div>
          <div className="text-area">
            <textarea
              placeholder="The translated text will appear here..."
              value={translatedText}
              readOnly
            ></textarea>
          </div>
          <button className="translate-button" onClick={handleTranslate}>Translate text (26 languages)</button>
        </div>
      </div>
    </div>
  );
}

export default App;