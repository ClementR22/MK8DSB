import { create } from "zustand";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { getLocales } from "expo-localization";

// --- Constants ---
export const languageList = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "System", value: "system" },
];

const LANGUAGE_STORAGE_KEY = "language"; // Renamed for clarity

// --- Types ---
type Language = "en" | "fr"; // Represents languages your app actually supports
type LanguageMode = Language | "system";

type LanguageStore = {
  language: Language; // The currently active language (must be 'en' or 'fr')
  languageMode: LanguageMode; // The user's preference ('en', 'fr', or 'system')
  setLanguage: (newLanguageMode: LanguageMode) => Promise<void>;
};

// --- Store Implementation ---
export const useLanguageStore = create<LanguageStore>((set, get) => {
  // Helper function to determine the correct language to use
  const getLanguage = (mode: LanguageMode): Language => {
    switch (mode) {
      case "en":
        return "en";
      case "fr":
        return "fr";
      case "system":
      default:
        const systemLanguage = getLocales()[0]?.languageCode as Language;
        return systemLanguage === "fr" ? "fr" : "en";
    }
  };

  return {
    languageMode: "system", // Initial user preference is 'system'
    language: getLanguage("system"), // Initial active language derived from 'system'

    setLanguage: async (newLanguageMode) => {
      // Save the user's new language preference to device storage
      await saveThingInMemory(LANGUAGE_STORAGE_KEY, newLanguageMode);
      // Update the Zustand store with the new preference and the determined active language
      set({
        languageMode: newLanguageMode,
        language: getLanguage(newLanguageMode),
      });
    },
  };
});
