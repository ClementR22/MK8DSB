import { useColorScheme } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dark_theme, light_theme } from "@/components/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const setTheme = (themeValue) => {
    saveThemeInMemory(themeValue);
    setThemeValue(themeValue);

    if (themeValue === "dark") {
      setTheme_(dark_theme);
    } else if (themeValue === "light") {
      setTheme_(light_theme);
    } else if (themeValue === "system") {
      setTheme_(colorScheme === "dark" ? dark_theme : light_theme);
    }
  };

  const saveThemeInMemory = async (newTheme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde du thème :", e);
    }
  };

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  };

  // Charger le thème au démarrage
  useEffect(() => {
    loadTheme();
  }, []);

  // Mettre à jour le thème si le thème système change
  useEffect(() => {
    if (themeValue === "system") {
      setTheme_(colorScheme === "dark" ? dark_theme : light_theme);
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeValue }}>
      {children}
    </ThemeContext.Provider>
  );
};
