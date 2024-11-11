import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function TextSummarizer() {
  // State to store the user input, summarized output, translated text, and language selection
  const [inputText, setInputText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH');
  const [audioUrl, setAudioUrl] = useState(null);

  const languages = [
    'AFRIKAANS', 'ALBANIAN', 'AMHARIC', 'ARABIC', 'BENGALI', 'BULGARIAN',
    'CATALAN', 'CROATIAN', 'CZECH', 'DANISH', 'DUTCH', 'ENGLISH', 'FRENCH',
    'GALICIAN', 'GERMAN', 'GREEK', 'HEBREW', 'HINDI', 'HUNGARIAN',
    'INDONESIAN', 'ITALIAN', 'JAPANESE', 'KOREAN', 'MALAY', 'MANDARIN',
    'POLISH', 'PORTUGUESE', 'RUSSIAN', 'SERBIAN', 'SPANISH', 'SWEDISH',
    'TAGALOG', 'THAI', 'TURKISH', 'UKRAINIAN', 'URDU', 'XHOSA'
  ];

  // Handle the text input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Handle language selection
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Handle form submission for summarization
  const handleSummarize = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/text_summarize', { prompt: inputText });
      setSummaryText(response.data);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setSummaryText('Failed to summarize the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle translation
  const handleTranslate = async () => {
    setLoading(true);
    console.log('Text to translate:', summaryText);
    console.log('Selected language:', selectedLanguage);
    try {
      const response = await axios.post('http://localhost:8000/text_translation', {
        prompt: summaryText,
        language: selectedLanguage
      });
      setTranslatedText(response.data);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Failed to translate the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate audio from translated or summarized text
  const handleGenerateAudio = async () => {
    try {
      const response = await axios.post('http://localhost:8000/audio_download', {
        prompt: translatedText || summaryText
      }, { responseType: 'blob' });

      const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>GVTEXTSUMMARY</h1>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </div>
        <div className="lang-select">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </nav>

      <div className="container">
        <div className="top-buttons">
          <button className="download-button" onClick={handleGenerateAudio}>Generate Audio</button>
          <button className="download-button" onClick={() => {
            const blob = new Blob([translatedText || summaryText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'summary.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>Download Text</button>
        </div>

        <div className="text-area-container">
          <div className="text-area">
            <form onSubmit={handleSummarize}>
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
            <textarea
              placeholder="The summarized text goes here..."
              value={summaryText}
              rows="5"
              readOnly
            ></textarea>
            <button onClick={handleTranslate} disabled={loading}>
              {loading ? 'Translating...' : 'Translate Text'}
            </button>
          </div>

          <div className="text-area">
            <textarea
              placeholder="The translated text goes here..."
              value={translatedText}
              rows="5"
              readOnly
            ></textarea>
          </div>
        </div>

        {audioUrl && (
          <div>
            <audio controls src={audioUrl}></audio>
            <a href={audioUrl} download="summary_audio.mp3" className="download-button">
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextSummarizer;