import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
	// load translation using http -> see /public/locales
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(Backend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	/*.init({
	  lng:localStorage. getItem('i18nextLng') || 'en',
	  fallbackLng: 'en',
	  debug: true,
  
	  interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	  },
	});*/

	.init({
		lng: localStorage.getItem('i18nextLng') || 'en',
		fallbackLng: 'en',
		debug: false,
		defaultNS: 'translation',
		ns: ['translation'],
		backend: {
			loadPath: () => {	
				//console.log("process.env.REACT_APP_ENV========>",process.env.REACT_APP_ENV);			
				return (process.env.REACT_APP_ENV === 'Production' ? '/static/app/static':'.') + `/locales/{{lng}}/{{ns}}.json`;
			}				
		},
		load: 'unspecific',
		// special options for react-i18next
		// learn more: https://react.i18next.com/components/i18next-instance
		react: {
			wait: true
		}
	});

export default i18n;