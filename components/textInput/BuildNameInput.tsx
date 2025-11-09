import React, { useState, useCallback, useRef, useEffect } from "react";
import { useScreen } from "../../contexts/ScreenContext";
import useBuildsListStore from "@/stores/useBuildsListStore";
import BuildNameInputContent from "./BuildNameInputContent";
import { useBuildCardsScroll } from "@/contexts/BuildCardsScrollContext";
import showToast from "@/utils/showToast";
import { NameAlreadyExistsError } from "@/errors/errors";
import { useKeyboardDidHideWhileFocused } from "@/hooks/useKeyboardDidHideWhileFocused";
import { TextInput } from "react-native";

interface BuildNameInputProps {
  name: string;
  buildDataId: string;
  editable?: boolean;
  isSaved: boolean;
}

const BuildNameInput: React.FC<BuildNameInputProps> = ({ name, buildDataId, editable = true, isSaved }) => {
  const screenName = useScreen();
  const renameBuild = useBuildsListStore((state) => state.renameBuild);
  const { scrollToBuildCard } = useBuildCardsScroll();

  const [localName, setLocalName] = useState(name);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (name != localName) {
      setLocalName(name);
    }
  }, [name]);

  const updateName = useCallback(
    (localName: string) => {
      let newName = localName.trim();

      if (!newName) {
        if (isSaved) {
          setLocalName(name);
          showToast("savedBuildCannotHaveEmptyName", "error");
          return;
        }
        newName = "";
        setLocalName(newName);
      }

      if (newName !== name) {
        try {
          renameBuild(localName, screenName, buildDataId, isSaved);
          showToast("buildRenamed", "success");
        } catch (e) {
          if (e instanceof NameAlreadyExistsError) {
            showToast(`${e.message} ${e.buildName}`, "error");
          } else {
            showToast(e.message, "error");
          }
          setLocalName(name);
        }
      }
    },
    [name, screenName, buildDataId, isSaved, renameBuild]
  );

  // Hook pour ne déclencher que si l'input est focus
  useKeyboardDidHideWhileFocused(updateName, focused, inputRef, localName);

  const handleFocus = useCallback(() => {
    setFocused(true);
    scrollToBuildCard(buildDataId);
  }, [buildDataId, scrollToBuildCard]);

  const handleEndEditingOrBlur = useCallback(() => {
    "end editing";
    if (focused) {
      setFocused(false);
    }
    // si on blur avant de fermer le keyboard,
    // alors useKeyboardDidHideWhileFocused n'appelle par updateName
    // donc on le fait ici
    updateName(localName);
  }, [localName, focused, setFocused, updateName]);

  return (
    <BuildNameInputContent
      inputRef={inputRef}
      value={localName}
      onChangeText={setLocalName}
      onEndEditingOrBlur={handleEndEditingOrBlur}
      editable={editable}
      onFocus={handleFocus}
    />
  );
};

BuildNameInput.displayName = "BuildNameInput";

export default React.memo(BuildNameInput);
