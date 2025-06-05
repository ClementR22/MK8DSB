import { useThemeStore } from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

const SetNameInputContent = ({ value, onChangeText, onEndEditing, flex = 1, editable = true }) => {
  const theme = useThemeStore((state) => state.theme);

  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: theme.surface_container_highest,
      color: theme.on_surface,
      padding: 5,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      flex: flex,
      height: 40,
    },
  });

  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
      onBlur={onEndEditing}
      editable={editable}
    />
  );
};

export default SetNameInputContent;
