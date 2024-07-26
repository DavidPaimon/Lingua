import React, { useEffect } from 'react';
import axios from 'axios';

const Recognition = ({ recognizing, setRecognizing, setFinalTranscript, setTranslatedTranscript, language, targetLanguage }) => {
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = async (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const finalText = event.results[i][0].transcript;
          setFinalTranscript(prev => prev + finalText + ' ');

          try {
            const response = await axios.get(`https://api.mymemory.translated.net/get`, {
              params: {
                q: finalText,
                langpair: `${language.split('-')[0]}|${targetLanguage}`
              }
            });
            setTranslatedTranscript(prev => prev + response.data.responseData.translatedText + ' ');
          } catch (error) {
            console.error('Error translating text:', error);
          }

        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
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
  }, [recognizing, setRecognizing, setFinalTranscript, setTranslatedTranscript, language, targetLanguage]);

  return null;
};

export default Recognition;
