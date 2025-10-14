import { Dimensions } from "react-native";
import { ThemeColor } from "./theme.d";

export const vh: number = Dimensions.get("screen").height;
export const vw: number = Dimensions.get("screen").width;

// Default Material 3 theme (https://m3.material.io/styles/color/static/baseline)

export const light_theme: ThemeColor = {
  theme: "light",
  theme_surface: "dark",

  primary: "#6750A4",
  on_primary: "#FFFFFF",
  primary_container: "#EADDFF",
  on_primary_container: "#4F378B",

  secondary: "#625B71",
  on_secondary: "#FFFFFF",
  secondary_container: "#E8DEF8",
  on_secondary_container: "#4A4458",

  tertiary: "#7D5260",
  on_tertiary: "#FFFFFF",
  tertiary_container: "#FFD8E4",
  on_tertiary_container: "#633B48",

  error: "#B3261E",
  on_error: "#FFFFFF",
  error_container: "#F9DEDC",
  on_error_container: "#8C1D18",

  surface: "#FEF7FF",
  on_surface: "#1D1B20",
  surface_variant: "#E7E0EC",
  on_surface_variant: "#49454F",
  surface_container_highest: "#E6E0E9",
  surface_container_high: "#ECE6F0",
  surface_container: "#F3EDF7",
  surface_container_low: "#F7F2FA",
  // surface_container_lowest: "#FFFFFF",
  inverse_surface: "#322F35",
  inverse_on_surface: "#F5EFF7",
  surface_tint: "#6750A4",

  outline: "#79747E",
  outline_variant: "#CAC4D0",

  scrim: "#000000",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",

  primary_hover: "rgba(103, 80, 164, 0.08)",

  inactive_dot: "#A0A0A0",
};

export const dark_theme: ThemeColor = {
  theme: "dark",
  theme_surface: "light",

  primary: "#D0BCFF",
  on_primary: "#381E72",
  primary_container: "#4F378B",
  on_primary_container: "#EADDFF",

  secondary: "#CCC2DC",
  on_secondary: "#332D41",
  secondary_container: "#4A4458",
  on_secondary_container: "#E8DEF8",

  tertiary: "#EFB8C8",
  on_tertiary: "#492532",
  tertiary_container: "#633B48",
  on_tertiary_container: "#FFD8E4",

  error: "#F2B8B5",
  on_error: "#601410",
  error_container: "#8C1D18",
  on_error_container: "#F9DEDC",

  surface: "#141218",
  on_surface: "#E6E0E9",
  surface_variant: "#49454F",
  on_surface_variant: "#CAC4D0",
  surface_container_highest: "#36343B",
  surface_container_high: "#2B2930",
  surface_container: "#211F26",
  surface_container_low: "#1D1B20",
  // surface_container_lowest: "#0F0D13",
  inverse_surface: "#E6E0E9",
  inverse_on_surface: "#322F35",
  surface_tint: "#D0BCFF",

  outline: "#938F99",
  outline_variant: "#49454F",

  scrim: "#000000",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)", // Exemple avec "#000000"

  primary_hover: "rgba(103, 80, 164, 0.08)",

  inactive_dot: "#555555",
};
