import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { create } from "zustand";

export const languageList = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
];

export type Language = "en" | "fr";

type LanguageStore = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageStore>()((set, get) => ({
  language: "en",

  setLanguage: (lang) => {
    console.log("lang", lang);
    set({ language: lang });
    saveThingInMemory("language", get().language);
  },
}));
