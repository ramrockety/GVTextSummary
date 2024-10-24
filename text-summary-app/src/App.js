import React, { useState } from "react";
import './App.css';

function App() {
  const [summary, setSummary] = useState("");

  const handleFileUpload = (e) => {
    // Add functionality to handle file upload here
    const file = e.target.files[0];
    console.log("File uploaded:", file);
    // You can implement file reading, text summarization, and translation logic here
  };

  const handleSubmit = () => {
    // Simulate summary generation (replace with actual logic)
    setSummary("This is the summarized text.");
  };

  return (
    <div className="container">
      <h1>Welcome to <span className="highlight">GVSU</span> Text Summary</h1>
      <div className="file-upload">
        <input type="file" name="file" id="file" onChange={handleFileUpload} />
      </div>
      <div className="upload-button">
        <input type="submit" value="Upload" onClick={handleSubmit} />
      </div>
      <div className="output-textarea">
        <textarea
          placeholder="The summarized text will appear here..."
          value={summary}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default App;
