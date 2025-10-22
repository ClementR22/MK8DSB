import React, { useState, useCallback } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsListStore from "@/stores/useSetsListStore";
import SetNameInputContent from "./SetNameInputContent";
import { useSetCardsScroll } from "@/contexts/SetCardsScrollContext";
import showToast from "@/utils/showToast";

interface SetNameInputProps {
  name: string;
  id: string;
  editable?: boolean;
}

const SetNameInput: React.FC<SetNameInputProps> = ({ name, id, editable = true }) => {
  const screenName = useScreen();
  const renameSet = useSetsListStore((state) => state.renameSet);
  const { scrollToSetCard } = useSetCardsScroll();

  const [localName, setLocalName] = useState(name);

  const handleEndEditing = useCallback(() => {
    if (!localName.trim()) {
      // si le nouveau nom est vide
      setLocalName(name); // on remet le nom initial
      return;
    }

    if (localName !== name) {
      try {
        renameSet(localName, screenName, id);
        showToast("setRenamed");
      } catch (e) {
        showToast(e);
        setLocalName(name);
        return;
      }
    }
  }, [localName, name, screenName, id, renameSet]);

  const handleFocus = useCallback(() => {
    scrollToSetCard(id);
  }, [id, scrollToSetCard]);

  return (
    <SetNameInputContent
      value={localName}
      onChangeText={setLocalName}
      onEndEditing={handleEndEditing}
      editable={editable}
      onFocus={handleFocus}
    />
  );
};

SetNameInput.displayName = "SetNameInput";

export default React.memo(SetNameInput);
