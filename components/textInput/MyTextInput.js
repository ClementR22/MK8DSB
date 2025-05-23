import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

const MyTextInput = ({ value, onChangeText, onBlur }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: theme.surface_container_highest,
      color: theme.on_surface,
      padding: 5,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      height: 40,
    },
  });

  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      submitBehavior="submit"
    />
  );
};

export default MyTextInput;
