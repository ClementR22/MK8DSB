import React, { useEffect, useMemo, useState } from "react";
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
      showEdit: false,
      showRemove: false,
      showSave: true,
      showLoadSaveToSearch: false,
      showLoadSaveToDisplay: false,
      showLoadSearchToDisplay: true,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: false,
      showExport: true,
    },
    display: {
      showTextInput: true,
      showStatSliderResult: false,
      showEdit: true,
      showRemove: true,
      showSave: true,
      showLoadSaveToSearch: false,
      showLoadSaveToDisplay: false,
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: true,
      showRemoveInMemory: false,
      showExport: true,
    },
    save: {
      showTextInput: true,
      showStatSliderResult: true,
      showEdit: true,
      showRemove: false,
      showSave: false,
      showLoadSaveToSearch: true,
      showLoadSaveToDisplay: true,
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: true,
      showExport: true,
    },
    load: {
      showTextInput: false,
      showStatSliderResult: false,
      showEdit: false,
      showRemove: false,
      showSave: false,
      showLoadSaveToSearch: screenName === "search",
      showLoadSaveToDisplay: screenName === "display",
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: false,
      showExport: false,
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
      {config.showTextInput && (
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} isWithConfimation={true} />
      )}

      <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="icon" displaySetImages={displaySetImages} />

      {config.showStatSliderResult && <StatSliderResultContainer setsToShowMultipleStatsLists={[setToShowStats]} />}

      <Modal isModalVisible={isImagesModalVisible} setIsModalVisible={setIsImagesModalVisible}>
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="image" />
      </Modal>

      <SetCardActionButtons
        setCardIndex={setCardIndex}
        config={config}
        situation={situation}
        handleEditPress={handleEditPress}
      />
    </BoxContainer>
  );
};

export default SetCard;
