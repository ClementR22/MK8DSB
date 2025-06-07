import React, { useEffect, useState } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import SetNameInputContent from "./SetNameInputContent";

const SetNameInput = ({
  setToShowName,
  setCardIndex,
  flex = 1, // option
  editable = true, // option
}) => {
  const screenName = useScreen();
  const renameSet = useSetsStore((state) => state.renameSet);

  const [localName, setLocalName] = useState(setToShowName);

  // met à jour la valeur de setToShowName quand elle change suite à renameSet()
  useEffect(() => {
    setLocalName(setToShowName);
  }, [setToShowName]);

  const handleEndEditing = () => {
    if (!localName.trim()) {
      setLocalName(setToShowName); // Évite de mettre un nom vide
      renameSet(setToShowName, screenName, setCardIndex);
    } else {
      renameSet(localName, screenName, setCardIndex);
    }
  };

  return (
    <SetNameInputContent
      value={localName}
      onChangeText={setLocalName}
      onEndEditing={handleEndEditing}
      flex={flex}
      editable={editable}
    />
  );
};

export default SetNameInput;
