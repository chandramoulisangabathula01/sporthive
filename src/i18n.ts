import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json"
import esJSON from "./locale/es.json"
import arJSON from "./locale/ar.json"
// import saJSON from "./lacale/sa.json"


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            en: { translation: enJSON },
            es: { translation: esJSON },
            ar: { translation: arJSON},
            // sa: { translation: saJSON}

        },
        lng: 'en',
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    })