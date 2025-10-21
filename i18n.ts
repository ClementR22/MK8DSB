import i18n from "i18next";
import * as Localization from "react-native-localize";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import fr from "./translations/fr.json";
import enLanguage from "./translations/en/language.json";
import frLanguage from "./translations/fr/language.json";
import enTheme from "./translations/en/theme.json";
import frTheme from "./translations/fr/theme.json";
import { loadThingFromMemory } from "./utils/asyncStorageOperations";
import { Language, LanguageMode } from "./hooks/useLanguage";

// Fonction pour obtenir la langue système
export const getSystemLanguage = () => {
  const systemLang = Localization.getLocales()[0]?.languageCode;
  // Retourne 'fr' ou 'en', fallback sur 'en' si non supporté
  return (["fr", "en"].includes(systemLang) ? systemLang : "en") as Language;
};

// Fonction pour obtenir la langue à utiliser
export const getLanguageToUse = async () => {
  const savedLanguage: LanguageMode = await loadThingFromMemory("language");

  if (savedLanguage == "system" || !savedLanguage) {
    return getSystemLanguage();
  }
  return savedLanguage; // 'fr' ou 'en'
};

const resources = {
  en: { translation: en, language: enLanguage, theme: enTheme },
  fr: { translation: fr, language: frLanguage, theme: frTheme },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  saveMissing: true,
  missingKeyHandler: (lngs, ns, key, fallbackValue) => {
    console.error(`🚨 Traduction manquante: "${key}" (namespace: ${ns})`);
    // Optionnel: envoyer à un service de monitoring
    // Sentry.captureMessage(`Missing translation: ${key}`);
  },

  // Affiche la clé manquante au lieu de rien
  parseMissingKeyHandler: (key) => {
    return `⚠️ MISSING: ${key}`;
  },

  interpolation: {
    escapeValue: false, // React s'en charge
  },
});

export default i18n;
