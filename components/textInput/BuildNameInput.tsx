import React, { useState, useCallback } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useBuildsListStore from "@/stores/useBuildsListStore";
import BuildNameInputContent from "./BuildNameInputContent";
import { useBuildCardsScroll } from "@/contexts/BuildCardsScrollContext";
import showToast from "@/utils/showToast";

interface BuildNameInputProps {
  name: string;
  id: string;
  editable?: boolean;
}

const BuildNameInput: React.FC<BuildNameInputProps> = ({ name, id, editable = true }) => {
  const screenName = useScreen();
  const renameSet = useBuildsListStore((state) => state.renameSet);
  const { scrollToBuildCard } = useBuildCardsScroll();

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
        showToast("setRenamed", "success");
      } catch (e) {
        showToast(e.message, "error");
        setLocalName(name);
        return;
      }
    }
  }, [localName, name, screenName, id, renameSet]);

  const handleFocus = useCallback(() => {
    scrollToBuildCard(id);
  }, [id, scrollToBuildCard]);

  return (
    <BuildNameInputContent
      value={localName}
      onChangeText={setLocalName}
      onEndEditing={handleEndEditing}
      editable={editable}
      onFocus={handleFocus}
    />
  );
};

BuildNameInput.displayName = "BuildNameInput";

export default React.memo(BuildNameInput);
