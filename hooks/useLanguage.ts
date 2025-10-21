// useLanguage.js
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSystemLanguage } from "@/i18n";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";

const LANGUAGE_KEY = "language";

export type Language = "en" | "fr"; // Represents languages your app actually supports
export type LanguageMode = Language | "system";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageMode>("system");

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const saved: LanguageMode = await loadThingFromMemory(LANGUAGE_KEY);
      const languageChoice = saved || "system"; // fallback
      setSelectedLanguage(languageChoice);

      // Appliquer la langue effective
      const effectiveLang: Language = languageChoice === "system" ? getSystemLanguage() : languageChoice;

      await i18n.changeLanguage(effectiveLang);
    } catch (error) {
      console.error("Erreur chargement langue:", error);
    }
  };

  // Changer la langue
  const changeLanguage = async (language: LanguageMode) => {
    try {
      // Sauvegarder le choix ('fr', 'en', ou 'system')
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
      setSelectedLanguage(language);

      // Appliquer la langue effective
      const effectiveLang = language === "system" ? getSystemLanguage() : language;

      await i18n.changeLanguage(effectiveLang);
    } catch (error) {
      console.error("Erreur changement langue:", error);
    }
  };

  return {
    selectedLanguage, // 'fr', 'en', ou 'system'
    currentLanguage: i18n.language as Language, // 'fr' ou 'en' (langue active réelle)
    changeLanguage,
  };
};
