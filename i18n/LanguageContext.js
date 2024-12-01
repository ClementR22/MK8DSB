import React, { createContext, useState, useContext } from "react";

// Création du contexte
const LanguageContext = createContext();

// Fournisseur de contexte
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr"); // Langue par défaut
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook pour accéder au contexte facilement
export const useLanguage = () => useContext(LanguageContext);

/* AJOUTER QUELQUE PART
<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
  <Pressable onPress={() => setLanguage("en")}>
    <Text>English</Text>
  </Pressable>
  <Pressable onPress={() => setLanguage("fr")}>
    <Text>Français</Text>
  </Pressable>
</View> */
