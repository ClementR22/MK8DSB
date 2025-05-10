import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSetsList } from "@/contexts/SetsListContext";
import MyTextInput from "./MyTextInput";

const SetNameInput = ({ setToShowName, setCardIndex, situation }) => {
  const defaultName = `Set ${setCardIndex + 1}`;
  const [localName, setLocalName] = useState(setToShowName ?? defaultName);

  const { renameSet } = useSetsList();

  useEffect(() => {
    setLocalName(setToShowName ?? defaultName);
  }, [setToShowName]);

  const handleEndEditing = () => {
    if (!localName.trim()) {
      setLocalName(defaultName); // Évite de mettre un nom vide
      renameSet(null, situation, setCardIndex);
    } else {
      renameSet(localName, situation, setCardIndex);
    }
  };

  return (
    <MyTextInput
      value={localName}
      onChangeText={(text) => {
        setLocalName(text);
      }}
      onBlur={() => handleEndEditing()}
    />
  );
};

export default SetNameInput;
