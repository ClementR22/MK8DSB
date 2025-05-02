import React, { createContext, useContext, useState } from "react";

// Création du contexte
export const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Fournisseur de contexte
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Langue par défaut

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
