
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './Langue/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LanguageSelector from './Langue/LanguageSelector';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Router>
        <LanguageSelector />
        <App />
      </Router>
    </I18nextProvider>,
    rootElement
  );
  

reportWebVitals();


/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LanguageSelector from './LanguageSelector';
import i18n from './Langue/i18n';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/