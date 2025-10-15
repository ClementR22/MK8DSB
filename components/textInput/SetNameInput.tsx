import React, { useEffect, useState, useCallback } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInputContent from "./SetNameInputContent";
import { useSetCardsScroll } from "@/contexts/SetCardsScrollContext";
import showToast from "@/utils/showToast";
import { formatErrorMessage } from "@/utils/formatErrorMessage";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";

interface SetNameInputProps {
  setToShowName: string;
  setToShowId: string;
  editable?: boolean;
}

const SetNameInput: React.FC<SetNameInputProps> = ({ setToShowName, setToShowId, editable = true }) => {
  const language = useLanguageStore((state) => state.language);

  const screenName = useScreen();
  const renameSet = useSetsStore((state) => state.renameSet);
  const checkNameUnique = useSetsStore((state) => state.checkNameUnique);
  const { scrollToSetCard } = useSetCardsScroll();

  const [localName, setLocalName] = useState(setToShowName);

  const handleEndEditing = useCallback(() => {
    if (!localName.trim()) {
      // si le nouveau nom est vide
      setLocalName(setToShowName); // on remet le nom initial
      return;
    }

    if (localName !== setToShowName) {
      try {
        renameSet(localName, screenName, setToShowId);
        showToast(translateToLanguage("SetRenamed", language));
      } catch (e) {
        showToast(formatErrorMessage(e, language));
        setLocalName(setToShowName);
        return;
      }
    }
  }, [localName, setToShowName, renameSet, screenName, setToShowId, language]);

  const handleFocus = useCallback(() => {
    scrollToSetCard(setToShowId);
  }, [scrollToSetCard, setToShowId]);

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
