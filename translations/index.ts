import i18n from "i18next";
import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import { Language, LanguageMode } from "@/stores/useLanguageStore";

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

export function translateParts(messageKey: string) {
  const keysWithNs = messageKey.split("|");
  return keysWithNs.map((keyWithNs) => (keyWithNs.includes(":") ? i18n.t(keyWithNs) : keyWithNs)).join(" ");
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  ns: [
    "button",
    "categories",
    "elementsMK8D",
    "elementsMKW",
    "error",
    "helpSearch",
    "helpDisplay",
    "helpSave",
    "language",
    "modal",
    "placeholder",
    "screens",
    "sortsMK8D",
    "sortsMKW",
    "statsMK8D",
    "statsMKW",
    "text",
    "theme",
    "toast",
    "tooltip",
  ],
  nsSeparator: ":",
  keySeparator: false,

  interpolation: {
    escapeValue: false, // React s'en charge
  },

  saveMissing: true,
  missingKeyHandler: (lngs, ns, key, fallbackValue) => {
    console.log("missingKeyHandler");
    console.log(lngs, ns, key, fallbackValue);
    console.error(`🚨 Traduction manquante: "${key}" (namespace: ${ns})`);
    // Optionnel: envoyer à un service de monitoring
    // Sentry.captureMessage(`Missing translation: ${key}`);
  },
  // Affiche la clé manquante au lieu de rien
  parseMissingKeyHandler: (key) => {
    return `⚠️ MISSING  ${key}`;
  },
});

export default i18n;
