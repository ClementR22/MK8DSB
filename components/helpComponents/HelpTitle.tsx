import React from "react";
import { StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const HelpTitle = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  return <Text style={[styles.title, { color: theme.on_surface }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 38,
  },
});

export default HelpTitle;
