import { Appearance } from "react-native";
import { create } from "zustand";
import { dark_theme, light_theme } from "@/components/styles/theme";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

const THEME_STORAGE_KEY = "theme"; // Define a constant for the storage key

// --- Types ---
type Theme = typeof light_theme;
export type ThemeMode = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  themeMode: ThemeMode;
  setTheme: (newThemeMode: ThemeMode) => Promise<void>;
  updateSystemTheme: () => void;
};

// --- Store Implementation ---
const useThemeStore = create<ThemeStore>((set, get) => {
  // Helper function to determine the correct theme object
  const getTheme = (themeMode: ThemeMode): Theme => {
    switch (themeMode) {
      case "light":
        return light_theme;
      case "dark":
        return dark_theme;
      case "system":
      default: // Fallback for system or any unhandled case
        const systemColorScheme = Appearance.getColorScheme();
        return systemColorScheme === "dark" ? dark_theme : light_theme;
    }
  };

  return {
    themeMode: "system", // Initial state
    theme: getTheme("system"), // Initial theme based on system

    setTheme: async (newThemeMode) => {
      // Save the new theme mode to memory
      await saveThingInMemory(THEME_STORAGE_KEY, newThemeMode);
      // Update the store with the new theme mode and corresponding theme object
      set({
        themeMode: newThemeMode,
        theme: getTheme(newThemeMode),
      });
    },

    updateSystemTheme: () => {
      const { themeMode } = get();
      // Only update if the current theme is set to "system"
      if (themeMode === "system") {
        set({ theme: getTheme("system") });
      }
    },
  };
});

export default useThemeStore;
