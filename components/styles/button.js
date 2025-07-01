import { StyleSheet } from "react-native";

export const button = (theme) =>
  StyleSheet.create({
    container: {
      height: 40,
      borderRadius: 100,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontWeight: "500",
      fontSize: 14,
      color: theme.on_primary,
    },
  });

export const button_icon = (theme) =>
  StyleSheet.create({
    container: {
      height: 40,
      width: 40,
      borderRadius: 100,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: theme.on_primary,
    },
  });

export const button_outline = (theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 24,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    hover: {
      backgroundColor: theme.primary_hover,
    },
    text: {
      color: theme.primary,
      fontWeight: "500",
      fontSize: 14,
    },
  });
