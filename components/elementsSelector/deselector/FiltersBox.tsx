import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface FiltersBoxProps {
  children: React.ReactNode;
}

const FiltersBox = ({ children }: FiltersBoxProps) => {
  const theme = useThemeStore((state) => state.theme);

  return <View style={[styles.container, { backgroundColor: theme.surface }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    overflow: "hidden",
    gap: 4,
  },
});

export default FiltersBox;
