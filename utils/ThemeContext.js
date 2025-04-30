import { useColorScheme } from "react-native";
import React, { createContext, useContext } from "react";
import { dark_theme, light_theme } from "@/components/styles/theme";

// Créer un contexte pour gérer le thème
export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

// Fournisseur de thème
export const CustomThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // Récupère la couleur du système (light ou dark)

  const theme = colorScheme === "dark" ? dark_theme : light_theme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

/* const useAppTheme = () => {
    const colorScheme = useColorScheme();
    return colorScheme === "dark" ? dark_theme : light_theme;
  };
  
  export default useAppTheme;
  */
