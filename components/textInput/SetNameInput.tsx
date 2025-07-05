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
  const checkNameUnique = useSetsStore((state) => state.checkNameUnique);

  const [localName, setLocalName] = useState(setToShowName);

  const handleEndEditing = useCallback(() => {
    if (!localName.trim()) {
      // si le nouveau nom est vide
      setLocalName(setToShowName); // on remet le nom initial
      renameSet(setToShowName, screenName, setCardIndex);
    } else {
      if (localName !== setToShowName) {
        // si le nom a bien changé
        const isNameUnique = checkNameUnique(localName, screenName);
        if (isNameUnique) {
          renameSet(localName, screenName, setCardIndex);
        } else {
          setLocalName(setToShowName);
        }
      }
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
