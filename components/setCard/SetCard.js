import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import SetImagesContainer from "./SetImagesContainer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import SetNameInput from "../textInput/SetNameInput";
import BoxContainer from "../BoxContainer";
import { useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import Modal from "../Modal";
import useSetsStore from "@/stores/useSetsStore";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";

const SetCard = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setCardIndex = null,
  isInLoadSetModal = false,
}) => {
  const { screenName } = useScreen();
  const situation = isInLoadSetModal ? "load" : screenName;
  const { theme } = useTheme();

  /// DEBUG
  if (!setToShowName) {
    console.log("setToShowName not defined in SetCard");
  }

  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);

  const displaySetImages = () => {
    setIsImagesModalVisible(true);
  };

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
    <BoxContainer contentBackgroundColor={theme.surface} margin={0} maxWidth={300}>
      {config.moreActionNamesList && (
        <SetCardMoreActionsButton
          moreActionNamesList={config.moreActionNamesList}
          setCardIndex={setCardIndex}
          situation={situation}
        />
      )}

      {config.showTextInput && (
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} isWithConfimation={true} />
      )}

      <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="icon" displaySetImages={displaySetImages} />

      {config.showStatSliderResult && <StatSliderResultContainer setsToShowMultipleStatsLists={[setToShowStats]} />}

      <Modal isModalVisible={isImagesModalVisible} setIsModalVisible={setIsImagesModalVisible}>
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="image" />
      </Modal>

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
