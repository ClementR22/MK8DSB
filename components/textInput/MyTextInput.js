import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const MyTextInput = ({ value, onChangeText, onBlur, style }) => {
  const theme = useThemeStore((state) => state.theme);

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
      style={[styles.textInput, style]}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      submitBehavior="submit"
    />
  );
};

export default MyTextInput;
