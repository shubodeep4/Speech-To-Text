import React, { useState } from 'react';
import './SpeechToText.css';

function SpeechToText() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Check if the SpeechRecognition API is available
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser doesn't support Speech Recognition.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  // Start listening for speech
  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setText(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Stop listening
  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  return (
    <div className="stt-container">
      <textarea
        placeholder="Your speech will appear here..."
        value={text}
        readOnly
        rows="4"
      />
      <div className="buttons">
        <button onClick={startListening} disabled={isListening}>
          {isListening ? 'Listening...' : 'Start Listening'}
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default SpeechToText;
