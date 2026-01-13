// useLangaugeStore.js
import i18n, { getSystemLanguage } from "@/translations";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { LANGUAGE_DEFAULT } from "@/config/config";
import { create } from "zustand";

const LANGUAGE_KEY = "language";

export type Language = "en" | "fr"; // Represents languages your app actually supports
export type LanguageMode = Language | "system";

interface LanguageState {
  language: LanguageMode;
  setLanguage: (language: LanguageMode) => Promise<void>;
}

const useLanguageStore = create<LanguageState>((set, get) => ({
  language: LANGUAGE_DEFAULT,

  // Changer la langue
  setLanguage: async (language: LanguageMode) => {
    if (!language) {
      language = LANGUAGE_DEFAULT;
    }

    // Sauvegarder le choix ('fr', 'en', ou 'system')
    await saveThingInMemory(LANGUAGE_KEY, language);

    // Appliquer la langue effective
    const effectiveLang = language === "system" ? getSystemLanguage() : language;
    await i18n.changeLanguage(effectiveLang);
    set({ language });
  },
}));

export default useLanguageStore;
