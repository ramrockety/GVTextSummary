import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function TextSummarizer() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
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
      const response = await axios.post('https://gvtextsummary-2.onrender.com/text_summarize', { prompt: inputText });
      setOutputText(response.data);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setOutputText('Failed to summarize the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle translation
  const handleTranslate = async () => {
    setLoading(true);
    console.log('Text to translate:', inputText);
    console.log('Selected language:', selectedLanguage);
    try {
      const response = await axios.post('https://gvtextsummary-2.onrender.com/text_translation', {
        prompt: inputText,
        language: selectedLanguage
      });
      setOutputText(response.data);
    } catch (error) {
      console.error('Error translating text:', error);
      setOutputText('Failed to translate the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate audio from output text
  const handleGenerateAudio = async () => {
    try {
      const response = await axios.post('https://gvtextsummary-2.onrender.com/audio_download', {
        prompt: outputText
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
            const blob = new Blob([outputText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'output_text.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>Download Text</button>
        </div>

        <div className="text-area-container">
          <div className="text-area">
            <form onSubmit={handleSummarize}>
              <textarea
                placeholder="Type to summarize or translate"
                onChange={handleInputChange}
                value={inputText}
                rows="5"
              ></textarea>
              <button className= "summarize-button" type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Summarize Text'}
              </button>
              <button className = "translate-button" onClick={handleTranslate} disabled={loading}>
              {loading ? 'Processing...' : 'Translate Text'}
              </button>
            </form>
          </div>

          <div className="text-area-output">
            <textarea
              placeholder="The output text goes here..."
              value={outputText}
              rows="5"
              readOnly
            ></textarea>
          </div>
        </div>

        {audioUrl && (
          <div>
            <audio controls src={audioUrl}></audio>
            <a href={audioUrl} download="output_audio.mp3" className="download-button">
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextSummarizer;
