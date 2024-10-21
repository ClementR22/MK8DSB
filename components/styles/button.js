import { StyleSheet } from "react-native";
import th from "./light_theme";
import { shadow_3dp } from "./light_theme";

export const button = StyleSheet.create({
  container: {
    display: "flex",
    height: 40,
    borderRadius: 100,
    backgroundColor: "#6750A4",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
    color: "#fff",
  },
});

export const button_icon = StyleSheet.create({
  container: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#6750A4",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
  },
});

export const button_outline = StyleSheet.create({
  container: {
    borderRadius: 24,
    display: "flex",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  hover: {
    backgroundColor: th.primary_hover,
  },
  text: {
    color: th.primary,
    fontWeight: "500",
    fontSize: 14,
  },
});
