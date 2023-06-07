import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "../../locales";

const resources = {
  en: translation.en,
  th: translation.th,
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
