import React, { useEffect, useState } from "react";
import MyTextInput from "./MyTextInput";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";

const SetNameInput = ({ setToShowName, setCardIndex }) => {
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
