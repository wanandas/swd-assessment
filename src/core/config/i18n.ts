import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "../../locales";

const resources = {
  en: translation.en,
  th: translation.th,
};

const fallbackLanguage = "en";
const savedLanguage = localStorage.getItem("language");

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || fallbackLanguage,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    // Set the selected language in localStorage
    if (!savedLanguage) {
      localStorage.setItem("language", i18nInstance.language);
    }
  });

export default i18nInstance;
