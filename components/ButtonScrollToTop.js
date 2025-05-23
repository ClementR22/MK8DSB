import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ButtonScrollToTop = ({ scrollToTop }) => {
  const { theme } = useTheme();

  return (
    <Pressable style={styles.floatingButton} onPress={scrollToTop}>
      <MaterialCommunityIcons name="chevron-up" size={24} color={theme.on_primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    borderRadius: 50,
    elevation: 5, // Pour l'effet d'ombre sur Android
  },
});

export default ButtonScrollToTop;
