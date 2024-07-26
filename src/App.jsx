import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Recognition from './components/Recognition';
import axios from 'axios';

function App() {
  const { t, i18n } = useTranslation();
  const [recognizing, setRecognizing] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [translatedTranscript, setTranslatedTranscript] = useState('');
  const [language, setLanguage] = useState('es-ES');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const handleInit = () => {
    setRecognizing(true);
  };

  const handleStop = () => {
    setRecognizing(false);
  };

  const handleContinue = () => {
    setRecognizing(true);
    setFinalTranscript(prev => prev + "\n");
    setTranslatedTranscript(prev => prev + "\n");
  };

  const handleRestart = () => {
    setRecognizing(true);
    setFinalTranscript('');
    setTranslatedTranscript('');
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(document.getElementById('textToSpeak').value);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <header className="flex justify-between items-center mb-4">
        <div className="text-center">
          <img src="/assets/lingua.png" alt="LINGUA" className="mx-auto w-32 mb-2" />
          <p className="text-2xl font-bold">{t('title')}</p>
        </div>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="es">{t('ES')}</option>
          <option value="en">{t('US')}</option>
          <option value="pt">{t('BR')}</option>
          <option value="fr">{t('FR')}</option>
          <option value="it">{t('IT')}</option>
          <option value="de">{t('DE')}</option>
          <option value="zh-CN">{t('CN')}</option>
          <option value="ru">{t('RU')}</option>
          <option value="ja">{t('JP')}</option>
          <option value="ko">{t('KR')}</option>
          <option value="hi">{t('IN')}</option>
          <option value="ar">{t('SA')}</option>
        </select>
      </header>
      <div className="controls flex justify-center items-center mb-4">
        <div className={`led ${recognizing ? 'led-active' : ''} mr-2`}></div>
        <select
          id="languageSelect"
          className="p-2 rounded bg-gray-700"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es-ES">{t('ES')}</option>
          <option value="en-US">{t('US')}</option>
          <option value="pt-BR">{t('BR')}</option>
          <option value="fr-FR">{t('FR')}</option>
          <option value="it-IT">{t('IT')}</option>
          <option value="de-DE">{t('DE')}</option>
          <option value="zh-CN">{t('CN')}</option>
          <option value="ru-RU">{t('RU')}</option>
          <option value="ja-JP">{t('JP')}</option>
          <option value="ko-KR">{t('KR')}</option>
          <option value="hi-IN">{t('IN')}</option>
          <option value="ar-SA">{t('SA')}</option>
        </select>
        <select
          id="targetLanguageSelect"
          className="p-2 rounded bg-gray-700 ml-2"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="en">{t('US')}</option>
          <option value="es">{t('ES')}</option>
          <option value="pt">{t('BR')}</option>
          <option value="fr">{t('FR')}</option>
          <option value="it">{t('IT')}</option>
          <option value="de">{t('DE')}</option>
          <option value="zh-CN">{t('CN')}</option>
          <option value="ru">{t('RU')}</option>
          <option value="ja">{t('JP')}</option>
          <option value="ko">{t('KR')}</option>
          <option value="hi">{t('IN')}</option>
          <option value="ar">{t('SA')}</option>
        </select>
      </div>
      <div className="buttons flex justify-center flex-wrap mb-4">
        {!recognizing && finalTranscript === '' && (
          <button
            id="btnInit"
            className="p-3 m-2 rounded bg-blue-500 hover:bg-blue-700"
            onClick={handleInit}
          >
            {t('start')}
          </button>
        )}
        {recognizing && (
          <button
            id="btnStop"
            className="p-3 m-2 rounded bg-red-500 hover:bg-red-700"
            onClick={handleStop}
          >
            {t('stop')}
          </button>
        )}
        {!recognizing && finalTranscript !== '' && (
          <>
            <button
              id="btnContinue"
              className="p-3 m-2 rounded bg-green-500 hover:bg-green-700"
              onClick={handleContinue}
            >
              {t('continue')}
            </button>
            <button
              id="btnRestart"
              className="p-3 m-2 rounded bg-yellow-500 hover:bg-yellow-700"
              onClick={handleRestart}
            >
              {t('restart')}
            </button>
          </>
        )}
      </div>
      <textarea
        id="textarea"
        className="w-full h-32 p-2 mb-4 rounded bg-gray-700"
        placeholder={t('placeholder')}
        readOnly
        value={finalTranscript}
      ></textarea>
      <textarea
        id="translatedTextarea"
        className="w-full h-32 p-2 mb-4 rounded bg-gray-700"
        placeholder={t('translate')}
        readOnly
        value={translatedTranscript}
      ></textarea>
      <textarea
        id="textToSpeak"
        className="w-full h-20 p-2 mb-4 rounded bg-gray-700"
        placeholder={t('speak')}
      ></textarea>
      <div className="flex justify-center">
        <button
          id="btnSpeak"
          className="p-3 m-2 rounded bg-green-500 hover:bg-green-700"
          onClick={handleSpeak}
        >
          {t('speak')}
        </button>
      </div>
      <Recognition
        recognizing={recognizing}
        setRecognizing={setRecognizing}
        setFinalTranscript={setFinalTranscript}
        setTranslatedTranscript={setTranslatedTranscript}
        language={language}
        targetLanguage={targetLanguage}
      />
    </div>
  );
}

export default App;
