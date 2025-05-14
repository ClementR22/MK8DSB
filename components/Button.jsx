import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

function Button({ children, onPress }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
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

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;
