import React, { useState, useCallback, useEffect } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useBuildsListStore from "@/stores/useBuildsListStore";
import BuildNameInputContent from "./BuildNameInputContent";
import { useBuildCardsScroll } from "@/contexts/BuildCardsScrollContext";
import showToast from "@/utils/showToast";

interface BuildNameInputProps {
  name: string;
  id: string;
  editable?: boolean;
  isSaved: boolean;
}

const BuildNameInput: React.FC<BuildNameInputProps> = ({ name, id, editable = true, isSaved }) => {
  const screenName = useScreen();
  const renameBuild = useBuildsListStore((state) => state.renameBuild);
  const { scrollToBuildCard } = useBuildCardsScroll();

  const [localName, setLocalName] = useState(name);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  const handleEndEditing = useCallback(() => {
    let newName = localName;
    if (!localName.trim()) {
      // si le nouveau nom est vide et si le build est saved
      if (isSaved) {
        setLocalName(name); // on remet le nom initiale
        showToast("savedBuildCannotHaveEmptyName", "error");
        return; // et on s'arrete
      }
      // si le nouveau nom est vide (ou espaces) et si le build n'est pas saved
      newName = "";
      setLocalName(newName); // on remet le nom vide
      // et on va renommer le build
    }

    if (newName !== name) {
      try {
        renameBuild(localName, screenName, id, isSaved);
        showToast("setRenamed", "success");
      } catch (e) {
        showToast(e.message, "error");
        setLocalName(name);
        return;
      }
    }
  }, [localName, name, screenName, id, isSaved, renameBuild]);

  const handleFocus = useCallback(() => {
    scrollToBuildCard(id);
  }, [id, scrollToBuildCard]);

  return (
    <>
      <BuildNameInputContent
        value={localName}
        onChangeText={setLocalName}
        onEndEditing={handleEndEditing}
        editable={editable}
        onFocus={handleFocus}
      />
    </>
  );
};

BuildNameInput.displayName = "BuildNameInput";

export default React.memo(BuildNameInput);
