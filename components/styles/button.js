import { StyleSheet } from "react-native";
import th from "./theme";
import { shadow_3dp } from "./theme";

export const button = (th) => StyleSheet.create({
  container: {
    display: "flex",
    height: 40,
    borderRadius: 100,
    backgroundColor: th.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
    color: th.on_primary,
  },
});

export const button_icon = (th) => StyleSheet.create({
  container: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: th.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: th.on_primary,
  },
});

export const button_outline = (th) => StyleSheet.create({
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
