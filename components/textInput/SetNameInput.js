import React, { useEffect, useState } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { StyleSheet, TextInput, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const SetNameInput = ({
  setToShowName,
  setCardIndex,
  flex = 1, // option
}) => {
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();

  const defaultName = `Set ${setCardIndex + 1}`;
  const [localName, setLocalName] = useState(setToShowName ?? defaultName);

  const renameSet = useSetsStore((state) => state.renameSet);

  useEffect(() => {
    setLocalName(setToShowName ?? defaultName);
  }, [setToShowName]);

  const handleEndEditing = () => {
    if (!localName.trim()) {
      setLocalName(defaultName); // Évite de mettre un nom vide
      renameSet(null, screenName, setCardIndex);
    } else {
      renameSet(localName, screenName, setCardIndex);
    }
  };

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
      value={localName}
      onChangeText={(text) => {
        setLocalName(text);
      }}
      onBlur={() => handleEndEditing()}
      submitBehavior="submit"
    />
  );
};

export default SetNameInput;
