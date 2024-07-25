import React, { useState } from 'react';
import Recognition from './components/Recognition';

function App() {
  const [recognizing, setRecognizing] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [language, setLanguage] = useState('es-ES');

  const handleInit = () => {
    setRecognizing(true);
  };

  const handleStop = () => {
    setRecognizing(false);
  };

  const handleContinue = () => {
    setRecognizing(true);
    setFinalTranscript(prev => prev + "\n");
  };

  const handleRestart = () => {
    setRecognizing(true);
    setFinalTranscript('');
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(document.getElementById('textToSpeak').value);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <header className="text-center mb-4">
        <img src="/assets/lingua.png" alt="LINGUA" className="mx-auto w-32 mb-2" />
        <p className="text-xl">Pon a prueba tu pronunciación</p>
      </header>
      <div className="controls flex justify-center items-center mb-4">
        <div className={`led ${recognizing ? 'led-active' : ''} mr-2`}></div>
        <select
          id="languageSelect"
          className="p-2 rounded bg-gray-700"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es-ES">Español</option>
          <option value="en-US">Inglés</option>
          <option value="pt-BR">Portugués</option>
          <option value="fr-FR">Francés</option>
          <option value="it-IT">Italiano</option>
          <option value="de-DE">Alemán</option>
          <option value="zh-CN">Chino (Mandarín)</option>
          <option value="ru-RU">Ruso</option>
          <option value="ja-JP">Japonés</option>
          <option value="ko-KR">Coreano</option>
          <option value="hi-IN">Hindi</option>
          <option value="ar-SA">Árabe</option>
        </select>
      </div>
      <div className="buttons flex justify-center flex-wrap mb-4">
        {!recognizing && finalTranscript === '' && (
          <button
            id="btnInit"
            className="p-3 m-2 rounded bg-blue-500 hover:bg-blue-700"
            onClick={handleInit}
          >
            Start
          </button>
        )}
        {recognizing && (
          <button
            id="btnStop"
            className="p-3 m-2 rounded bg-red-500 hover:bg-red-700"
            onClick={handleStop}
          >
            Stop
          </button>
        )}
        {!recognizing && finalTranscript !== '' && (
          <>
            <button
              id="btnContinue"
              className="p-3 m-2 rounded bg-green-500 hover:bg-green-700"
              onClick={handleContinue}
            >
              Continuar Grabación
            </button>
            <button
              id="btnRestart"
              className="p-3 m-2 rounded bg-yellow-500 hover:bg-yellow-700"
              onClick={handleRestart}
            >
              Reiniciar Grabación
            </button>
          </>
        )}
      </div>
      <textarea
        id="textarea"
        className="w-full h-32 p-2 mb-4 rounded bg-gray-700"
        placeholder="Presiona Start y comienza a hablar..."
        readOnly
        value={finalTranscript}
      ></textarea>
      <textarea
        id="textToSpeak"
        className="w-full h-20 p-2 mb-4 rounded bg-gray-700"
        placeholder="Elije un idioma, escribe un texto y escucha su correcta pronunciación."
      ></textarea>
      <div className="flex justify-center">
        <button
          id="btnSpeak"
          className="p-3 m-2 rounded bg-green-500 hover:bg-green-700"
          onClick={handleSpeak}
        >
          ¡Go!
        </button>
      </div>
      <Recognition recognizing={recognizing} setRecognizing={setRecognizing} setFinalTranscript={setFinalTranscript} language={language} />
    </div>
  );
}

export default App;
