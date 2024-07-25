import React, { useEffect } from 'react';

const Recognition = ({ recognizing, setRecognizing, setFinalTranscript, language }) => {
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      finalTranscript = finalTranscript.charAt(0).toUpperCase() + finalTranscript.slice(1);
      setFinalTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setRecognizing(false);
    };

    recognition.onend = () => {
      setRecognizing(false);
    };

    if (recognizing) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [recognizing, setRecognizing, setFinalTranscript, language]);

  return null;
};

export default Recognition;
