import React, { createContext, useContext, useState } from "react";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

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
    setLanguage_(newLanguage);
    await saveThingInMemory("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, setLanguage_ }}>{children}</LanguageContext.Provider>
  );
};
