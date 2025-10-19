import React, { useState, useCallback } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsListStore from "@/stores/useSetsListStore";
import SetNameInputContent from "./SetNameInputContent";
import { useSetCardsScroll } from "@/contexts/SetCardsScrollContext";
import showToast from "@/utils/showToast";
import { formatErrorMessage } from "@/utils/formatErrorMessage";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";

interface SetNameInputProps {
  name: string;
  id: string;
  editable?: boolean;
}

const SetNameInput: React.FC<SetNameInputProps> = ({ name, id, editable = true }) => {
  const language = useLanguageStore((state) => state.language);

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
        showToast(translateToLanguage("SetRenamed", language));
      } catch (e) {
        showToast(formatErrorMessage(e, language));
        setLocalName(name);
        return;
      }
    }
  }, [localName, name, screenName, id, language, renameSet]);

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
