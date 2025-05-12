import { useColorScheme } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dark_theme, light_theme } from "@/components/styles/theme";
import { loadThingFromMemory, saveThingInMemory } from "@/utils/asyncStorageOperations";

export const themeList = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "System", value: "system" },
];

// Créer un contexte pour gérer le thème
export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

// Fournisseur de thème
export const CustomThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme_] = useState(light_theme); // dark_theme | light_theme
  const [themeValue, setThemeValue] = useState("light"); // "light" | "dark" | "system"

  const setTheme = async (newThemeValue) => {
    await saveThingInMemory("theme", newThemeValue);
    setThemeValue(newThemeValue);

    if (newThemeValue === "dark") {
      setTheme_(dark_theme);
    } else if (newThemeValue === "light") {
      setTheme_(light_theme);
    } else if (newThemeValue === "system") {
      setTheme_(colorScheme === "dark" ? dark_theme : light_theme);
    }
  };

  // Charger le thème au démarrage
  useEffect(() => {
    loadThingFromMemory("theme", setTheme);
  }, []);

  // Mettre à jour le thème si le thème système change
  useEffect(() => {
    if (themeValue === "system") {
      setTheme_(colorScheme === "dark" ? dark_theme : light_theme);
    }
  }, [colorScheme]);

  return <ThemeContext.Provider value={{ theme, setTheme, themeValue }}>{children}</ThemeContext.Provider>;
};
