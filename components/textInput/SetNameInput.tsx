import React, { useEffect, useState, useCallback } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInputContent from "./SetNameInputContent";

interface SetNameInputProps {
  setToShowName: string;
  setCardIndex: number;
  editable?: boolean;
}

const SetNameInput: React.FC<SetNameInputProps> = ({ setToShowName, setCardIndex, editable = true }) => {
  const screenName = useScreen();
  const renameSet = useSetsStore((state) => state.renameSet);

  const [localName, setLocalName] = useState(setToShowName);

  const handleEndEditing = useCallback(() => {
    if (!localName.trim()) {
      setLocalName(setToShowName); // Évite de mettre un nom vide
      renameSet(setToShowName, screenName, setCardIndex);
    } else {
      renameSet(localName, screenName, setCardIndex);
    }
  }, [localName, setToShowName, renameSet, screenName, setCardIndex]);

  return (
    <SetNameInputContent
      value={localName}
      onChangeText={setLocalName}
      onEndEditing={handleEndEditing}
      editable={editable}
    />
  );
};

export default React.memo(SetNameInput);
