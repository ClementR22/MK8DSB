import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

function Button({ children, onPress, ...props }) {
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

  const handlePress = () => {
    onPress?.();
  }

  return (
    <Pressable onPress={handlePress} style={styles.container} {...props}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;
