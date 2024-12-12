import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations.json";

const savedLanguage = typeof window !== "undefined" && localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en";

i18next.use(initReactI18next).init({
    resources: translations,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
