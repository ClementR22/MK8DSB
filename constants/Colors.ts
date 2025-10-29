/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const BUILD_CARD_COLOR_PALETTE = [
  "#E74C3C", // Rouge Écarlate
  "#3498DB", // Bleu Ciel Profond
  "#2ECC71", // Vert Émeraude
  "#9B59B6", // Violet Améthyste
  "#F1C40F", // Jaune Vif
  "#1ABC9C", // Turquoise
  "#E67E22", // Orange Cuivré
  "#E84393", // Rose Fuschia
  "#27AE60", // Vert Forêt
  "#2C3E50", // Bleu Nuit
];

export const HELP_HIGHLIGHT_BOX_COLORS = {
  info: { backgroundColor: "#f0f4ff", borderColor: "#4f46e5", textColor: "#3730a3" },
  result: { backgroundColor: "#ecfdf5", borderColor: "#10b981", textColor: "#047857" },
  tips: { backgroundColor: "#fef3c7", borderColor: "#f59e0b", textColor: "#92400e" },
};

export const BONUS_COLOR = "#34be4d";

export const MALUS_COLOR = "#ff6240";
