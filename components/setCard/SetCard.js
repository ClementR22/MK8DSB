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
import { useThemeStore } from "@/stores/useThemeStore";
import SetImagesModal from "./SetImagesModal";

const SetCard = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setCardIndex = null,
  isInLoadSetModal = false,
  screenNameFromProps,
  hideRemoveSet = false,
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
      moreActionNamesList: [], // va valoir ["export", "remove"] ou bien ["export"]
    },
    save: {
      showTextInput: true,
      showStatSliderResult: true,
      actionNamesList: ["edit", "loadSaveToSearch", "loadSaveToDisplay"],
      moreActionNamesList: ["export", "removeInMemory"],
    },
    load: {
      showTextInput: true,
      showStatSliderResult: false,
      actionNamesList: [screenName === "search" ? "loadSaveToSearch" : "loadSaveToDisplay"],
      moreActionNamesList: undefined,
    },
  };

  const config = useMemo(() => {
    const currentConfig = situationConfig[situation] ?? {};

    // Gérer spécifiquement le `moreActionNamesList` pour la situation 'display'
    if (situation === "display") {
      const dynamicMoreActions = [];
      // Inclure "remove" SEULEMENT si hideRemoveSet est false
      if (!hideRemoveSet) {
        dynamicMoreActions.push("remove");
      }
      dynamicMoreActions.push("export"); // "export" est toujours inclus pour display

      return {
        ...currentConfig,
        moreActionNamesList: dynamicMoreActions,
      };
    }

    // Pour les autres situations, retourner la configuration telle quelle
    return { ...currentConfig };
  }, [situation, hideRemoveSet, screenName]);

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
    <BoxContainer contentBackgroundColor={theme.surface} margin={0} widthContainer={250}>
      {/*       Corriger le flex container car il prend trop de place
       */}
      <FlexContainer flexDirection={"row"}>
        {config.showTextInput && (
          <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} editable={!isInLoadSetModal} />
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
  );
};

export default SetCard;
