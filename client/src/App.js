import { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import './index.css';
import { generateContent } from './api/generateContent';
import ReactMarkdown from 'react-markdown';

function App() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleGenerate = async (data) => {
    setLoading(true);
    setShowModal(false);
    const content = await generateContent(data);
    setOutput(content);
    setLoading(false);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated-content.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
    <div className="header">
        <h1 className="app-title">AI Content Generator</h1>
        <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
         </button >
     </div>

      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Generate Content
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <InputForm onSubmit={handleGenerate} />
          </div>
        </div>
      )}

      <div className="output-section">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : output ? (
          <div className="output-box">
            <ReactMarkdown>{output}</ReactMarkdown>
            <button className="download-btn" onClick={handleDownload}>
              ⬇️ Download
            </button>
          </div>
        ) : (
          <p className="empty-output">Your generated content will appear here.</p>
        )}
      </div>
    </div>
  );
}

export default App;
