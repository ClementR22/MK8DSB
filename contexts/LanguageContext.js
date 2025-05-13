import React, { createContext, useContext, useState, useEffect } from "react";
import { loadThingFromMemory, saveThingInMemory } from "@/utils/asyncStorageOperations";

export const languageList = [
  { label: "English", value: "en" },
  { label: "Francais", value: "fr" },
];

// Création du contexte
const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Fournisseur de contexte
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage_] = useState("en"); // Langue par défaut

  const setLanguage = async (newLanguage) => {
    await saveThingInMemory("language", newLanguage);
    setLanguage_(newLanguage);
  };

  useEffect(() => {
    loadThingFromMemory("language", setLanguage_);
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};
