import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json" assert { type: "json" };
import es from "./es.json" assert { type: "json" }; // solo si usas módulos ES con soporte

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
    },
    lng: "es", // idioma por defecto
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;