import { StyleSheet } from "react-native";

export const card = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface_container_low,
      borderRadius: 12,
      padding: 16,
    },
    text: {
      color: theme.on_surface,
    },
  });
