import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const languageList = [
  { label: "English", value: "en" },
  { label: "Francais", value: "fr" },
];

// Création du contexte
export const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Fournisseur de contexte
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage_] = useState("en"); // Langue par défaut

  const setLanguage = async (newLanguage) => {
    setLanguage_(newLanguage);
    await saveLanguageInMemory(newLanguage);
  };

  const saveLanguageInMemory = async (newLanguage) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de la langue :", e);
    }
  };

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        setLanguage_(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
