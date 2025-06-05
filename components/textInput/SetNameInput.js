import React, { useEffect, useState } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import SetNameInputContent from "./SetNameInputContent";

const SetNameInput = ({
  setToShowName,
  setCardIndex,
  flex = 1, // option
}) => {
  const screenName = useScreen();
  const renameSet = useSetsStore((state) => state.renameSet);

  const defaultName = `Set ${setCardIndex + 1}`;
  const [localName, setLocalName] = useState(setToShowName ?? defaultName);

  const handleEndEditing = () => {
    if (!localName.trim()) {
      setLocalName(defaultName); // Évite de mettre un nom vide
      renameSet(null, screenName, setCardIndex);
    } else {
      renameSet(localName, screenName, setCardIndex);
    }
  };

  return (
    <SetNameInputContent value={localName} onChangeText={setLocalName} onEndEditing={handleEndEditing} flex={flex} />
  );
};

export default SetNameInput;
