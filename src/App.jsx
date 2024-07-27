import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import Recognition from './components/Recognition';

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

  const handleSpeakText = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="text-center mb-4 sm:mb-0">
          <img src="/assets/lingua.png" alt="LINGUA" className="mx-auto w-24 sm:w-32 mb-2" />
          <p className="text-lg sm:text-2xl font-bold">{t('title')}</p>
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
          <option value="zh-CN">{t('ZH')}</option>
          <option value="ru">{t('RU')}</option>
          <option value="ja">{t('JP')}</option>
          <option value="ko">{t('KR')}</option>
          <option value="hi">{t('IN')}</option>
          <option value="ar">{t('AR')}</option>
        </select>
      </header>
      <div className="controls flex flex-col sm:flex-row justify-center items-center mb-4">
        <div className={`led ${recognizing ? 'led-active' : ''} mr-2 mb-2 sm:mb-0`}></div>
        <select
          id="languageSelect"
          className="p-2 rounded bg-gray-700 mb-2 sm:mb-0"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es-ES">{t('ES')}</option>
          <option value="en-US">{t('US')}</option>
          <option value="pt-BR">{t('BR')}</option>
          <option value="fr-FR">{t('FR')}</option>
          <option value="it-IT">{t('IT')}</option>
          <option value="de-DE">{t('DE')}</option>
          <option value="zh-CN">{t('ZH')}</option>
          <option value="ru-RU">{t('RU')}</option>
          <option value="ja-JP">{t('JP')}</option>
          <option value="ko-KR">{t('KR')}</option>
          <option value="hi-IN">{t('IN')}</option>
          <option value="ar-SA">{t('AR')}</option>
        </select>
        <select
          id="targetLanguageSelect"
          className="p-2 rounded bg-gray-700 sm:ml-2"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="en">{t('US')}</option>
          <option value="es">{t('ES')}</option>
          <option value="pt">{t('BR')}</option>
          <option value="fr">{t('FR')}</option>
          <option value="it">{t('IT')}</option>
          <option value="de">{t('DE')}</option>
          <option value="zh-CN">{t('ZH')}</option>
          <option value="ru">{t('RU')}</option>
          <option value="ja">{t('JP')}</option>
          <option value="ko">{t('KR')}</option>
          <option value="hi">{t('IN')}</option>
          <option value="ar">{t('AR')}</option>
        </select>
      </div>
      <div className="buttons flex flex-col sm:flex-row justify-center flex-wrap mb-4">
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
      <div className="relative mb-4">
        <textarea
          id="textarea"
          className="w-full h-32 p-2 rounded bg-gray-700"
          placeholder={t('placeholder')}
          readOnly
          value={finalTranscript}
        ></textarea>
        <button
          className="absolute top-2 right-2 p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => handleSpeakText(finalTranscript, language)}
        >
          <HiOutlineSpeakerWave className="w-6 h-6" />
        </button>
      </div>
      <div className="relative mb-4">
        <textarea
          id="translatedTextarea"
          className="w-full h-32 p-2 rounded bg-gray-700"
          placeholder={t('translate')}
          readOnly
          value={translatedTranscript}
        ></textarea>
        <button
          className="absolute top-2 right-2 p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => handleSpeakText(translatedTranscript, targetLanguage)}
        >
          <HiOutlineSpeakerWave className="w-6 h-6" />
        </button>
      </div>
      <div className="relative mb-4">
        <textarea
          id="textToSpeak"
          className="w-full h-20 p-2 rounded bg-gray-700"
          placeholder={t('speak')}
        ></textarea>
        <button
          className="absolute top-2 right-2 p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleSpeak}
        >
          <HiOutlineSpeakerWave className="w-6 h-6" />
        </button>
      </div>
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
