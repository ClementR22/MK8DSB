import React, { useMemo } from "react";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import SetNameInput from "../textInput/SetNameInput";
import BoxContainer from "@/components/BoxContainer";
import FlexContainer from "@/components/FlexContainer";
import { useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";
import { Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import SetImagesModal from "./SetImagesModal";

const SetCard = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setCardIndex = null,
  isInLoadSetModal = false,
  screenNameFromProps,
}) => {
  const contextScreenName = useScreen();
  const screenName = screenNameFromProps ?? contextScreenName;
  const situation = isInLoadSetModal ? "load" : screenName;
  const theme = useThemeStore((state) => state.theme);

  const situationConfig = {
    search: {
      showTextInput: false,
      showStatSliderResult: true,
      actionNamesList: ["save", "loadSearchToDisplay", "export"],
      moreActionNamesList: undefined,
    },
    display: {
      showTextInput: true,
      showStatSliderResult: false,
      actionNamesList: ["edit", "save", "loadDisplayToSearch"],
      moreActionNamesList: ["remove", "export"],
    },
    save: {
      showTextInput: true,
      showStatSliderResult: true,
      actionNamesList: ["edit", "loadSaveToSearch", "loadSaveToDisplay"],
      moreActionNamesList: ["export", "removeInMemory"],
    },
    load: {
      showTextInput: false,
      showStatSliderResult: false,
      actionNamesList: [screenName === "search" ? "loadSaveToSearch" : "loadSaveToDisplay"],
      moreActionNamesList: undefined,
    },
  };

  const config = useMemo(() => {
    const base = situationConfig[situation] ?? {};
    return { ...base };
  }, [situation, screenName]);

  const setPressedClassIdsObjByScreen = usePressableElementsStore((state) => state.setPressedClassIdsObjByScreen);
  const updatePressableElementsList = usePressableElementsStore((state) => state.updatePressableElementsList);
  const setSetCardEdittedIndex = useSetsStore((state) => state.setSetCardEdittedIndex);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  function handleEditPress() {
    setSetCardEdittedIndex(setCardIndex);
    setPressedClassIdsObjByScreen(screenName, setToShowClassIds);
    setIsEditModalVisible(true);
    updatePressableElementsList(screenName, setToShowClassIds);
  }

  return (
    <Pressable>
      <BoxContainer contentBackgroundColor={theme.surface} margin={0} maxWidth={300}>
        <FlexContainer flexDirection={"row"}>
          {config.showTextInput && (
            <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} isWithConfimation={true} />
          )}

          {config.moreActionNamesList && (
            <SetCardMoreActionsButton
              moreActionNamesList={config.moreActionNamesList}
              setCardIndex={setCardIndex}
              situation={situation}
            />
          )}
        </FlexContainer>

        <SetImagesModal setToShowClassIds={setToShowClassIds} />

        {config.showStatSliderResult && <StatSliderResultContainer setsToShowMultipleStatsLists={[setToShowStats]} />}

        <SetCardActionButtons
          actionNamesList={config.actionNamesList}
          setCardIndex={setCardIndex}
          situation={situation}
          handleEditPress={handleEditPress}
        />
      </BoxContainer>
    </Pressable>
  );
};

export default SetCard;
