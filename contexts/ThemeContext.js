import { useColorScheme } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dark_theme, light_theme } from "@/components/styles/theme";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

export const themeList = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "System", value: "system" },
];

// Créer un contexte pour gérer le thème
const ThemeContext = createContext();

// Fournisseur de thème
export const CustomThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme_] = useState(light_theme); // dark_theme | light_theme
  const [themeValue, setThemeValue] = useState("system"); // "light" | "dark" | "system"

  const setTheme = async (newThemeValue) => {
    setThemeValue(newThemeValue);
    await saveThingInMemory("theme", newThemeValue);
    switch (newThemeValue) {
      case "dark":
        setTheme_(dark_theme);
        break;
      case "light":
        setTheme_(light_theme);
        break;
      case "system":
        setTheme_(colorScheme === "dark" ? dark_theme : light_theme);
        break;
    }
  };

  // Mettre à jour le thème si le thème système change
  useEffect(() => {
    if (themeValue === "system") {
      setTheme_(colorScheme === "dark" ? dark_theme : light_theme);
    }
  }, [colorScheme]);

  return <ThemeContext.Provider value={{ theme, setTheme, themeValue }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
