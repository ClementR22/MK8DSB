import { Appearance } from "react-native";
import { create } from "zustand";
import { dark_theme, light_theme } from "@/components/styles/theme";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

export const themeList = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "System", value: "system" },
];

type Theme = typeof light_theme;
export type ThemeLabel = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  themeLabel: ThemeLabel;
  setTheme: (newLabel: "light" | "dark" | "system") => Promise<void>;
  updateSystemTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => {
  const getTheme = (label: "light" | "dark" | "system"): Theme => {
    if (label === "light") return light_theme;
    if (label === "dark") return dark_theme;
    const system = Appearance.getColorScheme();
    return system === "dark" ? dark_theme : light_theme;
  };

  return {
    themeLabel: "system", // "light" | "dark" | "system"
    theme: getTheme("system"), // dark_theme | light_theme

    setTheme: async (newLabel) => {
      await saveThingInMemory("theme", newLabel);
      set({
        themeLabel: newLabel,
        theme: getTheme(newLabel),
      });
    },

    updateSystemTheme: () => {
      const { themeLabel } = get();
      if (themeLabel === "system") {
        set({ theme: getTheme("system") });
      }
    },
  };
});
